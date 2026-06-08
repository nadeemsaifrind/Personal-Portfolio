import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Linkedin, ArrowUpRight } from "lucide-react";
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
      { property: "og:url", content: "https://www.nadeemsaif.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${PERSONAL.name} — ${PERSONAL.title}` },
      { name: "twitter:description", content: PERSONAL.description },
    ],
    links: [
      { rel: "canonical", href: "https://www.nadeemsaif.com/" },
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
              href="#projects"
              className="hidden md:block bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-mono text-[10px] tracking-[0.15em] hover:opacity-90 transition"
            >
              CASE STUDIES
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
      <section className="relative pt-16 md:pt-20 pb-10 overflow-hidden bg-background" style={{ backgroundImage: "radial-gradient(ellipse 70% 50% at 30% 0%, rgba(2,172,135,0.06) 0%, transparent 70%)" }}>
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
                <em style={{ color: "#02AC87", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
                  Ideas
                </em>
                <br />
                and Everything
                <br />
                <em style={{ color: "#02AC87", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
                  in between.
                </em>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-sm md:text-base text-foreground/55 leading-relaxed max-w-104">
                Helping businesses communicate clearly through design, content, and digital experiences.
              </p>

              {/* Case Studies strip */}
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group mt-6 inline-flex items-center gap-4 px-4 py-3 rounded-2xl border border-border bg-card hover:border-[#02AC87]/30 hover:shadow-[0_4px_20px_rgba(2,172,135,0.1)] transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Overlapping thumbnails */}
                <div className="flex items-end">
                  {CASE_STUDIES.slice(0, 4).map((cs, i) => {
                    const rotations = [-2.5, 1.5, -1, 2];
                    return (
                      <motion.div
                        key={cs.id}
                        className="relative overflow-hidden rounded-md border-2 border-background shadow-sm shrink-0"
                        style={{ width: 36, height: 46, marginLeft: i === 0 ? 0 : -10, zIndex: i + 1, rotate: rotations[i] }}
                        whileHover={{ zIndex: 10, y: -5, rotate: 0, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {cs.coverImage && (
                          <motion.img
                            src={cs.coverImage}
                            alt={cs.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.22 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground/45">
                    {CASE_STUDIES.length} DOCUMENTED PROJECTS
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    View Case Studies
                  </span>
                </div>

                <ArrowUpRight className="w-4 h-4 text-muted-foreground/35 group-hover:text-[#02AC87] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </motion.a>

              {/* Winner badge */}
              <div className="mt-4">
                <WinnerBadge />
              </div>

              {/* Availability + status badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="mt-4 hidden md:flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                    OPEN TO OPPORTUNITIES · GERMANY & REMOTE
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border font-mono text-[9px] tracking-[0.14em] text-muted-foreground/70">
                  <span className="text-foreground/50 text-[8px]">▲</span>
                  LEARNING GERMAN · B2
                </span>
              </motion.div>

              {/* Discipline chips */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="mt-4 hidden md:flex flex-wrap gap-1.5"
              >
                {MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={[
                      "px-3 py-1.5 rounded-full font-mono text-[9px] tracking-[0.14em] border transition-all duration-200",
                      activeMode === mode.id
                        ? "bg-[#02AC87] text-white border-[#02AC87]"
                        : "bg-transparent text-muted-foreground border-border hover:border-[#02AC87]/40 hover:text-foreground",
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
              className="w-full relative"
            >
              {/* LinkedIn badge — floats on top-left of image */}
              <motion.a
                href="https://www.linkedin.com/in/nadeemsaifrind/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:shadow-lg hover:bg-white hover:scale-105 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
              </motion.a>

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
