import { cn } from "@/lib/utils";
import { C21_ORANGE } from "./brand";

/* "nadeem." × "capture21" co-brand mark.
   capture21 is set as a text wordmark on purpose. PLACEHOLDER: swap the
   <span> below for capture21's official SVG logo once Philipp sends it. */
export function CoBrand({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-baseline gap-2.5 whitespace-nowrap leading-none", className)}
    >
      <span className="font-black lowercase tracking-[-0.06em]">
        nadeem<span className="text-brand">.</span>
      </span>
      <span aria-hidden="true" className="text-[0.8em] font-normal opacity-35">
        ×
      </span>
      <span className="font-bold tracking-[-0.02em]">
        capture<span style={{ color: C21_ORANGE }}>21</span>
      </span>
    </span>
  );
}
