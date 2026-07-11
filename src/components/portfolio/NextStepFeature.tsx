import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { CASE_STUDIES } from "@/lib/portfolio-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const MONO = "var(--font-mono)";

type NSClient = { name: string; slug: string; images: string[] };

const nextstepCase = CASE_STUDIES.find((c) => c.id === "nextstep")!;
const NEXTSTEP_GALLERY = (nextstepCase.clientGallery ?? []) as NSClient[];

const CLIENT_META: Record<string, { deliverables: string[]; description: string; imageDescriptions: string[] }> = {
  arascow: {
    deliverables: ["Brand Creative", "Google Ads", "Social Campaigns", "Recruitment"],
    description: "End-to-end brand and performance design for Arascow — a BPO and digital marketing agency. A unified visual system spanning social campaign creative, Google Ads, recruitment storytelling, and conversion-focused brand assets.",
    imageDescriptions: [
      "Core visual identity establishing Arascow's brand language — bold, professional, built to convert.",
      "Google Ads creative system designed for maximum click-through with high-contrast visuals and clear messaging.",
      "Social campaign graphics that stop the scroll across Meta and Instagram with a consistent brand voice.",
      "Recruitment visuals that balance professionalism with human appeal to attract top-tier talent.",
    ],
  },
  bcl: {
    deliverables: ["Brand Identity", "Social Media", "Visual System"],
    description: "Brand identity and cohesive visual system for BCL — establishing a credible, trustworthy presence across every digital and print touchpoint with a design language built to last.",
    imageDescriptions: [
      "Primary brand identity system — mark, colour palette, and typography built for long-term recognition.",
      "Social media visual templates maintaining brand integrity across posts, stories, and covers.",
      "Complete visual system documentation ensuring consistency from digital assets to printed collateral.",
    ],
  },
  potentialwecker: {
    deliverables: ["Marketing Design", "Social Campaigns", "Brand Graphics"],
    description: "Marketing and campaign design for Potential Wecker — energetic, motivating visuals that activate audiences and position the brand as the spark that pushes people toward their goals.",
    imageDescriptions: [
      "Bold marketing collateral capturing the brand's energy — design that motivates and demands attention.",
      "Social campaign graphics that inspire action and push audiences toward unlocking their potential.",
      "Brand graphics carrying the mission — direct, powerful visuals that awaken and energise.",
    ],
  },
  ednex: {
    deliverables: ["Brand Design", "Digital Campaigns", "Social Media"],
    description: "Premium brand identity for Ednex Consultants — an education consultancy helping ambitious students study abroad. Every design element communicates trust, international expertise, and academic ambition.",
    imageDescriptions: [
      "Premium education brand identity conveying international reach and academic credibility.",
      "Digital campaign assets that speak to students pursuing university opportunities abroad.",
      "Social media creative building a credible community presence for the Ednex brand.",
    ],
  },
  mousamargi: {
    deliverables: ["Brand Identity", "Social Media", "Logistics Branding"],
    description: "Brand identity and social media design for Mousa Albargi Cargo — a professional logistics brand built for visibility and trust across vehicles, documentation, and digital channels.",
    imageDescriptions: [
      "Professional logistics brand identity built for maximum recognition across all operational touchpoints.",
      "Social media content that humanises the cargo brand while reinforcing operational reliability.",
      "Logistics-specific branding: document templates, iconography, and vehicle livery concepts.",
    ],
  },
  pakworldhoney: {
    deliverables: ["Brand Design", "Packaging", "Social Media"],
    description: "Premium brand design and packaging for Pak World Honey — a visual world as warm, rich, and natural as the product itself. Artisan aesthetics meeting modern retail appeal.",
    imageDescriptions: [
      "Artisan packaging design making Pak World Honey unmissable on shelf with warmth and authenticity.",
      "Social media content celebrating natural quality and driving product desire through visual storytelling.",
      "Brand design rooted in heritage — golden tones, natural motifs, and premium positioning throughout.",
    ],
  },
};

const FAN = [
  { rotate: -20, tx: -108, ty: 28, z: 1 },
  { rotate: -11, tx: -60, ty: 10, z: 2 },
  { rotate: -2, tx: -12, ty: -4, z: 5 },
  { rotate: 7, tx: 38, ty: 10, z: 2 },
  { rotate: 15, tx: 82, ty: 26, z: 1 },
  { rotate: 22, tx: 122, ty: 40, z: 0 },
];

