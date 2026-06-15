"use client";

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { MODES } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceStack() {
  return (
    <section id="work" className="section-glow py-12 sm:py-20 lg:py-36">
      <div className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-5 bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Services</span>
        </div>

        <RevealText
          as="h2"
          className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[14ch] mb-16 lg:mb-20"
          lines={["Six disciplines.", "One builder."]}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODES.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
            >
              <Link
                to="/work/$modeId"
                params={{ modeId: mode.id }}
                className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 hover:border-white/14"
              >
                {/* Full-bleed image with title overlaid */}
                <div className="relative aspect-video overflow-hidden bg-surface-2">
                  <img
                    src={mode.image}
                    alt={mode.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                      {mode.category}
                    </p>
                    <h3 className="text-[15px] font-bold leading-snug tracking-tight text-white">
                      {mode.label}
                    </h3>
                  </div>
                </div>

                {/* Minimal footer strip */}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/35">
                    {mode.tagline.split(" ").slice(0, 3).join(" ")}
                  </span>
                  <div className="flex items-center gap-1.5 text-foreground/28 transition-colors duration-200 group-hover:text-primary">
                    <span className="font-mono text-[9px]">{mode.projects.length} projects</span>
                    <ArrowUpRight size={11} weight="bold" />
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
