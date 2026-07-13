import { useEffect } from "react";
import { motion } from "framer-motion";
import { DISCIPLINES } from "@/lib/portfolio-data";
import frame1 from "@/assets/hero-sequence/frame-001.png";
import frame2 from "@/assets/hero-sequence/frame-002.png";
import frame3 from "@/assets/hero-sequence/frame-003.png";
import frame4 from "@/assets/hero-sequence/frame-004.png";
import frame5 from "@/assets/hero-sequence/frame-005.png";
import frame7 from "@/assets/hero-sequence/frame-007.png";

// frame-006 dropped — it came out blurry.
export const HERO_PORTRAIT_FRAME_COUNT = 6;
const FRAMES = [frame1, frame2, frame3, frame4, frame5, frame7];

// Same copy as the discipline marquee under the hero — looped around the badge.
const BADGE_TEXT = `${DISCIPLINES.join("   •   ")}   •   `;

/* Spinning circular-text sticker — the badge stays put, the text ring loops
   around it endlessly, like a record label or a stamp of approval. */
function DisciplineBadge() {
  return (
    <div className="absolute left-[66%] top-[66%] z-20 h-[clamp(3.75rem,10.5vw,9.5rem)] w-[clamp(3.75rem,10.5vw,9.5rem)] md:top-auto md:bottom-[6%]">
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="hero-badge-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="oklch(0.09 0.006 250 / 0.6)" stroke="oklch(0.97 0.003 250 / 0.16)" strokeWidth="1" />
        <text fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2.6" fill="oklch(0.97 0.003 250 / 0.82)">
          <textPath href="#hero-badge-path" startOffset="0%">
            {BADGE_TEXT}
          </textPath>
        </text>
      </motion.svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_oklch(0.64_0.145_168/0.7)]" />
      </div>
    </div>
  );
}

export function HeroPortrait({ step }: { step: number }) {
  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const frameSrc = FRAMES[step]!;

  return (
    <motion.div
      className="pointer-events-none relative z-20 -mt-28 mb-10 flex w-full items-end justify-center overflow-visible sm:-mt-32 sm:mb-14 md:absolute md:right-[6%] md:bottom-0 md:mt-0 md:mb-0 md:w-[clamp(18rem,40vw,34rem)] md:h-[clamp(28rem,54vw,42rem)]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      aria-hidden
    >
      {/* Nothing in this chain clips — object-contain always shows the whole
          frame (figure plus its transparent margins), so no pose in the
          sequence can ever have its leg, chair, or lower body cut off. The
          source frames carry a transparent margin above the head, which is
          what lets the box render tall enough for the head to clear the card
          without scaling or distorting the photo itself. */}
      <div className="relative z-10 mx-auto aspect-7/8 w-[clamp(15rem,80vw,22rem)] overflow-visible md:mx-0 md:aspect-auto md:h-full md:w-full">
        {/* Contact shadow — grounds the figure on mobile's floor look. Desktop/tablet
            drop the person flush against the white section instead, so a soft
            grounding shadow there would just read as a smudge on the boundary. */}
        <div
          className="absolute bottom-[4%] h-[7%] w-[70%] rounded-[100%] md:hidden"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 72%)", filter: "blur(6px)" }}
        />

        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="relative h-full w-full"
            style={{ filter: "brightness(1.04) contrast(1.08) saturate(0.86) drop-shadow(0 26px 34px rgba(0,0,0,0.6))" }}
          >
            <img
              src={frameSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-contain object-bottom md:object-bottom-right"
            />
          </div>
        </motion.div>

        <DisciplineBadge />
      </div>

      {/* Fades the image into the section background so the frame reads as an
          intentional close, not an abrupt crop — spans the full section width
          (not just the photo's box) so it doesn't read as its own rectangle.
          Desktop doesn't need this since the portrait spans the full section
          height there. */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 md:hidden"
        style={{ background: "linear-gradient(180deg, transparent 0%, var(--background) 88%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-16 bg-foreground/20 md:hidden" />
    </motion.div>
  );
}
