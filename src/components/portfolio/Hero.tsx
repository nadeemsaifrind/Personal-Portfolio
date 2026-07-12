import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PERSONAL, ACHIEVEMENTS } from "@/lib/portfolio-data";
import { HeroPortrait, HERO_PORTRAIT_FRAME_COUNT } from "./HeroPortrait";
import { useSectionEntry, useStepSequence } from "./useHeroSequence";
import heroBg from "@/assets/hero-bg.png";
import heroBg2 from "@/assets/hero-bg-2.png";

const EASE = [0.22, 1, 0.36, 1] as const;
const proofStats = ACHIEVEMENTS.slice(1); // industries, challenge wins, ventures — skip "years in Germany" here, used in copy instead

// Tagline word loop — independent from the portrait's frame timing.
const TAGLINE_WORDS = ["Ideas", "Brands", "Products", "Businesses", "Visions", "Growth"];
const WORD_STEP_MS = 1400;
// Portrait plays faster, as its own flipbook, and freezes on the last frame.
const PORTRAIT_STEP_MS = 110;

export function Hero() {
  const { sectionRef, visible, entry } = useSectionEntry();
  const wordStep = useStepSequence(TAGLINE_WORDS.length, WORD_STEP_MS, visible, entry, true);
  const portraitStep = useStepSequence(HERO_PORTRAIT_FRAME_COUNT, PORTRAIT_STEP_MS, visible, entry, false);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex min-h-svh flex-col justify-center pt-24 pb-16"
        style={{ background: "var(--background)" }}
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

        {/* Tagline sits above the portrait on mobile/tablet (the portrait pulls up
            to slightly overlap it); on desktop this is just the top of the left
            text column, with the portrait absolutely positioned on the right. */}
        <div className="relative z-10 mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
          <motion.h1
            className="display-hero max-w-[19ch] text-[clamp(2.2rem,4.6vw,4rem)]"
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
        </div>

        <HeroPortrait step={portraitStep} />

        <div className="relative z-10 mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
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
      </section>

      {/* ══ STATISTICS — a genuine sibling section, white, below the hero ══ */}
      <section className="relative bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-160"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.68 }}
          >
            {proofStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black tracking-tightest text-neutral-900 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-neutral-500 leading-snug">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
