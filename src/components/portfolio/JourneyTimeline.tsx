import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { JOURNEY } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";

const EASE = [0.22, 1, 0.36, 1] as const;

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="section-glow section-glow-r py-16 sm:py-24 lg:py-32 border-t border-border">
      <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="mb-14 lg:mb-20">
          <RevealText
            as="h2"
            className="display-hero max-w-[20ch] text-[clamp(2rem,4vw,4rem)]"
            lines={[
              <>
                Pakistan{" "}
                <span
                  className="pr-1 font-normal"
                  style={{ fontFamily: "var(--font-signature)", fontSize: "0.9em" }}
                >
                  to
                </span>
                Germany,
              </>,
              <>
                frame by{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
                  frame
                </span>
                .
              </>,
            ]}
          />
        </div>

        <div ref={containerRef} className="relative pl-8 sm:pl-10">
          {/* Track */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
          {/* Progress fill */}
          <motion.div
            className="absolute left-0 top-2 w-px bg-primary"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-10 sm:gap-12">
            {JOURNEY.map((step, i) => (
              <motion.div
                key={step.era}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.05 }}
              >
                <span className="absolute -left-8 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background sm:-left-10" />
                <p className="mb-1.5 text-sm font-medium text-primary/70">
                  {step.era}
                </p>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {step.title}
                </h3>
                <p className="max-w-[62ch] text-sm leading-relaxed text-foreground/45">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
