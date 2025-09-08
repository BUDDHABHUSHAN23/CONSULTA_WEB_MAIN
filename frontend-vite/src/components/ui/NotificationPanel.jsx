import React, { useEffect } from "react";
import { CheckCircle, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { useNotifications } from "./NotificationsProvider";

function IconByType({ type }) {
  if (type === "success") return <CheckCircle className="w-4 h-4 text-green-600" />;
  if (type === "error") return <XCircle className="w-4 h-4 text-red-600" />;
  if (type === "warning") return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
  return <Info className="w-4 h-4 text-blue-600" />;
}

export default function NotificationPanel() {
  const { items, remove, markRead, markAllRead, clear, isOpen, setIsOpen } = useNotifications();

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  return (
    <div className={`fixed z-[2000] ${isOpen ? "pointer-events-auto" : "pointer-events-none"} inset-0`}>
      {/* click-away */}
      <div className={`absolute inset-0 ${isOpen ? "block" : "hidden"}`} onClick={() => setIsOpen(false)} />

      {/* panel */}
      <div className={`absolute inset-x-3 sm:inset-auto sm:right-4 ${isOpen ? "" : "hidden"}`} style={{ top: 'calc(var(--ann-bar-h, 0px) + 120px)' }}>
        <div role="dialog" aria-modal="true" className="w-full sm:w-[360px] max-w-[92vw] bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200/70">
            <div className="text-sm font-semibold text-gray-900">Notifications</div>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button className="text-xs text-gray-600 hover:text-gray-900" onClick={markAllRead}>Mark all read</button>
              )}
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)} aria-label="Close"><X className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="max-h-[60vh] overflow-auto">
            {items.length === 0 ? (
              <div className="px-4 py-8 text-sm text-gray-500">You're all caught up.</div>
            ) : (
              items.map((n) => (
                <div key={n.id} className={`px-4 py-3 flex gap-3 items-start ${n.read ? "bg-white" : "bg-blue-50/40"}`}>
                  <div className="mt-0.5"><IconByType type={n.type} /></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{n.title}</div>
                    {n.description && <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">{n.description}</div>}
                    {n.href && (
                      <a href={n.href} className="inline-block mt-2 text-xs text-blue-600 hover:underline">Open</a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!n.read && (
                      <button className="text-xs text-gray-600 hover:text-gray-900" onClick={() => markRead(n.id)}>Read</button>
                    )}
                    <button className="text-xs text-gray-400 hover:text-gray-700" onClick={() => remove(n.id)}>Dismiss</button>
                  </div>
                </div>
              ))
            )}
          </div>
          {items.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200/70 bg-gray-50/60">
              <button className="text-xs text-gray-600 hover:text-red-600" onClick={clear}>Clear all</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
