const BASE = import.meta.env.VITE_ERP_API ?? "http://localhost:3001";

async function j(r) {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

export async function devLogin({ email, name, role, id }) {
  const r = await fetch(`${BASE}/api/dev-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, role, id }),
  });
  return j(r);
}

export async function createExpense(token, fields, files = []) {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
  files.forEach(f => fd.append("files", f));

  const r = await fetch(`${BASE}/api/expenses`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd, // let browser set multipart boundary
  });
  return j(r);
}

export async function attachFromUrl(token, id, urls = []) {
  const r = await fetch(`${BASE}/api/expenses/${id}/attachments-from-url`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  });
  return j(r);
}

export async function addAttachments(token, id, files = []) {
  const fd = new FormData();
  files.forEach(f => fd.append("files", f));
  const r = await fetch(`${BASE}/api/expenses/${id}/attachments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  return j(r);
}

export async function submitExpense(token, id) {
  const r = await fetch(`${BASE}/api/expenses/${id}/submit`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return j(r);
}

export async function myExpenses(token, status) {
  const r = await fetch(
    `${BASE}/api/v1/expenses/my${status ? `?status=${encodeURIComponent(status)}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return j(r);
}

export async function pendingQueue(token) {
  const r = await fetch(`${BASE}/api/expenses/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return j(r);
}

export async function approveExpense(token, id, comment = "") {
  const r = await fetch(`${BASE}/api/expenses/${id}/approve`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  return j(r);
}

export async function rejectExpense(token, id, comment = "") {
  const r = await fetch(`${BASE}/api/expenses/${id}/reject`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  return j(r);
}

export async function attachmentUrl(token, expenseId, attId) {
  const r = await fetch(`${BASE}/api/expenses/${expenseId}/attachments/${attId}/url`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return j(r); // { url, expiresIn }
}