/* ── Ambient cosmos glow — dark variant, reused across this feature ── */
function CosmosGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div style={{ position: "absolute", width: "72%", height: "68%", top: "6%", right: "-8%", background: "radial-gradient(ellipse at center, oklch(0.42 0.14 308 / 0.28), transparent 68%)", filter: "blur(64px)" }} />
      <div style={{ position: "absolute", width: "58%", height: "72%", bottom: "4%", right: "6%", background: "radial-gradient(ellipse at center, oklch(0.36 0.13 270 / 0.22), transparent 68%)", filter: "blur(68px)" }} />
      <div style={{ position: "absolute", width: "44%", height: "50%", top: "36%", right: "30%", background: "radial-gradient(ellipse at center, oklch(0.46 0.12 192 / 0.18), transparent 68%)", filter: "blur(52px)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--background) 0%, transparent 55%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 18%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--background) 0%, transparent 18%)" }} />
    </div>
  );
}

/* ── Fanned client-card stack ── */
function HeroClientCards({ activeClient, onSelect }: { activeClient: NSClient | null; onSelect: (c: NSClient | null, rect?: DOMRect) => void }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 900); return () => clearTimeout(t); }, []);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <div style={{ position: "relative" }}>
      <motion.p
        style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: MONO, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.97 0.003 250 / 0.4)", pointerEvents: "none" }}
        animate={{ opacity: activeClient ? 0 : 1, y: activeClient ? -6 : 0 }}
        transition={{ duration: 0.28 }}
      >
        ↑ tap a card to explore
      </motion.p>

      <div style={{ position: "relative", width: 360, height: 380 }}>
        {NEXTSTEP_GALLERY.slice(0, 6).map((client, i) => {
          const f = FAN[i] ?? { rotate: 0, tx: 0, ty: 0, z: i };
          const isActive = activeClient?.slug === client.slug;
          const isInactive = !!activeClient && !isActive;
          const isTop = !activeClient && i === 2;

          return (
            <motion.div
              key={client.slug}
              style={{ position: "absolute", left: "50%", top: 0, zIndex: isActive ? 30 : isTop ? 20 : f.z }}
            >
              <motion.div
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, y: 60, rotate: f.rotate, x: f.tx - 82 }}
                animate={{
                  opacity: isActive ? 0 : isInactive ? 0.14 : 1,
                  scale: isTop ? 1.05 : isInactive ? 0.84 : 1,
                  x: f.tx - 82,
                  y: isActive ? -10 : f.ty,
                  rotate: isActive ? 0 : f.rotate,
                }}
                transition={ready
                  ? { duration: 0.5, ease: EASE }
                  : { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.08 }
                }
                onClick={() => {
                  if (isActive) {
                    onSelect(null);
                  } else {
                    const rect = cardRefs.current[client.slug]?.getBoundingClientRect();
                    onSelect(client, rect ?? undefined);
                  }
                }}
              >
                <div
                  ref={(el) => { cardRefs.current[client.slug] = el; }}
                  style={{ width: 164, borderRadius: 10, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.4)", border: "1.5px solid rgba(255,255,255,0.1)", background: "var(--surface)" }}
                >
                  <div style={{ background: "#0d0d12", padding: "10px 10px 8px", textAlign: "center" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "oklch(0.64 0.145 168)", margin: "0 auto 5px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: MONO }}>{client.name[0]}</div>
                    <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 9, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", fontFamily: MONO }}>{client.name}</div>
                    <div style={{ height: 1, background: "oklch(0.64 0.145 168 / 0.45)", marginTop: 7 }} />
                  </div>
                  <div style={{ height: 120, overflow: "hidden", background: "#1a1a24" }}>
                    <img src={client.images[0]} alt={client.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ background: "var(--surface)", padding: "7px 10px 9px" }}>
                    <div style={{ fontSize: 7, letterSpacing: "0.15em", textTransform: "uppercase", color: "oklch(0.97 0.003 250 / 0.35)", fontFamily: MONO, marginBottom: 2 }}>Next Step Digital</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "oklch(0.97 0.003 250)", fontFamily: MONO, letterSpacing: "-0.01em" }}>Brand &amp; Design</div>
                    <div style={{ marginTop: 4, color: "oklch(0.64 0.145 168)", fontSize: 9, letterSpacing: "0.04em" }}>★★★★★</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        style={{ position: "absolute", bottom: -38, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: MONO, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.64 0.145 168)", pointerEvents: "none" }}
        animate={{ opacity: activeClient ? 1 : 0, y: activeClient ? 0 : 6 }}
        transition={{ duration: 0.3 }}
      >
        ↓ scroll to explore work
      </motion.p>
    </div>
  );
}

/* ── Sticky scroll story for the selected client ── */
function ClientJourneyInner({ client }: { client: NSClient }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const descOpacity = useTransform(scrollYProgress, [0.02, 0.13, 0.38, 0.46], [0, 1, 1, 0]);
  const descX = useTransform(scrollYProgress, [0.02, 0.16], [60, 0]);

  const d0op = useTransform(scrollYProgress, [0.47, 0.57], [0, 1]);
  const d0y = useTransform(scrollYProgress, [0.47, 0.57], [36, 0]);
  const d1op = useTransform(scrollYProgress, [0.57, 0.67], [0, 1]);
  const d1y = useTransform(scrollYProgress, [0.57, 0.67], [36, 0]);
  const d2op = useTransform(scrollYProgress, [0.67, 0.77], [0, 1]);
  const d2y = useTransform(scrollYProgress, [0.67, 0.77], [36, 0]);
  const d3op = useTransform(scrollYProgress, [0.77, 0.87], [0, 1]);
  const d3y = useTransform(scrollYProgress, [0.77, 0.87], [36, 0]);
  const DM = [{ op: d0op, y: d0y }, { op: d1op, y: d1y }, { op: d2op, y: d2y }, { op: d3op, y: d3y }];

  const meta = CLIENT_META[client.slug];
  const imgs = client.images.slice(0, 4);

  return (
    <motion.div
      id="client-spotlight"
      ref={containerRef}
      style={{ height: "300vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", background: "#0d0d12", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 320, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "relative", height: "100%", marginLeft: 320, overflow: "hidden" }}>
          <motion.div style={{ opacity: descOpacity, position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "3rem clamp(2.5rem, 5vw, 5rem) 3rem 3.5rem" }}>
            <motion.div style={{ x: descX }}>
              <p style={{ fontFamily: MONO, fontSize: "0.57rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "oklch(0.64 0.145 168)", marginBottom: "1.2rem" }}>
                Next Step Digital · Client Work
              </p>
              <h2 style={{ fontSize: "clamp(2.2rem, 3.2vw, 3.4rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#fff", lineHeight: 1, marginBottom: "1.2rem" }}>
                {client.name}
              </h2>
              <div style={{ width: 40, height: 2, background: "oklch(0.64 0.145 168)", borderRadius: 2, marginBottom: "1.4rem" }} />
              <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.875rem, 1vw, 1rem)", lineHeight: 1.78, maxWidth: "48ch", marginBottom: "1.5rem" }}>
                {meta?.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {meta?.deliverables.map((d) => (
                  <span key={d} style={{ fontFamily: MONO, fontSize: "0.57rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", border: "1px solid oklch(0.64 0.145 168 / 0.38)", color: "oklch(0.64 0.145 168 / 0.85)", padding: "0.3em 0.85em", borderRadius: 999 }}>
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem 3.5rem" }}>
            <motion.p style={{ opacity: d0op, fontFamily: MONO, fontSize: "0.53rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "oklch(0.64 0.145 168 / 0.65)", marginBottom: "1.25rem" }}>
              Selected Works
            </motion.p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem 2rem" }}>
              {imgs.map((img, i) => {
                const m = DM[i];
                return (
                  <motion.div key={i} style={{ opacity: m?.op, y: m?.y, display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                    <div style={{ width: 82, flexShrink: 0, aspectRatio: "3/4", borderRadius: 8, overflow: "hidden", background: "#1a1a24" }}>
                      <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ paddingTop: "0.2rem" }}>
                      <p style={{ fontFamily: MONO, color: "oklch(0.64 0.145 168)", fontSize: "0.53rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.38rem" }}>
                        {String(i + 1).padStart(2, "0")} / {meta?.deliverables[i] ?? "Design"}
                      </p>
                      <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)", fontSize: "0.76rem", lineHeight: 1.58 }}>
                        {meta?.imageDescriptions[i] ?? ""}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main feature: fan cards + fixed flying card + sticky spotlight ── */
export function NextStepFeature({ onOpenCaseStudy }: { onOpenCaseStudy: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionTopRef = useRef(0);

  const [activeClient, setActiveClient] = useState<NSClient | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const { scrollY } = useScroll();
  const flyLeft = useMotionValue(0);
  const flyTop = useMotionValue(0);
  const flyOpacity = useMotionValue(0);
  const journeyTopRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (sectionRef.current) {
        sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleSelect = (c: NSClient | null, rect?: DOMRect) => {
    setActiveClient(c);
    if (c && rect) {
      setCardRect(rect);
      flyLeft.set(rect.left);
      flyTop.set(rect.top);
      flyOpacity.set(1);
    } else {
      setCardRect(null);
      flyOpacity.set(0);
      journeyTopRef.current = null;
    }
  };

  useEffect(() => {
    if (!activeClient) return;
    const timer = setTimeout(() => {
      const el = document.getElementById("client-spotlight");
      if (el) journeyTopRef.current = el.getBoundingClientRect().top + window.scrollY;
    }, 80);
    return () => clearTimeout(timer);
  }, [activeClient?.slug]);

  useEffect(() => {
    if (!activeClient || !cardRect) return;
    // Calibrated against this section's own top, not the page top —
    // the fan can sit anywhere on the page now.
    const heroFadeEnd = sectionTopRef.current + 600;
    const targetLeft = (320 - cardRect.width) / 2;
    const targetTop = window.innerHeight / 2 - cardRect.height / 2;
    const startRight = window.innerWidth - cardRect.width - 32;
    const startTop = -cardRect.height - 20;

    const unsub = scrollY.on("change", (sv) => {
      const jTop = journeyTopRef.current;

      if (sv < heroFadeEnd) {
        flyLeft.set(cardRect.left);
        flyTop.set(cardRect.top);
        flyOpacity.set(Math.max(0, 1 - (sv - sectionTopRef.current) / 600));
      } else if (jTop === null || sv < jTop - window.innerHeight * 0.6) {
        flyLeft.set(startRight);
        flyTop.set(startTop);
        flyOpacity.set(0);
      } else {
        const t = Math.max(0, Math.min(1, (sv - (jTop - window.innerHeight * 0.6)) / (window.innerHeight * 0.8)));
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        flyLeft.set(startRight + (targetLeft - startRight) * e);
        flyTop.set(startTop + (targetTop - startTop) * e);
        flyOpacity.set(Math.min(1, t * 2));
      }
    });

    return unsub;
  }, [activeClient?.slug, cardRect]);

  return (
    <>
      <section ref={sectionRef} className="relative overflow-hidden border-y border-border" style={{ background: "var(--background)" }}>
        <CosmosGlow />
        <div className="relative z-10 mx-auto w-full max-w-375 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-[46ch] text-center lg:text-left">
              <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-5 bg-primary" />
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Founded &amp; run since 2019</span>
              </div>
              <h2 className="display-hero text-[clamp(1.8rem,3.4vw,3rem)] max-w-[16ch] mx-auto lg:mx-0">
                Next Step Digital — client work, six clients deep.
              </h2>
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

            <div className="shrink-0 pt-8 lg:pt-0">
              <HeroClientCards activeClient={activeClient} onSelect={handleSelect} />
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeClient && cardRect && (
          <motion.div
            key={activeClient.slug}
            style={{ position: "fixed", left: flyLeft, top: flyTop, opacity: flyOpacity, zIndex: 200, pointerEvents: "none" }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -5, borderRadius: 15, border: "2px solid oklch(0.64 0.145 168 / 0.7)", pointerEvents: "none", boxShadow: "0 0 24px oklch(0.64 0.145 168 / 0.3)" }} />
              <div style={{ width: cardRect.width, borderRadius: 10, overflow: "hidden", boxShadow: "0 28px 72px rgba(0,0,0,0.5)", border: "1.5px solid oklch(0.64 0.145 168 / 0.5)", background: "var(--surface)" }}>
                <div style={{ background: "#0d0d12", padding: "10px 10px 8px", textAlign: "center" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "oklch(0.64 0.145 168)", margin: "0 auto 5px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: MONO }}>{activeClient.name[0]}</div>
                  <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 9, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", fontFamily: MONO }}>{activeClient.name}</div>
                  <div style={{ height: 1, background: "oklch(0.64 0.145 168 / 0.45)", marginTop: 7 }} />
                </div>
                <div style={{ height: 120, overflow: "hidden", background: "#1a1a24" }}>
                  <img src={activeClient.images[0]} alt={activeClient.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ background: "var(--surface)", padding: "7px 10px 9px" }}>
                  <div style={{ fontSize: 7, letterSpacing: "0.15em", textTransform: "uppercase", color: "oklch(0.97 0.003 250 / 0.35)", fontFamily: MONO, marginBottom: 2 }}>Next Step Digital</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "oklch(0.97 0.003 250)", fontFamily: MONO, letterSpacing: "-0.01em" }}>Brand &amp; Design</div>
                  <div style={{ marginTop: 4, color: "oklch(0.64 0.145 168)", fontSize: 9, letterSpacing: "0.04em" }}>★★★★★</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeClient && <ClientJourneyInner key={activeClient.slug} client={activeClient} />}
      </AnimatePresence>
    </>
  );
}
