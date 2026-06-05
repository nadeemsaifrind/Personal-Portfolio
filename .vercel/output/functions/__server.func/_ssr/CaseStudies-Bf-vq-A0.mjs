import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as CASE_STUDIES } from "./router-BsMyf8as.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { X } from "../_libs/lucide-react.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm opacity-80 ring-offset-background cursor-pointer transition-all hover:opacity-100 hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function CaseStudies({ selected: externalSelected, setSelected: externalSetSelected, dialogOnly = false } = {}) {
  const [internalSelected, setInternalSelected] = reactExports.useState(null);
  const [openClient, setOpenClient] = reactExports.useState(null);
  const [openMediaFolder, setOpenMediaFolder] = reactExports.useState(null);
  const selected = externalSelected !== void 0 ? externalSelected : internalSelected;
  const setSelected = externalSetSelected ?? setInternalSelected;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    !dialogOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", id: "projects", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-[0.2em] text-muted-foreground", children: "FEATURED CASE STUDIES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl mt-4 max-w-2xl leading-tight", children: "Evidence, not claims." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-md", children: "Real client work, real competition results, real products shipped. Click any case to see the full breakdown." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground hidden md:inline self-end", children: [
          CASE_STUDIES.length,
          " cases"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: CASE_STUDIES.map((cs, i) => {
        const isLastOdd = i === CASE_STUDIES.length - 1 && CASE_STUDIES.length % 2 !== 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { delay: i % 2 * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            onClick: () => {
              setSelected(cs);
              setOpenClient(null);
              setOpenMediaFolder(null);
            },
            className: `group text-left rounded-2xl overflow-hidden border border-border/60 bg-card hover:shadow-float hover:border-foreground/12 transition-all duration-400${isLastOdd ? " md:col-span-2" : ""}`,
            style: { boxShadow: "0 2px 16px oklch(0.2 0.05 250 / 0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 overflow-hidden", children: [
                cs.coverImage ? (
                  /* Clean header image — shown when coverImage is set */
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: cs.coverImage,
                      alt: `${cs.title} cover`,
                      className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
                      draggable: false
                    }
                  )
                ) : (
                  /* Fallback: blurred backdrop + gradient */
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: cs.image,
                        alt: "",
                        "aria-hidden": true,
                        className: "absolute inset-0 w-full h-full object-cover scale-110 blur-sm opacity-50 transition-all duration-700 group-hover:opacity-65 group-hover:scale-105",
                        draggable: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0",
                        style: {
                          background: `linear-gradient(160deg, color-mix(in oklab, ${cs.accent} 25%, oklch(0.12 0.02 250)) 0%, oklch(0.1 0.02 250 / 0.85) 100%)`
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-xl", children: cs.title.charAt(0) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.22em] text-white/35", children: "ADD COVER IMAGE" })
                    ] })
                  ] })
                ),
                cs.achievement && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1 font-mono text-[9px] tracking-[0.14em] px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm",
                    style: {
                      background: `color-mix(in oklab, ${cs.accent} 30%, oklch(0.1 0.02 250 / 0.6))`,
                      color: "white"
                    },
                    children: [
                      "★ ",
                      cs.achievement
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.15em] text-white/60 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full", children: cs.context }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.18em] text-muted-foreground/60", children: cs.tag }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/40", children: cs.year })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium tracking-tight leading-snug mb-2", children: cs.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground leading-snug line-clamp-2 mb-4", children: cs.challenge }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: cs.skillsDemonstrated.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[9px] tracking-widest text-muted-foreground/50 border border-border/60 px-2 py-0.5 rounded-full",
                    children: s
                  },
                  s
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-border/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-colors", children: "VIEW CASE STUDY" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground/40 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 text-xs", children: "→" })
                ] })
              ] })
            ]
          },
          cs.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selected, onOpenChange: (o) => {
      if (!o) {
        setSelected(null);
        setOpenClient(null);
        setOpenMediaFolder(null);
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl p-0 gap-0 overflow-y-auto max-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: selected?.title ?? "Case Study" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "sr-only", children: selected?.context ?? "" }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full shrink-0 overflow-hidden", style: { aspectRatio: "2.8 / 1" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: selected.coverImage ?? selected.image,
              alt: selected.title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.15em] text-white/60 bg-white/10 px-2 py-0.5 rounded-full", children: selected.context }),
              selected.achievement && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-mono text-[9px] tracking-[0.15em] px-2.5 py-1 rounded-full border border-white/25",
                  style: {
                    color: selected.accent,
                    background: `color-mix(in oklab, ${selected.accent} 20%, transparent)`
                  },
                  children: [
                    "★ ",
                    selected.achievement.toUpperCase()
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl text-white font-normal tracking-[-0.03em] leading-tight mb-1", children: selected.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] tracking-[0.15em] text-white/60", children: [
              selected.role.toUpperCase(),
              " · ",
              selected.year
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 space-y-10", children: [
          selected.featuredScreen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-1.5 h-1.5 rounded-full",
                  style: { background: selected.accent, boxShadow: `0 0 8px ${selected.accent}` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground", children: "THE PLATFORM" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl overflow-hidden",
                style: { boxShadow: "0 24px 64px oklch(0.2 0.05 250 / 0.18)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#e8e8e8] px-4 py-2.5 flex items-center gap-3 border-b border-black/8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-[#ff5f57]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-[#febc2e]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-[#28c840]" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2 bg-white/80 rounded-md px-3 py-1 max-w-xs mx-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-3 h-3 text-gray-400 shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0110 0v4" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-gray-500 tracking-tight", children: selected.platformUrl ?? "app.demo" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-14" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: selected.featuredScreen,
                      alt: "Platform homepage",
                      className: "w-full block",
                      draggable: false
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] tracking-[0.15em] text-muted-foreground/40 text-center mt-2", children: selected.platformCaption ?? "" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3", children: "CHALLENGE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-foreground/80 leading-relaxed", children: selected.challenge })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4", children: "ACTIONS TAKEN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: selected.actionsToken.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50 mt-0.75 w-5 shrink-0", children: (i + 1).toString().padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/80 leading-relaxed", children: action })
            ] }, i)) })
          ] }),
          selected.instagramProof?.btsPhotos?.some(Boolean) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3", children: "ON-SITE · BEHIND THE LENS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: selected.instagramProof.btsPhotos.map(
              (photo, i) => photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl aspect-4/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: photo,
                  alt: `Behind the scenes ${i + 1}`,
                  className: "w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                }
              ) }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border-2 border-dashed border-border bg-secondary/20 aspect-4/3 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground/30", children: [
                "BTS PHOTO ",
                i + 1
              ] }) }, i)
            ) })
          ] }),
          selected.screens?.some(Boolean) && !selected.instagramProof ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3", children: "PROJECT SCREENS & DELIVERABLES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
              selected.screens[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: selected.screens[0],
                  alt: "Project screen 1",
                  className: "w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                }
              ) }),
              (selected.screens[1] || selected.screens[2] || selected.screens[3]) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid gap-2.5 h-44",
                  style: {
                    gridTemplateColumns: [
                      selected.screens[1],
                      selected.screens[2],
                      selected.screens[3]
                    ].filter(Boolean).length === 2 ? "1fr 1fr" : "1fr 1fr 1fr"
                  },
                  children: [1, 2, 3].map(
                    (i) => selected.screens[i] ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: selected.screens[i],
                        alt: `Project screen ${i + 1}`,
                        className: "w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                      }
                    ) }, i) : null
                  )
                }
              ),
              selected.screens[4] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: selected.screens[4],
                  alt: "Project screen 5",
                  className: "w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                }
              ) })
            ] })
          ] }) : !selected.instagramProof ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3", children: "PROJECT SCREENS & DELIVERABLES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border-2 border-dashed border-border bg-secondary/20 h-32 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] tracking-[0.15em] text-muted-foreground/35", children: [
              "cs-",
              selected.id,
              "-1 … 5.jpg"
            ] }) })
          ] }) : null,
          selected.clientGallery && selected.clientGallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground", children: "CLIENT WORK" }),
              openClient && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setOpenClient(null),
                  className: "flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors",
                  children: "← ALL CLIENTS"
                }
              )
            ] }),
            openClient ? (() => {
              const client = selected.clientGallery.find((c) => c.slug === openClient);
              if (!client) return null;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4", children: client.name.toUpperCase() }),
                client.images.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-2 gap-2.5 space-y-2.5", children: client.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "break-inside-avoid overflow-hidden rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img,
                    alt: `${client.name} design ${i + 1}`,
                    className: "w-full block hover:scale-[1.03] transition-transform duration-500",
                    draggable: false
                  }
                ) }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-dashed border-border bg-secondary/20 h-40 flex flex-col items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] tracking-[0.15em] text-muted-foreground/35", children: [
                    "ns-",
                    client.slug,
                    "-1.jpg · ns-",
                    client.slug,
                    "-2.jpg · …"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-muted-foreground/25", children: "Add images to src/assets/ then import in portfolio-data.ts" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] tracking-[0.15em] text-muted-foreground/35 text-center mt-3", children: "We built these." })
              ] });
            })() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: selected.clientGallery.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setOpenClient(client.slug),
                className: "group text-left rounded-2xl border border-border/60 bg-card hover:border-foreground/15 hover:shadow-float transition-all duration-300 overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-secondary/40 overflow-hidden grid grid-cols-3 gap-px", children: client.images.length > 0 ? [0, 1, 2].map(
                    (i) => client.images[i] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: client.images[i],
                        alt: "",
                        "aria-hidden": true,
                        className: "w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                      },
                      i
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-border/40" }, i)
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-6 h-6 text-muted-foreground/20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 9h18M9 21V9" })
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] text-foreground/70 leading-tight", children: client.name.toUpperCase() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30 group-hover:text-foreground/50 transition-colors text-xs", children: "→" })
                  ] })
                ]
              },
              client.slug
            )) })
          ] }),
          (() => {
            const folders = [
              selected.eventGallery?.length && { slug: "events", name: "Events", preview: selected.eventGallery.slice(0, 3) },
              selected.successStories?.length && { slug: "success", name: "Success Stories", preview: selected.successStories.slice(0, 3).map((s) => s.image) },
              selected.campaignGallery?.length && { slug: "campaigns", name: "Marketing Campaigns", preview: selected.campaignGallery.slice(0, 3) }
            ].filter(Boolean);
            if (folders.length === 0) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground", children: "GALLERY" }),
                openMediaFolder && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setOpenMediaFolder(null),
                    className: "flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors",
                    children: "← ALL FOLDERS"
                  }
                )
              ] }),
              openMediaFolder ? (() => {
                if (openMediaFolder === "events" && selected.eventGallery?.length) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4", children: "EVENTS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-2 gap-2.5 space-y-2.5", children: selected.eventGallery.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "break-inside-avoid overflow-hidden rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `Event ${i + 1}`, className: "w-full block hover:scale-[1.03] transition-transform duration-500", draggable: false }) }, i)) })
                  ] });
                }
                if (openMediaFolder === "success" && selected.successStories?.length) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4", children: "SUCCESS STORIES" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: selected.successStories.map((story, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl aspect-3/4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: story.image, alt: story.caption ?? `Story ${i + 1}`, className: "w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500", draggable: false }) }),
                      story.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] tracking-[0.12em] text-muted-foreground/60 text-center leading-snug", children: story.caption })
                    ] }, i)) })
                  ] });
                }
                if (openMediaFolder === "campaigns" && selected.campaignGallery?.length) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] tracking-[0.2em] text-foreground/50 mb-4", children: "MARKETING CAMPAIGNS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-2 gap-2.5 space-y-2.5", children: selected.campaignGallery.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "break-inside-avoid overflow-hidden rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `Campaign ${i + 1}`, className: "w-full block hover:scale-[1.03] transition-transform duration-500", draggable: false }) }, i)) })
                  ] });
                }
                return null;
              })() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: folders.map((folder) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setOpenMediaFolder(folder.slug),
                  className: "group text-left rounded-2xl border border-border/60 bg-card hover:border-foreground/15 hover:shadow-float transition-all duration-300 overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-secondary/40 overflow-hidden grid grid-cols-3 gap-px", children: [0, 1, 2].map(
                      (i) => folder.preview[i] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: folder.preview[i], alt: "", "aria-hidden": true, className: "w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-border/40" }, i)
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] text-foreground/70", children: folder.name.toUpperCase() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30 group-hover:text-foreground/50 transition-colors text-xs", children: "→" })
                    ] })
                  ]
                },
                folder.slug
              )) })
            ] });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-2 pl-5", style: { borderColor: selected.accent }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3", children: "RESULT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-foreground/80 leading-relaxed", children: selected.outcome })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4", children: "TOOLS USED" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selected.tools.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[10px] tracking-[0.12em] text-muted-foreground border border-border rounded-full px-3 py-1.5",
                  children: t
                },
                t
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4", children: "SKILLS DEMONSTRATED" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selected.skillsDemonstrated.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[10px] tracking-[0.12em] text-foreground/70 border border-foreground/20 rounded-full px-3 py-1.5",
                  children: s
                },
                s
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4", children: "AT A GLANCE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-border", children: selected.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] tracking-[0.08em] text-foreground/80 leading-snug", children: h }) }, h)) })
          ] }),
          selected.instagramProof && (() => {
            const ig = selected.instagramProof;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-[#E1306C]", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground", children: "INSTAGRAM PRESENCE BUILT" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl", style: { aspectRatio: "9/16" }, children: [
                  ig.profileScreen ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ig.profileScreen, alt: "Instagram profile", className: "w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-linear-to-b from-gray-100 to-gray-50 flex flex-col items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-[#E1306C]/30", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324z" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-muted-foreground/35", children: "Profile screenshot" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-white/80", children: "@livingroomservicedapartments" }) })
                ] }),
                ig.reels.map((reel, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl", style: { aspectRatio: "9/16" }, children: [
                  reel.thumbnail ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: reel.thumbnail, alt: `Reel ${i + 1}`, className: "w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-linear-to-b from-gray-800 to-gray-950 flex flex-col items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-white/20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[7px] text-white/25 text-center px-3", children: [
                      "cs-livingroom-reel-",
                      i + 1,
                      ".jpg"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-white/70", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-white font-medium", children: reel.views })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-[#E1306C]", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-white font-medium", children: reel.likes })
                    ] })
                  ] })
                ] }, i))
              ] })
            ] });
          })(),
          selected.testimonial && (() => {
            const t = selected.testimonial;
            const parts = t.highlightName ? t.quote.split(t.highlightName) : [t.quote];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3", children: "CLIENT TESTIMONIAL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: t.postUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "block rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/3 overflow-hidden hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5 transition-colors duration-200 group/li",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-5 pt-5 pb-4 border-b border-[#0a66c2]/10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold text-sm shrink-0", children: "OL" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: t.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3.5 h-3.5 text-[#0a66c2] shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 text-xs", children: "· 1st" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-1", children: t.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-[#0a66c2]", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] tracking-widest text-[#0a66c2]/70", children: [
                            "LinkedIn · ",
                            t.date
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: parts.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      parts[0],
                      /* @__PURE__ */ jsxRuntimeExports.jsx("mark", { className: "bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-semibold not-italic", children: t.highlightName }),
                      parts[1]
                    ] }) : t.quote }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-t border-[#0a66c2]/10 bg-[#0a66c2]/2 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono text-[10px] text-[#0a66c2]/60 group-hover/li:text-[#0a66c2] transition-colors", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
                      "View original post ↗"
                    ] }) })
                  ]
                }
              )
            ] });
          })(),
          selected.newsletter && (() => {
            const n = selected.newsletter;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-3", children: "NEWSLETTER DELIVERED" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: n.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-5 rounded-2xl border border-border bg-secondary/30 px-5 py-4 hover:bg-secondary hover:border-foreground/15 hover:shadow-float transition-all duration-300 group/nl",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl bg-linear-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shrink-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-white", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-base text-foreground leading-tight", children: n.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono text-[9px] tracking-[0.15em] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full", children: [
                          "✓ ",
                          n.subscribers,
                          "+ SUBSCRIBERS"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/60 font-mono tracking-widest mb-1.5", children: n.frequency }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-snug line-clamp-2", children: n.description })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-[#0a66c2]/50 group-hover/nl:text-[#0a66c2] transition-colors shrink-0", children: "Read ↗" })
                  ]
                }
              )
            ] });
          })()
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CaseStudies as C,
  Dialog as D,
  DialogContent as a,
  DialogTitle as b,
  cn as c,
  DialogDescription as d
};
