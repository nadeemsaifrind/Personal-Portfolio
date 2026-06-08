import { motion } from "framer-motion";
import { WORKFLOW } from "@/lib/portfolio-data";

export function WorkflowSection() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="mb-10">
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            I can contribute at every stage, from the first idea to lasting growth. Most professionals cover one or two steps. I cover the whole arc.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
          {WORKFLOW.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="bg-background p-6 md:p-8"
            >
              <h3 className="text-xl md:text-2xl mb-3 leading-tight">{step.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {step.description}
              </p>
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground/60 border border-border/60 rounded-full px-2.5 py-1">
                {step.discipline}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
