import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { DISCIPLINES } from "@/lib/portfolio-data";
import dreamflyLogo from "@/assets/logos/dreamfly.svg";
import nextstepLogo from "@/assets/logos/nextstep.svg";
import nexttechLogo from "@/assets/logos/nexttech.svg";
import heroBg from "@/assets/hero-bg.png";
import heroBg2 from "@/assets/hero-bg-2.png";
import portraitFrame from "@/assets/proud-portrait.png";

const EASE = [0.22, 1, 0.36, 1] as const;

// Sits behind the portrait as a faint watermark, filling the whole frame
// so the photo reads as a portrait in a frame rather than a floating cutout.
// Never meant to be read closely — it's editorial texture, not copy.
const PORTRAIT_STORY =
  "NextStep Digital Studio was the first business I built from scratch. It started as a freelance design project and gradually became a creative studio delivering branding, websites, marketing campaigns and digital experiences for clients across different industries. DreamFly Consultancy was built to help students pursue international education through a transparent and practical process, and it continues to support students studying abroad. Today I am building NextTech, where design, software and business come together to create digital products that solve real problems. Across every venture, the approach has remained the same: identify the gap, simplify the challenge, design a better experience and build something people genuinely enjoy using. Every project has taught me something different about branding, systems, product thinking, communication and execution, and together they represent the work I am most proud of.";

// Mirrors Hero.tsx's PAGE_CONTAINER exactly, so the white card here shares
// the same left/right edges and width as the Hero's black card — the two
// sections read as one alternating design system, not two unrelated ones.
const PAGE_CONTAINER = "mx-auto w-full max-w-375 px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24";

interface Venture {
  name: string;
  domain: string;
  logo: string;
  url: string;
}

// Order = display order = reveal order.
const VENTURES: Venture[] = [
  { name: "NextStep Digital Studio", domain: "nsdigitals.com", logo: nextstepLogo, url: "https://nsdigitals.com/" },
  { name: "DreamFly Consultancy", domain: "dreamflyconsultants.com", logo: dreamflyLogo, url: "https://www.dreamflyconsultants.com/" },
  { name: "NextTech", domain: "nexttechonline.com", logo: nexttechLogo, url: "https://nexttechonline.com/" },
];

/* Premium horizontal skills strip — the same marquee animation used
   elsewhere on the site, adapted for the white transition band: transparent
   background, black type, green separator dots. A calm divider, not a
   section of its own. */
