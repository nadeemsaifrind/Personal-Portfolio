import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  DotsThree,
  LinkedinLogo,
  X,
} from "@phosphor-icons/react";
import heroCutoutImg from "@/assets/hero-cutout.png";
import { PERSONAL, CASE_STUDIES, type CaseStudy } from "@/lib/portfolio-data";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { ServiceStack } from "@/components/portfolio/ServiceStack";
import { RevealText } from "@/components/portfolio/sohub";
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

/* ── Nav links ─────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#projects", label: "Case Studies" },
  { href: "#contact", label: "Contact" },
];

/* ── Discipline marquee items ───────────────────────────────────────── */
const DISCIPLINES = [
  "Brand Identity",
  "Marketing Design",
  "Content Creation",
  "UX Design",
  "Web Development",
  "Startup Strategy",
  "Photography",
  "Social Media",
  "Campaign Design",
  "Motion & Video",
];

/* ── Stats ──────────────────────────────────────────────────────────── */
const STATS = [
  { value: "6+", label: "Years of creative work", sub: "Film school through to Germany" },
  { value: "20+", label: "Projects shipped", sub: "Across brand, digital, and product" },
  { value: "2", label: "Hackathon & award wins", sub: "WISAG & Kenergy competitions" },
];

/* ── Client showcase gallery rows ──────────────────────────────────── */
const _ns = CASE_STUDIES.find(cs => cs.id === "nextstep")!;
const _g = (slug: string) => _ns.clientGallery?.find(g => g.slug === slug)?.images ?? [];

const SHOWCASE_ROW_A = [..._g("arascow"), ..._g("bcl"), ..._g("pakworldhoney")];
const SHOWCASE_ROW_B = [..._g("potentialwecker"), ..._g("ednex"), ..._g("mousamargi")];

/* ── Role SEO ───────────────────────────────────────────────────────── */
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

