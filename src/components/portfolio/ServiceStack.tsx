"use client";

import { useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { MODES } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";

gsap.registerPlugin(ScrollTrigger);

/* Progressive dark shades for the stacked cards (SOHub-style). */
const SHADES = ["#0c1116", "#141a20", "#1c232a", "#242c34", "#2c353e", "#343e48"];

export function ServiceStack() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="work" className="bg-background">
      <div className="max-w-375 mx-auto px-4 sm:px-8 lg:px-12 pt-24 lg:pt-36">
        <div className="flex flex-col gap-3 lg:gap-6">
          <RevealText
            as="h2"
            className="display-hero text-[clamp(2.2rem,6vw,6rem)] max-w-[16ch]"
            lines={["Six disciplines, one", "builder who ships the whole arc."]}
          />
        </div>
      </div>

      {/* Sticky stack */}
      <div
        ref={root}
        className="relative max-w-375 mx-auto px-4 sm:px-8 lg:px-12 mt-16 lg:mt-24 pb-[8vh]"
      >
        {MODES.map((mode, i) => (
          <div
            key={mode.id}
            className="stack-card sticky"
            style={{
              top: `calc(10vh + ${i * 14}px)`,
              transformOrigin: "center top",
              marginBottom: "2.5rem",
            }}
          >
            <div
              className="relative overflow-hidden rounded-lg grid lg:grid-cols-[1.15fr_0.85fr] min-h-[68vh] lg:min-h-[64vh]"
              style={{ backgroundColor: SHADES[i % SHADES.length] }}
            >
              {/* Text side */}
              <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-14">
                <div className="flex items-center">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-white/45 uppercase">
                    {String(i + 1).padStart(2, "0")} / {mode.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-[clamp(2.4rem,5vw,5rem)] leading-[0.92] tracking-tightest font-semibold">
                    <span className="text-white block">{mode.label.split(" ")[0]}</span>
                    <span className="text-white/45 block">
                      {mode.label.split(" ").slice(1).join(" ") || mode.title}
                    </span>
                  </h3>
                  <p className="mt-6 text-white/65 text-lg lg:text-xl leading-relaxed max-w-[46ch]">
                    {mode.tagline}
                  </p>
                </div>

                <div className="flex flex-col gap-7">
                  <div className="flex flex-wrap gap-2">
                    {mode.skills.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="text-white/85 text-xs sm:text-sm px-4 py-2 rounded-full bg-white/6 border border-white/10 hover:bg-white/12 transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/work/$modeId"
                    params={{ modeId: mode.id }}
                    className="group inline-flex items-center gap-2.5 text-white w-fit"
                  >
                    <span className="text-sm font-medium tracking-tight">Explore {mode.label}</span>
                    <span className="w-9 h-9 rounded-full bg-brand text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight size={15} weight="bold" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Visual side */}
              <div className="relative hidden lg:block overflow-hidden">
                <img
                  src={mode.image}
                  alt={mode.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${SHADES[i % SHADES.length]}, transparent 45%)`,
                  }}
                />
                <span className="absolute bottom-6 right-7 font-mono text-[11px] tracking-[0.2em] text-white/70">
                  {mode.projects.length} PROJECTS
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
