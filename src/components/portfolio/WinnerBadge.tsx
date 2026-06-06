import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CASE_STUDIES } from "@/lib/portfolio-data";

const competitions = CASE_STUDIES.filter((c) => c.id === "wisag" || c.id === "kenergy");

const WISAG_KEYWORDS = [
  "UX Research", "Mobile-first", "Enterprise UX", "Figma Prototype",
  "Journey Mapping", "Field Workers", "10k+ Employees", "1st Place",
];
const KENERGY_KEYWORDS = [
  "Behavioural Design", "Gamification", "Sustainability", "Product Strategy",
  "Community Award", "Neighbourhood Goals", "1st Place", "Dual Award",
];
const keywords: Record<string, string[]> = {
  wisag: WISAG_KEYWORDS,
  kenergy: KENERGY_KEYWORDS,
};

const accentColors: Record<string, string> = {
  wisag: "oklch(0.75 0.18 280)",
  kenergy: "oklch(0.82 0.15 50)",
};

export function WinnerBadge() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<"wisag" | "kenergy">("wisag");

  const current = competitions.find((c) => c.id === active)!;

  return (
    <>
      {/* Badge button */}
      <motion.button
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2.5 rounded-full border border-amber-200/80 bg-amber-50/60 px-4 py-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 cursor-pointer"
      >
        <span className="text-base leading-none">🏆</span>
        <div className="flex flex-col items-start">
          <span className="text-[11px] font-semibold text-amber-800 leading-tight tracking-tight">
            Two-Time First-Place Winner
          </span>
          <span className="text-[9px] font-mono tracking-[0.12em] text-amber-700/70 leading-tight mt-0.5">
            GERMAN DIGITAL PRODUCT INNOVATION
          </span>
        </div>
        <span className="text-amber-400/60 group-hover:text-amber-500 transition-colors text-xs ml-0.5">
          →
        </span>
      </motion.button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Award Details</DialogTitle>
          <DialogDescription className="sr-only">Innovation challenge case study</DialogDescription>

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🏆</span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                DESIGN COMPETITION · GERMANY
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-normal tracking-[-0.03em]">
              Two-Time First-Place Winner
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Won two real-time challenges issued by German companies — competed against teams from universities and agencies to build their solution.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {competitions.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id as "wisag" | "kenergy")}
                className={[
                  "flex-1 px-6 py-3.5 text-sm font-medium transition-all duration-200 text-left border-b-2 -mb-px",
                  active === c.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span className="font-mono text-[9px] tracking-[0.18em] block text-muted-foreground mb-0.5">
                  {c.context}
                </span>
                <span className="tracking-tight">{c.title}</span>
                {c.achievement && (
                  <span
                    className="ml-2 text-[9px] font-mono tracking-[0.12em] px-2 py-0.5 rounded-full"
                    style={{
                      background: `color-mix(in oklab, ${accentColors[c.id]} 15%, transparent)`,
                      color: accentColors[c.id],
                    }}
                  >
                    {c.achievement}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Case study content */}
          <div className="p-8">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Challenge description */}
              <div className="mb-8">
                <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3">
                  THE CHALLENGE
                </span>
                <p className="text-base text-foreground/80 leading-relaxed">
                  {current.challenge}
                </p>
              </div>

              {/* Outcome */}
              <div className="mb-8 p-5 rounded-xl border border-border bg-secondary/40">
                <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-2">
                  RESULT
                </span>
                <p className="text-sm text-foreground/80 leading-relaxed">{current.outcome}</p>
              </div>

              {/* WISAG-only LinkedIn testimonial */}
              {active === "wisag" && (
                <div className="mb-8">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3">
                    WHAT THEY SAID
                  </span>

                  <a
                    href="https://www.linkedin.com/posts/yvonne-karolus-wisag_builddays-hackathon-wisaginsights-activity-7455133937875447808-vgQc?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJp5dkBYZ_a6crwcUEeQ4reoxHfgF4vbRk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/3 overflow-hidden hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5 transition-colors duration-200 cursor-pointer group/li"
                  >
                    {/* LinkedIn-style header */}
                    <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-[#0a66c2]/10">
                      <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                        YK
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-sm text-foreground leading-tight">
                            Yvonne Karolus
                          </span>
                          <svg className="w-3.5 h-3.5 text-[#0a66c2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-muted-foreground/50 text-xs">· 1st</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                          Innovation &amp; Ecosystem Manager @WISAG · Driving Innovation forward
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-3 h-3 text-[#0a66c2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="font-mono text-[9px] tracking-widest text-[#0a66c2]/70">
                            Posted on LinkedIn · 1mo ago
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quote body */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        🚀 <strong className="text-foreground/90 font-medium">32h from the challenge to the prototype.</strong>
                      </p>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        The challenge in controlling is rarely the lack of data, but rather the ability to draw the right insights from the abundance. The idea: a solution that{" "}
                        <span className="text-foreground/90 font-medium">detects deviations at an early stage, makes causes understandable and derives concrete recommendations for action.</span>
                      </p>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        What particularly impressed me was the <span className="text-foreground/90 font-medium">speed and motivation</span> of the participants. Overnight, the first functioning prototypes and perspectives emerge.
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed font-medium border-l-2 border-[#0a66c2]/40 pl-3 ml-1">
                        "Congratulations to the winning team Montana Plank, Muhammad Moghees and{" "}
                        <mark className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-semibold not-italic">
                          Nadeem Saif
                        </mark>
                        ! I am curious to see how we can continue to drive the results at WISAG."
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {["#Hackathon", "#WISAGinsights", "#Innovation", "#DigitalTransformation"].map((tag) => (
                          <span key={tag} className="text-[11px] text-[#0a66c2] font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Engagement bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-t border-[#0a66c2]/10 bg-[#0a66c2]/2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">👏❤️</span>
                        <span className="font-mono text-[10px] text-muted-foreground/50">You and 70 others</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground/40">3 comments · 3 reposts</span>
                        <span className="flex items-center gap-1 font-mono text-[10px] text-[#0a66c2]/60 group-hover/li:text-[#0a66c2] transition-colors">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          View post ↗
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              )}

              {/* Kenergy — Nadeem's own LinkedIn post */}
              {active === "kenergy" && (
                <div className="mb-8">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3">
                    IN NADEEM'S WORDS
                  </span>

                  <a
                    href="https://www.linkedin.com/posts/nadeemsaifrind_hackathon-winning-newacievement-activity-7467138741934047232-Q3OY?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJp5dkBYZ_a6crwcUEeQ4reoxHfgF4vbRk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/3 overflow-hidden hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5 transition-colors duration-200 cursor-pointer group/li"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-[#0a66c2]/10">
                      <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                        NS
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-sm text-foreground leading-tight">Nadeem Saif</span>
                          <svg className="w-3.5 h-3.5 text-[#0a66c2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-muted-foreground/50 text-xs">· You</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                          Graphics &amp; Marketing @Oliverlott · Media Technology &amp; Society
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-3 h-3 text-[#0a66c2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="font-mono text-[9px] tracking-widest text-[#0a66c2]/70">
                            Posted on LinkedIn · 3d ago
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Post body */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                        The winning streak continues — we secured{" "}
                        <span className="text-[#0a66c2]">1st place</span> at the{" "}
                        <span className="text-[#0a66c2]">LAUNCH Rhein-Main</span> Build Days for{" "}
                        <span className="text-[#0a66c2]">Kenergy Solutions GmbH</span> Challenge.
                      </p>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        After winning the <span className="text-[#0a66c2]">WISAG</span> Challenge at{" "}
                        <span className="text-[#0a66c2]">Futury</span>, our team{" "}
                        <span className="text-[#0a66c2]">Montana Plank</span> and{" "}
                        <span className="text-[#0a66c2]">Muhammad Moghees</span> jumped straight into
                        the next challenge: another intense{" "}
                        <span className="text-foreground/90 font-medium">32 hours</span> of building,
                        brainstorming, and problem solving.
                      </p>
                      <p className="text-sm text-foreground/90 font-medium leading-relaxed border-l-2 border-amber-400/60 pl-3 ml-1">
                        "This time, our solution not only earned 1st place but also won the{" "}
                        <mark className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-semibold">
                          Community Favorite Award. 🥇
                        </mark>"
                      </p>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        Beyond the competition, one of the most valuable parts was meeting incredible
                        people like <span className="text-[#0a66c2]">Norah Gath</span> and{" "}
                        <span className="text-[#0a66c2]">Marcel Decker</span>. Sharing fun excitements,
                        experiences and ideas. Grateful for the experience, the teamwork.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {["#Hackathon", "#Winning", "#EnergySolution", "#VibeCoding", "#Design", "#team"].map((tag) => (
                          <span key={tag} className="text-[11px] text-[#0a66c2] font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Engagement bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-t border-[#0a66c2]/10 bg-[#0a66c2]/2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">❤️🥇👏</span>
                        <span className="font-mono text-[10px] text-muted-foreground/50">Montana Plank and 39 others</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground/40">12 comments</span>
                        <span className="flex items-center gap-1 font-mono text-[10px] text-[#0a66c2]/60 group-hover/li:text-[#0a66c2] transition-colors">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          View post ↗
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              )}

              {/* Project screens from case study */}
              {(() => {
                const imgs = [
                  current.featuredScreen,
                  ...(current.screens ?? []),
                ].filter(Boolean).slice(0, 4) as string[];

                if (imgs.length === 0) return null;

                return (
                  <div className="mb-8">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3">
                      PROJECT SCREENS
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {imgs.map((src, i) => (
                        <div key={i} className="aspect-3/4 rounded-xl overflow-hidden">
                          <img
                            src={src}
                            alt={`${current.title} screen ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Keywords */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3">
                  SKILLS & FOCUS
                </span>
                <div className="flex flex-wrap gap-2">
                  {keywords[active].map((kw) => (
                    <span
                      key={kw}
                      className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full border"
                      style={{
                        borderColor: `color-mix(in oklab, ${accentColors[active]} 35%, oklch(0.92 0.005 250))`,
                        color: `color-mix(in oklab, ${accentColors[active]} 70%, oklch(0.3 0.01 250))`,
                        background: `color-mix(in oklab, ${accentColors[active]} 8%, transparent)`,
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
