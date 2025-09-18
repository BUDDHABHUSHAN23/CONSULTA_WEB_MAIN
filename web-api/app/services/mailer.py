# app/services/mailer.py
from __future__ import annotations

import os, time, ssl, smtplib, asyncio, contextlib
from typing import Iterable, Optional, Tuple, Dict
from email.message import EmailMessage
from email.utils import parseaddr, formatdate, make_msgid

# ========= ENV (keep simple) =========
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")  # Changed to Gmail for better reliability
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))          # Gmail prefers 587 with STARTTLS
SMTP_USER = os.getenv("SMTP_USER") or ""
SMTP_PASS = os.getenv("SMTP_PASS") or ""                # Use APP PASSWORD (Gmail)
SMTP_FROM = os.getenv("SMTP_FROM") or SMTP_USER         # Can be "Name <addr>"
SMTP_ENVELOPE_FROM = os.getenv("SMTP_ENVELOPE_FROM") or SMTP_USER
MESSAGE_ID_DOMAIN = os.getenv("MAIL_MESSAGE_ID_DOMAIN", "consulta.in")

SMTP_TIMEOUT = float(os.getenv("SMTP_TIMEOUT", "10"))  # Reduced timeout for faster failure
SMTP_RETRIES = int(os.getenv("SMTP_RETRIES", "1"))     # Reduced retries for faster response
SMTP_RETRY_BACKOFF_S = float(os.getenv("SMTP_RETRY_BACKOFF_S", "0.5"))  # Faster retry
# ensure this exists once at the top too
MAIL_HEALTH_MIN_INTERVAL_S = float(os.getenv("MAIL_HEALTH_MIN_INTERVAL_S", "60"))
_last_health_ts: float | None = None  # cache last health check time

MAIL_EHLO_NAME = os.getenv("MAIL_EHLO_NAME", "consulta.in")  # EHLO/HELO identity

# Only TO list (no cc/bcc)
def _split_env(name: str) -> tuple[str, ...]:
    return tuple(e.strip() for e in os.getenv(name, "").split(",") if e.strip())

NOTIFY_TO = _split_env("NOTIFY_TO")

# ========= tiny helpers =========
def _looks_like_email(s: str | None) -> bool:
    if not s or "@" not in s or any(ch in s for ch in ("\r", "\n", " ")):
        return False
    local, _, domain = s.rpartition("@")
    return bool(local and "." in domain)

def _normalize(addrs: Iterable[str] | None) -> Tuple[str, ...]:
    out, seen = [], set()
    for a in addrs or []:
        a = (a or "").strip()
        if not a:
            continue
        _, addr = parseaddr(a)
        key = (addr or a).lower()
        if key and key not in seen:
            out.append(addr or a)
            seen.add(key)
    return tuple(out)

def _ascii_only(s: str) -> str:
    return (s or "").encode("ascii", "ignore").decode("ascii")

def _envelope_from() -> str:
    if _looks_like_email(SMTP_ENVELOPE_FROM):
        return SMTP_ENVELOPE_FROM
    if _looks_like_email(SMTP_FROM):
        _, addr = parseaddr(SMTP_FROM)
        if _looks_like_email(addr):
            return addr
    return SMTP_USER

def _ssl_ctx() -> ssl.SSLContext:
    ctx = ssl.create_default_context()
    ctx.minimum_version = ssl.TLSVersion.TLSv1_2
    return ctx

def _build_plain_msg(*, to_addr: str, subject: str, body_text: str, reply_to: Optional[str]) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = _ascii_only(subject or "[Consulta]")
    msg["From"] = SMTP_FROM if SMTP_FROM else SMTP_USER     # display name OK
    msg["To"] = to_addr
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain=MESSAGE_ID_DOMAIN)
    if reply_to and _looks_like_email(reply_to):
        msg["Reply-To"] = reply_to
    msg.set_content((body_text or " ").strip() or " ")
    return msg

# ========= blocking core (used via to_thread) =========
def _connect_and_login_blocking(port: int, timeout: float):
    """Return (server, used_port, tls_mode)."""
    if port == 465:
        server = smtplib.SMTP_SSL(
            host=SMTP_HOST, port=465, local_hostname=MAIL_EHLO_NAME,
            context=_ssl_ctx(), timeout=timeout
        )
        tls_mode = "ssl/tls"
        server.ehlo(MAIL_EHLO_NAME)
    else:  # 587 (or 25): STARTTLS
        server = smtplib.SMTP(
            host=SMTP_HOST, port=port, local_hostname=MAIL_EHLO_NAME, timeout=timeout
        )
        server.ehlo(MAIL_EHLO_NAME)
        server.starttls(context=_ssl_ctx())
        server.ehlo(MAIL_EHLO_NAME)
        tls_mode = "starttls"

    if SMTP_USER and SMTP_PASS:
        server.login(SMTP_USER, SMTP_PASS)  # APP PASSWORD recommended
    return server, port, tls_mode

