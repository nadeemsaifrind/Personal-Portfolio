import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { CaseStudy } from "@/lib/portfolio-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── One flagship case study told in full, directly in the page flow —
   no modal click required to see the proof. Alternates image/text side
   via `reverse` for rhythm across repeated use. ── */
export function CaseStudyFeature({
  cs,
  reverse = false,
  onOpenFull,
}: {
  cs: CaseStudy;
  reverse?: boolean;
  onOpenFull: () => void;
}) {
  const gallery = [cs.featuredScreen, ...(cs.screens ?? [])].filter(Boolean).slice(0, 3) as string[];

  return (
    <div className="grid grid-cols-1 gap-10 py-14 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-16 lg:py-20">
      {/* Images */}
      <motion.div
        className={`relative ${reverse ? "lg:order-2" : ""}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-surface-2">
          {cs.coverImage && (
            <img src={cs.coverImage} alt={cs.title} loading="lazy" className="h-full w-full object-cover" />
          )}
          {cs.achievement && (
            <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
              {cs.achievement}
            </span>
          )}
        </div>
        {gallery.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="aspect-3/4 overflow-hidden rounded-xl border border-border bg-surface-2">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Narrative */}
      <div className={reverse ? "lg:order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
            {cs.context}
          </p>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {cs.title}
          </h3>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/30">
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
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
            The challenge
          </span>
          <p className="text-sm leading-relaxed text-foreground/55">{cs.challenge}</p>
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
              className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/45"
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
          className="mb-6 rounded-xl border border-border bg-surface p-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
        >
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
            Result
          </span>
          <p className="text-sm leading-relaxed text-foreground/70">{cs.outcome}</p>
        </motion.div>

        {cs.testimonial && (
          <motion.blockquote
            className="mb-6 border-l-2 border-primary/40 pl-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.24 }}
          >
            <p className="text-sm italic leading-relaxed text-foreground/60">
              "{cs.testimonial.quote}"
            </p>
            <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/35">
              — {cs.testimonial.name}, {cs.testimonial.title}
            </footer>
          </motion.blockquote>
        )}

        <motion.button
          type="button"
          onClick={onOpenFull}
          className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition hover:text-primary"
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
