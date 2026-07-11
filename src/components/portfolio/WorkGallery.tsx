import { MagnifyingGlass } from "@phosphor-icons/react";
import { WORK_GALLERY } from "@/lib/portfolio-data";
import { RevealText } from "./sohub";
import { RevealCard, WorkCard } from "./WorkCard";

export function WorkGallery() {
  return (
    <section id="gallery" className="section-glow py-16 sm:py-24 lg:py-36">
      <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">

        {/* Section header */}
        <div className="mb-14 lg:mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-5 bg-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Portfolio</span>
            </div>
            <RevealText
              as="h2"
              className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[16ch]"
              lines={["Work by", "category."]}
            />
          </div>
          <p className="text-sm text-foreground/40 max-w-[36ch] leading-relaxed sm:pb-1">
            Six years of design work across brand, social, food, and the German market.
          </p>
        </div>

        {/* Categories */}
        <div>
          {WORK_GALLERY.map((cat, ci) => (
            <div key={cat.query}>

              {ci > 0 && <div className="border-t border-border my-14" />}

              {/* Search bar — purely visual framing device */}
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <MagnifyingGlass size={13} weight="regular" className="text-foreground/25 shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/55">
                  {cat.query}
                </span>
                <span className="ml-auto font-mono text-[10px] text-foreground/20 select-none">↵</span>
              </div>

              {/* Result label + subtitle */}
              <div className="mt-3 mb-8 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary/70">
                  SEARCH RESULT
                </span>
                <span className="font-mono text-[9px] text-foreground/20">—</span>
                <span className="text-[11px] text-foreground/35">{cat.subtitle}</span>
              </div>

              {/* Project cards — compact square variant of the shared card */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {cat.items.map((item, ii) => (
                  <RevealCard key={item.title + ii} index={ii}>
                    <WorkCard
                      image={item.cover}
                      title={item.title}
                      tagLabel={item.tag}
                      meta={item.year}
                      aspect="square"
                      compact
                    />
                  </RevealCard>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
