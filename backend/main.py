# app/main.py
from __future__ import annotations

import os
import sys
import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# --- Load env ASAP (before importing modules that read env) ---
ROOT = Path(__file__).parent
load_dotenv(ROOT / ".env")

# --- Logging: single handler, consistent levels ---
root_level = os.getenv("LOG_LEVEL", "INFO").upper()
mailer_level = os.getenv("MAILER_LOG_LEVEL", root_level).upper()
aiosmtp_debug = os.getenv("AIOSMTP_DEBUG", "0") == "1"

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter(
    "%(asctime)s %(levelname)s %(name)s: %(message)s", "%Y-%m-%d %H:%M:%S"
))

root_logger = logging.getLogger()
root_logger.handlers[:] = [handler]
root_logger.setLevel(getattr(logging, root_level, logging.INFO))
logging.getLogger("mailer").setLevel(getattr(logging, mailer_level, logging.INFO))
logging.getLogger("aiosmtplib").setLevel(logging.DEBUG if aiosmtp_debug else logging.WARNING)

# Now it's safe to import app modules which read env
from app.routes import router as api_router  # noqa: E402
from app.db import db  # noqa: E402


def make_app() -> FastAPI:
    app = FastAPI(
        title="Consulta API",
        version="1.0.0",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
    )

    # --- CORS (single middleware) ---
    # Combine FRONTEND_URL + CORS_ORIGINS (comma-separated)
    cors_from_env = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]
    frontend = os.getenv("FRONTEND_URL", "").strip()
    origins = set(cors_from_env)
    if frontend:
        origins.add(frontend)
    # sensible defaults for local dev if none provided
    if not origins:
        origins = {"http://localhost:5173", "http://127.0.0.1:5173"}

    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(origins),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router)

    @app.on_event("startup")
    async def _ensure_indexes():
        await db.contacts.create_index("created_at")
        await db.announcements.create_index([("enabled", 1), ("starts_at", 1), ("ends_at", 1), ("priority", 1)])
        await db.announcements.create_index([("updated_at", -1)])


    @app.get("/healthz")
    def healthz():
        return {"ok": True}

    return app


app = make_app()
