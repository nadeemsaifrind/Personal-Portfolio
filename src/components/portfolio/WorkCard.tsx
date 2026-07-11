import { type ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Shared entrance animation wrapper — used by every card grid ── */
export function RevealCard({
  index = 0,
  className = "",
  children,
}: {
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
    >
      {children}
    </motion.div>
  );
}

/* ── The one card look used across Projects / Services / Work Gallery ──
   Purely presentational — callers wrap it in whatever interactive
   element (Link, button, div) their context needs. */
export function WorkCard({
  image,
  eyebrow,
  title,
  badge,
  tagLabel,
  meta,
  aspect = "video",
  compact = false,
}: {
  image?: string;
  eyebrow?: string;
  title: string;
  badge?: string;
  tagLabel?: string;
  meta?: string;
  aspect?: "video" | "square";
  compact?: boolean;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 hover:border-white/14">
      <div
        className={`relative overflow-hidden bg-surface-2 ${aspect === "square" ? "aspect-square" : "aspect-video"}`}
      >
        {image && (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        {badge && (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
            {badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4">
          {eyebrow && (
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
              {eyebrow}
            </p>
          )}
          <h3
            className={`font-bold leading-snug tracking-tight text-white ${compact ? "text-[13px]" : "text-[15px]"}`}
          >
            {title}
          </h3>
        </div>
      </div>

      {(tagLabel || meta) && (
        <div className="flex items-center justify-between px-4 py-3">
          {tagLabel && (
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/35">
              {tagLabel}
            </span>
          )}
          {meta && (
            <span className="font-mono text-[9px] text-foreground/28">{meta}</span>
          )}
        </div>
      )}
    </div>
  );
}
