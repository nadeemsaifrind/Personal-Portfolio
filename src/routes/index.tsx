import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Linkedin, ArrowUpRight, MapPin, GraduationCap, BadgeCheck, Briefcase, ScanFace, X } from "lucide-react";
import heroBgImg    from "@/assets/hero-bg.png";
import heroCutoutImg from "@/assets/hero-cutout.png";
import { MODES, PERSONAL, CASE_STUDIES, type ModeId, type CaseStudy } from "@/lib/portfolio-data";
import { DisciplineGrid } from "@/components/portfolio/DisciplineGrid";
import { WinnerBadge } from "@/components/portfolio/WinnerBadge";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { Journey } from "@/components/portfolio/Journey";
import { WhyMe } from "@/components/portfolio/WhyMe";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Sections";
import { RecruiterShortcut } from "@/components/portfolio/RecruiterShortcut";
import { WorkflowSection } from "@/components/portfolio/WorkflowSection";
import { BuildingInPublic } from "@/components/portfolio/BuildingInPublic";
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

const NAV_LINKS = [
  { href: "#work",     label: "Work"     },
  { href: "#projects", label: "Projects" },
  { href: "#journey",  label: "Journey"  },
  { href: "#contact",  label: "Contact"  },
];

/* ─── Wheel constants ────────────────────────────────────────────────── */
const WHEEL_INTERVAL = 4200;
const ITEM_H  = 52;
const VISIBLE = 5;
const PAD     = Math.floor(VISIBLE / 2);  // 2
const N       = MODES.length;             // 6
const REEL    = Array.from({ length: N * 3 }, (_, i) => MODES[i % N]);
const INIT_IDX = N;                       // start in middle copy

