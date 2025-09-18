import React, { createContext, useContext, useMemo, useRef, useState, useCallback } from "react";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const idRef = useRef(0);
  const [items, setItems] = useState([]); // {id, title, description, type, createdAt, read}
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((n) => {
    idRef.current += 1;
    const item = {
      id: idRef.current,
      title: n.title || "Notification",
      description: n.description || "",
      type: n.type || "info", // info | success | error | warning
      createdAt: new Date(),
      read: false,
      href: n.href || null,
    };
    setItems((prev) => {
      // prevent exact-duplicate spam based on title+description within recent 20
      const key = (x) => `${x.title}::${x.description}`;
      const k = key(item);
      if (prev.slice(0, 20).some((x) => key(x) === k)) return prev;
      return [item, ...prev].slice(0, 50);
    });
    setIsOpen(true);
    return item.id;
  }, []);

  const markRead = useCallback((id) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, read: true } : x)));
  }, []);

  const markAllRead = useCallback(() => {
    setItems((prev) => prev.map((x) => ({ ...x, read: true })));
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((x) => x.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const unreadCount = items.filter((x) => !x.read).length;

  const value = useMemo(() => ({ items, add, remove, clear, markRead, markAllRead, unreadCount, isOpen, setIsOpen }), [items, add, remove, clear, markRead, markAllRead, unreadCount, isOpen]);

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
