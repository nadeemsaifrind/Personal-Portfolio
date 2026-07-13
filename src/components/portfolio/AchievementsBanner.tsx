import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Reveal } from "./sohub";
import aiImg from "@/assets/card-ai.png";
import marketerImg from "@/assets/card-marketer.jpeg";
import coderImg from "@/assets/card-coder.jpeg";
import kenergyImg from "@/assets/cs-kenergy-2.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

// Mirrors Hero.tsx's / PassionProjects.tsx's PAGE_CONTAINER exactly, so this
// section shares the same left/right edges as the rest of the page — the
// same continuity rule as before, just now on the white background Hero
// itself uses, rather than the dark one.
const PAGE_CONTAINER = "mx-auto w-full max-w-375 px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24";

const BANNER_STATS = [
  { value: "2+", label: "Years in Germany" },
  { value: "M.A.", label: "Media, Technology and Society" },
  { value: "B2", label: "German proficiency" },
  { value: "18mo", label: "Werkstudent — Branding & Marketing" },
  { value: "WISAG · Kenergy", label: "Design challenges won — ×2" },
];

// Photo sequence for the scroll stack, each tuned so its subjects stay in
// frame under object-cover's crop. Order = scroll (step) order — always
// starts on slide 0, the AI hackathon photo, sitting flat/uncovered.
const SLIDES = [
  { src: aiImg, position: "50% 30%", alt: "Nadeem Saif and teammates at the LAUNCH Rhein-Main Build Days hackathon" },
  { src: marketerImg, position: "50% 32%", alt: "Nadeem Saif directing a product photography shoot" },
  { src: coderImg, position: "30% 30%", alt: "Nadeem Saif presenting a dashboard build at a hackathon" },
  { src: kenergyImg, position: "50% 55%", alt: "Nadeem Saif presenting on stage at the Kenergy Challenge" },
];

// Every photo is the exact same width, perfectly left/right-aligned (no
// rotation, no horizontal drift) — only the vertical position differs, each
// one sitting a fixed fraction of the stage's own height lower than the
// last so a consistent strip of every earlier photo stays visible above it.
// Expressed as a percentage of the stage (not pixels), so it stays correct
// no matter how the stage itself is sized.
const PEEK_FRACTION = 0.05; // how much of a card's own height peeks out above the next — small on purpose, so each new photo reads as covering the last almost entirely rather than a fanned deck
const STAGE_MULTIPLIER = 1 + (SLIDES.length - 1) * PEEK_FRACTION;
const CARD_HEIGHT_PCT = 100 / STAGE_MULTIPLIER; // each photo's height, as % of the stage
const STEP_PCT = (PEEK_FRACTION / STAGE_MULTIPLIER) * 100; // vertical offset per step, as % of the stage

// One dedicated screen-height of scroll per photo — the stack pins in place
// (see the `sticky` wrapper below) for exactly this much scrolling before
// releasing to the next section, so each scroll gesture reliably deals one
// more photo onto the pile rather than blowing past several at once.
const STEP_HEIGHT_VH = 100;

/* One photo in the pile. Reveal is the exact same clip mechanic as
   PortraitPanel's photo and HeroPortrait: this frame (fixed size, in its
   final resting position, never itself animated) clips an inner image that
   rises from y:100% (fully below, invisible) to y:0% — same duration/easing
   too — instead of fading or scaling in place. Earlier photos never leave;
   each new step reveals the next frame on top, so scrolling builds up a
   stack. Scrolling back past a step un-deals that photo (reverses the
   rise), same reversible contract as the rest of the site's scroll reveals. */
function StackedPhoto({
  slide,
  topPct,
  index,
  isDealt,
}: {
  slide: (typeof SLIDES)[number];
  topPct: number;
  index: number;
  isDealt: boolean;
}) {
  return (
    <div
      className="absolute inset-x-0 overflow-hidden rounded-[clamp(1rem,3vw,1.75rem)] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]"
      style={{ top: `${topPct}%`, height: `${CARD_HEIGHT_PCT}%`, zIndex: index }}
    >
      <motion.img
        src={slide.src}
        alt={slide.alt}
        style={{ objectPosition: slide.position }}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ y: "100%", opacity: 0 }}
        animate={isDealt ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </div>
  );
}

