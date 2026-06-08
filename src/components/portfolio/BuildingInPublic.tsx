import { motion } from "framer-motion";
import { PUBLIC_BUILDS } from "@/lib/portfolio-data";

export function BuildingInPublic() {
  return (
    <section className="border-t border-border" id="building">
      <div className="container mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl max-w-xl leading-tight">
              Execution record, 2023-2025.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              Every entry is something shipped, won, or built. Not planned.
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden md:inline self-end">
            {PUBLIC_BUILDS.length} outputs
          </span>
        </div>

        <div className="border border-border divide-y divide-border overflow-hidden">
          {PUBLIC_BUILDS.map((build, i) => (
            <motion.div
              key={`${build.year}-${build.title}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="px-5 md:px-6 py-4 md:py-5 bg-background hover:bg-secondary transition-colors"
            >
              <div className="flex items-start gap-6 md:gap-8">
                {/* Year */}
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground shrink-0 pt-0.5 w-10">
                  {build.year}
                </span>

                {/* Type + title */}
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/60">
                    {build.type}
                  </span>
                  <p className="text-base md:text-lg mt-1 leading-tight">{build.title}</p>
                  {/* Result visible on mobile */}
                  <p className="text-sm text-muted-foreground mt-1.5 md:hidden">{build.result}</p>
                </div>

                {/* Result visible on desktop */}
                <p className="text-sm text-muted-foreground text-right shrink-0 max-w-[260px] hidden md:block pt-0.5 leading-snug">
                  {build.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
