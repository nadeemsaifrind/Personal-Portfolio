import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { CASE_STUDIES, type CaseStudy } from "@/lib/portfolio-data";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";


interface Props {
  selected?: CaseStudy | null;
  setSelected?: (cs: CaseStudy | null) => void;
  dialogOnly?: boolean;
}

function getImageLabels(tag: string): { label: string; hint: string }[] {
  if (tag.includes("BRAND") || tag.includes("VISUAL"))
    return [
      { label: "Brand Overview", hint: "Full identity spread / hero visual" },
      { label: "Logo System", hint: "Primary + variations + usage" },
      { label: "Design System", hint: "Colors · typography · components" },
      { label: "Applied Output", hint: "Social / print / presentation sample" },
    ];
  if (tag.includes("CONTENT") || tag.includes("MEDIA"))
    return [
      { label: "Content Spread", hint: "Best shot / key visual" },
      { label: "Behind the Lens", hint: "Production setup / process" },
      { label: "Post Production", hint: "Edited frame or video still" },
      { label: "Published Output", hint: "Live post / platform screenshot" },
    ];
  if (tag.includes("PRODUCT") || tag.includes("DEV") || tag.includes("UX"))
    return [
      { label: "Key Screen", hint: "Hero UI — main dashboard or flow" },
      { label: "User Flow", hint: "Journey map or wireframe" },
      { label: "Component Detail", hint: "UI component or interaction" },
      { label: "Prototype / Demo", hint: "Figma link preview or live screen" },
    ];
  if (tag.includes("COMPETITION") || tag.includes("STRATEGY"))
    return [
      { label: "Pitch Deck", hint: "Opening slide or key frame" },
      { label: "Solution Overview", hint: "Core concept visual" },
      { label: "Prototype Screen", hint: "Working Figma screen" },
      { label: "Award Moment", hint: "Ceremony / result announcement" },
    ];
  if (tag.includes("ENTREPRENEUR") || tag.includes("AGENCY"))
    return [
      { label: "Agency Identity", hint: "Brand or logo" },
      { label: "Client Delivery", hint: "Sample deliverable" },
      { label: "Campaign Output", hint: "Ad / social / post" },
      { label: "Results Snapshot", hint: "Analytics or growth metric" },
    ];
  return [
    { label: "Overview", hint: "Main visual" },
    { label: "Process", hint: "Work in progress" },
    { label: "Output", hint: "Key deliverable" },
    { label: "Result", hint: "Final outcome" },
  ];
}

