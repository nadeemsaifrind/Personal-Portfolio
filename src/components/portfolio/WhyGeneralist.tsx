import { motion } from "framer-motion";
import { WHY_ME } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhyGeneralist() {
  return (
    <section id="why-me" className="section-glow py-16 sm:py-24 lg:py-32 border-t border-border">
      <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-5 bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Why me</span>
            </div>
            <RevealText
              as="h2"
              className="display-hero max-w-[22ch] text-[clamp(2rem,4vw,4rem)]"
              lines={["One person,", "five disciplines."]}
            />
          </div>
          <p className="text-sm text-foreground/40 max-w-[36ch] leading-relaxed sm:pb-1">
            Most companies need 4-5 people for this arc. Here's why one is enough.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {WHY_ME.map((item, i) => (
            <motion.div
              key={item.statement}
              className="bg-background p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <span className="mb-4 block font-mono text-[10px] tracking-[0.2em] text-primary/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
                {item.statement}
              </p>
              <p className="text-sm leading-relaxed text-foreground/45">
                {item.explanation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
