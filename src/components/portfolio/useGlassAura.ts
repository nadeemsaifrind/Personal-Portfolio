import { useCallback, useRef, useState } from "react";

// Shared mechanics behind the two "glass aura" spots (Hero CTAs, venture
// list) that reuse the navbar's liquid-glass lens material: one persistent
// element measured off real DOM refs, sprung to whichever item is
// hovered/focused, and faded out (not parked on a default item — these
// aren't nav links with an "active route") when nothing is hovered.

interface AuraTarget {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useGlassAura(padding: number) {
  const trackRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [target, setTarget] = useState<AuraTarget>({ x: 0, y: 0, width: 0, height: 0 });

  const measure = useCallback(
    (index: number) => {
      const el = itemRefs.current[index];
      const track = trackRef.current;
      if (!el || !track) return;
      const elRect = el.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      setTarget({
        x: elRect.left - trackRect.left - padding,
        y: elRect.top - trackRect.top - padding,
        width: elRect.width + padding * 2,
        height: elRect.height + padding * 2,
      });
    },
    [padding],
  );

  const show = useCallback(
    (index: number) => {
      setHoverIndex(index);
      measure(index);
    },
    [measure],
  );

  const hide = useCallback(() => setHoverIndex(null), []);

  const setItemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  return { trackRef, target, hoverIndex, show, hide, setItemRef };
}