export function CaseStudies({
  selected: externalSelected,
  setSelected: externalSetSelected,
  dialogOnly = false,
}: Props = {}) {
  const [internalSelected, setInternalSelected] = useState<CaseStudy | null>(null);
  const [openClient, setOpenClient] = useState<string | null>(null);
  const [openMediaFolder, setOpenMediaFolder] = useState<string | null>(null);

  const selected = externalSelected !== undefined ? externalSelected : internalSelected;
  const setSelected = externalSetSelected ?? setInternalSelected;

  return (
    <>
      {!dialogOnly && (
        <section className="section-glow section-glow-r border-t border-border" id="projects">
          <div className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-36">

            {/* Section header */}
            <div className="mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-5 bg-primary" />
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">Case Studies</span>
                </div>
                <h2 className="display-hero text-[clamp(2rem,4vw,4rem)] max-w-[18ch]">
                  Evidence, not claims.
                </h2>
              </div>
              <p className="text-sm text-foreground/40 max-w-[38ch] leading-relaxed sm:pb-1">
                Real client work, real competition results, real products shipped.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CASE_STUDIES.map((cs, i) => (
                <motion.button
                  key={cs.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: (i % 3) * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setSelected(cs);
                    setOpenClient(null);
                    setOpenMediaFolder(null);
                  }}
                  className="group text-left flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 hover:border-white/14"
                >
                  {/* Full-bleed image with title overlaid */}
                  <div className="relative aspect-video overflow-hidden bg-surface-2">
                    {(cs.coverImage ?? cs.image) && (
                      <img
                        src={cs.coverImage ?? cs.image}
                        alt={cs.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    )}
                    {/* Strong bottom gradient for text legibility */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Achievement badge top-right */}
                    {cs.achievement && (
                      <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                        {cs.achievement}
                      </span>
                    )}
                    {/* Title + context overlaid at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                        {cs.context}
                      </p>
                      <h3 className="text-[15px] font-bold leading-snug tracking-tight text-white">
                        {cs.title}
                      </h3>
                    </div>
                  </div>

                  {/* Minimal footer strip */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/35">
                      {cs.tag}
                    </span>
                    <div className="flex items-center gap-2 text-foreground/28">
                      <span className="font-mono text-[9px]">{cs.year}</span>
                      <ArrowUpRight size={11} weight="bold" className="transition-colors duration-200 group-hover:text-primary" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Dialog
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) {
            setSelected(null);
            setOpenClient(null);
            setOpenMediaFolder(null);
          }
        }}
      >
        <DialogContent
          data-lenis-prevent
          className="max-w-3xl p-0 gap-0 overflow-y-auto max-h-[90vh] overscroll-contain"
        >
          <DialogTitle className="sr-only">{selected?.title ?? "Case Study"}</DialogTitle>
          <DialogDescription className="sr-only">{selected?.context ?? ""}</DialogDescription>
          {selected && (
            <div className="flex flex-col">
              {/* Hero image */}
              <div
                className="relative w-full shrink-0 overflow-hidden"
                style={{ aspectRatio: "2.8 / 1" }}
              >
                <img
                  src={selected.coverImage ?? selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                      {selected.context}
                    </span>
                    {selected.achievement && (
                      <span
                        className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-1 rounded-full border border-white/25"
                        style={{
                          color: selected.accent,
                          background: `color-mix(in oklab, ${selected.accent} 20%, transparent)`,
                        }}
                      >
                        ★ {selected.achievement.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl text-white font-normal tracking-[-0.03em] leading-tight mb-1">
                    {selected.title}
                  </h2>
                  <p className="font-mono text-[10px] tracking-[0.15em] text-white/60">
                    {selected.role.toUpperCase()} · {selected.year}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10 space-y-10">
                {/* Featured screen — browser mockup hero */}
                {selected.featuredScreen && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: selected.accent,
                          boxShadow: `0 0 8px ${selected.accent}`,
                        }}
                      />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                        THE PLATFORM
                      </span>
                    </div>
                    {/* Browser chrome */}
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{ boxShadow: "0 24px 64px oklch(0.2 0.05 250 / 0.18)" }}
                    >
                      {/* Browser top bar */}
                      <div className="bg-[#e8e8e8] px-4 py-2.5 flex items-center gap-3 border-b border-black/8">
                        {/* Traffic lights */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        {/* URL bar */}
                        <div className="flex-1 flex items-center gap-2 bg-white/80 rounded-md px-3 py-1 max-w-xs mx-auto">
                          <svg
                            className="w-3 h-3 text-gray-400 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                          <span className="font-mono text-[10px] text-gray-500 tracking-tight">
                            {selected.platformUrl ?? "app.demo"}
                          </span>
                        </div>
                        <div className="shrink-0 w-14" />
                      </div>
                      {/* Screenshot */}
                      <div className="bg-white">
                        <img
                          src={selected.featuredScreen}
                          alt="Platform homepage"
                          className="w-full block"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground/40 text-center mt-2">
                      {selected.platformCaption ?? ""}
                    </p>
                  </div>
                )}

                {/* Challenge */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3">
                    CHALLENGE
                  </span>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {selected.challenge}
                  </p>
                </div>

                {/* Actions Taken */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4">
                    ACTIONS TAKEN
                  </span>
                  <ol className="space-y-3">
                    {selected.actionsToken.map((action, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="font-mono text-[10px] text-muted-foreground/50 mt-0.75 w-5 shrink-0">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="text-sm text-foreground/80 leading-relaxed">{action}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* BTS photos — right below actions, only for instagramProof cases */}
                {selected.instagramProof?.btsPhotos?.some(Boolean) && (
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3">
                      ON-SITE · BEHIND THE LENS
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {selected.instagramProof.btsPhotos.map((photo, i) =>
                        photo ? (
                          <div key={i} className="overflow-hidden rounded-2xl aspect-4/3">
                            <img
                              src={photo}
                              alt={`Behind the scenes ${i + 1}`}
                              className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div
                            key={i}
                            className="rounded-2xl border-2 border-dashed border-border bg-secondary/20 aspect-4/3 flex items-center justify-center"
                          >
                            <span className="font-mono text-[9px] text-muted-foreground/30">
                              BTS PHOTO {i + 1}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Image collage */}
                {selected.screens?.some(Boolean) && !selected.instagramProof ? (
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3">
                      PROJECT SCREENS & DELIVERABLES
                    </span>
                    <div className="flex flex-col gap-2.5">
                      {/* Row 1 — hero image, full width */}
                      {selected.screens[0] && (
                        <div className="h-64 overflow-hidden rounded-2xl">
                          <img
                            src={selected.screens[0]}
                            alt="Project screen 1"
                            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Row 2 — up to 3 equal columns */}
                      {(selected.screens[1] || selected.screens[2] || selected.screens[3]) && (
                        <div
                          className="grid gap-2.5 h-44"
                          style={{
                            gridTemplateColumns:
                              [
                                selected.screens[1],
                                selected.screens[2],
                                selected.screens[3],
                              ].filter(Boolean).length === 2
                                ? "1fr 1fr"
                                : "1fr 1fr 1fr",
                          }}
                        >
                          {[1, 2, 3].map((i) =>
                            selected.screens![i] ? (
                              <div key={i} className="overflow-hidden rounded-2xl h-full">
                                <img
                                  src={selected.screens![i]}
                                  alt={`Project screen ${i + 1}`}
                                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                                />
                              </div>
                            ) : null,
                          )}
                        </div>
                      )}

                      {/* Row 3 — 5th image full width if present */}
                      {selected.screens[4] && (
                        <div className="h-44 overflow-hidden rounded-2xl">
                          <img
                            src={selected.screens[4]}
                            alt="Project screen 5"
                            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : !selected.instagramProof ? (
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3">
                      PROJECT SCREENS & DELIVERABLES
                    </span>
                    <div className="rounded-xl border-2 border-dashed border-border bg-secondary/20 h-32 flex items-center justify-center">
                      <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground/35">
                        cs-{selected.id}-1 … 5.jpg
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Client Gallery — Next Step */}
                {selected.clientGallery && selected.clientGallery.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                        CLIENT WORK
                      </span>
                      {openClient && (
                        <button
                          onClick={() => setOpenClient(null)}
                          className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                        >
                          ← ALL CLIENTS
                        </button>
                      )}
                    </div>

                    {openClient ? (
                      (() => {
                        const client = selected.clientGallery!.find((c) => c.slug === openClient);
                        if (!client) return null;
                        return (
                          <div>
                            <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4">
                              {client.name.toUpperCase()}
                            </p>
                            {client.images.length > 0 ? (
                              <div className="columns-2 gap-2.5 space-y-2.5">
                                {client.images.map((img, i) => (
                                  <div
                                    key={i}
                                    className="break-inside-avoid overflow-hidden rounded-xl"
                                  >
                                    <img
                                      src={img}
                                      alt={`${client.name} design ${i + 1}`}
                                      className="w-full block hover:scale-[1.03] transition-transform duration-500"
                                      draggable={false}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="rounded-xl border-2 border-dashed border-border bg-secondary/20 h-40 flex flex-col items-center justify-center gap-2">
                                <span className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground/35">
                                  ns-{client.slug}-1.jpg · ns-{client.slug}-2.jpg · …
                                </span>
                                <span className="font-mono text-[8px] text-muted-foreground/25">
                                  Add images to src/assets/ then import in portfolio-data.ts
                                </span>
                              </div>
                            )}
                            <p className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground/35 text-center mt-3">
                              We built these.
                            </p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selected.clientGallery.map((client) => (
                          <button
                            key={client.slug}
                            onClick={() => setOpenClient(client.slug)}
                            className="group text-left rounded-2xl border border-border/60 bg-card hover:border-foreground/15 hover:shadow-float transition-all duration-300 overflow-hidden"
                          >
                            {/* Preview strip — first 3 images or placeholder */}
                            <div className="h-24 bg-secondary/40 overflow-hidden grid grid-cols-3 gap-px">
                              {client.images.length > 0 ? (
                                [0, 1, 2].map((i) =>
                                  client.images[i] ? (
                                    <img
                                      key={i}
                                      src={client.images[i]}
                                      alt=""
                                      aria-hidden
                                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                                    />
                                  ) : (
                                    <div key={i} className="w-full h-full bg-border/40" />
                                  ),
                                )
                              ) : (
                                <div className="col-span-3 w-full h-full flex items-center justify-center">
                                  <svg
                                    className="w-6 h-6 text-muted-foreground/20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  >
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <path d="M3 9h18M9 21V9" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            {/* Name */}
                            <div className="px-3 py-2.5 flex items-center justify-between">
                              <span className="font-mono text-[10px] tracking-[0.12em] text-foreground/70 leading-tight">
                                {client.name.toUpperCase()}
                              </span>
                              <span className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors text-xs">
                                →
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Media Gallery — folder-based (Events · Success Stories · Campaigns) */}
                {(() => {
                  const folders = [
                    selected.eventGallery?.length && {
                      slug: "events",
                      name: "Events",
                      preview: selected.eventGallery.slice(0, 3),
                    },
                    selected.successStories?.length && {
                      slug: "success",
                      name: "Success Stories",
                      preview: selected.successStories.slice(0, 3).map((s) => s.image),
                    },
                    selected.campaignGallery?.length && {
                      slug: "campaigns",
                      name: "Marketing Campaigns",
                      preview: selected.campaignGallery.slice(0, 3),
                    },
                  ].filter(Boolean) as { slug: string; name: string; preview: string[] }[];

                  if (folders.length === 0) return null;

                  return (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                          GALLERY
                        </span>
                        {openMediaFolder && (
                          <button
                            onClick={() => setOpenMediaFolder(null)}
                            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                          >
                            ← ALL FOLDERS
                          </button>
                        )}
                      </div>

                      {openMediaFolder ? (
                        (() => {
                          if (openMediaFolder === "events" && selected.eventGallery?.length) {
                            return (
                              <>
                                <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4">
                                  EVENTS
                                </p>
                                <div className="columns-2 gap-2.5 space-y-2.5">
                                  {selected.eventGallery.map((src, i) => (
                                    <div
                                      key={i}
                                      className="break-inside-avoid overflow-hidden rounded-xl"
                                    >
                                      <img
                                        src={src}
                                        alt={`Event ${i + 1}`}
                                        className="w-full block hover:scale-[1.03] transition-transform duration-500"
                                        draggable={false}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </>
                            );
                          }
                          if (openMediaFolder === "success" && selected.successStories?.length) {
                            return (
                              <>
                                <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4">
                                  SUCCESS STORIES
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {selected.successStories.map((story, i) => (
                                    <div key={i} className="flex flex-col gap-1.5">
                                      <div className="overflow-hidden rounded-2xl aspect-3/4">
                                        <img
                                          src={story.image}
                                          alt={story.caption ?? `Story ${i + 1}`}
                                          className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                                          draggable={false}
                                        />
                                      </div>
                                      {story.caption && (
                                        <p className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground/60 text-center leading-snug">
                                          {story.caption}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </>
                            );
                          }
                          if (openMediaFolder === "campaigns" && selected.campaignGallery?.length) {
                            return (
                              <>
                                <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4">
                                  MARKETING CAMPAIGNS
                                </p>
                                <div className="columns-2 gap-2.5 space-y-2.5">
                                  {selected.campaignGallery.map((src, i) => (
                                    <div
                                      key={i}
                                      className="break-inside-avoid overflow-hidden rounded-xl"
                                    >
                                      <img
                                        src={src}
                                        alt={`Campaign ${i + 1}`}
                                        className="w-full block hover:scale-[1.03] transition-transform duration-500"
                                        draggable={false}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </>
                            );
                          }
                          return null;
                        })()
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {folders.map((folder) => (
                            <button
                              key={folder.slug}
                              onClick={() => setOpenMediaFolder(folder.slug)}
                              className="group text-left rounded-2xl border border-border/60 bg-card hover:border-foreground/15 hover:shadow-float transition-all duration-300 overflow-hidden"
                            >
                              <div className="h-24 bg-secondary/40 overflow-hidden grid grid-cols-3 gap-px">
                                {[0, 1, 2].map((i) =>
                                  folder.preview[i] ? (
                                    <img
                                      key={i}
                                      src={folder.preview[i]}
                                      alt=""
                                      aria-hidden
                                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                                    />
                                  ) : (
                                    <div key={i} className="w-full h-full bg-border/40" />
                                  ),
                                )}
                              </div>
                              <div className="px-3 py-2.5 flex items-center justify-between">
                                <span className="font-mono text-[10px] tracking-[0.12em] text-foreground/70">
                                  {folder.name.toUpperCase()}
                                </span>
                                <span className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors text-xs">
                                  →
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Result */}
                <div className="border-l-2 pl-5" style={{ borderColor: selected.accent }}>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3">
                    RESULT
                  </span>
                  <p className="text-base text-foreground/80 leading-relaxed">{selected.outcome}</p>
                </div>

                {/* Tools + Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-border">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4">
                      TOOLS USED
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selected.tools.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground border border-border rounded-full px-3 py-1.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4">
                      SKILLS DEMONSTRATED
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selected.skillsDemonstrated.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] tracking-[0.12em] text-foreground/70 border border-foreground/20 rounded-full px-3 py-1.5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4">
                    AT A GLANCE
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
                    {selected.highlights.map((h) => (
                      <div key={h} className="bg-background p-5">
                        <p className="font-mono text-[11px] tracking-[0.08em] text-foreground/80 leading-snug">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instagram proof — Livingroom */}
                {selected.instagramProof &&
                  (() => {
                    const ig = selected.instagramProof;
                    return (
                      <div>
                        {/* Section header */}
                        <div className="flex items-center gap-2 mb-5">
                          <svg
                            className="w-4 h-4 text-[#E1306C]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                            INSTAGRAM PRESENCE BUILT
                          </span>
                        </div>

                        {/* 3-column grid: profile screenshot + 2 reels */}
                        <div className="grid grid-cols-3 gap-3">
                          {/* Profile screenshot — same card style as reels */}
                          <div
                            className="relative overflow-hidden rounded-2xl"
                            style={{ aspectRatio: "9/16" }}
                          >
                            {ig.profileScreen ? (
                              <img
                                src={ig.profileScreen}
                                alt="Instagram profile"
                                className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-linear-to-b from-gray-100 to-gray-50 flex flex-col items-center justify-center gap-2">
                                <svg
                                  className="w-6 h-6 text-[#E1306C]/30"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324z" />
                                </svg>
                                <span className="font-mono text-[8px] text-muted-foreground/35">
                                  Profile screenshot
                                </span>
                              </div>
                            )}
                            {/* Profile label */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <span className="font-mono text-[9px] text-white/80">
                                @livingroomservicedapartments
                              </span>
                            </div>
                          </div>

                          {/* Two reels */}
                          {ig.reels.map((reel, i) => (
                            <div
                              key={i}
                              className="relative overflow-hidden rounded-2xl"
                              style={{ aspectRatio: "9/16" }}
                            >
                              {reel.thumbnail ? (
                                <img
                                  src={reel.thumbnail}
                                  alt={`Reel ${i + 1}`}
                                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full bg-linear-to-b from-gray-800 to-gray-950 flex flex-col items-center justify-center gap-2">
                                  <svg
                                    className="w-7 h-7 text-white/20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                  <span className="font-mono text-[7px] text-white/25 text-center px-3">
                                    cs-livingroom-reel-{i + 1}.jpg
                                  </span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
                              <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 text-white"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <svg
                                    className="w-3 h-3 text-white/70"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                  <span className="font-mono text-[9px] text-white font-medium">
                                    {reel.views}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg
                                    className="w-3 h-3 text-[#E1306C]"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                  </svg>
                                  <span className="font-mono text-[9px] text-white font-medium">
                                    {reel.likes}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                {/* Testimonial */}
                {selected.testimonial &&
                  (() => {
                    const t = selected.testimonial;
                    const parts = t.highlightName ? t.quote.split(t.highlightName) : [t.quote];
                    return (
                      <div>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3">
                          CLIENT TESTIMONIAL
                        </span>
                        <a
                          href={t.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/3 overflow-hidden hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5 transition-colors duration-200 group/li"
                        >
                          {/* Header */}
                          <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-[#0a66c2]/10">
                            <div className="w-11 h-11 rounded-full bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                              OL
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-semibold text-sm text-foreground">
                                  {t.name}
                                </span>
                                <svg
                                  className="w-3.5 h-3.5 text-[#0a66c2] shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-muted-foreground/50 text-xs">· 1st</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-1">
                                {t.title}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <svg
                                  className="w-3 h-3 text-[#0a66c2]"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="font-mono text-[9px] tracking-widest text-[#0a66c2]/70">
                                  LinkedIn · {t.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Quote */}
                          <div className="px-5 py-4">
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {parts.length > 1 ? (
                                <>
                                  {parts[0]}
                                  <mark className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-semibold not-italic">
                                    {t.highlightName}
                                  </mark>
                                  {parts[1]}
                                </>
                              ) : (
                                t.quote
                              )}
                            </p>
                          </div>
                          {/* Footer */}
                          <div className="px-5 py-3 border-t border-[#0a66c2]/10 bg-[#0a66c2]/2 flex items-center justify-end">
                            <span className="flex items-center gap-1 font-mono text-[10px] text-[#0a66c2]/60 group-hover/li:text-[#0a66c2] transition-colors">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                              View original post ↗
                            </span>
                          </div>
                        </a>
                      </div>
                    );
                  })()}

                {/* Newsletter */}
                {selected.newsletter &&
                  (() => {
                    const n = selected.newsletter;
                    return (
                      <div>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3">
                          NEWSLETTER DELIVERED
                        </span>
                        <a
                          href={n.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-5 rounded-2xl border border-border bg-secondary/30 px-5 py-4 hover:bg-secondary hover:border-foreground/15 hover:shadow-float transition-all duration-300 group/nl"
                        >
                          {/* Newsletter icon */}
                          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shrink-0 shadow-md">
                            <svg
                              className="w-7 h-7 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                            >
                              <path
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-semibold text-base text-foreground leading-tight">
                                {n.name}
                              </span>
                              <span className="flex items-center gap-1 font-mono text-[9px] tracking-[0.15em] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                ✓ {n.subscribers}+ SUBSCRIBERS
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground/60 font-mono tracking-widest mb-1.5">
                              {n.frequency}
                            </p>
                            <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                              {n.description}
                            </p>
                          </div>
                          {/* Arrow */}
                          <span className="font-mono text-[10px] text-[#0a66c2]/50 group-hover/nl:text-[#0a66c2] transition-colors shrink-0">
                            Read ↗
                          </span>
                        </a>
                      </div>
                    );
                  })()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
