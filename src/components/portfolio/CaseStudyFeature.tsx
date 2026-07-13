import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { CaseStudy } from "@/lib/portfolio-data";
import { JustifiedGallery } from "./JustifiedGallery";

const EASE = [0.22, 1, 0.36, 1] as const;

const GALLERY_ROW_HEIGHT = 168;

/* One flagship case study told in full, directly in the page flow — no
   modal click required to see the proof. Images are shown whole (fixed
   height, width intrinsic, object-contain, sharp corners) rather than
   cropped into a fixed frame, the same policy as the Vanessa case study:
   these are real deliverables, not decorative thumbnails. Alternates
   image/text side via `reverse` for rhythm across repeated use. */
export function CaseStudyFeature({
  cs,
  reverse = false,
  onOpenFull,
  hideCover = false,
  light = false,
}: {
  cs: CaseStudy;
  reverse?: boolean;
  onOpenFull: () => void;
  hideCover?: boolean;
  light?: boolean;
}) {
  const gallery = [cs.featuredScreen, ...(cs.screens ?? [])].filter(Boolean).slice(0, 3) as string[];
  const c = light
    ? {
        title: "text-black",
        meta: "text-black/40",
        label: "text-black/70",
        body: "text-black/55",
        resultBox: "border-black/10 bg-black/[0.03]",
        resultBody: "text-black/70",
        quote: "text-black/60",
        quoteFooter: "text-black/35",
        button: "text-black/70 hover:text-primary",
        bullet: "text-black/45",
      }
    : {
        title: "text-foreground",
        meta: "text-foreground/35",
        label: "text-foreground/70",
        body: "text-foreground/55",
        resultBox: "border-border bg-surface",
        resultBody: "text-foreground/70",
        quote: "text-foreground/60",
        quoteFooter: "text-foreground/35",
        button: "text-foreground/70 hover:text-primary",
        bullet: "text-foreground/45",
      };

  return (
    <div className="grid grid-cols-1 gap-10 py-14 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-16 lg:py-20">
      {/* Images */}
      <motion.div
        className={`relative flex flex-col items-start gap-3 ${reverse ? "lg:order-2 lg:items-end" : ""}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {cs.coverImage && !hideCover && (
          <div className="relative">
            <img
              src={cs.coverImage}
              alt={cs.title}
              loading="lazy"
              className="max-h-125 w-auto max-w-full object-contain shadow-[0_20px_45px_-20px_rgba(0,0,0,0.5)]"
            />
            {cs.achievement && (
              <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
                {cs.achievement}
              </span>
            )}
          </div>
        )}
        <JustifiedGallery images={gallery} rowHeight={hideCover ? 230 : GALLERY_ROW_HEIGHT} />
      </motion.div>

      {/* Narrative */}
      <div className={reverse ? "lg:order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="mb-3 text-sm text-primary/80">
            {cs.context}
          </p>
          <h3 className={`mb-2 text-2xl font-bold tracking-tight sm:text-3xl ${c.title}`}>
            {cs.title}
          </h3>
          <p className={`mb-6 text-sm ${c.meta}`}>
            {cs.role} · {cs.year}
          </p>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
        >
          <span className={`mb-2 block text-sm font-semibold ${c.label}`}>
            The challenge
          </span>
          <p className={`text-sm leading-relaxed ${c.body}`}>{cs.challenge}</p>
        </motion.div>

        <motion.ul
          className="mb-6 flex flex-col gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          {cs.actionsToken.slice(0, 4).map((action, i) => (
            <motion.li
              key={action}
              className={`flex items-start gap-2.5 text-sm leading-relaxed ${c.bullet}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.14 + i * 0.05 }}
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
              {action}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className={`mb-6 rounded-xl border p-5 ${c.resultBox}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
        >
          <span className="mb-2 block text-sm font-semibold text-primary/80">
            Result
          </span>
          <p className={`text-sm leading-relaxed ${c.resultBody}`}>{cs.outcome}</p>
        </motion.div>

        {cs.testimonial && (
          <motion.blockquote
            className="mb-6 border-l-2 border-primary/40 pl-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.24 }}
          >
            <p className={`text-sm italic leading-relaxed ${c.quote}`}>
              "{cs.testimonial.quote}"
            </p>
            <footer className={`mt-2 text-sm ${c.quoteFooter}`}>
              — {cs.testimonial.name}, {cs.testimonial.title}
            </footer>
          </motion.blockquote>
        )}

        <motion.button
          type="button"
          onClick={onOpenFull}
          className={`group inline-flex items-center gap-2 text-sm font-medium transition ${c.button}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          Full case study
          <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      </div>
    </div>
  );
}
