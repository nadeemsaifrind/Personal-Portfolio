import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./sohub";

gsap.registerPlugin(ScrollTrigger);

// Mirrors Hero.tsx's / PassionProjects.tsx's PAGE_CONTAINER exactly, so this
// section shares the same left/right edges as the rest of the page.
const PAGE_CONTAINER = "mx-auto w-full max-w-375 px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24";
// The card deck itself sits inset further than the rest of the page — more
// side padding so the cards read as a contained object, not a near-full-
// width slab, on small screens especially.
const CARDS_CONTAINER = "mx-auto w-full max-w-375 px-7 sm:px-10 md:px-10 lg:px-12 xl:px-16 2xl:px-24";

// Text-only cards now (no image frame) — this is a from-scratch rebuild after
// inspecting sohub.digital's actual services-section DOM/GSAP setup directly
// (their site, not a guess). Their real mechanism is NOT CSS `position:
// sticky` at all — every card is `position: absolute`, stacked in one
// `position: relative` wrapper, and that whole wrapper is pinned
// (`ScrollTrigger`'s `pin: true`, i.e. `position: fixed` under the hood) for
// one long scroll range. Confirmed via live computed styles: opacity stayed
// "1" and filter stayed "none" on every card at every scroll step — no fade,
// no dimming filter anywhere. Depth comes purely from scale + translateY +
// z-index. And critically, an early card doesn't just compress once: card 1
// keeps compressing further (scale and y both step down again) each time a
// *later* card arrives, converging on card 1's final "N cards deep" resting
// state only once every later card has taken its turn. Only each card's own
// height is responsive (h-[54vh] on mobile, h-[80vh] from md up). The next
// card sits immediately below the front one (yPercent: 100 of its own box),
// so as long as two stacked cards together are taller than the viewport,
// there's no gap of bare section-background below the front card — that's
// the real constraint on the minimum height here, not filling the whole
// screen with one card (a much smaller, non-viewport-filling height reads as
// "big/bulky" on mobile without fixing anything, since the gap comes from
// two cards together falling short of the viewport, not from one card being
// short). Card content is centered (justify-center, not justify-between)
// inside the box, so it reads as a compact, intentionally-framed block
// rather than stretching sparse text across the full height.
// SEGMENT_PX is the scroll distance allotted to each transition (kept large
// — roughly a viewport — on purpose, so nothing finishes in one wheel flick).
const SEGMENT_PX = 850;
const SCALE_STEP = 0.05;
const Y_STEP = 60;

interface GermanyCard {
  stat: string;
  title: string;
  text: string;
  tags: string[];
  category: string;
}

const CARDS: GermanyCard[] = [
  {
    stat: "2+",
    title: "Years in Germany",
    text: "Two years of adapting, learning, building connections, and developing my creative career in a completely new environment.",
    tags: ["Germany", "Adaptation"],
    category: "Timeline",
  },
  {
    stat: "18mo",
    title: "Branding & Marketing",
    text: "Eighteen months of working-student experience creating brand systems, websites, social content, campaigns, photography, and B2B communication for German companies.",
    tags: ["Werkstudent", "B2B"],
    category: "Career",
  },
  {
    stat: "M.A.",
    title: "Media, Technology & Society",
    text: "A multidisciplinary master's journey combining media, digital technology, research, society, and sustainable innovation.",
    tags: ["Master's", "Research"],
    category: "Education",
  },
  {
    stat: "B2",
    title: "German Proficiency",
    text: "Developed through university, professional communication, daily life, teamwork, and continuous language learning in Germany.",
    tags: ["Language", "Deutsch"],
    category: "Language",
  },
  {
    stat: "2×",
    title: "Hackathon Winner",
    text: "First-place concepts for WISAG and Kenergy, including UX strategy, interface design, rapid prototyping, storytelling, and live presentation.",
    tags: ["WISAG", "Kenergy"],
    category: "Achievement",
  },
];

