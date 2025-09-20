// All ERP API calls + token handling
import { loadSession, saveSession } from "../lib/terSession";

// --- BASE (robust; strips trailing slash; falls back in dev) ---
const raw = (import.meta.env.VITE_ERP_API || "").trim();
const BASE = (raw && raw.replace(/\/+$/, "")) || "http://localhost:3001";

// --- session helpers (new shape = { erp: { token, user } }) ---
function getErpToken() {
  const s = loadSession() || {};
  // read new shape, fall back to old flat { token } if it exists
  return s.erp?.token || s.token || "";
}
function setErpSession(token, user) {
  const s = loadSession() || {};
  s.erp = { token, user };
  saveSession(s);
}

// shared header guard (prevents "Bearer undefined")
function authHeader(token) {
  const t = (token ?? getErpToken())?.trim();
  if (!t) throw new Error("No ERP token – please sign in first.");
  return { Authorization: `Bearer ${t}` };
}

// tiny JSON helper
async function j(r) {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// ========= AUTH =========
export async function devLogin({ email, name, role, id }) {
  const r = await fetch(`${BASE}/api/dev-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, role, id }),
  });
  const data = await j(r);
  setErpSession(data.token, data.user);      // persist to session
  return data;
}

// For pages that need a token but don’t want to pass it around
export async function ensureErpToken(devUserIfMissing) {
  let t = getErpToken();
  if (t) return t;
  if (!devUserIfMissing) throw new Error("No ERP token – please sign in first.");
  const { token } = await devLogin(devUserIfMissing);
  return token;
}

// ========= EXPENSES =========
export async function createExpense(token, fields, files = []) {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
  (files || []).forEach((f) => fd.append("files", f));

  const r = await fetch(`${BASE}/api/expenses`, {
    method: "POST",
    headers: authHeader(token),
    body: fd,
  });
  return j(r);
}

export async function attachFromUrl(token, id, urls = []) {
  const r = await fetch(`${BASE}/api/expenses/${id}/attachments-from-url`, {
    method: "POST",
    headers: { ...authHeader(token), "Content-Type": "application/json" },
    body: JSON.stringify({ urls }),
  });
  return j(r);
}

export async function addAttachments(token, id, files = []) {
  const fd = new FormData();
  (files || []).forEach((f) => fd.append("files", f));

  const r = await fetch(`${BASE}/api/expenses/${id}/attachments`, {
    method: "POST",
    headers: authHeader(token),
    body: fd,
  });
  return j(r);
}

export async function submitExpense(token, id) {
  const r = await fetch(`${BASE}/api/expenses/${id}/submit`, {
    method: "POST",
    headers: authHeader(token),
  });
  return j(r);
}

export async function myExpenses(token, status) {
  const r = await fetch(
    `${BASE}/api/expenses/my${status ? `?status=${encodeURIComponent(status)}` : ""}`,
    { headers: authHeader(token) }
  );
  return j(r);
}

export async function pendingQueue(token) {
  const r = await fetch(`${BASE}/api/expenses/pending`, {
    headers: authHeader(token),
  });
  return j(r);
}

export async function approveExpense(token, id, comment = "") {
  const r = await fetch(`${BASE}/api/expenses/${id}/approve`, {
    method: "POST",
    headers: { ...authHeader(token), "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  return j(r);
}

export async function rejectExpense(token, id, comment = "") {
  const r = await fetch(`${BASE}/api/expenses/${id}/reject`, {
    method: "POST",
    headers: { ...authHeader(token), "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  return j(r);
}

export async function attachmentUrl(token, expenseId, attId) {
  const r = await fetch(`${BASE}/api/expenses/${expenseId}/attachments/${attId}/url`, {
    headers: authHeader(token),
  });
  return j(r);
}
