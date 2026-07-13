import { useState } from "react";
import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/portfolio-data";
import { JustifiedGallery } from "./JustifiedGallery";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const EASE = [0.22, 1, 0.36, 1] as const;

type NSClient = { name: string; slug: string; images: string[] };

const nextstepCase = CASE_STUDIES.find((c) => c.id === "nextstep")!;
const NEXTSTEP_GALLERY = (nextstepCase.clientGallery ?? []) as NSClient[];

/* Replaces the old fanned-card stack (small preview tiles you had to tap,
   then a bespoke 300vh scroll story per client) with the same language as
   the Vanessa case study: one big headline, then the real work itself —
   full-size, sharp-edged, uncropped — scrolling by like a contact sheet.
   Clicking a client opens a lightbox with every image for that client —
   not the "Next Step Digital" case study itself, which stays behind its
   own separate "View full case study" button. */
export function NextStepFeature({ onOpenCaseStudy }: { onOpenCaseStudy: () => void }) {
  const [openClient, setOpenClient] = useState<NSClient | null>(null);

  return (
    <section className="section-glow py-16 sm:py-24 lg:py-32 border-t border-border" style={{ background: "var(--background)" }}>
      <div className="mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[46ch]">
          <motion.h2
            className="display-hero text-[clamp(2rem,4vw,4rem)]"
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
          <p className="mt-5 text-sm leading-relaxed text-foreground/45">
            {nextstepCase.outcome}
          </p>
          <button
            type="button"
            onClick={onOpenCaseStudy}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground/80 transition hover:border-white/20 hover:bg-surface-2"
          >
            View full case study →
          </button>
        </div>
      </div>

      {/* Full-bleed rail of real client work — same mechanic as the Vanessa
          case study: fixed height, width intrinsic, object-contain, sharp
          corners. Each frame opens a lightbox of every image for that
          client — the "Next Step Digital" case study itself stays behind
          its own button above, not this rail. */}
      <div className="scrollbar-none mt-10 flex gap-5 overflow-x-auto px-4 sm:mt-14 sm:gap-6 sm:px-8 lg:mt-16 lg:px-12" style={{ scrollSnapType: "x mandatory" }}>
        {NEXTSTEP_GALLERY.map((client, i) => (
          <motion.button
            key={client.slug}
            type="button"
            onClick={() => setOpenClient(client)}
            className="group shrink-0 text-left"
            style={{ scrollSnapAlign: "start" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 * i }}
          >
            <img
              src={client.images[0]}
              alt={client.name}
              className="h-[52vh] w-auto max-w-none max-h-160 object-contain shadow-[0_20px_45px_-20px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:-translate-y-1"
            />
            <p className="mt-4 text-xl font-black tracking-tight text-foreground sm:text-2xl">
              {client.name}
            </p>
          </motion.button>
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
