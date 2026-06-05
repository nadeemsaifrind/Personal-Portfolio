import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Linkedin, Youtube, Instagram } from "lucide-react";
import { MODES, PERSONAL, CASE_STUDIES, type ModeId, type CaseStudy } from "@/lib/portfolio-data";
import { HeroCarousel } from "@/components/portfolio/HeroCarousel";
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${PERSONAL.name} — ${PERSONAL.title}` },
      { name: "twitter:description", content: PERSONAL.description },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { href: "#work", label: "WORK" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#journey", label: "JOURNEY" },
  { href: "#contact", label: "CONTACT" },
];

function Index() {
  const [activeMode, setActiveMode] = useState<ModeId>("brand");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLens, setActiveLens] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const openCaseStudy = (id: string) => {
    const cs = CASE_STUDIES.find((c) => c.id === id);
    if (!cs) return;
    setSelectedCase(cs);
    requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Floating nav pill ──────────────────────────────────────────── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
        <div className="glass rounded-full border border-border/50 px-2 py-1.5 shadow-soft transition-all duration-300 hover:shadow-float hover:border-border hover:backdrop-blur-xl group">
          <div className="flex items-center gap-1">

            {/* Logo / name */}
            <div className="flex items-center px-3 py-1 rounded-full bg-foreground/5">
              <span style={{ fontFamily: "var(--font-signature)" }} className="text-base leading-none">Nadeem Saif</span>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1 px-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hidden md:block bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-mono text-[10px] tracking-[0.15em] hover:opacity-90 transition"
            >
              HIRE ME
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Glass shine on hover */}
          <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute -inset-full animate-[spin_4s_linear_infinite]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, oklch(1 0 0 / 0.15) 20%, transparent 40%)",
              }}
            />
          </div>
        </div>
      </header>

      {/* ── Mobile nav sheet ───────────────────────────────────────────── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-72 flex flex-col">
          <div className="mt-6 mb-2">
            <p style={{ fontFamily: "var(--font-signature)" }} className="text-lg leading-none">Nadeem Saif</p>
            <p className="text-sm text-muted-foreground mt-1">{PERSONAL.title}</p>
          </div>
          <nav className="flex flex-col gap-1 mt-6">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-sm tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors px-3 py-3 rounded-lg hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8 border-t border-border">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-mono text-[10px] tracking-[0.15em] hover:opacity-90 transition w-full"
            >
              HIRE ME →
            </a>
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground text-center mt-4">
              {PERSONAL.location.toUpperCase()} · REMOTE
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-16 md:pt-20 pb-10 overflow-hidden bg-background">
        <div className="relative container mx-auto px-10 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-8 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Headline — strong sans + pale serif italic */}
              <h1 className="text-[1.9rem] sm:text-[2.3rem] lg:text-[2.7rem] xl:text-[3.2rem] leading-[1.15] tracking-[-0.03em] font-normal w-full">
                Design,{" "}
                <span style={{ color: "oklch(0.62 0.01 250)" }}>
                  Ideas
                </span>
                <br />
                and Everything
                <br />
                <span style={{ color: "oklch(0.62 0.01 250)" }}>
                  in between.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-sm md:text-base text-foreground/55 leading-relaxed max-w-104">
                Film & TV → Germany → design, marketing, products. Six disciplines, one integrated practice.
              </p>

              {/* View Work + Badge side by side */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 border border-border bg-card text-foreground px-7 py-3.5 rounded-full text-sm font-medium tracking-tight hover:border-foreground/25 hover:bg-secondary transition-colors"
                >
                  View Work
                </a>
                <WinnerBadge />
              </div>

              {/* Social links */}
              <div className="mt-5 flex items-center gap-2">
                {[
                  { href: "https://www.linkedin.com/in/nadeemsaifrind/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                  { href: "https://www.youtube.com/@nadeemslife", icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
                  { href: "https://www.instagram.com/nadeemsaifrind/", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                  {
                    href: "https://www.tiktok.com/@nadeemsaifrind",
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.12 8.12 0 004.74 1.5V6.75a4.85 4.85 0 01-.97-.06z" />
                      </svg>
                    ),
                    label: "TikTok",
                  },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-secondary transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="mt-4 inline-flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                  OPEN TO OPPORTUNITIES · GERMANY & REMOTE
                </span>
              </motion.div>

              {/* Discipline chips */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="mt-4 flex flex-wrap gap-1.5"
              >
                {MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={[
                      "px-3 py-1.5 rounded-full font-mono text-[9px] tracking-[0.14em] border transition-all duration-200",
                      activeMode === mode.id
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground",
                    ].join(" ")}
                  >
                    {mode.category.split(" ")[0]}
                  </button>
                ))}
              </motion.div>

            </motion.div>

            {/* Right — image carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.05, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <HeroCarousel activeMode={activeMode} onSelect={setActiveMode} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Lens breadcrumb ───────────────────────────────────────────── */}
      <AnimatePresence>
        {activeLens && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-[3.6rem] z-40 bg-foreground text-background px-6 py-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] text-background/50">VIEWING AS</span>
              <span className="font-mono text-[10px] tracking-[0.15em] font-medium">{activeLens.toUpperCase()}</span>
            </div>
            <button
              onClick={() => setActiveLens(null)}
              className="font-mono text-[10px] tracking-[0.15em] text-background/50 hover:text-background transition-colors flex items-center gap-1.5"
            >
              × CLEAR LENS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Recruiter Shortcut ────────────────────────────────────────── */}
      <RecruiterShortcut
        onSelect={(mode, label) => { setActiveMode(mode); setActiveLens(label); }}
        onOpenCaseStudy={openCaseStudy}
      />

      {/* ── How I Create Value ────────────────────────────────────────── */}
      <WorkflowSection />

      {/* ── Discipline Grid ───────────────────────────────────────────── */}
      <DisciplineGrid />

      {/* ── Featured Case Studies ─────────────────────────────────────── */}
      <CaseStudies selected={selectedCase} setSelected={setSelectedCase} />

      {/* ── Journey ───────────────────────────────────────────────────── */}
      <Journey />

      {/* ── Why Work With Me ──────────────────────────────────────────── */}
      <WhyMe />

      {/* ── Achievements ──────────────────────────────────────────────── */}
      <Achievements />

      {/* ── Building in Public ────────────────────────────────────────── */}
      <BuildingInPublic />

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <Contact />

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-10 py-8 flex items-center justify-between font-mono text-xs tracking-[0.15em] text-muted-foreground">
          <span>© 2025 {PERSONAL.name.toUpperCase()}</span>
          <span>CREATIVE TECHNOLOGIST · GERMANY</span>
        </div>
      </footer>
    </div>
  );
}
