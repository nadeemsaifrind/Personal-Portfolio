import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MODES, CASE_STUDIES, type Project, type CaseStudy } from "@/lib/portfolio-data";
import { CaseStudies } from "@/components/portfolio/CaseStudies";

export const Route = createFileRoute("/work/$modeId")({
  loader: ({ params }) => {
    const mode = MODES.find((m) => m.id === params.modeId);
    if (!mode) {
  console.error("Project not found. Invalid modeId:", params.modeId);
  throw notFound();
}
    return { mode };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { mode } = loaderData;
    const url = `https://www.nadeemsaif.com/work/${mode.id}`;
    return {
      meta: [
        { title: `${mode.label} — Nadeem Saif` },
        { name: "description", content: mode.description },
        { name: "author", content: "Nadeem Saif" },
        { property: "og:title", content: `${mode.label} — Nadeem Saif` },
        { property: "og:description", content: mode.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${mode.label} — Nadeem Saif` },
        { name: "twitter:description", content: mode.tagline },
      ],
      links: [
        { rel: "canonical", href: url },
      ],
    };
  },
  component: WorkDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono text-sm text-muted-foreground">Discipline not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});

function WorkDetail() {
  const { mode } = Route.useLoaderData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const handleProjectClick = (p: Project) => {
    if (p.caseStudyId) {
      const cs = CASE_STUDIES.find((c) => c.id === p.caseStudyId);
      if (cs) { setSelectedCase(cs); return; }
    }
    setSelectedProject(p);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Sticky top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 lg:px-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO HOME
        </Link>
        <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-muted-foreground/50">
          {mode.category}
        </span>
      </header>

      {/* Hero */}
      <section className="pt-14">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={mode.image}
            alt={mode.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: mode.accent, boxShadow: `0 0 10px ${mode.accent}` }}
              />
              <span className="font-mono text-[10px] tracking-[0.22em] text-white/60">
                {mode.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] text-white leading-none">
              {mode.label}
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
              {mode.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + value points */}
      <section className="container mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              {mode.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="font-mono text-[10px] tracking-[0.22em] block mb-5" style={{ color: "#02AC87" }}>
              WHAT YOU GET
            </span>
            <ul className="space-y-4">
              {mode.valuePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="text-muted-foreground/30 shrink-0 mt-0.5">-</span>
                  <span className="text-base text-foreground/80 leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Skills + Tools */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-10 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Skills */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-5">
                CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-2">
                {mode.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] tracking-widest text-muted-foreground/70 border border-border rounded-full px-3 py-1.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-5">
                WORKING WITH
              </span>
              <div className="flex flex-wrap gap-3">
                {mode.tools.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-2 border border-border rounded-xl px-3 py-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: tool.bg, color: tool.color }}
                    >
                      {tool.label}
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground/70">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-10 py-14 md:py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                SELECTED WORK
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl tracking-tight font-normal">
                {mode.label} projects
              </h2>
            </div>
            <span className="font-mono text-xs text-muted-foreground/50">
              {mode.projects.length} projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {mode.projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                onClick={() => handleProjectClick(p)}
                className="bg-background p-8 md:p-10 group cursor-pointer transition-colors hover:bg-secondary"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/50">{p.year}</span>
                </div>
                <h3 className="text-2xl md:text-3xl mb-3 leading-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{p.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-[#02AC87] transition-colors">
                  <span className="font-mono text-[10px] tracking-[0.15em]">VIEW DETAILS</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-10 py-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO HOME
          </Link>
          <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40">
            NADEEM SAIF · {mode.category}
          </span>
        </div>
      </footer>

      {/* Full case study modal — for projects with a matching case study */}
      <CaseStudies dialogOnly selected={selectedCase} setSelected={setSelectedCase} />

      {/* Project detail modal — for projects without a case study */}
      <Dialog open={!!selectedProject} onOpenChange={(o) => !o && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl p-0 gap-0 overflow-y-auto max-h-[90vh]">
          <DialogTitle className="sr-only">{selectedProject?.title ?? "Project Details"}</DialogTitle>
          <DialogDescription className="sr-only">{selectedProject?.description ?? ""}</DialogDescription>
          {selectedProject && (
            <div className="flex flex-col">
              <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: "2.8 / 1" }}>
                <img src={mode.image} alt={mode.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/25 text-white/90"
                      style={{ background: `color-mix(in oklab, ${mode.accent} 30%, transparent)` }}>
                      {selectedProject.tag}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/55">
                      {selectedProject.year}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl text-white font-normal tracking-[-0.03em] leading-tight">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-10">
                  {selectedProject.description}
                </p>
                {selectedProject.highlights.length > 0 && (
                  <div className="mb-8">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4">
                      HIGHLIGHTS
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
                      {selectedProject.highlights.map((h) => (
                        <div key={h} className="bg-background p-5">
                          <p className="font-mono text-[11px] tracking-[0.08em] text-foreground/80 leading-snug">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProject.screens && selectedProject.screens.length > 0 && (
                  <div className="mb-8">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4">
                      PREVIEW
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProject.screens.map((src, i) => (
                        <div key={i} className="rounded-xl overflow-hidden aspect-video bg-secondary">
                          <img src={src} alt={`Screen ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* YouTube CTA */}
                {selectedProject.youtubeUrl && (
                  <div className="mb-8">
                    <a
                      href={selectedProject.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#d90000] text-white px-5 py-3 rounded-full shadow-sm hover:shadow-[0_4px_20px_rgba(255,0,0,0.3)] transition-all duration-200"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span className="font-mono text-[10px] tracking-[0.2em] font-medium">WATCH ON YOUTUBE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  </div>
                )}

                <div className="border-t border-border pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: mode.accent }} />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      {mode.label.toUpperCase()} · {mode.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/50">{selectedProject.year}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
