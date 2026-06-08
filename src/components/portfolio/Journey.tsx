import { motion } from "framer-motion";
import { JOURNEY } from "@/lib/portfolio-data";

export function Journey() {
  return (
    <section className="border-t border-border" id="journey">
      <div className="container mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl leading-tight max-w-2xl">
              From DG Khan (a small town of Pakistan) to Creative Technologist.
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden md:inline self-end">
            Pakistan → Germany
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {JOURNEY.map((step, i) => (
            <motion.div
              key={step.era}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 4) * 0.07, duration: 0.5 }}
              className="bg-background p-6 md:p-8 group hover:bg-secondary/40 transition-colors duration-300"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-6">
                {step.era.toUpperCase()}
              </div>
              <h3 className="text-lg md:text-xl leading-tight mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