function SkillsStrip() {
  return (
    <div className="relative overflow-hidden py-5 sm:py-6">
      <div className="animate-marquee flex">
        {[...DISCIPLINES, ...DISCIPLINES].map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-6 px-6">
            <span className="text-base font-bold uppercase tracking-[0.16em] text-black/50 sm:text-lg">{item}</span>
            <span className="text-lg text-primary sm:text-xl" aria-hidden>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Repeated an even number of times so a y-translate of exactly -50% loops
// seamlessly (the second half is pixel-identical to the first).
const LENS_WORD_COPIES = Array.from({ length: 6 }, (_, i) => i);

/* The photo's own sunglasses do the framing — no drawn glasses needed. Each
   lens gets its own vertical "PROUD" ticker, clipped to a small window over
   the lens and scrolling endlessly (one lens up, the other down), glowing
   with a hue that cycles through the spectrum. The portrait itself never
   moves — only the LEDs inside the lenses do. */
// The glasses sit at a slight tilt in the source photo — the LEDs tilt with
// them so they read as reflections in the lens, not text pasted flat on top.
const LENS_TILT_DEG = -6;

function LensTicker({ position, reverse }: { position: string; reverse?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute h-[11%] w-[15%] overflow-hidden ${position}`}
      style={{ transform: `translate(-50%, -50%) rotate(${LENS_TILT_DEG}deg)` }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 flex flex-col items-center gap-2.5"
        style={{ color: "#f5fffb", textShadow: "0 0 5px currentColor, 0 0 12px currentColor, 0 0 26px currentColor" }}
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
          filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: "linear" },
          filter: { duration: 3.2, repeat: Infinity, ease: "linear" },
        }}
      >
        {LENS_WORD_COPIES.map((i) => (
          <span
            key={i}
            className="font-mono font-bold uppercase"
            style={{ fontSize: "clamp(0.3rem, 0.72vw, 0.46rem)", letterSpacing: "0.1em" }}
          >
            PROUD
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* Two-stage scroll reveal for the portrait. Both stages are measured off
   this component's own frame ref — the untransformed, never-moving outer
   box — rather than off the animated elements themselves. Measuring an
   element's own scroll-triggered offset against its own transformed
   position creates a feedback loop (the initial "hidden" offset changes
   what "in view" even means), so detection and motion are kept on
   separate elements. Stage one (low threshold) reveals the story text as
   the frame enters the viewport, leaving an empty outlined panel. Stage
   two (a higher threshold, reached only after more scrolling) brings the
   portrait rising up from beneath the frame, clipped into view by the
   frame's own overflow rather than fading in place. Not "once" — scrolling
   back out and back in replays both stages every time. */
function PortraitPanel() {
  const frameRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(frameRef, { once: false, amount: 0.15 });
  const portraitInView = useInView(frameRef, { once: false, amount: 0.5 });

  return (
    <div ref={frameRef} className="pointer-events-none absolute inset-0 overflow-hidden border border-black/10" aria-hidden>
      <motion.p
        className="absolute inset-0 text-justify text-[11px] leading-relaxed text-neutral-400/40 p-5 sm:text-xs sm:p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {PORTRAIT_STORY}
      </motion.p>

      <motion.div
        className="absolute inset-0"
        initial={{ y: "100%", opacity: 0 }}
        animate={portraitInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <img
          src={portraitFrame}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.15) brightness(1.02)", opacity: 0.93 }}
        />
        <LensTicker position="left-[37%] top-[36%] md:top-[34%]" />
        <LensTicker position="left-[59%] top-[34%] md:top-[32%]" reverse />
      </motion.div>
    </div>
  );
}

// Corner rounding for a seamless, gapless stack — only the outer edges of
// the whole block are rounded; cards touching in the middle stay square.
const STACK_ROUNDING = {
  first: "rounded-t-3xl",
  middle: "",
  last: "rounded-b-3xl",
} as const;
type StackPosition = keyof typeof STACK_ROUNDING;

/* A dark "product card" per venture. Two of the three source logos are
   baked onto opaque white squares (not transparent), so each mark sits in
   its own small white chip rather than fighting the dark surface. All three
   cards are identically sized — no hierarchy — and sit flush against each
   other with no gap, reading as one continuous stacked block. */
function VentureCard({ venture, index, position }: { venture: Venture; index: number; position: StackPosition }) {
  return (
    <motion.a
      href={venture.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${venture.name}`}
      className={`group relative block overflow-hidden border border-white/8 transition-all duration-500 ease-out hover:z-10 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.45)] ${STACK_ROUNDING[position]}`}
      style={{
        background: "linear-gradient(155deg, oklch(0.115 0.007 250) 0%, oklch(0.045 0.004 250) 100%)",
      }}
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.12 * index }}
    >
      {/* Subtle texture + sheen, same visual language as the Hero's card */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 18% 12%, oklch(0.64 0.145 168 / 0.16), transparent 60%)" }}
      />

      <div className="relative flex items-center gap-5 px-6 py-5 sm:px-7 sm:py-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white sm:h-14 sm:w-14">
          <img
            src={venture.logo}
            alt={venture.name}
            className="max-h-6 w-auto max-w-[65%] object-contain sm:max-h-7"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white sm:text-base">{venture.name}</p>
          <p className="mt-0.5 truncate text-[11px] text-white/35">{venture.domain}</p>
        </div>

        <ArrowUpRight
          size={15}
          weight="bold"
          className="shrink-0 text-white/40 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/80"
        />
      </div>
    </motion.a>
  );
}

