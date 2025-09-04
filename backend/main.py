from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
from app.routes import router as api_router

ROOT = Path(__file__).parent
load_dotenv(ROOT / ".env")

def make_app() -> FastAPI:
  app = FastAPI(title="Consulta API", version="1.0.0",
                docs_url="/api/docs", redoc_url="/api/redoc", openapi_url="/api/openapi.json")
  origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
  app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
  )
  app.include_router(api_router)
  return app

app = make_app()


image.png