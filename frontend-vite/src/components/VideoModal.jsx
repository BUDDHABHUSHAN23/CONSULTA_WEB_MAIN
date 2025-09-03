import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Volume2, VolumeX, Play } from "lucide-react";

const devDebug = (msg, e) => {
  if (import.meta?.env?.DEV) console.debug(msg, e);
};

export default function VideoModal({ open, onClose, src, poster, title = "Intro", id = "video-modal" }) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const closeBtnRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [loading, setLoading] = useState(true);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; }
  }, []);

  // ESC + media keys
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();

      const v = videoRef.current;
      if (!v) return;

      // Space/K => play/pause
      if (e.key === " " || e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (v.paused) v.play().catch((err) => devDebug("Play failed", err));
        else v.pause();
      }
      // M => mute
      if (e.key.toLowerCase() === "m") {
        v.muted = !v.muted; setMuted(v.muted);
      }
      // F => fullscreen
      if (e.key.toLowerCase() === "f") {
        const doc = document;
        const isFS = doc.fullscreenElement || doc.webkitFullscreenElement;
        if (!isFS) {
          if (frameRef.current?.requestFullscreen) frameRef.current.requestFullscreen().catch((err) => devDebug("Enter FS failed", err));
          // @ts-ignore
          else if (frameRef.current?.webkitRequestFullscreen) frameRef.current.webkitRequestFullscreen();
        } else {
          if (doc.exitFullscreen) doc.exitFullscreen().catch((err) => devDebug("Exit FS failed", err));
          // @ts-ignore
          else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
        }
      }
      // Arrows => seek
      if (e.key === "ArrowRight") {
        try { v.currentTime = Math.min((v.duration || 0), v.currentTime + 5); } catch (err) { void err; }
      }
      if (e.key === "ArrowLeft") {
        try { v.currentTime = Math.max(0, v.currentTime - 5); } catch (err) { void err; }
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock scroll + try autoplay + focus (capture ref for cleanup)
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const v = videoRef.current;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 10);

    if (v) {
      setLoading(true);
      v.play()
        .then(() => setPlaying(true))
        .catch((err) => devDebug("Autoplay blocked", err));
    }

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      if (v) { try { v.pause(); } catch (err) { void err; } }
      setPlaying(false);
      setReady(false);
      setLoading(true);
    };
  }, [open]);

  // Wire up video events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => { setReady(true); setLoading(false); };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onPlaying = () => setLoading(false);
    const onVolume = () => setMuted(v.muted);

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("canplay", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("volumechange", onVolume);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("canplay", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("volumechange", onVolume);
    };
  }, []);

  // Auto-hide UI chrome
  useEffect(() => {
    if (!open) return;
    let hideTimer;
    const handleMove = () => {
      setShowUI(true);
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setShowUI(false), 2000);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchstart", handleMove, { passive: true });
    handleMove();
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchstart", handleMove);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [open]);

  const springy = prefersReducedMotion
    ? { duration: 0.18, ease: "easeOut" }
    : { type: "spring", stiffness: 220, damping: 28, mass: 0.9 };

  if (typeof document === "undefined") return null;

  const onSurfaceClick = (e) => {
    if (e.target.closest?.("[data-chrome]")) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch((err) => devDebug("Play failed", err));
    else v.pause();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            onClick={onClose} aria-hidden="true"
          />
          {/* Center layer */}
          <motion.div
            className="fixed inset-0 z-[81] grid place-items-center p-4 sm:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            role="dialog" aria-modal="true" aria-label={`${title} video`} id={id}
          >
            {/* Frame */}
            <motion.div
              ref={frameRef}
              className="w-[min(92vw,1100px)] aspect-video rounded-[18px] overflow-hidden shadow-[0_30px_120px_-35px_rgba(0,0,0,0.6)] ring-1 ring-black/10 bg-black relative"
              initial={{ scale: 0.97, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1, transition: springy }}
              exit={{ scale: 0.985, y: 6, opacity: 0, transition: { duration: 0.16 } }}
              onClick={onSurfaceClick}
            >
              {/* Sheen */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
              </div>

              {/* Video */}
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                controls={false}
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
                onDoubleClick={() => {
                  const doc = document;
                  const isFS = doc.fullscreenElement || doc.webkitFullscreenElement;
                  if (!isFS) {
                    if (frameRef.current?.requestFullscreen) frameRef.current.requestFullscreen().catch((err) => devDebug("Enter FS failed", err));
                    // @ts-ignore
                    else if (frameRef.current?.webkitRequestFullscreen) frameRef.current.webkitRequestFullscreen();
                  } else {
                    if (doc.exitFullscreen) doc.exitFullscreen().catch((err) => devDebug("Exit FS failed", err));
                    // @ts-ignore
                    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
                  }
                }}
              />

              {/* Loading */}
              <AnimatePresence>
                {(loading && !ready) && (
                  <motion.div
                    key="loading"
                    className="absolute inset-0 grid place-items-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
                      <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span className="text-white/80 text-sm">Loading…</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Big Play */}
              <AnimatePresence>
                {!playing && ready && (
                  <motion.button
                    key="bigplay"
                    onClick={() => {
                      const v = videoRef.current; if (!v) return;
                      v.play().catch((err) => devDebug("Play failed", err));
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-black/90 shadow-lg ring-1 ring-black/10 w-16 h-16 grid place-items-center"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
                    title="Play" aria-label="Play" data-chrome
                  >
                    <Play size={24} className="translate-x-[1px]" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Top bar */}
              <AnimatePresence>
                {showUI && (
                  <motion.div
                    key="topbar"
                    className="absolute top-0 left-0 right-0 p-2 sm:p-3 flex items-center justify-between"
                    initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
                    data-chrome
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur">
                      <span className="text-white/90 text-sm font-medium truncate max-w-[48vw] sm:max-w-[50ch]">
                        {title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { const v = videoRef.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); }}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 text-white shadow ring-1 ring-white/10 backdrop-blur transition"
                        aria-label={muted ? "Unmute" : "Mute"} title={muted ? "Unmute" : "Mute"}
                        data-chrome
                      >
                        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                      <button
                        onClick={() => {
                          const el = frameRef.current; const doc = document;
                          const isFS = doc.fullscreenElement || doc.webkitFullscreenElement;
                          if (!isFS) {
                            if (el?.requestFullscreen) el.requestFullscreen().catch((err) => devDebug("Enter FS failed", err));
                            // @ts-ignore
                            else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
                          } else {
                            if (doc.exitFullscreen) doc.exitFullscreen().catch((err) => devDebug("Exit FS failed", err));
                            // @ts-ignore
                            else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
                          }
                        }}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 text-white shadow ring-1 ring-white/10 backdrop-blur transition"
                        aria-label="Toggle Fullscreen" title="Fullscreen (F)" data-chrome
                      >
                        <Maximize2 size={18} />
                      </button>
                      <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white text-black shadow ring-1 ring-black/10 transition"
                        aria-label="Close video" title="Close (Esc)" data-chrome
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom gradient */}
              <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
