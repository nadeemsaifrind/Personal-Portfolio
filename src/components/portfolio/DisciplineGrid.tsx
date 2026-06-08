import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MODES } from "@/lib/portfolio-data";

export function DisciplineGrid() {
  return (
    <section id="work" className="bg-background">
      <div className="container mx-auto px-6 lg:px-10 pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: "#02AC87" }}>
              MY WORK
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl tracking-[-0.03em] font-normal">
              Six disciplines.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed">
            Click any discipline to see the full breakdown, tools, and selected work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {MODES.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/work/$modeId" params={{ modeId: mode.id }} className="block group">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:shadow-float hover:border-[#02AC87]/25">

                  {/* Image area */}
                  <div className="relative overflow-hidden h-44 sm:h-48">
                    <img
                      src={mode.image}
                      alt={mode.label}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

                    {/* Project count */}
                    <span className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.18em] text-white/85 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {mode.projects.length} PROJECTS
                    </span>

                    {/* Category label over image */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: mode.accent, boxShadow: `0 0 6px ${mode.accent}` }}
                      />
                      <span className="font-mono text-[9px] tracking-[0.22em] text-white/70">
                        {mode.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base md:text-lg font-medium tracking-tight leading-snug">
                        {mode.label}
                      </h3>
                      <span className="shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground/50 group-hover:bg-[#02AC87] group-hover:text-white group-hover:border-[#02AC87] transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <p className="mt-2 text-[13px] text-muted-foreground leading-snug line-clamp-2">
                      {mode.tagline}
                    </p>

                    {/* Skills */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {mode.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[9px] tracking-widest text-muted-foreground/55 border border-border/70 px-2 py-0.5 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                      {mode.skills.length > 3 && (
                        <span className="font-mono text-[9px] text-muted-foreground/35 py-0.5">
                          +{mode.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