// Light graphite grey → charcoal → repeat light graphite grey → repeat
// charcoal → darkest (the finale).
const CARD_BACKGROUNDS = [
  "linear-gradient(155deg, oklch(0.37 0.01 250) 0%, oklch(0.25 0.008 250) 100%)", // light graphite grey
  "linear-gradient(155deg, oklch(0.22 0.008 250) 0%, oklch(0.13 0.007 250) 100%)", // charcoal
  "linear-gradient(155deg, oklch(0.37 0.01 250) 0%, oklch(0.25 0.008 250) 100%)", // light graphite grey (repeat)
  "linear-gradient(155deg, oklch(0.22 0.008 250) 0%, oklch(0.13 0.007 250) 100%)", // charcoal (repeat)
  "linear-gradient(155deg, oklch(0.042 0.004 250) 0%, oklch(0.008 0.001 250) 100%)", // darkest — the finale
] as const;

// Restrained — only some cards get the green atmospheric glow, not all five.
const GLOW_CARDS = new Set([0, 2, 4]);

function GermanyCardBlock({
  card,
  index,
  enhanced,
  registerCardRef,
}: {
  card: GermanyCard;
  index: number;
  enhanced: boolean;
  registerCardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={registerCardRef}
      className={`overflow-hidden rounded-[1.75rem] shadow-[0_10px_24px_-14px_rgba(0,0,0,0.4)] sm:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] md:rounded-[clamp(2.5rem,4vw,3.5rem)] ${
        enhanced ? "absolute inset-0" : "relative mb-6 h-[54dvh] md:h-[80dvh]"
      }`}
      style={{
        background: CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
        zIndex: index + 1,
        // Promotes each card to its own GPU compositor layer up front —
        // without this the browser was discovering the need to do so
        // mid-scroll, which read as the section "hanging" right as the
        // cards started moving. `contain: paint` tells the browser this
        // card's contents never paint outside its own box and nothing
        // outside it needs to react to its internal repaints — lets it skip
        // most of the cross-element invalidation work five overlapping,
        // simultaneously-animating cards would otherwise trigger.
        willChange: enhanced ? "transform" : undefined,
        contain: enhanced ? "paint" : undefined,
      }}
    >
      {/* Same faint texture as the Hero/venture cards; the green cosmos
          glow is restrained to a few cards, not every one. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="grid-bg absolute inset-0 opacity-20" />
        {/* A faint background word — the same "quiet background typography"
            language as the portrait section's story text behind the photo. */}
        <p
          className="absolute -bottom-4 left-6 select-none font-black text-white/[0.035] sm:left-8 md:left-12"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.8 }}
        >
          {card.category}
        </p>
        {GLOW_CARDS.has(index) && (
          <div
            className="hidden sm:block"
            style={{
              position: "absolute",
              width: "45%",
              height: "45%",
              top: "-8%",
              right: "-10%",
              background: "radial-gradient(ellipse at center, oklch(0.64 0.145 168 / 0.12), transparent 68%)",
              filter: "blur(44px)",
            }}
          />
        )}
      </div>

      {/* One designed surface — text is the whole canvas now, no image.
          justify-center (not justify-between) so the two text groups sit
          together as one compact block with deliberate breathing room above
          and below, instead of stretching to the edges of a tall card. */}
      <div className="relative flex h-full flex-col justify-center gap-8 p-6 sm:gap-10 sm:p-9 md:gap-12 md:p-12 lg:p-16">
        <div>
          <p
            className="font-bold text-white tabular-nums"
            style={{ fontSize: "clamp(2.75rem, 13vw, 12rem)", lineHeight: 0.82 }}
          >
            {card.stat}
          </p>
          <h3 className="display-hero mt-2 max-w-[22ch] text-[clamp(1.15rem,2.6vw,2.5rem)] text-white">
            {card.title}
          </h3>
        </div>

        <div>
          <p
            className="max-w-[60ch] text-white/60"
            style={{ fontSize: "clamp(0.95rem, 1.7vw, 1.5rem)", lineHeight: 1.35 }}
          >
            {card.text}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 sm:mt-5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/14 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/45"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Editorial retelling of the old "What I've built in Germany" fact-sheet: a
   plain (non-sticky) intro, then five dark cards pinned+animated exactly the
   way sohub.digital's services section actually works (see the big comment
   above SEGMENT_PX) — one relative wrapper pinned via ScrollTrigger, all
   cards absolutely stacked inside it, a single GSAP timeline scrubbing
   scale/y as each card takes its turn in front. Runs on mobile too now —
   only reduced motion gets the plain, non-pinned fallback. */
