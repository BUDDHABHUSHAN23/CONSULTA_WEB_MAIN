import os
from typing import Iterable
from email.message import EmailMessage

import aiosmtplib

SMTP_HOST = os.getenv("SMTP_HOST", "localhost")
SMTP_PORT = int(os.getenv("SMTP_PORT", "25"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
SMTP_FROM = os.getenv("SMTP_FROM", "no-reply@localhost")
# Comma-separated list in .env
NOTIFY_TO = [e.strip() for e in os.getenv("NOTIFY_TO", "").split(",") if e.strip()]

async def send_email(subject: str, to: Iterable[str], html: str, text: str | None = None):
    """
    Sends an email via SMTP. Uses STARTTLS automatically for ports 25/587.
    Non-blocking (awaited by BackgroundTasks in route).
    """
    if not to:
        return

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = SMTP_FROM
    msg["To"] = ", ".join(to)
    msg.set_content(text or " ")
    msg.add_alternative(html, subtype="html")

    starttls = {"start_tls": True} if SMTP_PORT in (25, 587) else {}
    # If creds not set, try unauthenticated SMTP (useful for local dev)
    await aiosmtplib.send(
        msg,
        hostname=SMTP_HOST,
        port=SMTP_PORT,
        username=SMTP_USER or None,
        password=SMTP_PASS or None,
        **starttls,
    )

def contact_html(c: dict) -> str:
    """Simple HTML for contact notification."""
    return f"""
    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;padding:12px">
      <h2 style="margin:0 0 8px">New Website Enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>{c.get('name')}</td></tr>
        <tr><td><b>Email</b></td><td>{c.get('email')}</td></tr>
        <tr><td><b>Phone</b></td><td>{c.get('phone')}</td></tr>
        <tr><td><b>Company</b></td><td>{c.get('company') or '-'}</td></tr>
        <tr><td><b>Industry</b></td><td>{c.get('industry') or '-'}</td></tr>
        <tr><td valign="top"><b>Message</b></td>
            <td>{(c.get('message') or '').replace('\n','<br/>')}</td></tr>
      </table>
      <p style="color:#64748b;font-size:12px;margin-top:12px">Source: Website · Auto-generated</p>
    </div>
    """
