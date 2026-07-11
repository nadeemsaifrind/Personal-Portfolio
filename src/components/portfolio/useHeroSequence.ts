import { useEffect, useRef, useState } from "react";

/**
 * Watches a section's viewport visibility. `entry` increments every time the
 * section transitions from out-of-view to in-view (including the initial
 * page load), so consumers can restart their own animations on each entrance.
 */
export function useSectionEntry() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [entry, setEntry] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([intersection]) => {
        const isIntersecting = !!intersection?.isIntersecting;
        setVisible(isIntersecting);
        if (isIntersecting) setEntry((n) => n + 1);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { sectionRef, visible, entry };
}

/**
 * Steps through `length` frames once per `stepMs` while `visible` is true,
 * restarting from 0 every time `entry` changes (i.e. each time the section
 * is (re-)entered). When `loop` is false it freezes on the last step instead
 * of wrapping back to the start.
 */
export function useStepSequence(length: number, stepMs: number, visible: boolean, entry: number, loop: boolean) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setStep(loop ? 0 : length - 1);
      return;
    }

    setStep(0);
    const id = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= length) {
          if (loop) return 0;
          clearInterval(id);
          return s;
        }
        return next;
      });
    }, stepMs);
    return () => clearInterval(id);
  }, [visible, entry, length, stepMs, loop]);

  return step;
}
