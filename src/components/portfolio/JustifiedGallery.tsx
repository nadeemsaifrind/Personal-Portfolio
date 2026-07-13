import { useEffect, useRef, useState } from "react";

const DEFAULT_ROW_HEIGHT = 168;
const GALLERY_GAP = 12; // matches gap-3

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

function useImageRatios(srcs: string[]) {
  const [ratios, setRatios] = useState<(number | null)[]>(() => srcs.map(() => null));
  useEffect(() => {
    let cancelled = false;
    setRatios(srcs.map(() => null));
    srcs.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setRatios((prev) => {
          const next = [...prev];
          next[i] = img.naturalWidth / img.naturalHeight || 1;
          return next;
        });
      };
      img.onerror = () => {
        if (cancelled) return;
        setRatios((prev) => {
          const next = [...prev];
          next[i] = 1;
          return next;
        });
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcs.join("|")]);
  return ratios;
}

/* Justified gallery — rows of mixed-aspect-ratio images scaled uniformly
   (never cropped) so every row's combined width exactly fills the
   container, the way Flickr/Google Photos lay out photo sets. Plain
   flex-wrap at a fixed height leaves a gap wherever a row's images don't
   happen to sum to the exact container width; this solves for the row
   height that makes them sum exactly, per row. */
export function JustifiedGallery({ images, rowHeight = DEFAULT_ROW_HEIGHT }: { images: string[]; rowHeight?: number }) {
  const [containerRef, containerWidth] = useContainerWidth();
  const ratios = useImageRatios(images);

  if (images.length === 0) return null;

  const ready = containerWidth > 0 && ratios.every((r) => r !== null);
  const rows: { src: string; width: number; height: number }[][] = [];

  if (ready) {
    let current: { src: string; ratio: number }[] = [];
    let currentWidthAtTarget = 0;
    const finalizeRow = (row: { src: string; ratio: number }[]) => {
      const gapsWidth = (row.length - 1) * GALLERY_GAP;
      const ratioSum = row.reduce((s, r) => s + r.ratio, 0);
      const height = (containerWidth - gapsWidth) / ratioSum;
      rows.push(row.map((r) => ({ src: r.src, height, width: height * r.ratio })));
    };
    images.forEach((src, i) => {
      const ratio = ratios[i] as number;
      const widthAtTarget = ratio * rowHeight;
      const gapsWidth = current.length * GALLERY_GAP;
      if (current.length > 0 && currentWidthAtTarget + widthAtTarget + gapsWidth > containerWidth) {
        finalizeRow(current);
        current = [];
        currentWidthAtTarget = 0;
      }
      current.push({ src, ratio });
      currentWidthAtTarget += widthAtTarget;
    });
    if (current.length > 0) finalizeRow(current);
  }

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-3">
      {ready &&
        rows.map((row, ri) => (
          <div key={ri} className="flex gap-3">
            {row.map((item, i) => (
              <img
                key={i}
                src={item.src}
                alt=""
                loading="lazy"
                style={{ height: item.height, width: item.width }}
                className="object-cover shadow-[0_14px_30px_-16px_rgba(0,0,0,0.5)]"
              />
            ))}
          </div>
        ))}
    </div>
  );
}
