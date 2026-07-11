import { motion } from "framer-motion";
import { Trophy } from "@phosphor-icons/react";
import { ACHIEVEMENTS, AWARDS } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";

const EASE = [0.22, 1, 0.36, 1] as const;

export function StatsAchievements() {
  return (
    <section id="achievements" className="section-glow section-glow-r border-y border-border py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="mb-14 lg:mb-18">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-5 bg-primary" />
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">By the numbers</span>
          </div>
          <RevealText
            as="h2"
            className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[18ch]"
            lines={["Actions speak", "louder than words."]}
          />
        </div>

        <div className="grid grid-cols-2 divide-y divide-border sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
          {ACHIEVEMENTS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-2 py-8 pr-4 sm:px-8 lg:px-10 first:pl-0 sm:first:pt-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
            >
              <p
                className="font-black tracking-tightest leading-none text-foreground"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
              >
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-foreground/75">{stat.label}</p>
              <p className="text-xs text-foreground/38 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Award highlights */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-18">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.title}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  <Trophy size={12} weight="fill" />
                  {award.result}
                </span>
                <span className="font-mono text-[10px] text-foreground/30">{award.year}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">{award.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/45">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
