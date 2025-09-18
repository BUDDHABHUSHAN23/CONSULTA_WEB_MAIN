
// src/config/env.js
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Always load the .env from the project root (two levels up from this file)
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const toArray = (v = "") => v.split(",").map(s => s.trim()).filter(Boolean);

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5051),

  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/consulta_erp",
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-change-me",
  CORS_ORIGINS: toArray(process.env.CORS_ORIGINS || "http://localhost:5173"),

  // S3-compatible storage (MinIO dev / R2 prod)
  STORAGE_VENDOR: (process.env.STORAGE_VENDOR || "minio").toLowerCase(),
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_REGION: process.env.S3_REGION || "us-east-1",
  S3_BUCKET: process.env.S3_BUCKET || "consulta-ter",
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_FORCE_PATH_STYLE: (process.env.S3_FORCE_PATH_STYLE || "true").toLowerCase() === "true",
};