export function AchievementsBanner() {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Defaults to the safe, non-pinned, normal-document-flow layout (also
  // what the server renders) — only upgrades to the absolute+pinned version
  // once we've confirmed on the client that motion isn't reduced.
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnhanced(!reduceMotion);
  }, []);

  useEffect(() => {
    if (!enhanced) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
      const n = cards.length;
      if (n < 2) return;

      // Card 0 starts front-and-centre; every other card waits just below
      // the frame, ready to rise in.
      gsap.set(cards[0], { y: 0, scale: 1 });
      for (let i = 1; i < n; i++) {
        gsap.set(cards[i], { yPercent: 100, scale: 1 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${(n - 1) * SEGMENT_PX}`,
          pin: true,
          // "transform" keeps the pin engage/release as a pure compositor
          // move instead of a native position:fixed swap — the swap was the
          // source of the "stop, then jerk" right at each pin boundary.
          pinType: "transform",
          // `true`, not a number — a numeric scrub adds its own catch-up lag
          // on top of the scroll input. That's invisible with a mouse wheel,
          // but on touch/mobile the native scroll is already 1:1 with the
          // finger, so the extra lag reads as the animation constantly
          // "dragging" behind short flick-scrolls — the friction being
          // reported here. `true` ties the timeline directly to scroll
          // position with no artificial delay.
          scrub: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      // One step per transition. Step `s` brings card `s+1` in; every card
      // at or behind that position steps one level further back at the same
      // moment — so an early card keeps receding as later cards arrive,
      // rather than compressing just once and stopping.
      for (let step = 0; step < n - 1; step++) {
        const at = step * SEGMENT_PX;
        tl.to(cards[step + 1], { yPercent: 0, scale: 1, duration: SEGMENT_PX }, at);
        for (let behind = 0; behind <= step; behind++) {
          const level = step + 1 - behind;
          tl.to(
            cards[behind],
            { y: -Y_STEP * level, scale: 1 - SCALE_STEP * level, duration: SEGMENT_PX },
            at,
          );
        }
      }
    }, pinRef);

    return () => ctx.revert();
  }, [enhanced]);

  return (
    <section id="why-me" className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className={PAGE_CONTAINER}>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="display-hero max-w-[16ch] text-[clamp(2rem,4vw,3.5rem)] text-black">
              What I've built{" "}
              <span
                className="pr-1 font-normal"
                style={{ fontFamily: "var(--font-signature)", fontSize: "0.9em" }}
              >
                in
              </span>
              <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                Germany
              </span>
              .
            </h2>
            <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-black/45 sm:text-base">
              A journey shaped by education, creative work, language, collaboration, and two
              award-winning prototypes.
            </p>
          </div>
        </Reveal>
      </div>

      <div className={`${CARDS_CONTAINER} mt-14 sm:mt-16 md:mt-20`}>
        <div ref={pinRef} className={enhanced ? "relative h-[54dvh] md:h-[80dvh]" : "relative"}>
          {CARDS.map((card, i) => (
            <GermanyCardBlock
              key={card.title}
              card={card}
              index={i}
              enhanced={enhanced}
              registerCardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
