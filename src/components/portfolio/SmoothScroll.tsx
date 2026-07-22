"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Mobile browsers resize the viewport live as the address bar collapses
// during scroll. ScrollTrigger's default reaction is to treat that as a
// resize and refresh() — recalculating pin start/end mid-gesture, which
// shows up as pinned sections (e.g. AchievementsBanner's card stack)
// jumping/overlapping on small scrolls. This opts out of that reaction.
ScrollTrigger.config({ ignoreMobileResize: true });

/* Global smooth scroll (Lenis) wired into GSAP ScrollTrigger.
   Honors prefers-reduced-motion by skipping smoothing entirely. */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (reduce || isMobile) return;          // native scroll on mobile — faster

    const lenis = new Lenis({
      duration: 0.65,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (window as any).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    // Framer Motion's useScroll() listens to the native window "scroll" event,
    // which Lenis already fires as it animates window.scrollTop — no manual
    // re-dispatch needed (doing so re-triggers Lenis's own native-scroll
    // listener and recurses infinitely).

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Pause Lenis while a modal/sheet locks the page so the overlay scrolls
    // natively and the background stays put (Radix sets data-scroll-locked).
    const syncLock = () => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    };
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    // In-page anchor links route through Lenis for smooth scrolling.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lockObserver.disconnect();
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);

  return null;
}
