import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  DotsThree,
  LinkedinLogo,
  X,
} from "@phosphor-icons/react";
import heroCutoutImg from "@/assets/hero-cutout.png";
import { PERSONAL, CASE_STUDIES, DISCIPLINES, type CaseStudy } from "@/lib/portfolio-data";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { ServiceStack } from "@/components/portfolio/ServiceStack";
import { Hero } from "@/components/portfolio/Hero";
import { WhyGeneralist } from "@/components/portfolio/WhyGeneralist";
import { NextStepFeature } from "@/components/portfolio/NextStepFeature";
import { CaseStudyFeature } from "@/components/portfolio/CaseStudyFeature";
import { JourneyTimeline } from "@/components/portfolio/JourneyTimeline";
import { StatsAchievements } from "@/components/portfolio/StatsAchievements";
import { RevealText } from "@/components/portfolio/sohub";
import { RevealCard, WorkCard } from "@/components/portfolio/WorkCard";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: typeof search.role === "string" ? search.role : undefined,
  }),
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

/* ── Nav links ── */
const NAV_LINKS = [
  { href: "#projects", label: "Case Studies" },
  { href: "#contact", label: "Contact" },
];

/* ── Role SEO ── */
const roles = [
  {
    slug: "marketing-designer",
    title: "Marketing Designer.",
    description: "Campaigns, brand systems, and visual communication that drives results.",
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager.",
    description: "Content strategy, community growth, and social campaigns that compound.",
  },
  {
    slug: "brand-designer",
    title: "Brand Designer.",
    description: "Visual identities and design systems built to last.",
  },
  {
    slug: "content-creator",
    title: "Content Creator.",
    description: "Photography, video, and storytelling that travels across platforms.",
  },
  {
    slug: "ux-designer",
    title: "UX Designer.",
    description: "Research-led design from wireframe to working product.",
  },
  {
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist.",
    description: "Growth systems, content engines, and campaigns that convert.",
  },
] as const;

function getRoleBySlug(slug?: string) {
  return roles.find((r) => r.slug === slug);
}

