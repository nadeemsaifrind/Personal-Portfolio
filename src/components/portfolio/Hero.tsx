import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, DotsThree } from "@phosphor-icons/react";
import { PERSONAL } from "@/lib/portfolio-data";
import { HeroPortrait, HERO_PORTRAIT_FRAME_COUNT } from "./HeroPortrait";
import { useSectionEntry, useStepSequence } from "./useHeroSequence";
import heroBg from "@/assets/hero-bg.png";
import heroBg2 from "@/assets/hero-bg-2.png";

const EASE = [0.22, 1, 0.36, 1] as const;

// Tagline word loop — independent from the portrait's frame timing.
const TAGLINE_WORDS = ["Ideas", "Brands", "Products", "Businesses", "Visions", "Growth"];
const WORD_STEP_MS = 1400;
// Portrait plays faster, as its own flipbook, and freezes on the last frame.
const PORTRAIT_STEP_MS = 110;

// Shared by the nav strip and the hero card so both align to the exact same
// left/right edges and read as two parts of one design system.
const PAGE_CONTAINER = "mx-auto w-full max-w-375 px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24";

interface HeroProps {
  navLinks: { href: string; label: string }[];
  onOpenMobileMenu: () => void;
}

export function Hero({ navLinks, onOpenMobileMenu }: HeroProps) {
  const { sectionRef, visible, entry } = useSectionEntry();
  const wordStep = useStepSequence(TAGLINE_WORDS.length, WORD_STEP_MS, visible, entry, true);
  const portraitStep = useStepSequence(HERO_PORTRAIT_FRAME_COUNT, PORTRAIT_STEP_MS, visible, entry, false);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-white pt-4 pb-10 sm:pt-5 md:pb-14 lg:pt-6"
      >
        {/* Outer white margin — the nav strip and the card both live in this
            same container, so they're centered and framed identically, never
            full-bleed. */}
        <div className={PAGE_CONTAINER}>
          {/* Nav strip — a small rounded black bar matching the hero card,
              scrolls away with the page instead of staying pinned. */}
          <motion.header
            className="relative z-30 mb-6 flex items-center justify-between rounded-[clamp(1rem,3vw,2rem)] px-4 py-2.5 sm:mb-8 md:mb-10 md:px-6 lg:mb-14 lg:px-8"
            style={{
              background: "oklch(0.072 0.005 250 / 0.82)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid oklch(0.97 0.003 250 / 0.09)",
            }}
            initial={{ y: -20, opacity: 0 }}
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
              {navLinks.map((item) => (
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
                onClick={onOpenMobileMenu}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground/70 transition hover:bg-surface-2 md:hidden"
                aria-label="Open menu"
              >
                <DotsThree size={18} weight="bold" />
              </button>
            </div>
          </motion.header>

          {/* Black hero card — overflow stays visible so the portrait's head can
              break through the top edge; only the layer below is clipped. */}
          <div className="relative overflow-visible rounded-[clamp(1.25rem,4vw,2.75rem)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
            {/* Clipped background layer — image, cosmos glow and grid all live here
                so they respect the card's rounded corners. */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[clamp(1.25rem,4vw,2.75rem)]"
              style={{ background: "var(--background)" }}
              aria-hidden
            >
              {/* Background image layers */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <img
                  src={heroBg}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.06] mix-blend-overlay"
                />
                <img
                  src={heroBg2}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--background) 0%, transparent 22%, transparent 65%, var(--background) 100%)" }} />
              </div>

              {/* Cosmos glow — dark, restrained */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div style={{ position: "absolute", width: "60%", height: "60%", top: "-8%", right: "-12%", background: "radial-gradient(ellipse at center, oklch(0.42 0.14 308 / 0.24), transparent 68%)", filter: "blur(72px)" }} />
                <div style={{ position: "absolute", width: "50%", height: "56%", bottom: "-10%", left: "-10%", background: "radial-gradient(ellipse at center, oklch(0.36 0.13 168 / 0.22), transparent 68%)", filter: "blur(72px)" }} />
                {/* Warm goldish-white bloom behind the portrait's head — matches the hair's rim-light tone so the figure and scene read as one light source */}
                <div style={{ position: "absolute", width: "38%", height: "42%", top: "2%", right: "6%", background: "radial-gradient(ellipse at center, oklch(0.86 0.05 82 / 0.45), transparent 70%)", filter: "blur(64px)" }} />
                <div className="grid-bg absolute inset-0 opacity-40" />
              </div>
            </div>

            {/* Content layer — sits above the clipped background; the portrait
                (a child of this layer, but position: absolute on md+) is free to
                render past this element's own box since nothing here clips it. */}
            <div className="relative z-10 px-4 pt-12 pb-10 sm:px-8 sm:pt-14 md:px-12 md:pt-16 md:pb-14 lg:px-12">
              <motion.h1
                className="display-hero max-w-[19ch] text-[clamp(2.2rem,4.6vw,4rem)] md:max-w-[13ch] lg:max-w-[14ch]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              >
                <span className="block">
                  Turning{" "}
                  <span
                    className="relative inline-block text-left align-baseline"
                    style={{ fontFamily: "var(--font-serif-accent)" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={TAGLINE_WORDS[wordStep]}
                        className="inline-block font-normal italic text-foreground"
                        initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        {TAGLINE_WORDS[wordStep]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
                <span className="block">
                  <span
                    className="pr-1 font-normal"
                    style={{ fontFamily: "var(--font-signature)", fontSize: "0.85em" }}
                  >
                    into
                  </span>
                  experiences people remember.
                </span>
              </motion.h1>

              <HeroPortrait step={portraitStep} />

              <div>
                <motion.p
                  className="mt-4 max-w-[48ch] text-xs leading-relaxed text-foreground/45"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.48 }}
                >
                  {PERSONAL.description}
                </motion.p>

                <motion.div
                  className="mt-9 flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.56 }}
                >
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    View Work <ArrowUpRight size={14} weight="bold" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground/65 transition hover:bg-surface"
                  >
                    Let's talk
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
