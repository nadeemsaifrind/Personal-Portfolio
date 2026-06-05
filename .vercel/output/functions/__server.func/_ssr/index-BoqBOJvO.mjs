import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PERSONAL, M as MODES, C as CASE_STUDIES, b as WORKFLOW, J as JOURNEY, W as WHY_ME, A as ACHIEVEMENTS, a as AWARDS, c as PUBLIC_BUILDS } from "./router-BsMyf8as.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CaseStudies, c as cn, D as Dialog, a as DialogContent, b as DialogTitle, d as DialogDescription } from "./CaseStudies-Bf-vq-A0.mjs";
import { R as Root, P as Portal, C as Content, a as Close, O as Overlay, T as Title, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { M as Menu, L as Linkedin, Y as Youtube, I as Instagram, X, B as Briefcase, R as Rocket, T as Trophy, U as Users, A as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const INTERVAL = 4500;
const imageModes = MODES;
function HeroCarousel({ activeMode, onSelect }) {
  const [index, setIndex] = reactExports.useState(0);
  const [paused, setPaused] = reactExports.useState(false);
  const internalRef = reactExports.useRef(false);
  const current = imageModes[index];
  const goTo = reactExports.useCallback(
    (i) => {
      internalRef.current = true;
      setIndex(i);
      onSelect(imageModes[i].id);
    },
    [onSelect]
  );
  reactExports.useEffect(() => {
    if (internalRef.current) {
      internalRef.current = false;
      return;
    }
    const idx = imageModes.findIndex((m) => m.id === activeMode);
    if (idx >= 0 && idx !== index) setIndex(idx);
  }, [activeMode]);
  reactExports.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      const next = (index + 1) % imageModes.length;
      goTo(next);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [paused, index, goTo]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative rounded-2xl overflow-hidden h-80 sm:h-105 lg:h-130 w-full",
            style: { boxShadow: "0 32px 80px -16px oklch(0.2 0.05 250 / 0.2)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "sync", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.img,
                {
                  src: current.image,
                  alt: current.label,
                  initial: { opacity: 0, x: "35%", scale: 1.05 },
                  animate: { opacity: 1, x: 0, scale: 1 },
                  exit: { opacity: 0, x: "-25%", scale: 0.96 },
                  transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] },
                  className: "absolute inset-0 w-full h-full object-cover",
                  draggable: false
                },
                current.id
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10", children: imageModes.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => goTo(i),
                  "aria-label": `Slide ${i + 1}`,
                  className: [
                    "h-1.5 rounded-full bg-white transition-all duration-500",
                    i === index ? "w-6 opacity-100" : "w-1.5 opacity-40 hover:opacity-65"
                  ].join(" ")
                },
                i
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 14, x: -8 },
            animate: { opacity: 1, y: 0, x: 0 },
            exit: { opacity: 0, y: 8 },
            transition: { duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
            className: "absolute bottom-18 left-4 z-20 bg-white rounded-2xl p-4 w-54",
            style: { boxShadow: "0 8px 32px oklch(0.2 0.05 250 / 0.16)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] tracking-[0.22em] text-foreground/40 mb-1", children: current.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: current.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 flex flex-wrap gap-1", children: current.skills.slice(0, 3).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] bg-black/6 text-foreground/65 px-2 py-0.5 rounded-full",
                  children: skill
                },
                skill
              )) })
            ]
          },
          `exp-${current.id}`
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10, x: 8 },
            animate: { opacity: 1, y: 0, x: 0 },
            exit: { opacity: 0 },
            transition: { duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
            className: "absolute top-10 right-4 z-20 bg-white rounded-2xl p-3.5 max-w-44",
            style: { boxShadow: "0 8px 32px oklch(0.2 0.05 250 / 0.14)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2 h-2 rounded-full shrink-0",
                    style: { background: current.accent, boxShadow: `0 0 8px ${current.accent}` }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.18em] text-foreground/40", children: "EXPERTISE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] leading-[1.55] text-foreground/65", children: current.tagline })
            ]
          },
          `tag-${current.id}`
        ) })
      ]
    }
  );
}
function DisciplineGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "work", className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 pt-20 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground", children: "MY WORK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-4xl tracking-[-0.03em] font-normal", children: "Six disciplines." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed", children: "Click any discipline to see the full breakdown, tools, and selected work." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4", children: MODES.map((mode, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/work/$modeId", params: { modeId: mode.id }, className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:shadow-float hover:border-foreground/12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden h-44 sm:h-48", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: mode.image,
                alt: mode.label,
                className: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 right-3 font-mono text-[9px] tracking-[0.18em] text-white/85 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full", children: [
              mode.projects.length,
              " PROJECTS"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-1.5 h-1.5 rounded-full",
                  style: { background: mode.accent, boxShadow: `0 0 6px ${mode.accent}` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.22em] text-white/70", children: mode.category })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base md:text-lg font-medium tracking-tight leading-snug", children: mode.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground/50 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[13px] text-muted-foreground leading-snug line-clamp-2", children: mode.tagline }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 flex flex-wrap gap-1.5", children: [
              mode.skills.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[9px] tracking-widest text-muted-foreground/55 border border-border/70 px-2 py-0.5 rounded-full",
                  children: s
                },
                s
              )),
              mode.skills.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground/35 py-0.5", children: [
                "+",
                mode.skills.length - 3,
                " more"
              ] })
            ] })
          ] })
        ] }) })
      },
      mode.id
    )) })
  ] }) });
}
const competitions = CASE_STUDIES.filter((c) => c.id === "wisag" || c.id === "kenergy");
const WISAG_KEYWORDS = [
  "UX Research",
  "Mobile-first",
  "Enterprise UX",
  "Figma Prototype",
  "Journey Mapping",
  "Field Workers",
  "10k+ Employees",
  "1st Place"
];
const KENERGY_KEYWORDS = [
  "Behavioural Design",
  "Gamification",
  "Sustainability",
  "Product Strategy",
  "Community Award",
  "Neighbourhood Goals",
  "1st Place",
  "Dual Award"
];
const keywords = {
  wisag: WISAG_KEYWORDS,
  kenergy: KENERGY_KEYWORDS
};
const accentColors = {
  wisag: "oklch(0.75 0.18 280)",
  kenergy: "oklch(0.82 0.15 50)"
};
function WinnerBadge() {
  const [open, setOpen] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState("wisag");
  const current = competitions.find((c) => c.id === active);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        onClick: () => setOpen(true),
        className: "group inline-flex items-center gap-2.5 rounded-full border border-amber-200/80 bg-amber-50/60 px-4 py-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 cursor-pointer",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-amber-800 leading-tight tracking-tight", children: "Two-Time First-Place Winner" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono tracking-[0.12em] text-amber-700/70 leading-tight mt-0.5", children: "GERMAN DIGITAL PRODUCT INNOVATION" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400/60 group-hover:text-amber-500 transition-colors text-xs ml-0.5", children: "→" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: "Award Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "sr-only", children: "Innovation challenge case study" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pt-8 pb-6 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground", children: "DESIGN COMPETITION · GERMANY" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-normal tracking-[-0.03em]", children: "Two-Time First-Place Winner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: "Won two national German digital product innovation challenges — against teams from universities and agencies." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-border", children: competitions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActive(c.id),
          className: [
            "flex-1 px-6 py-3.5 text-sm font-medium transition-all duration-200 text-left border-b-2 -mb-px",
            active === c.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.18em] block text-muted-foreground mb-0.5", children: c.context }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-tight", children: c.title }),
            c.achievement && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "ml-2 text-[9px] font-mono tracking-[0.12em] px-2 py-0.5 rounded-full",
                style: {
                  background: `color-mix(in oklab, ${accentColors[c.id]} 15%, transparent)`,
                  color: accentColors[c.id]
                },
                children: c.achievement
              }
            )
          ]
        },
        c.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3", children: "THE CHALLENGE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-foreground/80 leading-relaxed", children: current.challenge })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 p-5 rounded-xl border border-border bg-secondary/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-2", children: "RESULT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: current.outcome })
            ] }),
            active === "wisag" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3", children: "WHAT THEY SAID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "https://www.linkedin.com/posts/yvonne-karolus-wisag_builddays-hackathon-wisaginsights-activity-7455133937875447808-vgQc?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJp5dkBYZ_a6crwcUEeQ4reoxHfgF4vbRk",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "block rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/3 overflow-hidden hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5 transition-colors duration-200 cursor-pointer group/li",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-5 pt-5 pb-4 border-b border-[#0a66c2]/10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-linear-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center text-white font-semibold text-sm shrink-0", children: "YK" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground leading-tight", children: "Yvonne Karolus" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3.5 h-3.5 text-[#0a66c2] shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 text-xs", children: "· 1st" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-snug mt-0.5", children: "Innovation & Ecosystem Manager @WISAG · Driving Innovation forward" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-[#0a66c2]", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-widest text-[#0a66c2]/70", children: "Posted on LinkedIn · 1mo ago" })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/75 leading-relaxed", children: [
                        "🚀 ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground/90 font-medium", children: "32h from the challenge to the prototype." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/75 leading-relaxed", children: [
                        "The challenge in controlling is rarely the lack of data, but rather the ability to draw the right insights from the abundance. The idea: a solution that",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "detects deviations at an early stage, makes causes understandable and derives concrete recommendations for action." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/75 leading-relaxed", children: [
                        "What particularly impressed me was the ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "speed and motivation" }),
                        " of the participants. Overnight, the first functioning prototypes and perspectives emerge."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/90 leading-relaxed font-medium border-l-2 border-[#0a66c2]/40 pl-3 ml-1", children: [
                        '"Congratulations to the winning team Montana Plank, Muhammad Moghees and',
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("mark", { className: "bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-semibold not-italic", children: "Nadeem Saif" }),
                        '! I am curious to see how we can continue to drive the results at WISAG."'
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: ["#Hackathon", "#WISAGinsights", "#Innovation", "#DigitalTransformation"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-[#0a66c2] font-medium", children: tag }, tag)) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-[#0a66c2]/10 bg-[#0a66c2]/2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "👏❤️" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: "You and 70 others" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: "3 comments · 3 reposts" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono text-[10px] text-[#0a66c2]/60 group-hover/li:text-[#0a66c2] transition-colors", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
                          "View post ↗"
                        ] })
                      ] })
                    ] })
                  ]
                }
              )
            ] }),
            active === "kenergy" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3", children: "IN NADEEM'S WORDS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "https://www.linkedin.com/posts/nadeemsaifrind_hackathon-winning-newacievement-activity-7467138741934047232-Q3OY?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJp5dkBYZ_a6crwcUEeQ4reoxHfgF4vbRk",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "block rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/3 overflow-hidden hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5 transition-colors duration-200 cursor-pointer group/li",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-5 pt-5 pb-4 border-b border-[#0a66c2]/10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-linear-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center text-white font-semibold text-sm shrink-0", children: "NS" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground leading-tight", children: "Nadeem Saif" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3.5 h-3.5 text-[#0a66c2] shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 text-xs", children: "· You" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-snug mt-0.5", children: "Graphics & Marketing @Oliverlott · Media Technology & Society" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-[#0a66c2]", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-widest text-[#0a66c2]/70", children: "Posted on LinkedIn · 3d ago" })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/90 font-medium leading-relaxed", children: [
                        "The winning streak continues — we secured",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "1st place" }),
                        " at the",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "LAUNCH Rhein-Main" }),
                        " Build Days for",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "Kenergy Solutions GmbH" }),
                        " Challenge."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/75 leading-relaxed", children: [
                        "After winning the ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "WISAG" }),
                        " Challenge at",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "Futury" }),
                        ", our team",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "Montana Plank" }),
                        " and",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "Muhammad Moghees" }),
                        " jumped straight into the next challenge: another intense",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "32 hours" }),
                        " of building, brainstorming, and problem solving."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/90 font-medium leading-relaxed border-l-2 border-amber-400/60 pl-3 ml-1", children: [
                        '"This time, our solution not only earned 1st place but also won the',
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("mark", { className: "bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-semibold", children: "Community Favorite Award. 🥇" }),
                        '"'
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/70 leading-relaxed", children: [
                        "Beyond the competition, one of the most valuable parts was meeting incredible people like ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "Norah Gath" }),
                        " and",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0a66c2]", children: "Marcel Decker" }),
                        ". Sharing fun excitements, experiences and ideas. Grateful for the experience, the teamwork."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: ["#Hackathon", "#Winning", "#EnergySolution", "#VibeCoding", "#Design", "#team"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-[#0a66c2] font-medium", children: tag }, tag)) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-[#0a66c2]/10 bg-[#0a66c2]/2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "❤️🥇👏" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: "Montana Plank and 39 others" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: "12 comments" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono text-[10px] text-[#0a66c2]/60 group-hover/li:text-[#0a66c2] transition-colors", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }),
                          "View post ↗"
                        ] })
                      ] })
                    ] })
                  ]
                }
              )
            ] }),
            (() => {
              const imgs = [
                current.featuredScreen,
                ...current.screens ?? []
              ].filter(Boolean).slice(0, 4);
              if (imgs.length === 0) return null;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3", children: "PROJECT SCREENS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: imgs.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-3/4 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src,
                    alt: `${current.title} screen ${i + 1}`,
                    className: "w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500",
                    draggable: false
                  }
                ) }, i)) })
              ] });
            })(),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-3", children: "SKILLS & FOCUS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: keywords[active].map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full border",
                  style: {
                    borderColor: `color-mix(in oklab, ${accentColors[active]} 35%, oklch(0.92 0.005 250))`,
                    color: `color-mix(in oklab, ${accentColors[active]} 70%, oklch(0.3 0.01 250))`,
                    background: `color-mix(in oklab, ${accentColors[active]} 8%, transparent)`
                  },
                  children: kw
                },
                kw
              )) })
            ] })
          ]
        },
        active
      ) })
    ] }) })
  ] });
}
function Journey() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", id: "journey", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-[0.2em] text-muted-foreground", children: "JOURNEY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl mt-4 leading-tight max-w-2xl", children: "From DG Khan (a small town of Pakistan) to Creative Technologist." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground hidden md:inline self-end", children: "Pakistan → Germany" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-border", children: JOURNEY.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay: i % 4 * 0.07, duration: 0.5 },
        className: "bg-background p-6 md:p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/30 mr-2", children: (i + 1).toString().padStart(2, "0") }),
            step.era.toUpperCase()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl leading-tight mb-3", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.description })
        ]
      },
      step.era
    )) })
  ] }) });
}
function WhyMe() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-secondary", id: "whyme", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-[0.2em] text-muted-foreground", children: "WHY MY PROFILE IS DIFFERENT" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl mt-4 mb-16 max-w-2xl leading-tight", children: "What you actually get when you hire me." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border", children: WHY_ME.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay: i % 3 * 0.08, duration: 0.5 },
        className: "bg-secondary p-8 md:p-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl leading-snug tracking-tight mb-4 text-foreground", children: item.statement }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.explanation })
        ]
      },
      item.statement
    )) })
  ] }) });
}
function Achievements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", id: "achievements", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-[0.2em] text-muted-foreground", children: "ACHIEVEMENTS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl mt-4 mb-12 max-w-2xl leading-tight", children: "Numbers and recognition that tell the story." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-px", children: ACHIEVEMENTS.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay: i * 0.07, duration: 0.5 },
        className: "bg-background p-8 md:p-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl md:text-5xl tracking-tight mb-2", children: a.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] tracking-[0.2em] text-foreground/70 mb-2", children: a.label.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-snug", children: a.description })
        ]
      },
      a.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-border", children: AWARDS.map((award, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay: i * 0.1, duration: 0.5 },
        className: "bg-background p-8 md:p-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-sm", children: "★" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.15em] text-accent", children: award.result.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
              "· ",
              award.year
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl mb-3 leading-tight", children: award.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: award.description })
        ]
      },
      award.title
    )) })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", id: "contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-10 py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-16 items-end", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-[0.2em] text-muted-foreground", children: "LET'S WORK TOGETHER" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl mt-4 leading-[0.95] text-balance", children: "Let's build something visual, useful, and meaningful." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-md leading-relaxed", children: "Open to brand design, UX/UI, marketing, and creative technologist roles. Based in Germany — available for remote and hybrid engagements worldwide." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `mailto:${PERSONAL.email}`,
          className: "inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-sm hover:bg-foreground/90 transition-colors group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm tracking-wide", children: "START A CONVERSATION" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs tracking-[0.15em] text-muted-foreground", children: PERSONAL.email.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: PERSONAL.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block font-mono text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors",
            children: "LINKEDIN ↗"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs tracking-[0.15em] text-muted-foreground", children: "GERMANY · REMOTE" })
      ] })
    ] })
  ] }) }) });
}
const LENSES = [
  {
    index: "01",
    title: "Brand & Visual Designer",
    tags: ["Identity Systems", "Branding", "Print", "Digital Design"],
    signal: "3 real client projects · German industry",
    signalIcon: Briefcase,
    revealItems: [
      { label: "OliverLott rebrand", caseStudyId: "oliverlott" },
      { label: "Dreamfly identity", caseStudyId: "dreamfly" },
      { label: "Next Step Studio", caseStudyId: "nextstep" }
    ],
    mode: "brand"
  },
  {
    index: "02",
    title: "Marketing & Content Specialist",
    tags: ["Campaigns", "Social Media", "Content Strategy", "Growth"],
    signal: "4 projects · Agency-founded · Multichannel",
    signalIcon: Rocket,
    revealItems: [
      { label: "Next Step Digital", caseStudyId: "nextstep" },
      { label: "Livingroom", caseStudyId: "livingroom" },
      { label: "Social campaigns" }
    ],
    mode: "marketing"
  },
  {
    index: "03",
    title: "Product & UX/UI Designer",
    tags: ["Research", "User Flows", "Wireframes", "Prototyping"],
    signal: "2× Innovation Challenge Winner · Germany",
    signalIcon: Trophy,
    revealItems: [
      { label: "WISAG 1st Place", caseStudyId: "wisag" },
      { label: "Kenergy dual award", caseStudyId: "kenergy" },
      { label: "Figma prototypes" }
    ],
    mode: "ux"
  },
  {
    index: "04",
    title: "Why Companies Hire Me",
    tags: ["Awards", "Business Thinking", "Startup Experience", "Leadership"],
    signal: "WISAG · Kenergy · Next Step Digital · Master's in Germany",
    signalIcon: Users,
    revealItems: [
      { label: "WISAG Challenge", caseStudyId: "wisag" },
      { label: "Kenergy Challenge", caseStudyId: "kenergy" },
      { label: "Next Step Digital", caseStudyId: "nextstep" },
      { label: "Achievements" }
    ],
    mode: "ux",
    scrollTo: "#achievements"
  }
];
function RecruiterShortcut({ onSelect, onOpenCaseStudy }) {
  const [hoveredIndex, setHoveredIndex] = reactExports.useState(null);
  const navigate = useNavigate();
  const handleSelect = (lens) => {
    onSelect(lens.mode, lens.title);
    if (lens.scrollTo) {
      requestAnimationFrame(() => {
        document.querySelector(lens.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      navigate({ to: "/work/$modeId", params: { modeId: lens.mode } });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-16 md:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground", children: "FOR RECRUITERS & HIRING MANAGERS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-2xl md:text-3xl lg:text-4xl font-normal tracking-[-0.03em] max-w-lg leading-tight", children: "View my work through your hiring lens." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed hidden md:block", children: "Select the role you're hiring for — the portfolio adapts to what matters most to you." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 font-mono tracking-[0.15em] mb-10", children: "CLICK TO JUMP TO RELEVANT PROJECTS, ACHIEVEMENTS & EXPERIENCE" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: LENSES.map((lens, i) => {
      const isHovered = hoveredIndex === lens.index;
      const Signal = lens.signalIcon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          onMouseEnter: () => setHoveredIndex(lens.index),
          onMouseLeave: () => setHoveredIndex(null),
          className: "group rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-float overflow-hidden relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSelect(lens),
                className: "w-full text-left p-6 block",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] tracking-[0.22em] text-muted-foreground/40", children: lens.index }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground/30 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base md:text-lg font-medium tracking-tight leading-snug mb-3 text-foreground", children: lens.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-5", children: lens.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-[9px] tracking-widest text-muted-foreground/50 border border-border/60 px-2 py-1 rounded-full",
                      children: tag
                    },
                    tag
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px] text-muted-foreground/60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { className: "w-3 h-3 shrink-0 text-muted-foreground/40", strokeWidth: 1.75 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug", children: lens.signal })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isHovered && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-5 border-t border-border/50 pt-4 bg-secondary/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] tracking-[0.18em] text-muted-foreground/40 mb-2.5", children: "YOU'LL SEE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: lens.revealItems.map(
                    (item) => item.caseStudyId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => onOpenCaseStudy(item.caseStudyId),
                        className: "font-mono text-[9px] tracking-[0.12em] text-foreground/80 border border-foreground/20 bg-background/60 hover:bg-foreground hover:text-background hover:border-foreground px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1",
                        children: [
                          item.label,
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-2.5 h-2.5" })
                        ]
                      },
                      item.label
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono text-[9px] tracking-[0.12em] text-muted-foreground/50 border border-border/40 px-2.5 py-1 rounded-full",
                        children: item.label
                      },
                      item.label
                    )
                  ) })
                ] })
              }
            ) })
          ]
        },
        lens.index
      );
    }) })
  ] }) });
}
function WorkflowSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-16 md:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-[0.2em] text-muted-foreground", children: "HOW I CREATE VALUE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-muted-foreground max-w-lg leading-relaxed", children: "I can contribute at every stage — from the first idea to lasting growth. Most professionals cover one or two steps. I cover the whole arc." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border", children: WORKFLOW.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { delay: i * 0.06, duration: 0.45 },
        className: "bg-background p-6 md:p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-4", children: step.stage }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl mb-3 leading-tight", children: step.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5", children: step.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-widest text-muted-foreground/60 border border-border/60 rounded-full px-2.5 py-1", children: step.discipline })
        ]
      },
      step.label
    )) })
  ] }) });
}
function BuildingInPublic() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", id: "building", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-[0.2em] text-muted-foreground", children: "BUILDING IN PUBLIC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl mt-4 max-w-xl leading-tight", children: "Execution record, 2023 — 2025." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-md", children: "Every entry is something shipped, won, or built — not planned." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground hidden md:inline self-end", children: [
        PUBLIC_BUILDS.length,
        " outputs"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border divide-y divide-border overflow-hidden", children: PUBLIC_BUILDS.map((build, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-40px" },
        transition: { delay: i * 0.04, duration: 0.4 },
        className: "px-5 md:px-6 py-4 md:py-5 bg-background hover:bg-secondary transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6 md:gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground shrink-0 pt-0.5 w-10", children: build.year }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.15em] text-muted-foreground/60", children: build.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg mt-1 leading-tight", children: build.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 md:hidden", children: build.result })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-right shrink-0 max-w-[260px] hidden md:block pt-0.5 leading-snug", children: build.result })
        ] })
      },
      `${build.year}-${build.title}`
    )) })
  ] }) });
}
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const NAV_LINKS = [{
  href: "#work",
  label: "WORK"
}, {
  href: "#projects",
  label: "PROJECTS"
}, {
  href: "#journey",
  label: "JOURNEY"
}, {
  href: "#contact",
  label: "CONTACT"
}];
function Index() {
  const [activeMode, setActiveMode] = reactExports.useState("brand");
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [activeLens, setActiveLens] = reactExports.useState(null);
  const [selectedCase, setSelectedCase] = reactExports.useState(null);
  const openCaseStudy = (id) => {
    const cs = CASE_STUDIES.find((c) => c.id === id);
    if (!cs) return;
    setSelectedCase(cs);
    requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-full border border-border/50 px-2 py-1.5 shadow-soft transition-all duration-300 hover:shadow-float hover:border-border hover:backdrop-blur-xl group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-3 py-1 rounded-full bg-foreground/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          fontFamily: "var(--font-signature)"
        }, className: "text-base leading-none", children: "Nadeem Saif" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-1 px-2", children: NAV_LINKS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.href, className: "relative px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors", children: item.label }, item.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "hidden md:block bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-mono text-[10px] tracking-[0.15em] hover:opacity-90 transition", children: "HIRE ME" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen(true), className: "md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 transition-colors", "aria-label": "Open menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-full animate-[spin_4s_linear_infinite]", style: {
        background: "conic-gradient(from 0deg, transparent 0%, oklch(1 0 0 / 0.15) 20%, transparent 40%)"
      } }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-72 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          fontFamily: "var(--font-signature)"
        }, className: "text-lg leading-none", children: "Nadeem Saif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: PERSONAL.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1 mt-6", children: NAV_LINKS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.href, onClick: () => setMobileOpen(false), className: "font-mono text-sm tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors px-3 py-3 rounded-lg hover:bg-secondary", children: item.label }, item.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-8 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", onClick: () => setMobileOpen(false), className: "flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-mono text-[10px] tracking-[0.15em] hover:opacity-90 transition w-full", children: "HIRE ME →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] tracking-[0.15em] text-muted-foreground text-center mt-4", children: [
          PERSONAL.location.toUpperCase(),
          " · REMOTE"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative pt-16 md:pt-20 pb-10 overflow-hidden bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-10 lg:px-16 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 28
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[1.9rem] sm:text-[2.3rem] lg:text-[2.7rem] xl:text-[3.2rem] leading-[1.15] tracking-[-0.03em] font-normal w-full", children: [
          "Design,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "oklch(0.62 0.01 250)"
          }, children: "Ideas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "and Everything",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "oklch(0.62 0.01 250)"
          }, children: "in between." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm md:text-base text-foreground/55 leading-relaxed max-w-104", children: "Film & TV → Germany → design, marketing, products. Six disciplines, one integrated practice." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#work", className: "inline-flex items-center gap-2 border border-border bg-card text-foreground px-7 py-3.5 rounded-full text-sm font-medium tracking-tight hover:border-foreground/25 hover:bg-secondary transition-colors", children: "View Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WinnerBadge, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex items-center gap-2", children: [{
          href: "https://www.linkedin.com/in/nadeemsaifrind/",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-4 h-4" }),
          label: "LinkedIn"
        }, {
          href: "https://www.youtube.com/@nadeemslife",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-4 h-4" }),
          label: "YouTube"
        }, {
          href: "https://www.instagram.com/nadeemsaifrind/",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-4 h-4" }),
          label: "Instagram"
        }, {
          href: "https://www.tiktok.com/@nadeemsaifrind",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "w-4 h-4", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.12 8.12 0 004.74 1.5V6.75a4.85 4.85 0 01-.97-.06z" }) }),
          label: "TikTok"
        }].map(({
          href,
          icon,
          label
        }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, target: "_blank", rel: "noopener noreferrer", "aria-label": label, className: "w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-secondary transition-all duration-200", children: icon }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.55,
          duration: 0.7
        }, className: "mt-4 inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.18em] text-muted-foreground", children: "OPEN TO OPPORTUNITIES · GERMANY & REMOTE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.75,
          duration: 0.6
        }, className: "mt-4 flex flex-wrap gap-1.5", children: MODES.map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveMode(mode.id), className: ["px-3 py-1.5 rounded-full font-mono text-[9px] tracking-[0.14em] border transition-all duration-200", activeMode === mode.id ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"].join(" "), children: mode.category.split(" ")[0] }, mode.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        scale: 0.96,
        y: 20
      }, animate: {
        opacity: 1,
        scale: 1,
        y: 0
      }, transition: {
        duration: 1.05,
        delay: 0.18,
        ease: [0.22, 1, 0.36, 1]
      }, className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCarousel, { activeMode, onSelect: setActiveMode }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: activeLens && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: -8
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: -8
    }, transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }, className: "sticky top-[3.6rem] z-40 bg-foreground text-background px-6 py-2.5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.2em] text-background/50", children: "VIEWING AS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.15em] font-medium", children: activeLens.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveLens(null), className: "font-mono text-[10px] tracking-[0.15em] text-background/50 hover:text-background transition-colors flex items-center gap-1.5", children: "× CLEAR LENS" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RecruiterShortcut, { onSelect: (mode, label) => {
      setActiveMode(mode);
      setActiveLens(label);
    }, onOpenCaseStudy: openCaseStudy }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DisciplineGrid, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudies, { selected: selectedCase, setSelected: setSelectedCase }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Journey, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyMe, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Achievements, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BuildingInPublic, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-8 flex items-center justify-between font-mono text-xs tracking-[0.15em] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© 2025 ",
        PERSONAL.name.toUpperCase()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CREATIVE TECHNOLOGIST · GERMANY" })
    ] }) })
  ] });
}
export {
  Index as component
};