function getRoleMeta(role?: (typeof roles)[number]) {
  const title = role
    ? `Nadeem Saif — ${role.title.replace(/\.$/, "")}, Germany`
    : "Nadeem Saif — Marketing Designer, Germany";
  const description = role
    ? `${role.description} Based in Germany.`
    : "Marketing Designer with experience in brand, campaigns, content and digital. Based in Germany.";
  return { title, description };
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Flagship case studies told in full, directly in the page flow ── */
const FEATURED_CASE_IDS = ["oliverlott", "dreamfly", "kenergy"];

function Index() {
  const { role } = Route.useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const activeRole = useMemo(() => getRoleBySlug(role), [role]);

  useEffect(() => {
    const meta = getRoleMeta(activeRole);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", meta.description);
  }, [activeRole]);

  const featured = FEATURED_CASE_IDS.map((id) => CASE_STUDIES.find((cs) => cs.id === id)!).filter(Boolean);
  const nextstepCase = CASE_STUDIES.find((cs) => cs.id === "nextstep")!;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">

      {/* ══ NAV ══════════════════════════════════════════════════════ */}
      <motion.header
        className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-2.5 md:px-6 lg:px-8"
        style={{
          background: "oklch(0.072 0.005 250 / 0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.97 0.003 250 / 0.07)",
        }}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <a href="#top" className="text-[17px] font-black lowercase tracking-[-0.06em] text-foreground select-none">
          nadeem<span className="text-primary">.</span>
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/8 p-1 md:flex"
          style={{ background: "oklch(0.97 0.003 250 / 0.04)" }}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-foreground/55 transition-colors hover:bg-white/8 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/nadeem-saif-cv.pdf"
            download
            className="hidden items-center rounded-full border border-border px-3.5 py-1.5 text-[12.5px] font-medium text-foreground/55 transition hover:border-white/18 hover:text-foreground md:flex"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="hidden items-center rounded-full bg-primary px-4 py-1.5 text-[12.5px] font-semibold text-primary-foreground transition hover:opacity-90 md:flex"
          >
            Let's talk
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground/70 transition hover:bg-surface-2 md:hidden"
            aria-label="Open menu"
          >
            <DotsThree size={18} weight="bold" />
          </button>
        </div>
      </motion.header>

      {/* ══ MOBILE SHEET ═════════════════════════════════════════════ */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-80 flex flex-col border-l border-border bg-background [&>button]:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground/60"
            aria-label="Close menu"
          >
            <X size={15} weight="bold" />
          </button>
          <div className="mt-6 mb-2">
            <p className="text-2xl font-bold tracking-tightest text-foreground">{PERSONAL.name}</p>
            <p className="mt-1 text-sm text-foreground/40">{PERSONAL.title}</p>
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-3 py-3 text-4xl font-semibold tracking-tight text-foreground/70 transition-colors hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-brand-bright"
            >
              Let's talk
            </a>
          </div>
        </SheetContent>
      </Sheet>

      <main id="top">

        {/* ══ HERO — identity first ═══════════════════════════════════ */}
        <Hero />

        {/* ══ DISCIPLINE MARQUEE ══════════════════════════════════════ */}
        <div className="relative overflow-hidden border-y border-border py-4">
          <div className="animate-marquee flex">
            {[...DISCIPLINES, ...DISCIPLINES].map((item, i) => (
              <div key={i} className="flex shrink-0 items-center gap-5 px-5">
                <span className="text-[11px] uppercase tracking-[0.24em] text-foreground/28">{item}</span>
                <span className="text-primary" aria-hidden>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ WHY A GENERALIST ════════════════════════════════════════ */}
        <WhyGeneralist />

        {/* ══ NEXT STEP DIGITAL — interactive client-card feature ═════ */}
        <NextStepFeature onOpenCaseStudy={() => setSelectedCase(nextstepCase)} />

        {/* ══ FEATURED CASE STUDIES — told in full, no modal needed ═══ */}
        <section id="projects" className="section-glow py-16 sm:py-24 lg:py-36">
          <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-5 bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Case Studies</span>
            </div>
            <RevealText
              as="h2"
              className="display-hero max-w-[20ch] text-[clamp(2rem,4vw,4rem)] mb-4"
              lines={["Evidence, not claims."]}
            />
            <p className="max-w-[46ch] text-sm leading-relaxed text-foreground/40">
              Real client work, real competition results, real products shipped.
            </p>

            <div className="mt-6 divide-y divide-border">
              {featured.map((cs, i) => (
                <CaseStudyFeature
                  key={cs.id}
                  cs={cs}
                  reverse={i % 2 === 1}
                  onOpenFull={() => setSelectedCase(cs)}
                />
              ))}
            </div>

            {/* Browse-all grid */}
            <div className="mt-16 lg:mt-20">
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
                All case studies
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CASE_STUDIES.map((cs, i) => (
                  <RevealCard key={cs.id} index={i % 3}>
                    <button
                      type="button"
                      onClick={() => setSelectedCase(cs)}
                      className="w-full text-left"
                    >
                      <WorkCard
                        image={cs.coverImage ?? cs.image}
                        eyebrow={cs.context}
                        title={cs.title}
                        badge={cs.achievement}
                        tagLabel={cs.tag}
                        meta={cs.year}
                      />
                    </button>
                  </RevealCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ WORK GALLERY ═════════════════════════════════════════════ */}
        <WorkGallery />

        {/* ══ SERVICES ═════════════════════════════════════════════════ */}
        <ServiceStack />

        {/* ══ JOURNEY ══════════════════════════════════════════════════ */}
        <JourneyTimeline />

        {/* ══ STATS + ACHIEVEMENTS ═════════════════════════════════════ */}
        <StatsAchievements />

        {/* ══ CONTACT ══════════════════════════════════════════════════ */}
        <section id="contact" className="relative overflow-hidden" style={{ background: "var(--background)", minHeight: "100svh" }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 68% 72% at 50% 56%, oklch(0.30 0.082 168 / 0.38), transparent 70%)" }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 52% 58% at 12% 48%, oklch(0.26 0.065 235 / 0.22), transparent 68%)" }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 50% 100%, oklch(0.34 0.09 168 / 0.32), transparent 65%)" }} />
          <div className="pointer-events-none absolute inset-x-0 top-0" style={{ zIndex: 25, height: 120, background: "linear-gradient(to bottom, var(--background) 25%, transparent)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ zIndex: 25, height: 80, background: "linear-gradient(to top, var(--background) 20%, transparent)" }} />

          <div className="relative z-10 flex items-center" style={{ minHeight: "100svh" }}>
            <div className="w-full mx-auto max-w-375">
              <div className="grid lg:grid-cols-2 items-stretch">

                {/* Left: portrait */}
                <div className="relative flex items-end justify-center overflow-hidden" style={{ minHeight: "70svh" }}>
                  <div className="absolute inset-x-0 pointer-events-none flex justify-center" style={{ bottom: "14%", zIndex: 5 }}>
                    <motion.h2
                      className="font-black lowercase text-foreground whitespace-nowrap"
                      style={{ fontSize: "clamp(3.4rem, 17vw, 13rem)", letterSpacing: "-0.06em", lineHeight: 1 }}
                      initial={{ opacity: 0, y: 40, scale: 0.93 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "0px" }}
                      transition={{ delay: 0.15, duration: 1, ease: EASE }}
                    >
                      nadeem<span style={{ color: "oklch(0.64 0.145 168)" }}>.</span>
                    </motion.h2>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{ zIndex: 10 }}
                    initial={{ opacity: 0, y: 60, scale: 0.86 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 1.0, ease: EASE, delay: 0.05 }}
                  >
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{
                        width: "min(520px, 90vw)",
                        height: "min(320px, 44vw)",
                        background: "radial-gradient(ellipse at 50% 85%, oklch(0.64 0.145 168 / 0.32), transparent 65%)",
                        filter: "blur(32px)",
                      }}
                    />
                    <img
                      src={heroCutoutImg}
                      alt="Nadeem Saif"
                      className="relative select-none block w-auto object-contain object-bottom"
                      style={{ height: "min(72svh, 680px)", filter: "drop-shadow(0 -8px 72px oklch(0.64 0.145 168 / 0.26)) drop-shadow(0 60px 140px oklch(0 0 0 / 0.76))" }}
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* Right: contact links */}
                <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-16 lg:py-0">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-5 bg-primary" />
                    <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Contact</span>
                  </div>
                  <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-xs text-primary w-fit">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    Available for the right role
                  </span>
                  <motion.div
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
                  >
                    <a
                      href={`mailto:${PERSONAL.email}`}
                      className="group flex items-center justify-between rounded-xl border border-border bg-surface-2 px-5 py-4 transition-all hover:border-white/14 hover:bg-surface"
                    >
                      <div>
                        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">Email</p>
                        <p className="text-sm font-medium text-foreground">{PERSONAL.email}</p>
                      </div>
                      <ArrowUpRight size={16} weight="bold" className="text-foreground/30 transition group-hover:text-primary" />
                    </a>
                    <a
                      href={PERSONAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-border bg-surface-2 px-5 py-4 transition-all hover:border-white/14 hover:bg-surface"
                    >
                      <div>
                        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">LinkedIn</p>
                        <p className="text-sm font-medium text-foreground">nadeemsaifrind</p>
                      </div>
                      <ArrowUpRight size={16} weight="bold" className="text-foreground/30 transition group-hover:text-primary" />
                    </a>
                    <a
                      href="/nadeem-saif-cv.pdf"
                      download
                      className="group flex items-center justify-between rounded-xl border border-border bg-surface-2 px-5 py-4 transition-all hover:border-white/14 hover:bg-surface"
                    >
                      <div>
                        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">Resume</p>
                        <p className="text-sm font-medium text-foreground">Download CV &ndash; PDF</p>
                      </div>
                      <ArrowUpRight size={16} weight="bold" className="text-foreground/30 transition group-hover:text-primary" />
                    </a>
                  </motion.div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════════════ */}
        <footer className="border-t border-border px-4 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-375 py-12 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="select-none text-4xl font-black lowercase tracking-[-0.06em] text-foreground lg:text-5xl">
                  nadeem<span className="text-primary">.</span>
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/38">
                  Creative Technologist &amp; Marketing Designer — brand, design, code &amp; content, shipped by one person.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground/50 transition hover:border-primary/40 hover:text-primary"
                >
                  <LinkedinLogo size={16} weight="fill" />
                </a>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground/50 transition hover:border-primary/40 hover:text-primary"
                >
                  Email me
                </a>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  aria-label="Back to top"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                >
                  <ArrowUp size={16} weight="bold" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-foreground/28">
                © {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.
              </span>
              <nav className="flex flex-wrap gap-x-6 gap-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs text-foreground/38 transition hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </footer>

      </main>

      <CaseStudies selected={selectedCase} setSelected={setSelectedCase} dialogOnly />
    </div>
  );
}
