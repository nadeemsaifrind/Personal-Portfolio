import { motion } from "framer-motion";
import { WHY_ME } from "@/lib/portfolio-data";

export function WhyMe() {
  return (
    <section className="border-t border-border bg-secondary" id="whyme">
      <div className="container mx-auto px-6 lg:px-10 py-24">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          WHY MY PROFILE IS DIFFERENT
        </span>
        <h2 className="text-3xl md:text-4xl mt-4 mb-16 max-w-2xl leading-tight">
          What you actually get when you hire me.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {WHY_ME.map((item, i) => (
            <motion.div
              key={item.statement}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="bg-secondary p-8 md:p-10"
            >
              <p className="text-lg md:text-xl leading-snug tracking-tight mb-4 text-foreground">
                {item.statement}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.explanation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
