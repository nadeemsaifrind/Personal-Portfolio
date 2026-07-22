import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import img1 from "@/assets/Crousel CS/cs vanees 01.png";
import img2 from "@/assets/Crousel CS/cs vanees 02.png";
import img3 from "@/assets/Crousel CS/cs vanees 03.png";
import img4 from "@/assets/Crousel CS/cs vanees 04.png";
import img5 from "@/assets/Crousel CS/cs vanees 05.png";
import img6 from "@/assets/Crousel CS/cs vanees 06.png";
import img7 from "@/assets/Crousel CS/cs vanees 07.png";

const EASE = [0.22, 1, 0.36, 1] as const;

// Matches ServiceStack's own container exactly — this section is modeled
// directly on ServiceStack's "heading, then a horizontal rail below it"
// pattern, the closest existing precedent in the codebase for pairing a
// display heading with scrollable content.
const PAGE_CONTAINER = "mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12";

// How fast the rail drifts — a constant speed (not a fixed duration) so the
// loop always feels equally slow regardless of how wide the rendered image
// set ends up being on a given screen.
const PX_PER_SECOND = 55;

// Keeps a value inside [min, max) by wrapping, not clamping — the track is
// two back-to-back copies of the slide set, so wrapping x by exactly one
// set's width lands on a pixel-identical frame and the loop reads as
// seamless whichever direction (autoplay or a drag) pushed it out of range.
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return range === 0 ? min : ((((v - min) % range) + range) % range) + min;
};

const IMAGE_CLASS =
  "h-[68vh] w-auto max-w-none max-h-160 shrink-0 object-contain shadow-[0_20px_45px_-20px_rgba(0,0,0,0.55)]";

// Case study narrative order: brand cover, photo-direction moodboard,
// business cards, the asterisk brand-mark concept, social card templates,
// LinkedIn posts in context, closing manifesto.
const SLIDES = [
  { src: img1, alt: "Vanessa Veith brand cover — personal branding for a communication coach" },
  { src: img2, alt: "Photo direction moodboard for Vanessa Veith's brand" },
  { src: img3, alt: "Business card design for Vanessa Veith" },
  { src: img4, alt: "The asterisk brand mark concept and rationale" },
  { src: img5, alt: "Social content card templates — quote, vision, and offering cards" },
  { src: img6, alt: "LinkedIn post mockups for Vanessa Veith" },
  { src: img7, alt: "Closing brand manifesto for Vanessa Veith" },
];

/* A new flagship case study, presented as a self-playing filmstrip — it
   drifts right-to-left on its own, slowly and at a constant speed, rather
   than waiting for the reader to scroll it sideways. The slide set is
   rendered twice back-to-back and the whole track is translated left by
   exactly one set's width (measured, not guessed, since each photo keeps
   its own native aspect ratio) — so the moment the loop restarts, the
   second copy is sitting exactly where the first one started, and the
   motion reads as endless rather than resetting.

   It's also grab-draggable — a single MotionValue (`x`) drives the track,
   nudged left every frame by the autoplay loop and overridden directly by
   Framer's drag gesture while a pointer/finger is down (`isDragging` just
   pauses the autoplay nudge; drag itself writes straight into `x` because
   it's passed as the element's own `style.x`). Both writers wrap the same
   value into [-setWidth, 0) so it never drifts outside the two rendered
   copies, and control simply hands back to autoplay wherever the drag let
   go — no separate "resume" animation to fight with. */
export function CaseStudyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setSetWidth(el.scrollWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const playing = !reducedMotion && setWidth > 0;

  useAnimationFrame((_, delta) => {
    if (!playing || isDragging.current) return;
    x.set(wrap(-setWidth, 0, x.get() - (PX_PER_SECOND * delta) / 1000));
  });

  return (
    <section id="case-study" className="section-glow pt-10 pb-8 sm:pt-16 sm:pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20 border-t border-border" style={{ background: "var(--background)" }}>
      <div className={PAGE_CONTAINER}>
        <div className="max-w-[46ch]">
          <motion.h2
            className="display-hero text-[clamp(2rem,4vw,4rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Branding{" "}
            <span
              className="pr-1 font-normal"
              style={{ fontFamily: "var(--font-signature)", fontSize: "0.9em" }}
            >
              a
            </span>
            <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
              voice
            </span>
            .
          </motion.h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/45">
            A full identity, social system, and business card suite for Vanessa Veith — a communication and mentoring coach in Bremen, Germany. 2025.
          </p>
        </div>
      </div>

      {/* Full-bleed rail, clipped (not scrollable — the track drives itself).
          The container keeps the same left inset as the heading above it, so
          the very first frame lines up exactly the way the old scrollable
          version did; everything after that is the looping track. */}
      <div className="mt-6 overflow-hidden px-4 sm:mt-10 sm:px-8 lg:mt-12 lg:px-12">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag={setWidth > 0 ? "x" : false}
          dragMomentum={false}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDrag={() => {
            x.set(wrap(-setWidth, 0, x.get()));
          }}
          onDragEnd={() => {
            isDragging.current = false;
          }}
        >
          <div ref={trackRef} className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6">
            {SLIDES.map((slide) => (
              <img key={slide.src} src={slide.src} alt={slide.alt} className={IMAGE_CLASS} draggable={false} />
            ))}
          </div>
          <div className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6" aria-hidden="true">
            {SLIDES.map((slide) => (
              <img key={`${slide.src}-repeat`} src={slide.src} alt="" className={IMAGE_CLASS} draggable={false} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
