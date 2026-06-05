import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CaseStudies, D as Dialog, a as DialogContent, b as DialogTitle, d as DialogDescription } from "./CaseStudies-Bf-vq-A0.mjs";
import { R as Route, C as CASE_STUDIES } from "./router-BsMyf8as.mjs";
import { a as ArrowLeft } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function WorkDetail() {
  const {
    mode
  } = Route.useLoaderData();
  const [selectedProject, setSelectedProject] = reactExports.useState(null);
  const [selectedCase, setSelectedCase] = reactExports.useState(null);
  const handleProjectClick = (p) => {
    if (p.caseStudyId) {
      const cs = CASE_STUDIES.find((c) => c.id === p.caseStudyId);
      if (cs) {
        setSelectedCase(cs);
        return;
      }
    }
    setSelectedProject(p);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 lg:px-10 bg-background/80 backdrop-blur-md border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
        "BACK TO HOME"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] tracking-[0.18em] text-muted-foreground/50", children: mode.category })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[50vh] md:h-[60vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mode.image, alt: mode.label, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }, className: "absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full", style: {
            background: mode.accent,
            boxShadow: `0 0 10px ${mode.accent}`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-white/60", children: mode.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] text-white leading-none", children: mode.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base md:text-lg text-white/60 max-w-xl leading-relaxed", children: mode.tagline })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-6 lg:px-10 py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1,
        duration: 0.6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl text-foreground/80 leading-relaxed", children: mode.description }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2,
        duration: 0.6
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-5", children: "WHAT YOU GET" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: mode.valuePoints.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30 shrink-0 mt-0.5", children: "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base text-foreground/80 leading-snug", children: point })
        ] }, point)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-10 py-14 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-5", children: "CAPABILITIES" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: mode.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-widest text-muted-foreground/70 border border-border rounded-full px-3 py-1.5", children: skill }, skill)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground block mb-5", children: "WORKING WITH" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: mode.tools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border border-border rounded-xl px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0", style: {
            background: tool.bg,
            color: tool.color
          }, children: tool.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-widest text-muted-foreground/70", children: tool.name })
        ] }, tool.name)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-14 md:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground", children: "SELECTED WORK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 text-2xl md:text-3xl tracking-tight font-normal", children: [
            mode.label,
            " projects"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground/50", children: [
          mode.projects.length,
          " projects"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden", children: mode.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
        opacity: 0,
        y: 16
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.07,
        duration: 0.5
      }, onClick: () => handleProjectClick(p), className: "bg-background p-8 md:p-10 group cursor-pointer transition-colors hover:bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground", children: p.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: p.year })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl mb-3 leading-tight", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-md", children: p.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.15em]", children: "VIEW DETAILS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
        ] })
      ] }, p.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-10 py-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
        "BACK TO HOME"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40", children: [
        "NADEEM SAIF · ",
        mode.category
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudies, { dialogOnly: true, selected: selectedCase, setSelected: setSelectedCase }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedProject, onOpenChange: (o) => !o && setSelectedProject(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl p-0 gap-0 overflow-y-auto max-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: selectedProject?.title ?? "Project Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "sr-only", children: selectedProject?.description ?? "" }),
      selectedProject && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full shrink-0 overflow-hidden", style: {
          aspectRatio: "2.8 / 1"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mode.image, alt: mode.label, className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/25 text-white/90", style: {
                background: `color-mix(in oklab, ${mode.accent} 30%, transparent)`
              }, children: selectedProject.tag }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.2em] text-white/55", children: selectedProject.year })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl text-white font-normal tracking-[-0.03em] leading-tight", children: selectedProject.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-foreground/80 leading-relaxed mb-10", children: selectedProject.description }),
          selectedProject.highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4", children: "HIGHLIGHTS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden", children: selectedProject.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] tracking-[0.08em] text-foreground/80 leading-snug", children: h }) }, h)) })
          ] }),
          selectedProject.screens && selectedProject.screens.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-4", children: "PREVIEW" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: selectedProject.screens.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden aspect-video bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `Screen ${i + 1}`, className: "w-full h-full object-cover" }) }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full", style: {
                background: mode.accent
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] tracking-[0.2em] text-muted-foreground", children: [
                mode.label.toUpperCase(),
                " · ",
                mode.category
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: selectedProject.year })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  WorkDetail as component
};
