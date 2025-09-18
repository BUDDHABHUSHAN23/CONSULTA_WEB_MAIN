// src/middlewares/auth.js
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // { id, email, name, role }
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(roles = []) {
  const allow = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthenticated" });
    if (!allow.length || allow.includes(req.user.role)) return next();
    return res.status(403).json({ error: "Forbidden" });
  };
}

// Dev-only helper to mint tokens without a Users table yet.
export function devLogin(req, res) {
  if (env.NODE_ENV === "production") {
    return res.status(404).json({ error: "Not available in production" });
  }
  const { email = "employee@consulta.in", name = "Dev User", role = "employee", id = "u-dev-1" } =
    req.body || {};
  const token = jwt.sign({ id, email, name, role }, env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id, email, name, role } });
}
