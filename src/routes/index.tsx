import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ChatCircleText,
  DotsThree,
  LinkedinLogo,
  X,
} from "@phosphor-icons/react";
import { CASE_STUDIES, PERSONAL, type CaseStudy } from "@/lib/portfolio-data";
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

const NAV_LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip selection:bg-ink selection:text-white">
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
            className="group hidden items-center rounded-full bg-foreground/[0.06] p-1.5 pl-8 text-ink transition-transform duration-500 hover:scale-105 md:flex"
          >
            <span className="mr-5 text-base font-semibold uppercase tracking-tight">
              Let's talk
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface">
              <ChatCircleText
                size={20}
                weight="bold"
                className="transition-transform duration-500 group-hover:-translate-y-8"
              />
              <ChatCircleText
                size={20}
                weight="bold"
                className="absolute translate-y-8 transition-transform duration-500 group-hover:translate-y-0"
              />
            </span>
          </a>

          <button
            onClick={() => setMobileOpen(true)}
            className="group flex items-center rounded-full bg-ink p-1.5 pl-8 text-white transition-transform duration-500 hover:scale-105"
            aria-label="Open menu"
          >
            <span className="mr-5 text-base font-semibold uppercase tracking-tight">Menu</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08]">
              <DotsThree
                size={28}
                weight="bold"
                className="transition-transform duration-500 group-hover:rotate-90"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="w-80 flex flex-col bg-background border-l border-border [&>button]:hidden"
        >
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
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-3 py-3 text-4xl font-semibold tracking-tight text-foreground/80 transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <MagneticButton href="#contact" variant="primary" className="w-full justify-between">
              Hire me
            </MagneticButton>
          </div>
        </SheetContent>
      </Sheet>

      <main id="top">
        <section className="relative h-[90vh] min-h-[560px] w-screen overflow-hidden lg:h-[96vh] lg:min-h-[680px]">
          {/* Wordmark + tagline group — occupies the right 3/4, 1/4 gap on the left */}
          <div className="absolute left-1/4 top-[53%] z-10 -translate-y-1/2 pr-2">
            <HeroWordmark />

            {/* Tagline sits below the wordmark, left-aligned, clear of it */}
            <motion.p
              className="mt-5 whitespace-nowrap text-[1.6rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.1rem] lg:mt-6 lg:text-[3rem]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Design, <span className="brand-text">Ideas</span> and
              <br />
              Everything in <span className="text-muted-foreground">between.</span>
            </motion.p>
          </div>

          {/* Scroll cue */}
          <motion.span
            className="absolute bottom-[7%] left-4 z-20 text-xl font-semibold text-muted-foreground md:left-8 lg:left-12 lg:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            Scroll
          </motion.span>
        </section>

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
          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-8 lg:px-12">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Let's work together
            </span>
            <RevealText
              as="h2"
              className="display-hero mt-4 max-w-[8ch] text-[clamp(5rem,14vw,13rem)] leading-[0.82]"
              lines={["Don't", "be shy"]}
            />
            <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-16">
              <MagneticButton href={`mailto:${PERSONAL.email}`} variant="ink" icon>
                Start a conversation
              </MagneticButton>
              <MagneticButton href={PERSONAL.linkedin} variant="ghost" icon>
                LinkedIn
              </MagneticButton>
            </div>
          </div>
        </section>

        <footer className="relative w-screen px-4 pb-6 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1500px] overflow-hidden rounded-[2rem] bg-ink text-white">
            <div className="flex flex-col gap-10 px-6 py-12 sm:px-10 lg:gap-12 lg:px-14 lg:py-16">
              {/* Top — wordmark + socials */}
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="select-none text-5xl font-black lowercase tracking-[-0.05em] lg:text-7xl">
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
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] text-white transition-colors hover:bg-primary"
                  >
                    <LinkedinLogo size={20} weight="fill" />
                  </a>
                  <a
                    href={`mailto:${PERSONAL.email}`}
                    className="inline-flex items-center rounded-full bg-white/[0.08] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white/[0.16]"
                  >
                    Email me
                  </a>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                  >
                    <ArrowUp
                      size={18}
                      weight="bold"
                      className="transition-transform duration-500 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              {/* Bottom — copyright + nav */}
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

function HeroWordmark() {
  const letters = "nadeem";
  return (
    <h1
      aria-label="Nadeem"
      style={{ marginLeft: "-0.04em" }}
      className="select-none whitespace-nowrap text-[clamp(5rem,20.5vw,20rem)] font-extrabold leading-[0.72] tracking-[-0.06em] text-ink"
    >
      {letters.split("").map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 + index * 0.05, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {letter}
        </motion.span>
      ))}
    </h1>
  );
}

function ProjectsGrid({ onSelect }: { onSelect: (cs: CaseStudy) => void }) {
  return (
    <section
      id="projects"
      className="relative w-screen px-4 pb-10 pt-12 md:px-8 lg:px-12 lg:pb-16 lg:pt-16"
    >
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 lg:gap-10">
        <div className="flex flex-col gap-4">
          <motion.span
            className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55 }}
          >
            Work
          </motion.span>
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
              className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-ink text-left lg:rounded-3xl"
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
