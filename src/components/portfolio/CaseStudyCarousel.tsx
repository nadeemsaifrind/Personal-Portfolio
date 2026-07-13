import { motion } from "framer-motion";
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

/* A new flagship case study, presented as a horizontally scrollable
   filmstrip rather than a grid — the reader scrolls sideways through it the
   way you'd flip through a contact sheet. Every photo keeps its own native
   aspect ratio (height fixed, width intrinsic, object-contain) so nothing
   is ever cropped, and corners are left sharp on purpose — a deliberate
   exception to the rounded-card language used everywhere else on the site,
   because these are full unedited deliverables, not app-style cards. */
export function CaseStudyCarousel() {
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

      {/* Full-bleed rail — the images themselves start flush with the
          heading's left edge (same horizontal padding), but the row is free
          to scroll past the container's max-width on very wide screens.
          Every photo keeps its own native aspect ratio (fixed height, width
          intrinsic, object-contain) so nothing is ever cropped; a soft
          shadow gives them depth without needing rounded corners, which are
          left sharp on purpose — a deliberate exception to the rounded-card
          language used everywhere else on the site, because these are full
          unedited deliverables, not app-style cards. */}
      <div className="scrollbar-none mt-6 flex gap-5 overflow-x-auto px-4 sm:mt-10 sm:gap-6 sm:px-8 lg:mt-12 lg:px-12" style={{ scrollSnapType: "x mandatory" }}>
        {SLIDES.map((slide, i) => (
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="h-[68vh] w-auto max-w-none max-h-160 shrink-0 object-contain shadow-[0_20px_45px_-20px_rgba(0,0,0,0.55)]"
            style={{ scrollSnapAlign: "start" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 * i }}
          />
        ))}
      </div>
    </section>
  );
}