def _send_plain_blocking(subject: str, recipients: Tuple[str, ...], body_text: str, reply_to: Optional[str]) -> Dict:
    if not recipients:
        return {"ok": False, "error": "No recipients"}

    primary = SMTP_PORT
    alternate = 587 if primary == 465 else 465
    last_exc = None
    overall_started = time.perf_counter()

    for port in (primary, alternate):
        try:
            server, used_port, tls_mode = _connect_and_login_blocking(port, SMTP_TIMEOUT)
            try:
                env_from = _envelope_from()
                results: Dict[str, str] = {}
                details: Dict[str, Dict[str, float | str]] = {}
                for rcpt in recipients:
                    msg = _build_plain_msg(to_addr=rcpt, subject=subject, body_text=body_text, reply_to=reply_to)
                    delay = 0.0
                    started = time.perf_counter()
                    for attempt in range(1, SMTP_RETRIES + 2):
                        if delay:
                            time.sleep(delay)
                        try:
                            server.send_message(msg, from_addr=env_from, to_addrs=[rcpt])
                            results[rcpt] = "ok"
                            details[rcpt] = {
                                "msgid": str(msg.get("Message-ID", "")),
                                "duration_ms": round((time.perf_counter() - started) * 1000),
                            }
                            break
                        except smtplib.SMTPException as e:
                            results[rcpt] = f"fail:{repr(e)}"
                            # One-time fallback: if server rejects message at DATA with 550 and we used Reply-To,
                            # retry once without Reply-To header (some providers have policies around it)
                            if reply_to and isinstance(e, smtplib.SMTPDataError) and getattr(e, 'smtp_code', 0) == 550 and attempt == 1:
                                try:
                                    msg_no_rt = _build_plain_msg(to_addr=rcpt, subject=subject, body_text=body_text, reply_to=None)
                                    server.send_message(msg_no_rt, from_addr=env_from, to_addrs=[rcpt])
                                    results[rcpt] = "ok"
                                    details[rcpt] = {
                                        "msgid": str(msg_no_rt.get("Message-ID", "")),
                                        "duration_ms": round((time.perf_counter() - started) * 1000),
                                    }
                                    break
                                except Exception as _:
                                    pass
                            delay = max(SMTP_RETRY_BACKOFF_S, 0.2)
                            continue

                ok = any(v == "ok" for v in results.values())
                partial = ok and any(v != "ok" for v in results.values())
                return {
                    "ok": ok,
                    "partial": partial,
                    "host": SMTP_HOST,
                    "port": used_port,
                    "tls": tls_mode,
                    "results": results,
                    "details": details,
                    "total_latency_ms": round((time.perf_counter() - overall_started) * 1000),
                }
            finally:
                with contextlib.suppress(Exception):
                    server.quit()
        except Exception as e:
            last_exc = e
            continue

    return {
        "ok": False,
        "host": SMTP_HOST,
        "port": primary,
        "tls": "ssl/tls" if primary == 465 else "starttls",
        "error": repr(last_exc) if last_exc else "unknown error",
        "total_latency_ms": round((time.perf_counter() - overall_started) * 1000),
    }

def _health_blocking(timeout: float) -> Dict:
    started = time.perf_counter()
    primary = SMTP_PORT
    alternate = 587 if primary == 465 else 465
    try:
        server, used_port, tls_mode = _connect_and_login_blocking(primary, timeout)
    except Exception:
        try:
            server, used_port, tls_mode = _connect_and_login_blocking(alternate, timeout)
        except Exception as e:
            return {
                "ok": False, "host": SMTP_HOST, "port": primary,
                "tls": "ssl/tls" if primary == 465 else "starttls",
                "auth": bool(SMTP_USER and SMTP_PASS), "error": repr(e),
                "latency_ms": round((time.perf_counter() - started) * 1000),
            }
    try:
        code, resp = server.noop()  # typically 250
        ok = 200 <= int(code) < 400
        return {
            "ok": bool(ok), "host": SMTP_HOST, "port": used_port, "tls": tls_mode,
            "auth": bool(SMTP_USER and SMTP_PASS), "code": int(code),
            "response": resp.decode() if isinstance(resp, (bytes, bytearray)) else str(resp),
            "latency_ms": round((time.perf_counter() - started) * 1000),
        }
    finally:
        with contextlib.suppress(Exception):
            server.quit()

