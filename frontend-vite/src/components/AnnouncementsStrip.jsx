import React, { useEffect, useLayoutEffect, useRef } from "react";
import useAnnouncements from "../hooks/useAnnouncements";
import AnnouncementBar from "./AnnouncementBar";

export default function AnnouncementsStrip({ limit = 3, onVisible }) {
  const { announcements, loading, error, dismiss } = useAnnouncements({ limit });
  const wrapRef = useRef(null);

  // measure on mount / update / resize
  useLayoutEffect(() => {
    const el = wrapRef.current;
    const setVar = () => {
      const h = el?.offsetHeight || 0;
      document.documentElement.style.setProperty("--ann-bar-h", `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    if (el) ro.observe(el);
    const onResize = () => setVar();
    window.addEventListener("resize", onResize);
    return () => { ro.disconnect(); window.removeEventListener("resize", onResize); };
  }, [announcements.length]);

  useEffect(() => {
    if (!loading && announcements.length > 0) onVisible?.(announcements);
  }, [loading, announcements, onVisible]);

  if (error || (loading && announcements.length === 0) || announcements.length === 0) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-x-0 top-0 z-[1000] w-full"
    >
      {announcements.map((a, index) => (
        <div key={`${a.id}-v${a.version}`} className="announcement-fade">
          <AnnouncementBar item={a} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  );
}