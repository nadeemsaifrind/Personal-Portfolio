import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Trophy, Users, Briefcase, Rocket } from "lucide-react";
import { type ModeId } from "@/lib/portfolio-data";

interface Props {
  onSelect: (mode: ModeId, lensLabel: string) => void;
  onOpenCaseStudy: (id: string) => void;
}

interface RevealItem {
  label: string;
  caseStudyId?: string;
}

const LENSES: Array<{
  index: string;
  title: string;
  tags: string[];
  signal: string;
  signalIcon: React.ElementType;
  revealItems: RevealItem[];
  mode: ModeId;
  scrollTo?: string;
}> = [
  {
    index: "01",
    title: "Brand & Visual Designer",
    tags: ["Identity Systems", "Branding", "Print", "Digital Design"],
    signal: "3 real client projects · German industry",
    signalIcon: Briefcase,
    revealItems: [
      { label: "OliverLott rebrand",  caseStudyId: "oliverlott" },
      { label: "Dreamfly identity",   caseStudyId: "dreamfly"   },
      { label: "Next Step Studio",    caseStudyId: "nextstep"   },
    ],
    mode: "brand",
  },
  {
    index: "02",
    title: "Marketing & Content Specialist",
    tags: ["Campaigns", "Social Media", "Content Strategy", "Growth"],
    signal: "4 projects · Agency-founded · Multichannel",
    signalIcon: Rocket,
    revealItems: [
      { label: "Next Step Digital",  caseStudyId: "nextstep"   },
      { label: "Livingroom",         caseStudyId: "livingroom" },
      { label: "Social campaigns" },
    ],
    mode: "marketing",
  },
  {
    index: "03",
    title: "Product & UX/UI Designer",
    tags: ["Research", "User Flows", "Wireframes", "Prototyping"],
    signal: "2× Innovation Challenge Winner · Germany",
    signalIcon: Trophy,
    revealItems: [
      { label: "WISAG 1st Place",    caseStudyId: "wisag"   },
      { label: "Kenergy dual award", caseStudyId: "kenergy" },
      { label: "Figma prototypes" },
    ],
    mode: "ux",
  },
  {
    index: "04",
    title: "Why Companies Hire Me",
    tags: ["Awards", "Business Thinking", "Startup Experience", "Leadership"],
    signal: "WISAG · Kenergy · Next Step Digital · Master's in Germany",
    signalIcon: Users,
    revealItems: [
      { label: "WISAG Challenge",    caseStudyId: "wisag"    },
      { label: "Kenergy Challenge",  caseStudyId: "kenergy"  },
      { label: "Next Step Digital",  caseStudyId: "nextstep" },
      { label: "Achievements" },
    ],
    mode: "ux",
    scrollTo: "#achievements",
  },
];

export function RecruiterShortcut({ onSelect, onOpenCaseStudy }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (lens: (typeof LENSES)[0]) => {
    onSelect(lens.mode, lens.title);
    if (lens.scrollTo) {
      // "Why Companies Hire Me" scrolls to achievements
      requestAnimationFrame(() => {
        document.querySelector(lens.scrollTo!)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      // All other cards navigate directly to the discipline page
      navigate({ to: "/work/$modeId", params: { modeId: lens.mode } });
    }
  };

  return (
    <section className="border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-10 py-16 md:py-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
          <div>
            <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
              FOR RECRUITERS & HIRING MANAGERS
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-normal tracking-[-0.03em] max-w-lg leading-tight">
              View my work through your hiring lens.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed hidden md:block">
            Select the role you're hiring for — the portfolio adapts to what matters most to you.
          </p>
        </div>

        {/* Subtle instruction */}
        <p className="text-xs text-muted-foreground/50 font-mono tracking-[0.15em] mb-10">
          CLICK TO JUMP TO RELEVANT PROJECTS, ACHIEVEMENTS & EXPERIENCE
        </p>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LENSES.map((lens, i) => {
            const isHovered = hoveredIndex === lens.index;
            const Signal = lens.signalIcon;

            return (
              <motion.div
                key={lens.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(lens.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-float overflow-hidden relative"
              >
                {/* Card body — clickable area navigates to discipline/scroll */}
                <button
                  type="button"
                  onClick={() => handleSelect(lens)}
                  className="w-full text-left p-6 block"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground/40">
                      {lens.index}
                    </span>
                    <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground/30 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-medium tracking-tight leading-snug mb-3 text-foreground">
                    {lens.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {lens.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] tracking-widest text-muted-foreground/50 border border-border/60 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Credibility signal */}
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground/60">
                    <Signal className="w-3 h-3 shrink-0 text-muted-foreground/40" strokeWidth={1.75} />
                    <span className="leading-snug">{lens.signal}</span>
                  </div>
                </button>

                {/* Reveal strip — slides up on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-border/50 pt-4 bg-secondary/30">
                        <p className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground/40 mb-2.5">
                          YOU'LL SEE
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {lens.revealItems.map((item) =>
                            item.caseStudyId ? (
                              <button
                                key={item.label}
                                type="button"
                                onClick={() => onOpenCaseStudy(item.caseStudyId!)}
                                className="font-mono text-[9px] tracking-[0.12em] text-foreground/80 border border-foreground/20 bg-background/60 hover:bg-foreground hover:text-background hover:border-foreground px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1"
                              >
                                {item.label}
                                <ArrowUpRight className="w-2.5 h-2.5" />
                              </button>
                            ) : (
                              <span
                                key={item.label}
                                className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground/50 border border-border/40 px-2.5 py-1 rounded-full"
                              >
                                {item.label}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