/* ── Ease ───────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Client Work Showcase ───────────────────────────────────────────── */
function ClientShowcase() {
  return (
    <section className="section-glow section-glow-r py-12 sm:py-16 lg:py-24">
      {/* Header */}
      <div className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12 mb-10 lg:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-5 bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Client Portfolio</span>
            </div>
            <RevealText
              as="h2"
              className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[14ch]"
              lines={["Visual work done", "for real clients."]}
            />
          </div>
          <p className="text-sm text-foreground/40 max-w-[38ch] leading-relaxed sm:pb-1">
            Graphic design, branding, social visuals, and campaign assets — delivered across six industries.
          </p>
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="space-y-3 overflow-hidden">
        {/* Row A — scrolls left */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />
          <div className="animate-marquee-slow">
            {[...SHOWCASE_ROW_A, ...SHOWCASE_ROW_A].map((img, i) => (
              <div key={i} className="shrink-0 mx-1.5 w-44 sm:w-56 lg:w-64 aspect-square overflow-hidden rounded-xl bg-surface border border-border/50">
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row B — scrolls right */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />
          <div className="animate-marquee-reverse">
            {[...SHOWCASE_ROW_B, ...SHOWCASE_ROW_B].map((img, i) => (
              <div key={i} className="shrink-0 mx-1.5 w-44 sm:w-56 lg:w-64 aspect-square overflow-hidden rounded-xl bg-surface border border-border/50">
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Hero portrait with grayscale→color brush reveal on hover ────── */
const BRUSH = 150;

function HeroPortrait() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -800, y: -800 });

  const onMove = (e: React.MouseEvent) => {
    const rect = imgWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onTouch = (e: React.TouchEvent) => {
    const rect = imgWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    if (!touch) return;
    setPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
  };

  const mask = `radial-gradient(circle ${BRUSH}px at ${pos.x}px ${pos.y}px, transparent 30%, black ${BRUSH}px)`;
  const active = pos.x > 0 && pos.y > 0;

  return (
    <>
      {/* ── Mobile (<sm): full-bleed background — object-cover, no stretching ── */}
      <div className="pointer-events-none absolute inset-0 z-5 sm:hidden">
        <img
          src={heroCutoutImg}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-[center_8%]"
          style={{ filter: "grayscale(100%) brightness(0.48) contrast(1.12)" }}
        />
        {/* Left-heavy gradient — text zone stays dark, right edge shows portrait */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, var(--background) 28%, oklch(0.072 0.005 250 / 0.78) 52%, oklch(0.072 0.005 250 / 0.22) 88%)",
          }}
        />
        {/* Top vignette — blends behind fixed nav */}
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{ background: "linear-gradient(to bottom, var(--background), transparent)" }}
        />
        {/* Bottom vignette — dissolves cleanly into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        />
      </div>

      {/* ── Tablet & Desktop (sm+): right-column, brush-reveal on hover ── */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-5 hidden sm:block sm:w-[55%] sm:h-full lg:w-[60%] lg:h-screen"
      >
        {/* Left-edge fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2/5"
          style={{ background: "linear-gradient(to right, var(--background) 10%, transparent)" }}
        />
        {/* Top-edge fade */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36"
          style={{ background: "linear-gradient(to bottom, var(--background), transparent)" }}
        />

        {/* Inner wrapper sized by image — getBoundingClientRect() aligns with mask coords */}
        <div
          ref={imgWrapRef}
          onMouseMove={onMove}
          onMouseLeave={() => setPos({ x: -800, y: -800 })}
          onTouchStart={onTouch}
          onTouchMove={onTouch}
          onTouchEnd={() => setPos({ x: -800, y: -800 })}
          onTouchCancel={() => setPos({ x: -800, y: -800 })}
          className="pointer-events-auto absolute bottom-0 right-0 select-none touch-none"
          style={{ height: "96%", cursor: "none" }}
        >
          {/* Color base */}
          <img
            src={heroCutoutImg}
            alt="Nadeem Saif"
            draggable={false}
            className="block h-full w-auto"
            style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.55))" }}
          />
          {/* Grayscale overlay with brush-reveal mask */}
          <img
            src={heroCutoutImg}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute top-0 left-0 block h-full w-auto"
            style={{
              filter: "grayscale(100%) brightness(0.82) contrast(1.1)",
              WebkitMaskImage: mask,
              maskImage: mask,
            }}
          />
          {/* Brush cursor ring */}
          {active && (
            <div
              className="pointer-events-none absolute rounded-full border border-white/30"
              style={{ width: BRUSH * 2, height: BRUSH * 2, left: pos.x - BRUSH, top: pos.y - BRUSH }}
            />
          )}
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════ */

function Index() {
  const { role } = Route.useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const activeRole = useMemo(() => getRoleBySlug(role), [role]);

  /* Update meta tags for role-based SEO links */
  useEffect(() => {
    const meta = getRoleMeta(activeRole);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", meta.description);
  }, [activeRole]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">

      {/* ══ NAV ══════════════════════════════════════════════════════════ */}
      <motion.header
        className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-8 lg:px-10"
        style={{
          background: "oklch(0.072 0.005 250 / 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.97 0.003 250 / 0.07)",
        }}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Logo */}
        <a
          href="#top"
          className="text-[20px] font-black lowercase tracking-[-0.06em] text-foreground select-none"
        >
          nadeem<span className="text-primary">.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/50 transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="/nadeem-saif-cv.pdf"
            download
            className="hidden items-center rounded-full border border-border px-4 py-2 text-[13px] font-medium text-foreground/55 transition hover:border-white/18 hover:text-foreground md:flex"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="hidden items-center rounded-full border border-border bg-surface px-5 py-2 text-[13px] font-medium text-foreground/80 transition hover:bg-surface-2 md:flex"
          >
            Let's talk
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground/70 transition hover:bg-surface-2 md:hidden"
            aria-label="Open menu"
          >
            <DotsThree size={20} weight="bold" />
          </button>
        </div>
      </motion.header>

      {/* ══ MOBILE SHEET ═════════════════════════════════════════════════ */}
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

        {/* ══ HERO ════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden lg:min-h-screen">
          {/* Background glows */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute right-0 top-0 h-full w-[55%]"
              style={{ background: "radial-gradient(ellipse 70% 55% at 80% 45%, oklch(0.64 0.145 168 / 0.07), transparent 70%)" }} />
            <div className="absolute bottom-0 right-[18%] h-80 w-80 rounded-full bg-primary/5 blur-[110px]" />
          </div>

          {/* Portrait — absolutely positioned, full section height, brush reveal on hover */}
          <HeroPortrait />

          {/* Text content — z-10 floats above portrait; pointer-events-none on wrappers so mouse events reach the portrait behind */}
          <div className="pointer-events-none relative z-10 mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
            <motion.div
              className="pointer-events-none flex flex-col justify-start pt-24 pb-16 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-20"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {/* Availability chip */}
              <span className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Open to work · Germany
              </span>

              {/* Name */}
              <h1
                className="font-black lowercase text-foreground"
                style={{
                  fontSize: "clamp(3.2rem, 14vw, 15rem)",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.88,
                }}
              >
                nadeem<span className="text-primary">.</span>
              </h1>

              {/* Lightweight tagline */}
              <p
                className="mt-5 sm:mt-6 max-w-[44ch] sm:max-w-[52ch] text-foreground/38"
                style={{ fontSize: "clamp(0.78rem, 2.8vw, 1.05rem)", fontWeight: 300, lineHeight: 1.5 }}
              >
                Graphic Designer &amp; Content Creator&nbsp;&nbsp;|&nbsp;&nbsp;
                <span className="hidden sm:inline">Social Media · Marketing · Digital Publishing · Branding</span>
                <span className="sm:hidden">Social Media · Marketing · Branding</span>
              </p>

              {/* CTAs */}
              <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:bg-foreground/88"
                >
                  View Projects
                </a>
                <a
                  href="/nadeem-saif-cv.pdf"
                  download
                  className="inline-flex items-center rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-semibold text-foreground/65 transition hover:bg-surface-2 hover:text-foreground"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ DISCIPLINE MARQUEE ══════════════════════════════════════════ */}
        <div className="relative overflow-hidden border-y border-border py-4">
          <div className="animate-marquee flex">
            {[...DISCIPLINES, ...DISCIPLINES].map((item, i) => (
              <div key={i} className="flex shrink-0 items-center gap-5 px-5">
                <span className="text-[11px] uppercase tracking-[0.24em] text-foreground/28">
                  {item}
                </span>
                <span className="text-primary" aria-hidden>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CLIENT SHOWCASE ═════════════════════════════════════════════ */}
        <ClientShowcase />

        {/* ══ PROJECTS ════════════════════════════════════════════════════ */}
        <section id="projects" className="section-glow py-16 sm:py-24 lg:py-36">
          <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">

            {/* Section header — label + heading left, subtext right */}
            <div className="mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-5 bg-primary" />
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Selected Work</span>
                </div>
                <RevealText
                  as="h2"
                  className="display-hero max-w-[20ch] text-[clamp(2rem,4vw,4rem)]"
                  lines={["Projects worth", "looking at."]}
                />
              </div>
              <p className="text-sm text-foreground/40 max-w-[34ch] leading-relaxed sm:pb-1">
                Case studies across brand, product, and digital — each one solving a real problem.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.slice(0, 6).map((project, index) => (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedCase(project)}
                  className="group text-left flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 hover:border-white/14"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: index * 0.05, duration: 0.6, ease: EASE }}
                >
                  {/* Full-bleed image with title overlaid */}
                  <div className="relative aspect-video overflow-hidden bg-surface-2">
                    {project.coverImage && (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    )}
                    {/* Strong bottom gradient for text legibility */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Achievement badge top-right */}
                    {project.achievement && (
                      <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                        {project.achievement}
                      </span>
                    )}
                    {/* Title + context overlaid at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                        {project.context}
                      </p>
                      <h3 className="text-[15px] font-bold leading-snug tracking-tight text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Minimal footer strip */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/35">
                      {project.tag}
                    </span>
                    <div className="flex items-center gap-2 text-foreground/28">
                      <span className="font-mono text-[9px]">{project.year}</span>
                      <ArrowUpRight size={11} weight="bold" className="transition-colors duration-200 group-hover:text-primary" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

          </div>
        </section>

        {/* ══ SERVICES (ServiceStack bento) ═══════════════════════════════ */}
        <ServiceStack />

        {/* ══ STATS ═══════════════════════════════════════════════════════ */}
        <section className="section-glow section-glow-r border-y border-border py-12 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12">
            <div className="mb-14 lg:mb-18">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-5 bg-primary" />
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">By the numbers</span>
              </div>
              <RevealText
                as="h2"
                className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[18ch]"
                lines={["Actions speak", "louder than words."]}
              />
            </div>

            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  className="flex flex-col gap-2 py-10 sm:px-10 lg:px-14 first:pl-0 last:pr-0 first:pt-0 last:pb-0 sm:first:pt-10 sm:last:pb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                >
                  <p
                    className="font-black tracking-tightest leading-none text-foreground"
                    style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground/75">{stat.label}</p>
                  <p className="text-xs text-foreground/38">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ═════════════════════════════════════════════════════ */}
        <section id="contact" className="relative overflow-hidden py-24 lg:py-36">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-[60%] w-[45%] -translate-y-1/2"
            style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, oklch(0.64 0.145 168 / 0.06), transparent 70%)" }}
          />

          <div className="relative z-10 mx-auto max-w-375 px-4 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

              {/* Left: text */}
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-5 bg-primary" />
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Contact</span>
                </div>
                <RevealText
                  as="h2"
                  className="display-hero text-[clamp(3rem,8vw,7rem)] max-w-[10ch]"
                  lines={["Let's create", "something."]}
                />
                <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-foreground/45">
                  Open to the right role in Germany — brand, marketing, or product. Let's build something worth talking about.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-xs text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Available for the right role
                </span>
              </div>

              {/* Right: contact links card */}
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
                    <p className="text-sm font-medium text-foreground">Download CV — PDF</p>
                  </div>
                  <ArrowUpRight size={16} weight="bold" className="text-foreground/30 transition group-hover:text-primary" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
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
