import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MODES, type ModeId } from "@/lib/portfolio-data";

interface Props {
  activeMode: ModeId;
  onSelect: (id: ModeId) => void;
}

// Spatial layout — percentage of canvas (16:7 aspect ratio)
const POSITIONS: Record<ModeId, { x: number; y: number; w: number; h: number }> = {
  content:   { x: 2,  y: 4,  w: 12, h: 28 }, // small — top-left
  marketing: { x: 2,  y: 44, w: 12, h: 28 }, // small — bottom-left
  brand:     { x: 18, y: 8,  w: 26, h: 64 }, // tallest center — core identity
  web:       { x: 46, y: 18, w: 16, h: 18 }, // text card — center
  startup:   { x: 64, y: 36, w: 14, h: 28 }, // medium — center-right
  ux:        { x: 80, y: 4,  w: 18, h: 68 }, // tall — far right
};

const CONNECTIONS: [ModeId, ModeId][] = [
  ["content",   "brand"],
  ["marketing", "brand"],
  ["brand",     "web"],
  ["web",       "startup"],
  ["startup",   "ux"],
  ["brand",     "ux"],
];

export function NodeHero({ activeMode, onSelect }: Props) {
  const [loadingKey, setLoadingKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredMode, setHoveredMode] = useState<ModeId | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setLoadingKey((k) => k + 1);
    const t = setTimeout(() => setIsLoading(false), 550);
    return () => clearTimeout(t);
  }, [activeMode]);

  const handleSelect = (id: ModeId) => {
    onSelect(id);
    requestAnimationFrame(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-16/7">

        {/* SVG connector lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="connector-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.45" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CONNECTIONS.map(([a, b]) => {
            const pa = POSITIONS[a];
            const pb = POSITIONS[b];
            const ax = pa.x + pa.w;
            const ay = pa.y + pa.h / 2;
            const bx = pb.x;
            const by = pb.y + pb.h / 2;
            const mx = (ax + bx) / 2;
            const isActive = a === activeMode || b === activeMode;
            const isHov = a === hoveredMode || b === hoveredMode;
            const isHighlighted = isActive || isHov;

            return (
              <path
                key={`${a}-${b}`}
                d={`M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`}
                fill="none"
                vectorEffect="non-scaling-stroke"
                filter={isHighlighted ? "url(#connector-glow)" : undefined}
                style={{
                  stroke: isActive
                    ? "oklch(0.18 0.01 250 / 0.85)"
                    : isHov
                    ? "oklch(0.18 0.01 250 / 0.5)"
                    : "oklch(0.6 0.01 250 / 0.3)",
                  strokeWidth: isHighlighted ? 0.28 : 0.15,
                  transition: "stroke 0.3s ease, stroke-width 0.3s ease",
                }}
              />
            );
          })}
        </svg>

        {/* Cards */}
        {MODES.map((mode, i) => {
          const p = POSITIONS[mode.id];
          const isActive = mode.id === activeMode;
          const isTextCard = mode.id === "web";

          return (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              onClick={() => handleSelect(mode.id)}
              onMouseEnter={() => setHoveredMode(mode.id)}
              onMouseLeave={() => setHoveredMode(null)}
              className="absolute group text-left"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.w}%`,
                height: `${p.h}%`,
              }}
            >
              {/* Label above card */}
              <div className="absolute -top-4 left-0 right-0 flex items-baseline gap-2 px-0.5">
                <span className="text-[7px] md:text-[8px] font-mono tracking-[0.22em] text-foreground/60 font-medium">
                  {mode.category.split(" ")[0]}
                </span>
                <span className="text-[7px] md:text-[8px] font-mono tracking-[0.22em] text-muted-foreground/60 truncate">
                  {mode.label.toUpperCase()}
                </span>
              </div>

              {/* Card */}
              <div
                className={[
                  "relative w-full h-full overflow-hidden rounded-[3px] transition-all duration-500",
                  isActive
                    ? "ring-1 ring-foreground/60 shadow-float"
                    : "ring-1 ring-border shadow-soft group-hover:shadow-float group-hover:ring-foreground/20",
                ].join(" ")}
                style={{ background: isTextCard ? "var(--card)" : undefined }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key={`skeleton-${loadingKey}-${mode.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 overflow-hidden"
                      style={{ background: "oklch(0.94 0.005 250)" }}
                      aria-hidden
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(110deg, transparent 0%, transparent 35%, oklch(1 0 0 / 0.7) 50%, transparent 65%, transparent 100%)",
                          backgroundSize: "220% 100%",
                        }}
                        animate={{ backgroundPosition: ["120% 0", "-20% 0"] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  ) : isTextCard ? (
                    <motion.div
                      key={`text-${loadingKey}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 p-3 md:p-4 flex"
                    >
                      <p className="text-[10px] md:text-xs leading-snug text-foreground/80 tracking-tight">
                        {mode.tagline}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`img-${loadingKey}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <img
                        src={mode.image}
                        alt={mode.label}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        draggable={false}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Connector anchor dots */}
                {mode.id !== "content" && mode.id !== "marketing" && (
                  <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-card ring-1 ring-foreground/50 z-10" />
                )}
                {mode.id !== "ux" && (
                  <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-card ring-1 ring-foreground/50 z-10" />
                )}

                {/* Active accent glow */}
                {isActive && (
                  <motion.span
                    layoutId="active-glow"
                    className="absolute inset-0 ring-2 ring-accent rounded-[3px] pointer-events-none z-10"
                    style={{ boxShadow: "0 0 40px oklch(0.92 0.18 105 / 0.5)" }}
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
