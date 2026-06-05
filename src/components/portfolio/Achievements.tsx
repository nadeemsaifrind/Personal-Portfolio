import { motion } from "framer-motion";
import { ACHIEVEMENTS, AWARDS } from "@/lib/portfolio-data";

export function Achievements() {
  return (
    <section className="border-t border-border" id="achievements">
      <div className="container mx-auto px-6 lg:px-10 py-24">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          ACHIEVEMENTS
        </span>
        <h2 className="text-3xl md:text-4xl mt-4 mb-12 max-w-2xl leading-tight">
          Numbers and recognition that tell the story.
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-px">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="bg-background p-8 md:p-10"
            >
              <p className="text-4xl md:text-5xl tracking-tight mb-2">{a.value}</p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/70 mb-2">
                {a.label.toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground leading-snug">{a.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background p-8 md:p-10"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-accent text-sm">★</span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-accent">
                  {award.result.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">· {award.year}</span>
              </div>
              <h3 className="text-2xl md:text-3xl mb-3 leading-tight">{award.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