# ========= async wrappers (FastAPI-friendly) =========
async def send_email(
    subject: str,
    to: Iterable[str],
    html: str,                   # ignored (keeping signature)
    text: Optional[str] = None,  # used
    reply_to: Optional[str] = None,
    cc=None, bcc=None,           # ignored (kept for compatibility)
) -> Dict:
    # NO CC/BCC — kept in signature so routes don’t break
    recipients = _normalize(to)
    body = text or ""
    rt = reply_to if _looks_like_email(reply_to) else None
    result = await asyncio.to_thread(
        _send_plain_blocking,
        _ascii_only(subject or "[Consulta]"),
        recipients,
        body,
        rt,
    )
    return result

async def send_contact_notification(payload: dict) -> Dict:
    lines = [
        "New Website Enquiry",
        f"Name: {payload.get('name') or ''}",
        f"Email: {payload.get('email') or ''}",
        f"Phone: {payload.get('phone') or ''}",
        f"Company: {payload.get('company') or '-'}",
        f"Industry: {payload.get('industry') or '-'}",
        "Message:",
        (payload.get('message') or "").strip(),
        "",
        "Source: Website · Auto-generated",
    ]
    subject = _ascii_only("[Consulta] New website enquiry")
    body = "\n".join(lines)
    # Avoid Reply-To to reduce 550/DMARC rejections; include sender email only in body
    reply_to = None

    tos = NOTIFY_TO or ([SMTP_USER] if SMTP_USER else [])
    
    # Try primary SMTP first
    try:
        res = await send_email(subject=subject, to=tos, html="", text=body, reply_to=reply_to)
        if isinstance(res, dict) and res.get("ok"):
            return res
    except Exception as e:
        print(f"Primary SMTP failed: {e}")
    
    # Fallback: Try alternative SMTP settings
    try:
        # Use Gmail as fallback if primary fails
        original_host = SMTP_HOST
        original_port = SMTP_PORT
        
        # Temporarily switch to Gmail
        import os
        os.environ["SMTP_HOST"] = "smtp.gmail.com"
        os.environ["SMTP_PORT"] = "587"
        
        res = await send_email(subject=subject, to=tos, html="", text=body, reply_to=reply_to)
        
        # Restore original settings
        os.environ["SMTP_HOST"] = original_host
        os.environ["SMTP_PORT"] = str(original_port)
        
        if isinstance(res, dict) and res.get("ok"):
            return res
    except Exception as e:
        print(f"Fallback SMTP failed: {e}")
    
    # If all fails, return error
    return {"ok": False, "error": "All email services failed"}

async def check_mailer(timeout: float = 10.0) -> Dict:
    global _last_health_ts
    # belt & suspenders in case of weird reload order
    if "_last_health_ts" not in globals():
        _last_health_ts = None

    now = time.perf_counter()
    if (_last_health_ts is not None) and (now - _last_health_ts) < MAIL_HEALTH_MIN_INTERVAL_S:
        return {"ok": True, "skipped": True, "reason": "rate_limited"}

    try:
        res = await asyncio.to_thread(_health_blocking, timeout)
        return res
    finally:
        _last_health_ts = time.perf_counter()


async def send_test_email(to: Optional[Iterable[str]] = None, subject_prefix: str = "[Mailer Test] ") -> Dict:
    recipients = _normalize(to or (NOTIFY_TO or ([SMTP_USER] if SMTP_USER else [])))
    if not recipients:
        return {"ok": False, "error": "No recipients configured"}
    subj = _ascii_only(f"{subject_prefix}{SMTP_HOST}:{SMTP_PORT}")
    try:
        send_res = await send_email(subject=subj, to=recipients, html="", text="Consulta mailer plain-text test.")
    except Exception as e:
        send_res = {"ok": False, "error": repr(e)}
    # Don’t fail the endpoint just because health flaps
    try:
        health = await check_mailer()
    except Exception as e:
        health = {"ok": False, "error": repr(e)}
    ok = bool(isinstance(send_res, dict) and send_res.get("ok"))
    return {"send": send_res, "health": health, "ok": ok}
