import { useEffect, useRef, useState } from "react";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number towards `target` whenever `target` changes.
 * Hand-rolled on requestAnimationFrame so it has no library surface to break.
 *
 * decimals = 0 -> 58, 59, 60 ...
 * decimals = 3 -> 0.577
 */
export default function useCountUp(target, { duration = 900, decimals = 0 } = {}) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const delta = target - from;

    if (delta === 0) return undefined;

    // Respect the user's motion preference: jump straight there.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      fromRef.current = target;
      setValue(target);
      return undefined;
    }

    const started = performance.now();

    const step = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const next = from + delta * easeOut(progress);
      setValue(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = target;
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return Number(value).toFixed(decimals);
}
