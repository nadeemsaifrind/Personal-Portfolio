"use client";

import { Link } from "@tanstack/react-router";
import { MODES } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";
import { RevealCard, WorkCard } from "./WorkCard";

export function ServiceStack() {
  return (
    <section id="work" className="section-glow py-12 sm:py-20 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-5 bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Services</span>
        </div>

        <RevealText
          as="h2"
          className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[14ch] mb-16 lg:mb-20"
          lines={["Six disciplines.", "One builder."]}
        />
      </div>

      {/* Horizontal rail — deliberately distinct from the project grid below */}
      <div className="scrollbar-none flex gap-4 overflow-x-auto px-4 pb-4 sm:px-8 lg:px-12" style={{ scrollSnapType: "x mandatory" }}>
        {MODES.map((mode, i) => (
          <RevealCard key={mode.id} index={i} className="w-[78vw] max-w-80 shrink-0 sm:w-72" >
            <div style={{ scrollSnapAlign: "start" }}>
              <Link to="/work/$modeId" params={{ modeId: mode.id }} className="block">
                <WorkCard
                  image={mode.image}
                  eyebrow={mode.category}
                  title={mode.label}
                  tagLabel={mode.tagline.split(" ").slice(0, 3).join(" ")}
                  meta={`${mode.projects.length} projects`}
                />
              </Link>
            </div>
          </RevealCard>
        ))}
      </div>
    </section>
  );
}