function Index() {
  const [wheelIdx,     setWheelIdx]     = useState(INIT_IDX);
  const [instant,      setInstant]      = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeLens,   setActiveLens]   = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [cutoutVisible, setCutoutVisible] = useState(false);
  const [overviewOpen,  setOverviewOpen]  = useState(false);
  const [navVisible,    setNavVisible]    = useState(true);
  const pausedRef    = useRef(false);
  const lastScrollY  = useRef(0);

  /* Hide nav on scroll down, reveal on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) { setNavVisible(true); }
      else if (y > lastScrollY.current) { setNavVisible(false); }
      else { setNavVisible(true); }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal cutout on first scroll — works on desktop and mobile */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30) {
        setCutoutVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeModeIdx = ((wheelIdx % N) + N) % N;
  const currentMode   = MODES[activeModeIdx];
  const activeMode    = currentMode.id as ModeId;

  /* Auto-cycle */
  useEffect(() => {
    const t = setInterval(() => {
      if (pausedRef.current) return;
      setWheelIdx(p => p + 1);
    }, WHEEL_INTERVAL);
    return () => clearInterval(t);
  }, []);

  /* Silent boundary reset */
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

  const openCaseStudy = (id: string) => {
    const cs = CASE_STUDIES.find(c => c.id === id);
    if (!cs) return;
    setSelectedCase(cs);
    requestAnimationFrame(() =>
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ══ NAV ════════════════════════════════════════════════════════ */}
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-max transition-all duration-300 ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
        <div
          className="flex items-center h-10 px-2"
          style={{
            background: "rgba(0,0,0,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 9999,
            boxShadow: "0 8px 40px rgba(0,0,0,0.50)",
            gap: 0,
          }}
        >
          {/* Left — nav links */}
          <nav className="hidden md:flex items-center gap-1 px-3">
            {NAV_LINKS.map(item => (
              <a key={item.label} href={item.href}
                className="text-[12px] text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/6">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10 mx-1" />

          {/* Center — name (desktop only) */}
          <span className="hidden md:inline text-[13px] font-bold leading-none text-white select-none tracking-[0.04em] px-5">
            NADEEM SAIF
          </span>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10 mx-1" />

          {/* Right — CTA (desktop) + hamburger (mobile only) */}
          <div className="flex items-center px-2">
            <a href="#contact"
              className="hidden md:inline-flex items-center text-white px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[0.06em] hover:opacity-88 transition-opacity"
              style={{ background: "#02AC87" }}>
              Hire Me
            </a>
            <button onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/12 transition-colors hover:border-white/25"
              style={{ background: "rgba(0,0,0,0.90)" }}
              aria-label="Open menu">
              <Menu className="h-3.5 w-3.5 text-white/80" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-72 flex flex-col bg-black border-l border-white/8 [&>button]:text-white/50 [&>button]:hover:text-white">
          <div className="mt-6 mb-2">
            <p className="text-xl font-bold leading-none tracking-[-0.02em] text-white">NADEEM SAIF</p>
            <p className="text-sm text-white/40 mt-1">{PERSONAL.title}</p>
          </div>
          <nav className="flex flex-col gap-1 mt-6">
            {NAV_LINKS.map(item => (
              <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                className="text-sm text-white/50 hover:text-white px-3 py-3 rounded-lg hover:bg-white/6 transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8 border-t border-white/10">
            <a href="#contact" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-full text-[11px] font-medium tracking-wide hover:opacity-90 transition w-full"
              style={{ background: "#02AC87" }}>
              Hire Me →
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <div className="mt-19 px-2.5 sm:px-4 md:px-5 lg:px-7 pt-2"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden"
          style={{ height: "58vh", minHeight: "400px", maxHeight: "680px" }}
        >

          {/* ── Background image ────────────────────────────────────── */}
          <img
            src={heroBgImg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />

          {/*
            Dual-vignette overlay:
            • Left: opaque-black → image shows from center
            • Right: image fades back to dark for wheel readability
          */}
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
          {/* Top / bottom vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 68%, rgba(0,0,0,0.60) 100%)" }}
          />

          {/* ── Left: headline ──────────────────────────────────────── */}
          <motion.div
            className="absolute top-0 bottom-0 z-10 flex flex-col justify-center"
            style={{ left: 0, width: "clamp(260px, 62%, 820px)", paddingLeft: "clamp(18px, 4%, 56px)", paddingRight: "clamp(12px, 2%, 32px)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Tagline ───────────────────────────────────────────────── */}
            <h1
              className="text-white font-normal leading-[1.15] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5.4vw, 6.5rem)" }}
            >
              Design,{" "}
              <span style={{ color: "#02AC87" }}>Ideas</span>
              <br />
              and Everything
              <br />
              <span style={{ color: "#02AC87" }}>in between.</span>
            </h1>

            {/* ── Quick Overview button ─────────────────────────────────── */}
            <button
              onClick={() => setOverviewOpen(true)}
              className="inline-flex items-center gap-2.5 group self-start mt-7"
              style={{
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: "999px",
                padding: "0.48rem 1.1rem 0.48rem 0.9rem",
                background: "rgba(255,255,255,0.05)",
                cursor: "pointer",
              }}
            >
              <ScanFace size={13} className="text-white/50 group-hover:text-white transition-colors" strokeWidth={1.8} />
              <span className="font-mono text-[10px] tracking-[0.22em] text-white/60 group-hover:text-white transition-colors">
                QUICK OVERVIEW
              </span>
            </button>
          </motion.div>

          {/* ── Cut-out PNG — rises from bottom, full hero height ──────── */}
          <motion.img
            src={heroCutoutImg}
            alt="NADEEM SAIF"
            className="absolute bottom-0 z-20 sm:z-15 pointer-events-none select-none"
            style={{
              left:     "65%",
              height:   "150%",
              width:    "auto",
              maxWidth: "none",
            }}
            initial={{ y: "100%", x: "-50%" }}
            animate={{ y: cutoutVisible ? "0%" : "100%", x: "-50%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── Drum-roll wheel — RIGHT, desktop ────────────────────── */}
          <motion.div
            className="hidden sm:flex flex-col absolute top-1/2 -translate-y-1/2 z-20"
            style={{ right: "clamp(18px, 3.8%, 56px)" }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Wheel viewport — items are right-aligned */}
            <div
              style={{
                position:        "relative",
                height:          VISIBLE * ITEM_H,
                overflow:        "hidden",
                maskImage:       "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            >
              {/* Center hairlines */}
              <div className="absolute inset-x-0 pointer-events-none z-10"
                style={{
                  top:          PAD * ITEM_H,
                  height:       ITEM_H,
                  borderTop:    "1px solid rgba(255,255,255,0.12)",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              />

              {/* Spring list */}
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
                      onClick={() => pickMode(mode.id)}
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

            {/* Counter below wheel */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeMode}
                className="font-mono text-white/22 mt-4 text-right select-none"
                style={{ fontSize: "0.58rem", letterSpacing: "0.12em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {String(activeModeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(N).padStart(2, "0")}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/*
            ── Mobile wheel: horizontal scrollable chip strip ──────────
            Slides in from bottom; shows all disciplines as tappable pills.
          */}
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
                    onClick={() => pickMode(m.id)}
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

          {/* ── LinkedIn ─────────────────────────────────────────────── */}
          <motion.a
            href="https://www.linkedin.com/in/nadeemsaifrind/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.35 }}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/12 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-200"
          >
            <Linkedin className="w-4 h-4 text-white/75" />
          </motion.a>

          {/* ── Progress dots — bottom center ────────────────────────── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => pickMode(m.id)}
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

      {/* ══ INFO STRIP ═════════════════════════════════════════════════ */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-6 lg:px-10 py-6 md:py-7">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">

            <WinnerBadge />

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
                OPEN · GERMANY &amp; REMOTE
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border font-mono text-[9px] tracking-[0.14em] text-muted-foreground/70">
              <span className="text-foreground/50 text-[8px]">▲</span>
              LEARNING GERMAN · B2
            </span>

            <motion.a
              href="#projects"
              onClick={e => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="ml-auto group inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl border border-border bg-card hover:border-[#02AC87]/35 hover:shadow-[0_4px_20px_rgba(2,172,135,0.10)] transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-end">
                {CASE_STUDIES.slice(0, 4).map((cs, i) => (
                  <motion.div
                    key={cs.id}
                    className="relative overflow-hidden rounded-md border-2 border-background shadow-sm shrink-0"
                    style={{ width: 24, height: 30, marginLeft: i === 0 ? 0 : -7, zIndex: i + 1, rotate: [-2.5, 1.5, -1, 2][i] }}
                    whileHover={{ zIndex: 10, y: -3, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cs.coverImage && (
                      <img src={cs.coverImage} alt={cs.title} className="w-full h-full object-cover" />
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[8px] tracking-[0.18em] text-muted-foreground/40">
                  {CASE_STUDIES.length} PROJECTS
                </span>
                <span className="text-[12px] font-medium text-foreground leading-tight">
                  Case Studies
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-[#02AC87] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </motion.a>

          </div>
        </div>
      </section>

      {/* ══ Quick Overview modal ══════════════════════════════════════════ */}
      <AnimatePresence>
        {overviewOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOverviewOpen(false)}
            />

            {/* Card */}
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
              {/* Close */}
              <button
                onClick={() => setOverviewOpen(false)}
                className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-colors"
                style={{ width: 28, height: 28, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              >
                <X size={13} className="text-white/60" />
              </button>

              {/* Name row */}
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#02AC87", boxShadow: "0 0 8px #02AC87", flexShrink: 0 }} />
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(1.3rem, 3vw, 1.7rem)", color: "white", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {PERSONAL.name}
                </h2>
                <BadgeCheck size={16} color="#02AC87" strokeWidth={2.2} />
              </div>

              {/* Headline */}
              <p style={{ margin: "0 0 16px", fontWeight: 300, fontSize: "0.78rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.6 }}>
                Graphics &amp; Marketing &nbsp;·&nbsp; Master in Media Technology &amp; Society
              </p>

              {/* Location + University */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MapPin size={10} color="rgba(255,255,255,0.28)" strokeWidth={1.8} />
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em" }}>
                    Darmstadt, Hesse, Germany
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <GraduationCap size={10} color="rgba(255,255,255,0.28)" strokeWidth={1.8} />
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em" }}>
                    Darmstadt University of Applied Sciences
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />

              {/* Experience 1 */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Briefcase size={10} color="rgba(255,255,255,0.30)" strokeWidth={1.8} />
                    <span style={{ fontWeight: 500, fontSize: "0.78rem", color: "rgba(255,255,255,0.80)" }}>
                      Branding &amp; Marketing Manager
                    </span>
                  </div>
                  <a href="https://www.oliverlott.de" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="font-mono group-hover:text-white transition-colors" style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", letterSpacing: "0.06em" }}>oliverlott.de</span>
                    <ArrowUpRight size={9} color="rgba(255,255,255,0.32)" strokeWidth={2} />
                  </a>
                </div>
                <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                  Working Student · OliverLott IT Development · 2 Years
                </span>
              </div>

              {/* Experience 2 */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Briefcase size={10} color="rgba(255,255,255,0.30)" strokeWidth={1.8} />
                    <span style={{ fontWeight: 500, fontSize: "0.78rem", color: "rgba(255,255,255,0.80)" }}>
                      Media &amp; Marketing Designer
                    </span>
                  </div>
                  <a href="https://www.capture21.de" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="font-mono group-hover:text-white transition-colors" style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", letterSpacing: "0.06em" }}>capture21.de</span>
                    <ArrowUpRight size={9} color="rgba(255,255,255,0.32)" strokeWidth={2} />
                  </a>
                </div>
                <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                  Capture21
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />

              {/* Footer actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a
                  href="#contact"
                  onClick={() => setOverviewOpen(false)}
                  className="inline-flex items-center gap-2 group"
                  style={{
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "999px",
                    padding: "0.42rem 1rem 0.42rem 0.85rem",
                    textDecoration: "none",
                    flex: 1, justifyContent: "center",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#02AC87", boxShadow: "0 0 5px #02AC87" }} />
                  <span className="font-mono text-[9px] tracking-[0.20em] text-white/55 group-hover:text-white transition-colors">OPEN TO WORK</span>
                </a>
                <a
                  href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 group"
                  style={{
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "999px",
                    padding: "0.42rem 1rem",
                    textDecoration: "none",
                    flex: 1, justifyContent: "center",
                  }}
                >
                  <Linkedin size={11} className="text-white/40 group-hover:text-white transition-colors" />
                  <span className="font-mono text-[9px] tracking-[0.20em] text-white/55 group-hover:text-white transition-colors">LINKEDIN</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Lens breadcrumb ───────────────────────────────────────────── */}
      <AnimatePresence>
        {activeLens && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="sticky top-14 z-40 bg-foreground text-background px-6 py-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] text-background/50">VIEWING AS</span>
              <span className="font-mono text-[10px] tracking-[0.15em] font-medium">{activeLens.toUpperCase()}</span>
            </div>
            <button
              onClick={() => setActiveLens(null)}
              className="font-mono text-[10px] tracking-[0.15em] text-background/50 hover:text-background transition-colors"
            >
              × CLEAR LENS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <RecruiterShortcut
        onSelect={(mode, label) => { pickMode(mode); setActiveLens(label); }}
        onOpenCaseStudy={openCaseStudy}
      />
      <WorkflowSection />
      <DisciplineGrid />
      <CaseStudies selected={selectedCase} setSelected={setSelectedCase} />
      <Journey />
      <WhyMe />
      <Achievements />
      <BuildingInPublic />
      <Contact />

      <footer className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-10 py-8 flex items-center justify-between font-mono text-xs tracking-[0.15em] text-muted-foreground">
          <span>© 2025 {PERSONAL.name.toUpperCase()}</span>
          <span>CREATIVE TECHNOLOGIST · GERMANY</span>
        </div>
      </footer>
    </div>
  );
}
