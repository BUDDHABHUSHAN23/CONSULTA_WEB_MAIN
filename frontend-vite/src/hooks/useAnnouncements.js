// src/hooks/useAnnouncements.js
import { useEffect, useMemo, useState } from "react";
import { getPublicAnnouncements } from "../services/api";

const storageKey = (a) => `announce:${a.id}:v${a.version}`;

function isDismissed(a) {
  try {
    return localStorage.getItem(storageKey(a)) === "1";
  } catch { return false; }
}

function setDismissed(a) {
  try {
    localStorage.setItem(storageKey(a), "1");
  } catch {}
}

export default function useAnnouncements({ limit = 3, auto = true } = {}) {
  const [ann, setAnn] = useState([]);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auto) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPublicAnnouncements(limit);
        const list = Array.isArray(data) ? data : [];
        // Deduplicate by id; keep highest version per id
        const latestById = new Map();
        for (const a of list) {
          const prev = latestById.get(a.id);
          if (!prev || (a.version || 1) > (prev.version || 1)) latestById.set(a.id, a);
        }
        const deduped = Array.from(latestById.values());
        // Stable sort: priority asc, updated_at desc
        deduped.sort((x, y) => (x.priority ?? 999) - (y.priority ?? 999) || new Date(y.updated_at) - new Date(x.updated_at));
        setAnn(deduped);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [limit, auto]);

  const visible = useMemo(() => ann.filter((a) => !isDismissed(a)), [ann]);

  const dismiss = (id) => {
    const a = ann.find((x) => x.id === id);
    if (a) {
      setDismissed(a);
      // trigger recompute without a full refetch
      setAnn((prev) => prev.slice());
    }
  };

  return { announcements: visible, loading, error, dismiss, refetch: async () => {
    setLoading(true);
    try {
      const data = await getPublicAnnouncements(limit);
      const list = Array.isArray(data) ? data : [];
      const latestById = new Map();
      for (const a of list) {
        const prev = latestById.get(a.id);
        if (!prev || (a.version || 1) > (prev.version || 1)) latestById.set(a.id, a);
      }
      const deduped = Array.from(latestById.values());
      deduped.sort((x, y) => (x.priority ?? 999) - (y.priority ?? 999) || new Date(y.updated_at) - new Date(x.updated_at));
      setAnn(deduped);
    } finally { setLoading(false); }
  }};
  
}
