import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  LinkedinLogo,
  X,
} from "@phosphor-icons/react";
import heroBg from "@/assets/hero-bg.png";
import heroBg2 from "@/assets/hero-bg-2.png";
import { PERSONAL, CASE_STUDIES, type CaseStudy } from "@/lib/portfolio-data";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { Hero } from "@/components/portfolio/Hero";
import { PassionProjects } from "@/components/portfolio/PassionProjects";
import { AchievementsBanner } from "@/components/portfolio/AchievementsBanner";
import { CaseStudyCarousel } from "@/components/portfolio/CaseStudyCarousel";
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
  { href: "#expertise", label: "Expertise" },
  { href: "#journey", label: "Story" },
];

const ACTION_LINKS = [
  { href: "/nadeem-saif-cv.pdf", label: "Download CV", download: true },
  { href: "#contact", label: "Let's Talk", accent: true },
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
  const [showAllCases, setShowAllCases] = useState(false);

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
        <Hero navLinks={NAV_LINKS} actionLinks={ACTION_LINKS} onOpenMobileMenu={() => setMobileOpen(true)} />

        {/* ══ PASSION PROJECTS — editorial scroll story ═══════════════ */}
        <PassionProjects />

        {/* ══ ACHIEVEMENTS IN GERMANY — hackathon photo banner ═════════ */}
        <AchievementsBanner />

        {/* ══ CASE STUDY — Vanessa Veith, horizontal filmstrip ═════════ */}
        <CaseStudyCarousel />

        {/* ══ NEXT STEP DIGITAL — interactive client-card feature ═════ */}
        <NextStepFeature onOpenCaseStudy={() => setSelectedCase(nextstepCase)} />

        {/* ══ FEATURED CASE STUDIES — told in full, no modal needed ═══ */}
        <section id="projects" className="section-glow py-16 sm:py-24 lg:py-36">
          <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
            <RevealText
              as="h2"
              className="display-hero max-w-[20ch] text-[clamp(2rem,4vw,4rem)] mb-4"
              lines={[
                <>
                  Evidence, not{" "}
                  <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                    claims
                  </span>
                  .
                </>,
              ]}
            />
            <p className="max-w-[46ch] text-sm leading-relaxed text-foreground/40">
              Real client work, real competition results, real products shipped.
            </p>

            <div className="mt-6 divide-y divide-border">
              {featured
                .filter((cs) => cs.id !== "dreamfly" && cs.id !== "kenergy")
                .map((cs, i) => (
                  <CaseStudyFeature
                    key={cs.id}
                    cs={cs}
                    reverse={i % 2 === 1}
                    onOpenFull={() => setSelectedCase(cs)}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* ══ DREAMFLY — white band ═══════════════════════════════════════ */}
        {featured
          .filter((cs) => cs.id === "dreamfly")
          .map((cs) => (
            <section key={cs.id} className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-36">
              <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
                <CaseStudyFeature
                  cs={cs}
                  reverse
                  onOpenFull={() => setSelectedCase(cs)}
                  hideCover
                  light
                />
              </div>
            </section>
          ))}

        {/* ══ KENERGY ══════════════════════════════════════════════════ */}
        {featured
          .filter((cs) => cs.id === "kenergy")
          .map((cs) => (
            <section key={cs.id} className="section-glow relative overflow-hidden py-16 sm:py-24 lg:py-36" style={{ background: "var(--background)" }}>
              <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
                <CaseStudyFeature
                  cs={cs}
                  reverse
                  onOpenFull={() => setSelectedCase(cs)}
                />
              </div>
            </section>
          ))}

        {/* ══ EXPLORE MORE — white band, same rhythm as the Branding section ═══ */}
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
            {!showAllCases ? (
              <motion.button
                type="button"
                onClick={() => setShowAllCases(true)}
                className="group flex w-full items-center justify-between gap-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="display-hero text-[clamp(1.75rem,3.6vw,3rem)] text-black">
                  Explore{" "}
                  <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                    more
                  </span>{" "}
                  case studies.
                </span>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-black/15 bg-black/5 text-black/70 transition group-hover:border-black/30 group-hover:bg-black/10 group-hover:text-black sm:h-16 sm:w-16">
                  <ArrowUpRight size={22} weight="bold" />
                </span>
              </motion.button>
            ) : (
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
            )}
          </div>
        </section>

        {/* ══ JOURNEY ══════════════════════════════════════════════════ */}
        <JourneyTimeline />

        {/* ══ STATS + ACHIEVEMENTS ═════════════════════════════════════ */}
        <StatsAchievements />

        {/* ══ CONTACT — mirrors the Hero card: white margin, floating rounded
             dark card, same cosmos-glow/grid-bg background treatment ══════ */}
        <section id="contact" className="relative bg-white pt-10 pb-4 sm:pt-14 md:pb-6 lg:pt-20">
          <div className="mx-auto w-full max-w-375 px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
            <div className="relative overflow-hidden rounded-[clamp(1.25rem,4vw,2.75rem)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]" style={{ background: "var(--background)" }}>
              {/* Background layers — identical treatment to the Hero card */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.06] mix-blend-overlay" />
                <img src={heroBg2} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--background) 0%, transparent 22%, transparent 65%, var(--background) 100%)" }} />
              </div>
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div style={{ position: "absolute", width: "58%", height: "60%", top: "-10%", left: "-10%", background: "radial-gradient(ellipse at center, oklch(0.36 0.13 168 / 0.26), transparent 68%)", filter: "blur(72px)" }} />
                <div style={{ position: "absolute", width: "52%", height: "56%", bottom: "-8%", right: "-10%", background: "radial-gradient(ellipse at center, oklch(0.42 0.14 308 / 0.24), transparent 68%)", filter: "blur(72px)" }} />
                <div className="grid-bg absolute inset-0 opacity-40" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 items-stretch">

                {/* Left: wordmark, centered */}
                <div className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "62svh", containerType: "inline-size" }}>
                  <div className="pointer-events-none flex justify-center px-4">
                    <motion.h2
                      className="font-black lowercase text-foreground whitespace-nowrap"
                      style={{ fontSize: "clamp(2.4rem, 15cqw, 10rem)", letterSpacing: "-0.06em", lineHeight: 1 }}
                      initial={{ opacity: 0, y: 40, scale: 0.93 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "0px" }}
                      transition={{ delay: 0.15, duration: 1, ease: EASE }}
                    >
                      nadeem<span style={{ color: "oklch(0.64 0.145 168)" }}>.</span>
                    </motion.h2>
                  </div>
                </div>

                {/* Right: headline + contact links */}
                <div className="flex flex-col justify-center px-4 pb-12 pt-10 sm:px-8 lg:px-12 lg:py-16">
                  <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-xs text-primary w-fit">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    Available for the right role
                  </span>

                  <motion.h3
                    className="display-hero max-w-[14ch] text-[clamp(1.9rem,3.6vw,3rem)]"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    Let's build something{" "}
                    <span
                      className="pr-1 font-normal"
                      style={{ fontFamily: "var(--font-signature)", fontSize: "0.85em" }}
                    >
                      worth
                    </span>
                    <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                      remembering
                    </span>
                    .
                  </motion.h3>

                  <motion.div
                    className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6"
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
                        <p className="mb-1 text-xs text-foreground/35">Email</p>
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
                        <p className="mb-1 text-xs text-foreground/35">LinkedIn</p>
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
                        <p className="mb-1 text-xs text-foreground/35">Resume</p>
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
                  className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground/50 transition hover:border-primary/40 hover:text-primary"
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
