import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { MODES, type ModeId } from "@/lib/portfolio-data";

const INTERVAL = 4500;
const imageModes = MODES;

interface Props {
  activeMode: ModeId;
  onSelect: (id: ModeId) => void;
}

export function HeroCarousel({ activeMode, onSelect }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Prevents the activeMode sync effect from fighting auto-advance
  const internalRef = useRef(false);

  const current = imageModes[index];

  const goTo = useCallback(
    (i: number) => {
      internalRef.current = true;
      setIndex(i);
      onSelect(imageModes[i].id);
    },
    [onSelect],
  );

  // Sync external activeMode → index (e.g. discipline chip clicked)
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current = false;
      return;
    }
    const idx = imageModes.findIndex((m) => m.id === activeMode);
    if (idx >= 0 && idx !== index) setIndex(idx);
  }, [activeMode]);

  // Auto-advance — index in deps so the interval resets cleanly after each step
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      const next = (index + 1) % imageModes.length;
      goTo(next);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [paused, index, goTo]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main image card */}
      <div
        className="relative rounded-2xl overflow-hidden h-80 sm:h-105 lg:h-130 w-full"
        style={{ boxShadow: "0 32px 80px -16px oklch(0.2 0.05 250 / 0.2)" }}
      >
        {/* mode="sync" lets enter + exit run simultaneously for a proper slide */}
        <AnimatePresence mode="sync">
          <motion.img
            key={current.id}
            src={current.image}
            alt={current.label}
            initial={{ opacity: 0, x: "35%", scale: 1.05 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: "-25%", scale: 0.96 }}
            transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {imageModes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={[
                "h-1.5 rounded-full bg-white transition-all duration-500",
                i === index ? "w-6 opacity-100" : "w-1.5 opacity-40 hover:opacity-65",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* Floating expertise card — bottom left */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`exp-${current.id}`}
          initial={{ opacity: 0, y: 14, x: -8 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-18 left-4 z-20 bg-white rounded-2xl p-4 w-54"
          style={{ boxShadow: "0 8px 32px oklch(0.2 0.05 250 / 0.16)" }}
        >
          <p className="font-mono text-[9px] tracking-[0.22em] text-foreground/40 mb-1">
            {current.category}
          </p>
          <p className="text-sm font-semibold text-foreground leading-tight">{current.label}</p>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {current.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[10px] bg-black/6 text-foreground/65 px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating tagline card — upper right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`tag-${current.id}`}
          initial={{ opacity: 0, y: -10, x: 8 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-10 right-4 z-20 bg-white rounded-2xl p-3.5 max-w-44"
          style={{ boxShadow: "0 8px 32px oklch(0.2 0.05 250 / 0.14)" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: current.accent, boxShadow: `0 0 8px ${current.accent}` }}
            />
            <span className="font-mono text-[9px] tracking-[0.18em] text-foreground/40">
              EXPERTISE
            </span>
          </div>
          <p className="text-[11px] leading-[1.55] text-foreground/65">{current.tagline}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
