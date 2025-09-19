const KEY = "ter.session";

export function saveSession(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}
export function loadSession() {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
export function clearSession() {
  localStorage.removeItem(KEY);
}

export const terSession = {
  save: saveSession,
  load: loadSession,
  clear: clearSession,
};

export default terSession;