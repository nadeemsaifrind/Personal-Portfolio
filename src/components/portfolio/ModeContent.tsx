import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Mode, Project } from "@/lib/portfolio-data";

export function ModeContent({ mode }: { mode: Mode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setSelectedProject(null);
  }, [mode.id]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          key={mode.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-border"
        >
          {/* Category intro: description + skills + tools */}
          <div className="container mx-auto px-6 lg:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left: description + value points + capabilities */}
              <div className="max-w-xl">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {mode.category}
                </span>
                <p className="mt-6 text-2xl md:text-3xl leading-tight tracking-[-0.02em] mb-6">
                  {mode.tagline}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-10">
                  {mode.description}
                </p>

                {/* Value points — outcome-focused, prominent */}
                <div className="mb-8">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-5">
                    WHAT YOU GET
                  </span>
                  <ul className="space-y-3">
                    {mode.valuePoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="text-muted-foreground/40 shrink-0 text-sm leading-snug">—</span>
                        <span className="text-sm md:text-base text-foreground/85 leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Capabilities — secondary reference */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 block mb-3">
                    CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mode.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center font-mono text-[9px] tracking-widest text-muted-foreground/60 border border-border/60 rounded-full px-2.5 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: tool icons — secondary, supports the value points */}
              <div className="relative">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 block mb-8">
                  WORKING WITH
                </span>
                <div className="grid grid-cols-3 gap-x-4 gap-y-5 md:gap-x-5 md:gap-y-6 justify-items-center">
                  {mode.tools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 3 + (i % 4) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (i % 5) * 0.3,
                      }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm opacity-80"
                        style={{ background: tool.bg, color: tool.color }}
                      >
                        {tool.label}
                      </div>
                      <span className="font-mono text-[7px] tracking-widest text-muted-foreground/60 text-center leading-tight">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects grid */}
          <div className="container mx-auto px-6 lg:px-10 pb-24">
            <div className="flex items-end justify-between mb-8">
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                SELECTED WORK — {mode.label.toUpperCase()}
              </span>
              <span className="font-mono text-xs text-muted-foreground hidden md:inline">
                {mode.projects.length} projects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {mode.projects.map((p, i) => (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => setSelectedProject(p)}
                  className="bg-background p-8 md:p-10 group cursor-pointer transition-colors hover:bg-secondary"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      {p.tag}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl mb-3 leading-tight">{p.title}</h3>
                  <p className="text-muted-foreground max-w-md">{p.description}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm">
                    <span className="font-mono tracking-wide">VIEW DETAILS</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* CTA to case studies */}
            <div className="mt-8 flex items-center justify-end">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                SEE FULL CASE STUDIES
                <span>↓</span>
              </a>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Project detail modal */}
      <Dialog open={!!selectedProject} onOpenChange={(o) => !o && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl p-0 gap-0 overflow-y-auto max-h-[90vh]">
          <DialogTitle className="sr-only">{selectedProject?.title ?? "Project Details"}</DialogTitle>
          <DialogDescription className="sr-only">{selectedProject?.description ?? ""}</DialogDescription>
          {selectedProject && (
            <div className="flex flex-col">
              {/* Hero image */}
              <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: "2.8 / 1" }}>
                <img
                  src={mode.image}
                  alt={mode.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/25 text-white/90"
                      style={{ background: `color-mix(in oklab, ${mode.accent} 30%, transparent)` }}
                    >
                      {selectedProject.tag}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/55">
                      {selectedProject.year}
                    </span>
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: mode.accent, boxShadow: `0 0 6px ${mode.accent}` }}
                    />
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/55">
                      {mode.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl text-white font-normal tracking-[-0.03em] leading-tight">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-10">
                  {selectedProject.description}
                </p>

                {/* Highlights */}
                {selectedProject.highlights.length > 0 && (
                  <div className="mb-10">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4">
                      HIGHLIGHTS
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
                      {selectedProject.highlights.map((h) => (
                        <div key={h} className="bg-background p-5">
                          <p className="font-mono text-[11px] tracking-[0.08em] text-foreground/80 leading-snug">
                            {h}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-border pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: mode.accent }}
                    />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      {mode.label.toUpperCase()} · {mode.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
                    {selectedProject.year}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
