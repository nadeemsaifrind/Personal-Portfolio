import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChatCircleText,
  DotsThree,
  LinkedinLogo,
  X,
} from "@phosphor-icons/react";
import heroBgImg from "@/assets/hero-bg.png";
import heroCutoutImg from "@/assets/hero-cutout.png";
import { MODES, PERSONAL, CASE_STUDIES, type ModeId, type CaseStudy } from "@/lib/portfolio-data";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { ServiceStack } from "@/components/portfolio/ServiceStack";
import { MagneticButton, RevealText } from "@/components/portfolio/sohub";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${PERSONAL.name} — ${PERSONAL.title}` },
      { name: "description", content: PERSONAL.description },
      { name: "author", content: PERSONAL.name },
      { property: "og:title", content: `${PERSONAL.name} — ${PERSONAL.title}` },
      { property: "og:description", content: PERSONAL.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.nadeemsaif.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${PERSONAL.name} — ${PERSONAL.title}` },
      { name: "twitter:description", content: PERSONAL.description },
    ],
    links: [{ rel: "canonical", href: "https://www.nadeemsaif.com/" }],
  }),
  component: Index,
});

/* ─── Wheel constants ────────────────────────────────────────────────── */
const WHEEL_INTERVAL = 4200;
const ITEM_H  = 52;
const VISIBLE = 5;
const PAD     = Math.floor(VISIBLE / 2);
const N       = MODES.length;
const REEL    = Array.from({ length: N * 3 }, (_, i) => MODES[i % N]);
const INIT_IDX = N;

const NAV_LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

