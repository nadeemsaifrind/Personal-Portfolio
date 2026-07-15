import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
   motion reads as endless rather than resetting. */
export function CaseStudyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const reducedMotion = useReducedMotion();

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
  const duration = setWidth / PX_PER_SECOND;

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
          className="flex"
          animate={playing ? { x: [0, -setWidth] } : undefined}
          transition={
            playing
              ? { duration, ease: "linear", repeat: Infinity, repeatType: "loop" }
              : undefined
          }
        >
          <div ref={trackRef} className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6">
            {SLIDES.map((slide) => (
              <img key={slide.src} src={slide.src} alt={slide.alt} className={IMAGE_CLASS} />
            ))}
          </div>
          <div className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6" aria-hidden="true">
            {SLIDES.map((slide) => (
              <img key={`${slide.src}-repeat`} src={slide.src} alt="" className={IMAGE_CLASS} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
