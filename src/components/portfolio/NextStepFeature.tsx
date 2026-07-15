import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { CASE_STUDIES } from "@/lib/portfolio-data";
import { JustifiedGallery } from "./JustifiedGallery";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const EASE = [0.22, 1, 0.36, 1] as const;

type NSClient = { name: string; slug: string; images: string[] };

const nextstepCase = CASE_STUDIES.find((c) => c.id === "nextstep")!;
const NEXTSTEP_GALLERY = (nextstepCase.clientGallery ?? []) as NSClient[];

// Hovering within this many px of either edge of the rail auto-scrolls it —
// lets you reach every card without a visible scrollbar or a drag gesture.
const EDGE_ZONE_PX = 90;
const EDGE_SCROLL_PX_PER_FRAME = 9;

function ClientCard({
  client,
  index,
  onOpen,
}: {
  client: NSClient;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group relative aspect-3/4 w-[38vw] shrink-0 overflow-hidden rounded-lg text-left shadow-[0_16px_36px_-18px_rgba(0,0,0,0.55)] hover:z-20 sm:w-60 md:w-64"
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      whileHover={{ scale: 1.1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        ease: EASE,
        delay: 0.06 * index,
        // Overrides just the hover response — the entrance fade stays slow
        // and staggered, but the zoom itself needs to feel instant, both in
        // and out, so it reads as clean and responsive rather than laggy.
        scale: { duration: 0.22, ease: "easeOut", delay: 0 },
      }}
    >
      <img
        src={client.images[0]}
        alt={client.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex h-[18%] min-h-14 items-center justify-between gap-2 border-t border-white/15 bg-black/35 px-4 backdrop-blur-md">
        <p className="text-sm font-bold uppercase leading-tight tracking-wide text-white sm:text-base">
          {client.name}
        </p>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">
          <Plus size={16} weight="bold" />
        </span>
      </div>
    </motion.button>
  );
}

/* Replaces the old fanned-card stack (small preview tiles you had to tap,
   then a bespoke 300vh scroll story per client) with the same language as
   the Vanessa case study: one big headline, then the real work itself —
   full-size, sharp-edged, uncropped — scrolling by like a contact sheet.
   Clicking a client opens a lightbox with every image for that client —
   not the "Next Step Digital" case study itself, which stays behind its
   own separate "View full case study" button. */
export function NextStepFeature({ onOpenCaseStudy }: { onOpenCaseStudy: () => void }) {
  const [openClient, setOpenClient] = useState<NSClient | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollDirRef = useRef(0);

  // A single always-on rAF loop, driving scrollLeft directly whenever the
  // cursor is sitting in an edge zone — smoother and more controllable than
  // stacking up scrollBy({behavior:"smooth"}) calls, and it's a no-op the
  // rest of the time.
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const el = scrollRef.current;
      if (el && scrollDirRef.current !== 0) {
        el.scrollLeft += scrollDirRef.current * EDGE_SCROLL_PX_PER_FRAME;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < EDGE_ZONE_PX) {
      scrollDirRef.current = -1;
    } else if (x > width - EDGE_ZONE_PX) {
      scrollDirRef.current = 1;
    } else {
      scrollDirRef.current = 0;
    }
  };

  const handleMouseLeave = () => {
    scrollDirRef.current = 0;
  };

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32 border-t border-border">
      <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[46ch]">
          <motion.h2
            className="display-hero text-[clamp(2rem,4vw,4rem)] text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span
              className="pr-1 font-normal"
              style={{ fontFamily: "var(--font-signature)", fontSize: "0.9em" }}
            >
              The
            </span>
            work that might{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-serif-accent)", color: "var(--primary)" }}>
              convince
            </span>{" "}
            you.
          </motion.h2>
          <p className="mt-5 text-sm leading-relaxed text-black/45">
            {nextstepCase.outcome}
          </p>
          <button
            type="button"
            onClick={onOpenCaseStudy}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-black/12 bg-black/3 px-5 py-2.5 text-sm font-medium text-black/70 transition hover:border-black/25 hover:bg-black/6"
          >
            View full case study →
          </button>
        </div>
      </div>

      {/* Full-bleed rail of real client work — smaller, slightly rounded
          portrait cards, cropped to fill, each with a bottom "frosted" bar
          carrying the client name and a "+" affordance. No auto-motion:
          the rail sits still, and hovering a card zooms it up cleanly
          (whileHover, not a CSS class, so it composes with the entrance
          animation's own transform instead of fighting it); move straight
          from one card into the next and the zoom hands off between them
          with no reset. Hovering within EDGE_ZONE_PX of either side of the
          rail auto-scrolls it, so every card is reachable without a
          scrollbar or a drag. Each frame opens a lightbox of every image for
          that client — the "Next Step Digital" case study itself stays
          behind its own button above, not this rail. */}
      <div
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="scrollbar-none mt-10 flex gap-4 overflow-x-auto px-4 py-6 sm:mt-14 sm:gap-5 sm:px-8 lg:mt-16 lg:px-12"
      >
        {NEXTSTEP_GALLERY.map((client, i) => (
          <ClientCard
            key={client.slug}
            client={client}
            index={i}
            onOpen={() => setOpenClient(client)}
          />
        ))}
      </div>

      {/* Per-client gallery lightbox — every image for the clicked client,
          justified into rows so nothing is cropped and nothing leaves a
          gap, sharp edges throughout. */}
      <Dialog open={!!openClient} onOpenChange={(o) => !o && setOpenClient(null)}>
        <DialogContent
          data-lenis-prevent
          className="max-w-5xl w-[92vw] max-h-[88vh] overflow-y-auto overscroll-contain bg-background p-6 sm:p-8"
        >
          <DialogTitle className="display-hero text-[clamp(1.5rem,3vw,2.25rem)]">
            {openClient?.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full image gallery for {openClient?.name}
          </DialogDescription>
          {openClient && <JustifiedGallery images={openClient.images} rowHeight={260} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
