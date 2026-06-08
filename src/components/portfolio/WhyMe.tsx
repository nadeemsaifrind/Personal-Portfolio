import { motion } from "framer-motion";
import { WHY_ME } from "@/lib/portfolio-data";

export function WhyMe() {
  return (
    <section className="border-t border-[#02AC87]/20" id="whyme" style={{ background: "#0A1F1A" }}>
      <div className="container mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs tracking-[0.2em]" style={{ color: "#02AC87" }}>
              WHY MY PROFILE IS DIFFERENT
            </span>
            <h2 className="text-3xl md:text-4xl mt-4 max-w-2xl leading-tight text-white">
              What you actually get when you hire me.
            </h2>
          </div>
          <p className="text-sm max-w-50 md:text-right leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
            Not a claim. A pattern across every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(2,172,135,0.08)" }}>
          {WHY_ME.map((item, i) => (
            <motion.div
              key={item.statement}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="group p-8 md:p-10 transition-colors duration-300"
              style={{ background: "#0A1F1A" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0F2820"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F1A"; }}
            >
              <p className="text-lg md:text-xl leading-snug tracking-tight mb-4 text-white">
                {item.statement}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {item.explanation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
