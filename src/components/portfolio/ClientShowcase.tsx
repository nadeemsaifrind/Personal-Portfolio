import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import arascow1 from "@/assets/arascow/arascow-1.png";
import arascow2 from "@/assets/arascow/arascow-2.png";
import arascow3 from "@/assets/arascow/arascow-3.png";
import arascow4 from "@/assets/arascow/arascow-4.png";

const CLIENTS = [
  {
    name: "Arascow",
    role: "BPO & Digital Marketing",
    year: "2024-2025",
    summary:
      "End-to-end brand and performance design for Arascow, a BPO and digital marketing agency. Work spanned social campaign creative, Google Ads visuals, recruitment posts, and conversion-focused brand storytelling across a unified visual system.",
    deliverables: ["Brand Creative", "Google Ads", "Social Campaigns", "Recruitment"],
    images: [arascow1, arascow2, arascow3, arascow4],
  },
];

export function ClientShowcase() {
  const [active, setActive] = useState<(typeof CLIENTS)[number] | null>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const total = active?.images.length ?? 0;
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    if (active) setIndex(0);
    setZoomed(false);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, total]);



  return (
    <section className="border-t border-border">
      <div className="container mx-auto px-6 lg:px-10 py-24">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          PORTFOLIO / CLIENTS
        </span>
        <h2 className="text-3xl md:text-4xl mt-4 mb-12 max-w-2xl">
          Selected client work. Tap a name to open the case.
        </h2>

        <div className="grid grid-cols-1 gap-px bg-border">
          {CLIENTS.map((c) => (
            <button
              key={c.name}
              onClick={() => setActive(c)}
              className="bg-background p-8 md:p-10 group text-left transition-colors hover:bg-secondary"
            >
              <div className="flex items-baseline justify-between gap-6 flex-wrap">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    CLIENT
                  </span>
                  <h3 className="text-3xl md:text-5xl tracking-tight">{c.name}</h3>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  <span className="font-mono tracking-wide text-muted-foreground">
                    {c.role.toUpperCase()}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
                  {active.role.toUpperCase()} · {active.year}
                </div>
                <DialogTitle className="text-3xl md:text-4xl tracking-tight">
                  {active.name}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed pt-2">
                  {active.summary}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-2 py-4">
                {active.deliverables.map((d) => (
                  <span
                    key={d}
                    className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground border border-border rounded-full px-3 py-1"
                  >
                    {d.toUpperCase()}
                  </span>
                ))}
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-lg border border-border bg-secondary/30">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={index}
                      src={active.images[index]}
                      alt={`${active.name} design ${index + 1}`}
                      onClick={() => setZoomed(true)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-full cursor-zoom-in"
                    />
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border transition-colors hover:bg-background"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border transition-colors hover:bg-background"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomed(true)}
                    aria-label="Zoom image"
                    className="absolute right-3 bottom-3 grid place-items-center h-9 w-9 rounded-full bg-background/80 backdrop-blur border border-border transition-colors hover:bg-background"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    {index + 1} / {total}
                  </span>
                  <div className="flex gap-2">
                    {active.images.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-12 w-16 overflow-hidden rounded border transition-opacity ${
                          i === index ? "border-foreground opacity-100" : "border-border opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {active && zoomed && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            aria-label="Close zoom"
            className="absolute right-5 top-5 grid place-items-center h-10 w-10 rounded-full bg-background/80 border border-border"
            onClick={() => setZoomed(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-5 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-background/80 border border-border"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={active.images[index]}
            alt={`${active.name} design ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-background/80 border border-border"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}