function Index() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [wheelIdx,     setWheelIdx]     = useState(INIT_IDX);
  const [instant,      setInstant]      = useState(false);
  const [cutoutVisible, setCutoutVisible] = useState(false);
  const [overviewOpen,  setOverviewOpen]  = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    let triggered = false;

    const onFirstScroll = () => {
      if (triggered) return;
      triggered = true;

      // Stop lenis immediately so the page doesn't move at all
      const lenis = (window as any).__lenis;
      if (lenis) lenis.stop();

      setCutoutVisible(true);

      // Cutout animation is 1.4s — give it a touch of extra breathing room
      setTimeout(() => {
        if (lenis) lenis.start();
      }, 1600);

      window.removeEventListener("wheel",     onFirstScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener("touchmove", onFirstScroll, { capture: true } as EventListenerOptions);
    };

    window.addEventListener("wheel",     onFirstScroll, { capture: true, passive: true });
    window.addEventListener("touchmove", onFirstScroll, { capture: true, passive: true });

    return () => {
      window.removeEventListener("wheel",     onFirstScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener("touchmove", onFirstScroll, { capture: true } as EventListenerOptions);
      // Safety: ensure lenis isn't left stopped if component unmounts mid-lock
      (window as any).__lenis?.start();
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (pausedRef.current) return;
      setWheelIdx(p => p + 1);
    }, WHEEL_INTERVAL);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (wheelIdx >= N * 2) {
      setInstant(true);
      setWheelIdx(w => w - N);
      requestAnimationFrame(() => setInstant(false));
    } else if (wheelIdx < N) {
      setInstant(true);
      setWheelIdx(w => w + N);
      requestAnimationFrame(() => setInstant(false));
    }
  }, [wheelIdx]);

  const activeModeIdx = ((wheelIdx % N) + N) % N;
  const activeMode    = MODES[activeModeIdx].id as ModeId;

  const pickMode = (id: ModeId) => {
    const pos  = MODES.findIndex(m => m.id === id);
    if (pos < 0) return;
    const best = [0, N, N * 2]
      .map(o => o + pos)
      .reduce((a, b) => Math.abs(b - wheelIdx) < Math.abs(a - wheelIdx) ? b : a);
    setWheelIdx(best);
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 7000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip selection:bg-ink selection:text-white">

      {/* ══ NAV (unchanged) ════════════════════════════════════════════════ */}
      <motion.header
        className="fixed top-0 left-0 z-50 flex w-full items-start justify-between px-4 py-4 md:px-8 lg:px-12 lg:py-8 pointer-events-none"
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#top"
          className="pointer-events-auto block select-none text-[26px] font-black lowercase tracking-[-0.06em] lg:text-[38px]"
        >
          nadeem<span className="text-primary">.</span>
        </a>

        <div className="pointer-events-auto flex items-center gap-2.5 lg:gap-3">
          <a
            href="#contact"
            className="group hidden items-center rounded-full bg-foreground/6 p-1.5 pl-8 text-ink transition-transform duration-500 hover:scale-105 md:flex"
          >
            <span className="mr-5 text-base font-semibold uppercase tracking-tight">
              Let's talk
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface">
              <ChatCircleText size={20} weight="bold" className="transition-transform duration-500 group-hover:-translate-y-8" />
              <ChatCircleText size={20} weight="bold" className="absolute translate-y-8 transition-transform duration-500 group-hover:translate-y-0" />
            </span>
          </a>

          <button
            onClick={() => setMobileOpen(true)}
            className="group flex items-center rounded-full bg-ink p-1.5 pl-8 text-white transition-transform duration-500 hover:scale-105"
            aria-label="Open menu"
          >
            <span className="mr-5 text-base font-semibold uppercase tracking-tight">Menu</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8">
              <DotsThree size={28} weight="bold" className="transition-transform duration-500 group-hover:rotate-90" />
            </span>
          </button>
        </div>
      </motion.header>

      {/* ══ MOBILE SHEET (unchanged) ════════════════════════════════════════ */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-80 flex flex-col bg-background border-l border-border [&>button]:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"
            aria-label="Close menu"
          >
            <X size={16} weight="bold" />
          </button>
          <div className="mt-6 mb-2">
            <p className="text-2xl font-bold tracking-tightest">{PERSONAL.name}</p>
            <p className="text-sm text-muted-foreground mt-1">{PERSONAL.title}</p>
          </div>
          <nav className="flex flex-col gap-1 mt-6">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // prevent lenis doc handler from double-firing
                  setMobileOpen(false);
                  setTimeout(() => {
                    const el = document.querySelector(item.href);
                    if (!el) return;
                    const lenis = (window as any).__lenis;
                    if (lenis) lenis.scrollTo(el, { offset: -80 });
                    else el.scrollIntoView({ behavior: "smooth" });
                  }, 320);
                }}
                className="rounded-2xl px-3 py-3 text-4xl font-semibold tracking-tight text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            {/* No href so lenis doc-handler doesn't fire; we do it manually */}
            <MagneticButton
              variant="primary"
              className="w-full justify-between"
              onClick={() => {
                setMobileOpen(false);
                setTimeout(() => {
                  const el = document.querySelector("#contact");
                  if (!el) return;
                  const lenis = (window as any).__lenis;
                  if (lenis) lenis.scrollTo(el, { offset: -80 });
                  else el.scrollIntoView({ behavior: "smooth" });
                }, 320);
              }}
            >
              Hire me
            </MagneticButton>
          </div>
        </SheetContent>
      </Sheet>

      <main id="top">

        {/* ══ HERO ════════════════════════════════════════════════════════ */}
        <div
          className="pt-20 lg:pt-24 px-2.5 sm:px-4 md:px-5 lg:px-7"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <div
            className="relative rounded-lg overflow-hidden"
            style={{ height: "58vh", minHeight: "400px", maxHeight: "680px" }}
          >
            {/* Background image */}
            <img
              src={heroBgImg}
              alt=""
              aria-hidden
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />

            {/* Dual-vignette overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  "linear-gradient(to right,",
                  "  rgba(0,0,0,0.97) 0%,",
                  "  rgba(0,0,0,0.88) 26%,",
                  "  rgba(0,0,0,0.28) 50%,",
                  "  rgba(0,0,0,0.68) 70%,",
                  "  rgba(0,0,0,0.93) 88%,",
                  "  rgba(0,0,0,0.97) 100%",
                  ")"
                ].join("")
              }}
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 68%, rgba(0,0,0,0.60) 100%)" }}
            />

            {/* Left: headline + CTA */}
            <motion.div
              className="absolute top-0 bottom-0 z-10 flex flex-col justify-center"
              style={{ left: 0, width: "clamp(260px, 62%, 820px)", paddingLeft: "clamp(18px, 4%, 56px)", paddingRight: "clamp(12px, 2%, 32px)" }}
              initial={{ x: -16 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="text-white font-black lowercase leading-[1.1] tracking-[-0.06em]"
                style={{ fontSize: "clamp(2rem, 5.4vw, 6.5rem)" }}
              >
                Design,{" "}
                <span style={{ color: "#02AC87" }}>Ideas</span>
                <br />
                and Everything
                <br />
                <span style={{ color: "#02AC87" }}>in between.</span>
              </h1>

              <button
                onClick={() => setOverviewOpen(true)}
                className="inline-flex items-center group self-start mt-7"
                style={{
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: "999px",
                  padding: "0.48rem 1.1rem",
                  background: "rgba(255,255,255,0.05)",
                  cursor: "pointer",
                }}
              >
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/60 group-hover:text-white transition-colors">
                  QUICK OVERVIEW
                </span>
              </button>
            </motion.div>

            {/* Cutout PNG — rises from bottom on first scroll */}
            <motion.img
              src={heroCutoutImg}
              alt="Nadeem Saif"
              className="absolute bottom-0 z-20 pointer-events-none select-none"
              style={{ left: "65%", height: "150%", width: "auto", maxWidth: "none" }}
              initial={{ y: "100%", x: "-50%" }}
              animate={{ y: cutoutVisible ? "0%" : "100%", x: "-50%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Drum-roll wheel — desktop */}
            <motion.div
              className="hidden sm:flex flex-col absolute top-1/2 -translate-y-1/2 z-20"
              style={{ right: "clamp(18px, 3.8%, 56px)" }}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  position:        "relative",
                  height:          VISIBLE * ITEM_H,
                  overflow:        "hidden",
                  maskImage:       "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
              >
                <div className="absolute inset-x-0 pointer-events-none z-10"
                  style={{
                    top:          PAD * ITEM_H,
                    height:       ITEM_H,
                    borderTop:    "1px solid rgba(255,255,255,0.12)",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                />

                <motion.div
                  className="flex flex-col items-end"
                  animate={{ y: -wheelIdx * ITEM_H }}
                  transition={
                    instant
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 310, damping: 36, mass: 0.7 }
                  }
                >
                  {Array.from({ length: PAD }).map((_, i) => (
                    <div key={`pt${i}`} style={{ height: ITEM_H }} />
                  ))}

                  {REEL.map((mode, i) => {
                    const dist    = Math.abs(i - wheelIdx);
                    const isAct   = dist === 0;
                    const opacity = isAct ? 1 : dist === 1 ? 0.36 : dist === 2 ? 0.13 : 0.04;
                    const scale   = isAct ? 1 : dist === 1 ? 0.80 : 0.68;
                    return (
                      <motion.button
                        key={`${mode.id}-${i}`}
                        onClick={() => pickMode(mode.id as ModeId)}
                        className="flex items-center justify-end cursor-pointer shrink-0 select-none"
                        style={{ height: ITEM_H }}
                        animate={{ opacity }}
                        transition={{ duration: 0.28 }}
                      >
                        <motion.span
                          className="font-mono text-white uppercase leading-none block text-right"
                          style={{
                            fontSize:        "clamp(0.58rem, 1.0vw, 0.86rem)",
                            letterSpacing:   "0.20em",
                            transformOrigin: "right center",
                          }}
                          animate={{ scale, fontWeight: isAct ? 700 : 400 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {mode.category}
                        </motion.span>
                      </motion.button>
                    );
                  })}

                  {Array.from({ length: PAD }).map((_, i) => (
                    <div key={`pb${i}`} style={{ height: ITEM_H }} />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile chip strip */}
            <motion.div
              className="sm:hidden absolute bottom-10 left-0 right-0 z-20 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {MODES.map(m => {
                  const isAct = m.id === activeMode;
                  return (
                    <motion.button
                      key={m.id}
                      onClick={() => pickMode(m.id as ModeId)}
                      className="shrink-0 font-mono text-[8px] tracking-[0.14em] px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none"
                      style={{
                        borderColor: isAct ? "#02AC87" : "rgba(255,255,255,0.20)",
                        color:       isAct ? "#02AC87" : "rgba(255,255,255,0.45)",
                        background:  isAct ? "rgba(2,172,135,0.10)" : "transparent",
                      }}
                      animate={{ opacity: isAct ? 1 : 0.7 }}
                    >
                      {m.category}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* LinkedIn */}
            <motion.a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.35 }}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/12 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-200"
            >
              <LinkedinLogo className="w-4 h-4 text-white/75" weight="fill" />
            </motion.a>

            {/* Progress dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => pickMode(m.id as ModeId)}
                  aria-label={m.label}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width:      m.id === activeMode ? 16 : 5,
                    height:     5,
                    background: m.id === activeMode
                      ? "rgba(2,172,135,0.85)"
                      : "rgba(255,255,255,0.22)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ══ QUICK OVERVIEW MODAL ════════════════════════════════════════ */}
        <AnimatePresence>
          {overviewOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-50"
                style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setOverviewOpen(false)}
              />

              <motion.div
                className="fixed z-50"
                style={{
                  top: "50%", left: "50%",
                  width: "min(460px, 92vw)",
                  background: "rgba(10,10,12,0.96)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 24,
                  padding: "clamp(24px, 4vw, 36px)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
                initial={{ opacity: 0, scale: 0.94, x: "-50%", y: "-44%" }}
                animate={{ opacity: 1, scale: 1,    x: "-50%", y: "-50%" }}
                exit={{    opacity: 0, scale: 0.94, x: "-50%", y: "-44%" }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setOverviewOpen(false)}
                  className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-colors"
                  style={{ width: 28, height: 28, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <X size={13} weight="bold" className="text-white/60" />
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#02AC87", boxShadow: "0 0 8px #02AC87", flexShrink: 0 }} />
                  <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(1.3rem, 3vw, 1.7rem)", color: "white", letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {PERSONAL.name}
                  </h2>
                </div>

                <p style={{ margin: "0 0 16px", fontWeight: 300, fontSize: "0.78rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.6 }}>
                  Graphics &amp; Marketing &nbsp;·&nbsp; Master in Media Technology &amp; Society
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em" }}>
                    Darmstadt, Hesse, Germany
                  </span>
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em" }}>
                    Darmstadt University of Applied Sciences
                  </span>
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />

                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 500, fontSize: "0.78rem", color: "rgba(255,255,255,0.80)" }}>
                      Branding &amp; Marketing Manager
                    </span>
                    <a href="https://www.oliverlott.de" target="_blank" rel="noopener noreferrer"
                      className="group" style={{ textDecoration: "none" }}>
                      <span className="font-mono group-hover:text-white transition-colors" style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", letterSpacing: "0.06em" }}>oliverlott.de</span>
                    </a>
                  </div>
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                    Working Student · OliverLott IT Development · 2 Years
                  </span>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 500, fontSize: "0.78rem", color: "rgba(255,255,255,0.80)" }}>
                      Media &amp; Marketing Designer
                    </span>
                    <a href="https://www.capture21.de" target="_blank" rel="noopener noreferrer"
                      className="group" style={{ textDecoration: "none" }}>
                      <span className="font-mono group-hover:text-white transition-colors" style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", letterSpacing: "0.06em" }}>capture21.de</span>
                    </a>
                  </div>
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                    Capture21
                  </span>
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <a
                    href="#contact"
                    onClick={() => setOverviewOpen(false)}
                    className="inline-flex items-center gap-2 group"
                    style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: "999px", padding: "0.42rem 1rem 0.42rem 0.85rem", textDecoration: "none", flex: 1, justifyContent: "center" }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#02AC87", boxShadow: "0 0 5px #02AC87" }} />
                    <span className="font-mono text-[9px] tracking-[0.20em] text-white/55 group-hover:text-white transition-colors">OPEN TO WORK</span>
                  </a>
                  <a
                    href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center group"
                    style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: "999px", padding: "0.42rem 1rem", textDecoration: "none", flex: 1, justifyContent: "center" }}
                  >
                    <span className="font-mono text-[9px] tracking-[0.20em] text-white/55 group-hover:text-white transition-colors">LINKEDIN</span>
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ══ REST: unchanged from new design ════════════════════════════ */}
        <ProjectsGrid onSelect={setSelectedCase} />

        <div id="services">
          <ServiceStack />
        </div>

        <section
          id="contact"
          className="relative flex min-h-screen w-screen flex-col justify-center overflow-hidden py-24 lg:py-32"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 45% at 75% 40%, oklch(0.64 0.145 168 / 0.10), transparent 65%)",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
            <RevealText
              as="h2"
              className="display-hero mt-4 max-w-[8ch] text-[clamp(5rem,14vw,13rem)] leading-[0.82]"
              lines={["Let's do", "Magic", "Together"]}
            />
            <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-16">
              <MagneticButton href={`mailto:${PERSONAL.email}`} variant="ink" icon>
                Start a conversation
              </MagneticButton>
              <MagneticButton href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost" icon>
                LinkedIn
              </MagneticButton>
            </div>
          </div>
        </section>

        <footer className="relative w-screen px-4 pb-6 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-375 overflow-hidden rounded-lg bg-ink text-white">
            <div className="flex flex-col gap-10 px-6 py-12 sm:px-10 lg:gap-12 lg:px-14 lg:py-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="select-none text-5xl font-black lowercase tracking-tighter lg:text-7xl">
                    nadeem<span className="text-primary">.</span>
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50 lg:text-base">
                    Creative Technologist &amp; Marketing Designer — brand, design, code &amp;
                    content, shipped by one person.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-white transition-colors hover:bg-primary"
                  >
                    <LinkedinLogo size={20} weight="fill" />
                  </a>
                  <a
                    href={`mailto:${PERSONAL.email}`}
                    className="inline-flex items-center rounded-full bg-white/8 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white/16"
                  >
                    Email me
                  </a>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                  >
                    <ArrowUp size={18} weight="bold" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:justify-between">
                <span className="text-xs text-white/40">
                  © {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.
                </span>
                <nav className="flex flex-wrap gap-x-7 gap-y-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm font-medium text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </footer>

        <CaseStudies selected={selectedCase} setSelected={setSelectedCase} dialogOnly />
      </main>
    </div>
  );
}

function ProjectsGrid({ onSelect }: { onSelect: (cs: CaseStudy) => void }) {
  return (
    <section
      id="projects"
      className="relative w-screen px-4 pb-10 pt-12 md:px-8 lg:px-12 lg:pb-16 lg:pt-16"
    >
      <div className="mx-auto flex w-full max-w-375 flex-col gap-5 lg:gap-10">
        <div className="flex flex-col gap-4">
          <RevealText
            as="p"
            className="display-hero max-w-[17ch] text-[clamp(2.4rem,7vw,7rem)]"
            lines={["I turn ideas into", "visual systems and products."]}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
          {CASE_STUDIES.slice(0, 6).map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onSelect(project)}
              className="group relative aspect-video w-full overflow-hidden rounded-lg bg-ink text-left"
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: index * 0.04, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.018 }}
            >
              {project.coverImage && (
                <motion.img
                  src={project.coverImage}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3 overflow-x-clip pb-[0.12em] lg:bottom-8 lg:left-8">
                <span className="hidden w-8 -translate-x-full text-white transition-transform duration-500 group-hover:translate-x-0 lg:block">
                  <ArrowRight size={32} weight="bold" />
                </span>
                <span className="text-2xl font-semibold leading-[1.05] tracking-tightest text-white transition-transform duration-500 group-hover:translate-x-0 lg:-translate-x-11 lg:text-5xl">
                  {project.title}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
