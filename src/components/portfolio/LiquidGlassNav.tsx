import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
  /** Renders as a file-download link instead of an in-page anchor. */
  download?: boolean;
  /** Adds a small brand-green dot after the label (used for the primary CTA). */
  accent?: boolean;
}

interface LiquidGlassNavProps {
  items: NavItem[];
}

const LENS_HEIGHT = 44;
const LENS_EXTRA_WIDTH = 6;

const TRACK_CLASS = "flex items-center gap-0.5 p-1";
const ITEM_CLASS = "rounded-full px-4 py-1.5 text-[13px] font-medium whitespace-nowrap";

const SPRING = { type: "spring" as const, stiffness: 190, damping: 25, mass: 0.85 };
const REDUCED = { type: "tween" as const, duration: 0.15, ease: "easeOut" as const };

export function LiquidGlassNav({ items }: LiquidGlassNavProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  const [trackWidth, setTrackWidth] = useState(0);
  const [pointerIndex, setPointerIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lensTarget, setLensTarget] = useState({ x: 0, width: 0 });

  const displayIndex = pointerIndex ?? activeIndex;

  const measureTarget = useCallback((index: number) => {
    const el = itemRefs.current[index];
    const track = trackRef.current;
    if (!el || !track) return null;
    const elRect = el.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    return {
      x: elRect.left - trackRect.left - LENS_EXTRA_WIDTH / 2,
      width: elRect.width + LENS_EXTRA_WIDTH,
    };
  }, []);

  // Retarget the lens to whichever item is displayed (hover/focus wins, else active).
  useLayoutEffect(() => {
    const target = measureTarget(displayIndex);
    if (target) setLensTarget(target);
  }, [displayIndex, trackWidth, measureTarget]);

  // Remeasure on resize (only width matters — the lens is vertically centered by CSS).
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => setTrackWidth(track.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // Scroll-spy: this is an anchor nav (no router), so "active" tracks the
  // section currently in view — the lens rests there when nothing is hovered.
  useEffect(() => {
    const targets = items
      .map((item, index) => ({
        index,
        el: item.href.startsWith("#") ? document.querySelector(item.href) : null,
      }))
      .filter((t): t is { index: number; el: Element } => !!t.el);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = targets.find((t) => t.el === visible.target);
        if (match) setActiveIndex(match.index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((t) => observer.observe(t.el));
    return () => observer.disconnect();
  }, [items]);

  const transition = reducedMotion ? REDUCED : SPRING;

  return (
    <nav
      ref={(el) => {
        trackRef.current = el;
      }}
      onMouseLeave={() => setPointerIndex(null)}
      className={`liquid-nav-track relative hidden ${TRACK_CLASS} rounded-full border border-white/5 md:flex`}
      style={{ background: "oklch(0.97 0.003 250 / 0.04)" }}
    >
      {/* One persistent lens — only x/width animate, it's never remounted or keyed
          per item. Sits BEHIND the labels (z-1 vs z-2) — glass moves under crisp
          text, it doesn't cover it. */}
      {trackWidth > 0 && (
        <motion.div
          className="liquid-nav-lens pointer-events-none absolute z-1"
          style={{ top: "50%", y: "-50%", left: 0, height: LENS_HEIGHT }}
          animate={{ x: lensTarget.x, width: lensTarget.width }}
          transition={transition}
        />
      )}

      {items.map((item, index) => (
        <a
          key={item.label}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          href={item.href}
          download={item.download || undefined}
          data-active={index === displayIndex}
          onMouseEnter={() => setPointerIndex(index)}
          onFocus={() => setPointerIndex(index)}
          onBlur={() => setPointerIndex(null)}
          className={`relative z-2 flex items-center gap-1.5 transition-colors duration-200 focus-visible:outline-none ${
            index === displayIndex ? "text-white" : "text-white/60"
          } ${ITEM_CLASS}`}
        >
          {item.label}
          {item.accent && <span className="h-2 w-2 rounded-full bg-[#59B78C]" />}
        </a>
      ))}
    </nav>
  );
}