/* The section immediately after the Hero — its inverted twin, reached
   through an intentional transition rather than a hard cut. It opens on the
   page's white background (room for the skills strip to breathe), then the
   background itself fades to the Hero's dark atmosphere roughly halfway
   down the floating card, so the bottom half of the card sits above black
   the same way the Hero's card sits above white. */
export function PassionProjects() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* White transition band — just enough space for the relocated skills
          strip to breathe, kept tight so the Hero and this section read as
          adjacent, not separated by a dead zone. */}
      <div className="pt-4 pb-6 sm:pt-6 sm:pb-8 md:pt-8 md:pb-10">
        <SkillsStrip />
      </div>

      {/* Full-width measuring wrapper: its height tracks the card + trailing
          padding below, so "top-1/2" on the dark layer lands at the card's
          vertical midpoint no matter the breakpoint or content height. */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 bottom-0 overflow-hidden" aria-hidden>
          {/* White-to-dark blend, then the Hero's exact dark atmosphere */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, oklch(1 0 0) 0%, var(--background) 42%, var(--background) 100%)" }}
          />
          <div className="absolute inset-0 overflow-hidden opacity-90">
            <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.06] mix-blend-overlay" />
            <img src={heroBg2} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          </div>
          <div style={{ position: "absolute", width: "60%", height: "60%", top: "10%", right: "-12%", background: "radial-gradient(ellipse at center, oklch(0.42 0.14 308 / 0.22), transparent 68%)", filter: "blur(72px)" }} />
          <div style={{ position: "absolute", width: "50%", height: "56%", bottom: "-6%", left: "-10%", background: "radial-gradient(ellipse at center, oklch(0.36 0.13 168 / 0.22), transparent 68%)", filter: "blur(72px)" }} />
          <div className="grid-bg absolute inset-0 opacity-40" />
        </div>

        <div className={`relative ${PAGE_CONTAINER} pb-14 sm:pb-16 md:pb-20 lg:pb-24`}>
          <motion.div
            className="relative overflow-visible rounded-[clamp(1.25rem,4vw,2.75rem)] bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="relative flex flex-col px-6 py-10 sm:px-8 sm:py-12 md:flex-row md:items-stretch md:gap-10 md:px-12 md:py-16 lg:gap-14 lg:px-16 lg:py-20">

              {/* Left column: heading on top, the three cards stacked
                  directly beneath it with no gap — one continuous block. */}
              <div className="relative md:w-[46%] md:shrink-0">
                <motion.div
                  className="relative z-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                >
                  <h2 className="display-hero text-[clamp(2.1rem,4.2vw,3.75rem)] text-black">
                    <span className="block">
                      <span
                        className="pr-1 font-normal"
                        style={{ fontFamily: "var(--font-signature)", fontSize: "1.05em" }}
                      >
                        The
                      </span>
                      projects
                    </span>
                    <span className="block">
                      I am{" "}
                      <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                        proud
                      </span>{" "}
                      of.
                    </span>
                  </h2>
                </motion.div>

                <div className="relative z-10 mt-8 flex flex-col sm:mt-10">
                  {VENTURES.map((venture, i) => (
                    <VentureCard
                      key={venture.name}
                      venture={venture}
                      index={i}
                      position={i === 0 ? "first" : i === VENTURES.length - 1 ? "last" : "middle"}
                    />
                  ))}
                </div>
              </div>

              {/* Right column: the portrait frame. On mobile/tablet it stacks
                  below the cards at its own aspect-ratio (full width); from
                  md: up that's handed off to "items-stretch" on the row, which
                  makes this column's height match the left column exactly, so
                  the frame's top lines up with the heading and its bottom
                  lines up with the last card — no manual offsets. "ml-auto"
                  pushes it flush against the row's own right padding, giving
                  it the same inset from the card's edge that the heading gets
                  from the left. Sharp corners, not rounded — reads as a frame,
                  not a card. */}
              <div className="relative z-0 mt-10 aspect-715/802 w-full sm:mt-12 md:mt-0 md:aspect-auto md:ml-auto md:w-[30%] lg:w-[32%]">
                <PortraitPanel />
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
