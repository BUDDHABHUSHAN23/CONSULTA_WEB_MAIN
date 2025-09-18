// src/hooks/useReveal.js
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reveal-on-view hook (JS version).
 * @param {number|number[]} threshold
 * @param {string} rootMargin
 * @param {boolean} [once=true]
 * @returns {{ ref: (node: Element|null) => void, show: boolean, visible: boolean }}
 */
export default function useReveal(threshold = 0.2, rootMargin = "0px", once = true) {
  const [show, setShow] = useState(false);
  const obsRef = useRef(null);

  // callback ref so we re-attach when the actual node mounts (skeleton -> grid swap, etc.)
  const ref = useCallback(
    (node) => {
      // clean up previous observer
      if (obsRef.current) {
        obsRef.current.disconnect();
        obsRef.current = null;
      }
      if (!node) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShow(true);
            if (once) {
              obs.disconnect();
              obsRef.current = null;
            }
          } else if (!once) {
            setShow(false);
          }
        },
        { threshold, rootMargin }
      );

      obs.observe(node);
      obsRef.current = obs;
    },
    [threshold, rootMargin, once]
  );

  useEffect(() => () => obsRef.current?.disconnect(), []);

  // alias to keep old code that expects `visible`
  return { ref, show, visible: show };
}
