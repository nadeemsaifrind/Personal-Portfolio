import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";

const EASE = [0.22, 1, 0.36, 1] as const;

export function StatsAchievements() {
  return (
    <section id="achievements" className="section-glow section-glow-r border-y border-border py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="mb-14 lg:mb-18">
          <RevealText
            as="h2"
            className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[18ch]"
            lines={[
              "Actions speak",
              <>
                <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                  louder
                </span>{" "}
                <span
                  className="pr-1 font-normal"
                  style={{ fontFamily: "var(--font-signature)", fontSize: "0.9em" }}
                >
                  than
                </span>
                words.
              </>,
            ]}
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
      </div>
    </section>
  );
}
