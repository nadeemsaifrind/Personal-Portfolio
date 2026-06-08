import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Trophy, Users, Briefcase, Rocket } from "lucide-react";
import { CASE_STUDIES, type ModeId } from "@/lib/portfolio-data";

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
  signal: string;
  signalIcon: React.ElementType;
  revealItems: RevealItem[];
  mode: ModeId;
  scrollTo?: string;
}> = [
  {
    index: "01",
    title: "Brand & Visual Designer",
    signal: "3 client projects · German industry",
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
    signal: "WISAG · Kenergy · Next Step · Master's in Germany",
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

const PREVIEW_ROTATIONS = [-3, 1.5, -1, 2.5, -2];

export function RecruiterShortcut({ onSelect, onOpenCaseStudy }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (lens: (typeof LENSES)[0]) => {
    onSelect(lens.mode, lens.title);
    if (lens.scrollTo) {
      requestAnimationFrame(() => {
        document.querySelector(lens.scrollTo!)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      navigate({ to: "/work/$modeId", params: { modeId: lens.mode } });
    }
  };

  return (
    <section className="border-t border-border relative overflow-hidden">
      {/* Section bg — subtle dot texture + gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(0 0 0 / 0.045) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-secondary/40 via-secondary/10 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-10 py-16 md:py-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.span
              className="font-mono text-[10px] tracking-[0.22em]"
              style={{ color: "#02AC87" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              FOR RECRUITERS & HIRING MANAGERS
            </motion.span>
            <motion.h2
              className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-normal tracking-[-0.04em] leading-[1.1] max-w-lg"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              View my work through<br />your hiring lens.
            </motion.h2>
          </div>

          <motion.p
            className="text-sm text-muted-foreground/55 max-w-[220px] md:text-right leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            Pick a role — the portfolio adapts to what matters most to you.
          </motion.p>
        </div>

        {/* Case Studies full-width glass bar */}
        <motion.a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center justify-between w-full mb-4 px-5 py-4 rounded-2xl border border-border/70 bg-background/75 backdrop-blur-md hover:border-foreground/20 hover:bg-background/95 hover:shadow-[0_4px_28px_rgba(0,0,0,0.07)] transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-5">
            {/* Overlapping thumbnails */}
            <div className="flex items-end">
              {CASE_STUDIES.slice(0, 5).map((cs, i) => (
                <motion.div
                  key={cs.id}
                  className="relative overflow-hidden rounded-lg border-2 border-background shadow-md shrink-0"
                  style={{
                    width: 44,
                    height: 58,
                    marginLeft: i === 0 ? 0 : -13,
                    zIndex: i + 1,
                    rotate: PREVIEW_ROTATIONS[i],
                  }}
                  whileHover={{ zIndex: 20, y: -7, rotate: 0, boxShadow: "0 12px 30px rgba(0,0,0,0.2)" }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {cs.coverImage && (
                    <motion.img
                      src={cs.coverImage}
                      alt={cs.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.25 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-b from-white/25 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/40 block mb-0.5">
                SKIP ROLE SELECTION
              </span>
              <span className="text-sm font-medium text-foreground">
                Browse all case studies directly
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/35 hidden sm:block">
              {CASE_STUDIES.length} documented projects
            </span>
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground/30 group-hover:bg-[#02AC87] group-hover:text-white group-hover:border-[#02AC87] transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.a>

        {/* OR divider */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          <div className="flex-1 h-px bg-border/50" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/30">OR SELECT A ROLE</span>
          <div className="flex-1 h-px bg-border/50" />
        </motion.div>

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
                whileHover={{ y: -2 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(lens.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group rounded-2xl border border-border bg-background/70 backdrop-blur-sm hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-[border-color,box-shadow,background] duration-300 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(lens)}
                  className="w-full text-left p-6 block"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl border border-border/70 bg-secondary/50 flex items-center justify-center group-hover:border-foreground/15 group-hover:bg-secondary/80 transition-all duration-300">
                        <Signal className="w-[17px] h-[17px] text-foreground/55" strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground/30">
                        {lens.index}
                      </span>
                    </div>
                    <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground/30 group-hover:bg-[#02AC87] group-hover:text-white group-hover:border-[#02AC87] transition-all duration-300 shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-[17px] font-medium tracking-tight leading-snug mb-2 text-foreground">
                    {lens.title}
                  </h3>

                  {/* Signal */}
                  <p className="text-[11px] text-muted-foreground/50 leading-relaxed">
                    {lens.signal}
                  </p>
                </button>

                {/* Reveal strip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-border/40 pt-4 bg-secondary/20 backdrop-blur-sm">
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
                                className="font-mono text-[9px] tracking-[0.12em] text-foreground/80 border border-foreground/20 bg-background/60 hover:bg-[#02AC87] hover:text-white hover:border-[#02AC87] px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1"
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
