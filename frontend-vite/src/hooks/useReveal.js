import { useEffect, useRef, useState } from "react";

export default function useReveal(threshold = 0.2, rootMargin = "0px") {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold, rootMargin }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return { ref, show };
}