/* Replaces the old full-bleed "Why me" banner: a smaller, sharper photo
   stack on the right (the low-res source photos read far better small),
   paired with the headline and stats on the left — the same "content column
   + visual column" split as Hero and Passion Projects, on Hero's white
   background rather than a dark card. Both columns share one tall scroll
   wrapper and stay sticky together, so the text and the photo stack hold
   their positions side by side for the whole scroll sequence. */
export function AchievementsBanner() {
  // Bound to the photo stack's own spacer below (not this whole section) —
  // that spacer is the one true 400vh box the pin actually travels across.
  // Measuring against a wrapper that also contains the headline used to
  // break on mobile: grid-cols-1 stacks the headline's row above the photo
  // stack's row, making the *rendered* content taller than any single fixed
  // height we could put on an outer wrapper, so scrollYProgress reached 1
  // before the stack had actually finished its on-screen travel — the stack
  // stayed visibly pinned/stuck well into the next section instead of
  // releasing on time.
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(SLIDES.length - 1, Math.max(0, Math.floor(v * SLIDES.length)));
    setActiveIndex(idx);
  });

  return (
    <section id="why-me" className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className={PAGE_CONTAINER}>
        <div className="relative">
          <div className="grid grid-cols-1 items-start gap-y-10 md:grid-cols-2 md:gap-x-14 lg:gap-x-20">

            {/* Left — headline + stats, matching Hero's own type system:
                bold sans throughout except one italic serif-accent word.
                Only sticky from md: up, alongside the pinned photo stack —
                on mobile (single column) it scrolls normally above the
                stack instead, since two independent sticky elements stacked
                in one column would both lock to the same screen position
                and overlap. */}
            <div className="md:sticky md:top-24">
              <Reveal>
                <h2 className="display-hero max-w-[16ch] text-[clamp(2rem,4vw,3.5rem)] text-black">
                  <span className="block">
                    What I've{" "}
                    <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                      built
                    </span>
                  </span>
                  <span className="block">
                    <span
                      className="pr-1 font-normal"
                      style={{ fontFamily: "var(--font-signature)", fontSize: "0.9em" }}
                    >
                      in
                    </span>
                    Germany.
                  </span>
                </h2>

                <div className="mt-10 flex max-w-md flex-col gap-6 sm:gap-7">
                  {BANNER_STATS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8% 0px" }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 }}
                    >
                      <p className="text-3xl font-black leading-none tracking-tight text-black sm:text-4xl">
                        {item.value}
                      </p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-black/45 sm:text-sm">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — the photo stack, filling the column's full width so
                its right edge lines up with the section's right padding,
                the same way the headline lines up with the left padding.
                This column carries its own explicit tall spacer (the actual
                scroll target, via stackRef above) so its grid row sizes
                correctly whether it's sharing a row with the headline
                (desktop, md:grid-cols-2) or sitting in its own row below it
                (mobile, grid-cols-1) — relying on the grid row to inherit
                height from a sibling only works when there's exactly one
                row. */}
            <div ref={stackRef} className="relative" style={{ height: `${SLIDES.length * STEP_HEIGHT_VH}svh` }}>
              <div className="sticky top-14 sm:top-20 md:top-24">
                <Reveal delay={0.1}>
                  {/* Sized to fill the viewport space actually left over
                      below the sticky offset (not a fixed aspect ratio) —
                      on a narrow, tall mobile screen a width-driven aspect
                      ratio produces a short card with a lot of bare page
                      left showing underneath it while the stack is pinned;
                      filling the real remaining height means there's never
                      empty background visible during the scroll sequence. */}
                  <div className="relative w-full h-[calc(100svh-5.5rem)] sm:h-[calc(100svh-7rem)] md:h-[calc(100svh-8rem)]">
                    {SLIDES.map((slide, i) => (
                      <StackedPhoto
                        key={slide.src}
                        slide={slide}
                        topPct={i * STEP_PCT}
                        index={i}
                        isDealt={activeIndex >= i}
                      />
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
