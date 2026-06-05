import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-DBnIFyf2.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nadeem Saif — Creative Technologist & Marketing Designer" },
      {
        name: "description",
        content: "Nadeem Saif — Creative Technologist & Marketing Designer based in Germany. Branding, UX/UI, marketing, content creation, and AI-assisted product development."
      },
      { name: "author", content: "Nadeem Saif" },
      { name: "keywords", content: "Nadeem Saif, Creative Technologist, Marketing Designer, Brand Design, UX UI Design, Germany, Portfolio" },
      { property: "og:title", content: "Nadeem Saif — Creative Technologist & Marketing Designer" },
      {
        property: "og:description",
        content: "Branding, UX/UI, marketing, content creation, and AI-assisted product development — six disciplines, one person."
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.nadeemsaif.com/" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Nadeem Saif" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@nadeemsaifrind" },
      { name: "twitter:title", content: "Nadeem Saif — Creative Technologist & Marketing Designer" },
      {
        name: "twitter:description",
        content: "Branding, UX/UI, marketing, content, and AI-assisted development. Six disciplines, one person."
      }
    ],
    links: [
      { rel: "canonical", href: "https://www.nadeemsaif.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&family=Alex+Brush&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const designerImg = "/assets/card-designer-AB48idpX.jpg";
const coderImg = "/assets/card-coder-DPSUEuyV.jpeg";
const webAiImg = "/assets/Card-Web_AIDev-Dg-RH2El.jpg";
const marketerImg = "/assets/card-marketer-D3M1kwh-.jpeg";
const startupImg = "/assets/card-startup-DK4-irnX.jpg";
const creatorImg = "/assets/card-creator-LnUE7ITZ.jpg";
const aiImg = "/assets/card-ai-DdcHE2EJ.png";
const coverOliverlott = "/assets/cover-oliverlott-DZ4Dfpxs.png";
const csOliverlott1 = "/assets/cs-oliverlott-1-ulfY_nru.png";
const csOliverlott2 = "/assets/cs-oliverlott-2-CBASL4z8.png";
const csOliverlott3 = "/assets/cs-oliverlott-3-BnBpVjJq.png";
const csOliverlott4 = "/assets/cs-oliverlott-4-CX_H8KVr.png";
const csOliverlott5 = "/assets/cs-oliverlott-5-0UeA6DWM.jpg";
const coverDreamfly = "/assets/cover-dreamflyplatform-CjvYB2bW.jpeg";
const coverDreamflyConsultancy = "/assets/cover-dreamfly-BUjmBiTm.png";
const coverLivingroom = "/assets/cover-livingroom-h9IFCICA.jpg";
const coverWisag = "/assets/cover-wisag-B-S2TDan.webp";
const coverKenergy = "/assets/cover-kenergy-rIp1dUcf.webp";
const coverNextstep = "/assets/cover-nextstep-Cjbi90ce.jpeg";
const csKenergy1 = "/assets/cs-kenergy-1-DE_dGgrF.png";
const csKenergy2 = "/assets/cs-kenergy-2-ycIQs8nM.jpg";
const csKenergy3 = "/assets/cs-kenergy-3-D6Q7OddB.jpg";
const csKenergy4 = "/assets/cs-kenergy-4-Bqemzbdp.jpg";
const csKenergy5 = "/assets/cs-kenergy-5-5AdRNh7z.jpg";
const csWisag1 = "/assets/cs-wisag-1-7uv_g8mQ.jpeg";
const csWisag2 = "/assets/cs-wisag-2-BgVS9gNX.jpg";
const csWisag3 = "/assets/cs-wisag-3-BcvOt5xi.jpg";
const csWisag4 = "/assets/cs-wisag-4-DCnF3Jpl.jpg";
const csWisag5 = "/assets/cs-wisag-5-BUzs66dS.jpg";
const csDreamfly1 = "/assets/cs-dreamfly-1-C38BomHn.png";
const csDreamfly2 = "/assets/cs-dreamfly-2-CrInQbaD.png";
const csDreamfly3 = "/assets/cs-dreamfly-3-BdoqQdCb.png";
const csDreamfly4 = "/assets/cs-dreamfly-4-DGl2cm0w.png";
const csDreamfly5 = "/assets/cs-dreamfly-5-BnLN_i8q.png";
const csLivingroomInsta = "/assets/cs-livingroom-insta-tgkR0I8u.jpeg";
const csLivingroomReel1 = "/assets/cs-livingroom-reel-1-FLLPgSX5.jpeg";
const csLivingroomReel2 = "/assets/cs-livingroom-reel-2-DA33UaHn.jpeg";
const csLivingroomBts1 = "/assets/cs-livingroom-bts-1-BVEQMjnx.jpeg";
const csLivingroomBts2 = "/assets/cs-livingroom-bts-2-BB50F4Pk.jpeg";
const csNextstep1 = "/assets/cs-nextstep-1-QzwWd3Xg.jpg";
const csNextstep2 = "/assets/cs-nextstep-2-DsFctHMX.jpg";
const csNextstep3 = "/assets/cs-nextstep-3-DPo7d9Zu.jpg";
const csNextstep4 = "/assets/cs-nextstep-4-DKNA7Xwi.jpg";
const csNextstep5 = "/assets/cs-nextstep-5-BIUIy2ua.jpg";
const nsArascow1 = "/assets/ns-arascow-1-DpDiHr7O.jpg";
const nsArascow2 = "/assets/ns-arascow-2-BKBP9v4e.jpg";
const nsArascow3 = "/assets/ns-arascow-3-BHJDCZKi.jpg";
const nsArascow4 = "/assets/ns-arascow-4-Choz20AM.jpg";
const nsArascow5 = "/assets/ns-arascow-5-txWH-qn8.jpg";
const nsArascow6 = "/assets/ns-arascow-6-2I9olo_V.jpg";
const nsArascow7 = "/assets/ns-arascow-7-CqFOczDe.jpg";
const nsArascow8 = "/assets/ns-arascow-8-mas6ByI5.jpg";
const nsBcl1 = "/assets/ns-bcl-1-AHmH0GLD.jpg";
const nsBcl2 = "/assets/ns-bcl-2-CcxeGX3A.jpg";
const nsBcl3 = "/assets/ns-bcl-3-Cq72hUQz.jpg";
const nsBcl4 = "/assets/ns-bcl-4-C9Qd9Efj.jpg";
const nsBcl5 = "/assets/ns-bcl-5-BsRIe-7h.jpg";
const nsBcl6 = "/assets/ns-bcl-6-De9OsxvE.jpg";
const nsPotentialwecker1 = "/assets/ns-potentialwecker-1-CJN8ltOi.jpg";
const nsPotentialwecker2 = "/assets/ns-potentialwecker-2-BxSqns0h.jpg";
const nsPotentialwecker3 = "/assets/ns-potentialwecker-3-Dr5wgmnQ.jpg";
const nsPotentialwecker4 = "/assets/ns-potentialwecker-4-DTl6mAYh.jpg";
const nsPotentialwecker5 = "/assets/ns-potentialwecker-5-mVF0MjdX.jpg";
const nsPotentialwecker6 = "/assets/ns-potentialwecker-6-DrLCLHSN.jpg";
const nsPotentialwecker7 = "/assets/ns-potentialwecker-7-CsRVkHeh.jpg";
const nsPotentialwecker8 = "/assets/ns-potentialwecker-8-Ded3YjMT.jpg";
const nsEdnex1 = "/assets/ns-ednex-1-Bzu1qjvB.jpg";
const nsEdnex2 = "/assets/ns-ednex-2-CGWJspI1.jpg";
const nsEdnex3 = "/assets/ns-ednex-3-Dn_HBUHe.jpg";
const nsEdnex4 = "/assets/ns-ednex-4-CrDBPbNc.jpg";
const nsEdnex5 = "/assets/ns-ednex-5-BRQntcLg.jpg";
const nsEdnex6 = "/assets/ns-ednex-6-DKq0wnig.jpg";
const nsEdnex7 = "/assets/ns-ednex-7-CusA5oJf.jpg";
const nsMousamargi1 = "/assets/ns-mousamargi-1-De0fqBY4.jpg";
const nsMousamargi2 = "/assets/ns-mousamargi-2-BXwxdOF8.jpg";
const nsMousamargi3 = "/assets/ns-mousamargi-3-CtcmVLt-.jpg";
const nsMousamargi4 = "/assets/ns-mousamargi-4-CjVK00UO.jpg";
const nsMousamargi5 = "/assets/ns-mousamargi-5-C7Mt03M4.jpg";
const nsMousamargi6 = "/assets/ns-mousamargi-6-DrF_PFuG.jpg";
const nsPakworldhoney1 = "/assets/ns-pakworldhoney-1-BWfqoS56.jpg";
const nsPakworldhoney2 = "/assets/ns-pakworldhoney-2-DEEUYxcn.jpg";
const nsPakworldhoney3 = "/assets/ns-pakworldhoney-3-CsGxpXNl.jpg";
const nsPakworldhoney4 = "/assets/ns-pakworldhoney-4-C8NIAPvn.jpg";
const nsPakworldhoney5 = "/assets/ns-pakworldhoney-5-DmXn1NMD.jpg";
const nsPakworldhoney6 = "/assets/ns-pakworldhoney-6-BT-WCkuB.jpg";
const nsPakworldhoney7 = "/assets/ns-pakworldhoney-7-CfPvGAxP.jpg";
const csDfc1 = "/assets/cs-dfc-1-CwZ0o5ee.jpg";
const csDfc2 = "/assets/cs-dfc-2-D1nECPOw.jpg";
const csDfc3 = "/assets/cs-dfc-3-DAD9ayo8.jpg";
const csDfc4 = "/assets/cs-dfc-4-Bj5ylFU6.jpg";
const csDfc5 = "/assets/cs-dfc-5-i1WWwu9H.jpeg";
const dfcEvent1 = "/assets/dfc-event-1-DYpzQQMm.jpeg";
const dfcEvent2 = "/assets/dfc-event-2-CSOUt0DT.jpeg";
const dfcEvent3 = "/assets/dfc-event-3-DRTCIkSm.jpeg";
const dfcEvent4 = "/assets/dfc-event-4-B5zglSqJ.jpeg";
const dfcEvent5 = "/assets/dfc-event-5-BENTFDD0.jpg";
const dfcEvent6 = "/assets/dfc-event-6-BCOJzzef.jpg";
const dfcEvent7 = "/assets/dfc-event-7-BtQ5cMWM.jpg";
const dfcEvent8 = "/assets/dfc-event-8-AUNisM9d.jpg";
const dfcEvent9 = "/assets/dfc-event-9-DX3YFJZw.jpg";
const dfcSuccess1 = "/assets/dfc-success-1-BvbJqHZ1.jpg";
const dfcSuccess2 = "/assets/dfc-success-2-BPVeYSLv.jpg";
const dfcSuccess3 = "/assets/dfc-success-3-CYfH51o6.jpg";
const dfcSuccess4 = "/assets/dfc-success-4-dt5K1rS7.jpg";
const dfcSuccess5 = "/assets/dfc-success-5-xnC_4Xwo.jpg";
const dfcSuccess6 = "/assets/dfc-success-6-D7d3Iqiv.jpg";
const dfcSuccess7 = "/assets/dfc-success-7-BYH_pS-f.jpg";
const dfcSuccess8 = "/assets/dfc-success-8-BWjlYBzS.jpg";
const dfcSuccess9 = "/assets/dfc-success-9-LKGJNi7o.jpg";
const dfcSuccess10 = "/assets/dfc-success-10-BLsp7w98.jpg";
const dfcSuccess11 = "/assets/dfc-success-11-CrHon-s1.jpg";
const dfcSuccess12 = "/assets/dfc-success-12-BqeV1aB9.jpg";
const dfcSuccess13 = "/assets/dfc-success-13-BJtstRpe.jpg";
const dfcCampaign1 = "/assets/dfc-campaign-1-BQxiE5oX.jpg";
const dfcCampaign2 = "/assets/dfc-campaign-2-zXfV_3Mn.jpg";
const dfcCampaign3 = "/assets/dfc-campaign-3-DSFJenjx.jpg";
const dfcCampaign4 = "/assets/dfc-campaign-4-DXR54O-p.jpg";
const dfcCampaign5 = "/assets/dfc-campaign-5-B-ti2Ykj.jpg";
const dfcCampaign6 = "/assets/dfc-campaign-6-BSDgRf4H.jpg";
const dfcCampaign7 = "/assets/dfc-campaign-7-BFoB5rnm.jpg";
const PERSONAL = {
  name: "Nadeem Saif",
  title: "Creative Technologist & Marketing Designer",
  description: "I studied Film & Television in Pakistan, moved to Germany for a Master's in Media, Technology and Society, and built a career at the intersection of design, marketing, and technology. I design brands, run campaigns, ship products, and write code — often within the same project.",
  email: "nsaif092@gmail.com",
  linkedin: "https://linkedin.com/in/nadeemsaif",
  location: "Germany"
};
const MODES = [
  {
    id: "brand",
    label: "Brand & Design",
    category: "VISUAL SYSTEMS",
    title: "Brand Identity",
    image: designerImg,
    accent: "oklch(0.85 0.15 30)",
    tagline: "Identity and visual systems that communicate before a word is read.",
    description: "I build brands that position, persuade, and persist across every touchpoint. From logo to layout, every visual decision carries strategic intent — designed for the audience, not the designer.",
    skills: [
      "Branding",
      "Logo Design",
      "Graphic Design",
      "Visual Systems",
      "Adobe Suite",
      "Print Design",
      "Presentation Design",
      "Social Media Visuals"
    ],
    valuePoints: [
      "Help businesses communicate who they are before saying a word",
      "Create visual identities that work across every platform and format",
      "Build design systems teams can use independently — no designer needed for every asset",
      "Turn vague brand briefs into clear visual decisions backed by strategic rationale"
    ],
    tools: [
      { name: "FIGMA", bg: "#1e1e1e", label: "Fg", color: "#a259ff" },
      { name: "ILLUSTRATOR", bg: "#330000", label: "Ai", color: "#ff9a00" },
      { name: "PHOTOSHOP", bg: "#0a2540", label: "Ps", color: "#31a8ff" },
      { name: "INDESIGN", bg: "#310022", label: "Id", color: "#ff3366" },
      { name: "CANVA", bg: "#7ed3cd", label: "Ca", color: "#ffffff" },
      { name: "POWERPOINT", bg: "#c43e1c", label: "Po", color: "#ffffff" }
    ],
    projects: [
      {
        title: "OliverLott",
        tag: "BRANDING",
        year: "2024 — 2025",
        description: "Full brand identity for a German IT development company — logo, visual system, social media templates, and presentation design.",
        highlights: ["Brand identity", "Social templates", "Presentation deck", "German IT sector"],
        caseStudyId: "oliverlott"
      },
      {
        title: "Next Step Digital",
        tag: "AGENCY BRAND",
        year: "2023 — Present",
        description: "Designed the brand identity for my own digital marketing agency — from logo and color system to client deliverable templates.",
        highlights: ["Self-founded", "Agency branding", "Full system", "Ongoing"],
        caseStudyId: "nextstep"
      }
    ]
  },
  {
    id: "content",
    label: "Content & Media",
    category: "STORY & PRODUCTION",
    title: "Media Production",
    image: creatorImg,
    accent: "oklch(0.82 0.14 80)",
    tagline: "Cinematic storytelling and social content systems that travel.",
    description: "I studied Film & Television. I think in frames, sequences, and emotion — and that sensibility shapes every video, reel, and photo I produce. Always narrative-first.",
    skills: [
      "Photography",
      "Videography",
      "Video Editing",
      "Short-form Video",
      "Storytelling",
      "Lighting",
      "Composition",
      "YouTube"
    ],
    valuePoints: [
      "Produce content that stops people scrolling and makes them feel something",
      "Build content systems that generate consistently — without burning out or losing quality",
      "Translate a brand's story into visual media people actually share",
      "Apply filmmaker instincts — composition, rhythm, emotional timing — to brand media"
    ],
    tools: [
      { name: "PREMIERE PRO", bg: "#1a0033", label: "Pr", color: "#9999ff" },
      { name: "AFTER EFFECTS", bg: "#00005b", label: "Ae", color: "#9999ff" },
      { name: "LIGHTROOM", bg: "#001d3d", label: "Lr", color: "#31a8ff" },
      { name: "CAPCUT", bg: "#000000", label: "Cc", color: "#ffffff" },
      { name: "DAVINCI", bg: "#222222", label: "DV", color: "#f5a623" },
      { name: "PHOTOSHOP", bg: "#0a2540", label: "Ps", color: "#31a8ff" }
    ],
    projects: [
      {
        title: "Livingroom Apartments",
        tag: "CONTENT CREATION",
        year: "2023 — 2024",
        description: "Lifestyle photography and short-form video content for a furnished apartment brand targeting international professionals in Germany.",
        highlights: ["Lifestyle photography", "Short-form video", "Brand content", "Rental market"],
        caseStudyId: "livingroom"
      },
      {
        title: "Germany Vlogs",
        tag: "SOCIAL CONTENT",
        year: "2023 — Present",
        description: "Ongoing social content series documenting student and startup life in Germany — built an engaged audience from scratch.",
        highlights: ["Audience building", "Ongoing series", "Student life", "Social-first"]
      }
    ]
  },
  {
    id: "marketing",
    label: "Marketing & Growth",
    category: "GROWTH & STRATEGY",
    title: "Campaigns",
    image: marketerImg,
    accent: "oklch(0.8 0.18 330)",
    tagline: "Campaigns, content engines, and growth systems that compound.",
    description: "I build marketing systems that run — not one-off campaigns, but repeatable engines across LinkedIn, Meta, email, and organic content. Designed for measurable results.",
    skills: [
      "Social Media Marketing",
      "Content Strategy",
      "LinkedIn Marketing",
      "Campaign Planning",
      "Newsletter Marketing",
      "Community Building",
      "Meta Ads",
      "Google Ads"
    ],
    valuePoints: [
      "Build content engines that keep attracting attention after the initial push",
      "Help brands grow audiences that actually convert — not just accumulate followers",
      "Design campaigns where creative quality and data drive the same decision",
      "Turn social media from a time cost into a compounding business asset"
    ],
    tools: [
      { name: "META ADS", bg: "#3b82f6", label: "∞", color: "#ffffff" },
      { name: "GOOGLE ADS", bg: "#ffffff", label: "▮▮▮", color: "#34a853" },
      { name: "LINKEDIN", bg: "#0077b5", label: "in", color: "#ffffff" },
      { name: "NOTION", bg: "#000000", label: "N", color: "#ffffff" },
      { name: "ANALYTICS", bg: "#ffffff", label: "▮▮", color: "#f9ab00" },
      { name: "CANVA", bg: "#7ed3cd", label: "Ca", color: "#ffffff" }
    ],
    projects: [
      {
        title: "OliverLott LinkedIn",
        tag: "LINKEDIN MARKETING",
        year: "2024 — 2025",
        description: "Built and managed OliverLott's LinkedIn presence — content strategy, copywriting, and campaign design for B2B lead generation in the German IT market.",
        highlights: ["B2B LinkedIn", "Content strategy", "Copywriting", "Lead generation"],
        caseStudyId: "oliverlott"
      },
      {
        title: "Livingroom Campaigns",
        tag: "SOCIAL CAMPAIGNS",
        year: "2023 — 2024",
        description: "Planned and executed multi-platform social media campaigns for Livingroom Apartments — organic content and paid acquisition.",
        highlights: ["Multi-platform", "Organic + paid", "Apartment brand", "Germany"],
        caseStudyId: "livingroom"
      },
      {
        title: "Next Step Clients",
        tag: "CLIENT CAMPAIGNS",
        year: "2023 — Present",
        description: "End-to-end marketing campaigns for overseas education consultancies — audience research, content creation, and performance tracking.",
        highlights: ["Overseas education", "Campaign delivery", "Multiple clients", "Recurring"],
        caseStudyId: "nextstep"
      },
      {
        title: "Nadeem's Life",
        tag: "YOUTUBE · TIKTOK",
        year: "2022 — Present",
        description: "Personal content brand across YouTube and TikTok — documenting life from Pakistan to Germany, entrepreneurship, and design. Long-form stories on YouTube built a genuine community; short-form TikTok content drives high retention and consistent engagement.",
        highlights: ["YouTube channel", "TikTok presence", "Community building", "Personal brand"],
        screens: []
      }
    ]
  },
  {
    id: "ux",
    label: "UX / UI Design",
    category: "PRODUCT & EXPERIENCE",
    title: "Product Design",
    image: aiImg,
    accent: "oklch(0.75 0.18 280)",
    tagline: "Research-led design, from wireframe to working product.",
    description: "I design products that actually get used. User research first, wireframes second, pixel polish last. The experience has to work before it has to look good.",
    skills: [
      "UX Research",
      "UI Design",
      "Wireframing",
      "Design Systems",
      "User Flows",
      "Prototyping",
      "Product Thinking",
      "Usability Testing"
    ],
    valuePoints: [
      "Design products people understand in seconds and choose to return to",
      "Translate user research into decisions — not just deliverables",
      "Reduce friction at the exact points where users give up",
      "Build design systems that keep products coherent as they grow"
    ],
    tools: [
      { name: "FIGMA", bg: "#1e1e1e", label: "Fg", color: "#a259ff" },
      { name: "FIGJAM", bg: "#1e1e1e", label: "FJ", color: "#f24e1e" },
      { name: "NOTION", bg: "#000000", label: "N", color: "#ffffff" },
      { name: "MIRO", bg: "#ffdd00", label: "Mi", color: "#050038" },
      { name: "MAZE", bg: "#ff4d5b", label: "Mz", color: "#ffffff" },
      { name: "WHIMSICAL", bg: "#7c5cbf", label: "W", color: "#ffffff" }
    ],
    projects: [
      {
        title: "WISAG Challenge",
        tag: "COMPETITION · 1ST PLACE",
        year: "2024",
        description: "Designed a mobile-first internal workflow tool for WISAG's 10,000+ field employees across Germany. Won 1st Place.",
        highlights: ["1st Place winner", "Mobile-first UX", "Enterprise scale", "Field workers"],
        caseStudyId: "wisag"
      },
      {
        title: "Kenergy Challenge",
        tag: "COMPETITION · 1ST + COMMUNITY FAV",
        year: "2024",
        description: "Designed an energy-saving platform using behavioral design and gamification. Won 1st Place and the Community Favorite Award.",
        highlights: ["1st + Comm. Favorite", "Behavioral design", "Gamification", "Dual award"],
        caseStudyId: "kenergy"
      },
      {
        title: "Finance Dashboard",
        tag: "PRODUCT DESIGN",
        year: "2024",
        description: "End-to-end UX research and product design for a personal finance dashboard — user flows, wireframes, and high-fidelity UI.",
        highlights: ["End-to-end UX", "Finance product", "Data visualization", "High-fidelity"],
        caseStudyId: "dreamfly"
      },
      {
        title: "Energy Saving Platform",
        tag: "PRODUCT DESIGN",
        year: "2024",
        description: "Designed an energy management platform for residential users — research, information architecture, and full UI system.",
        highlights: ["Research-led", "Platform design", "Info architecture", "UI system"],
        caseStudyId: "kenergy"
      }
    ]
  },
  {
    id: "web",
    label: "Web & AI Dev",
    category: "AI-ASSISTED BUILDS",
    title: "Products & Platforms",
    image: webAiImg,
    accent: "oklch(0.8 0.18 240)",
    tagline: "Turning ideas into usable digital products — faster than a team.",
    description: "I build things. With AI as a collaborator, I move from design to deployed product faster than most teams. I design what I can ship — no handoff gaps, no context lost.",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Supabase",
      "TypeScript",
      "Frontend Dev",
      "Product Building",
      "AI-Assisted Coding"
    ],
    valuePoints: [
      "Take a product from research to deployed code — no handoff, no context lost",
      "Ship functional software faster by designing and building as one person",
      "Use AI as a collaborator to move at startup speed without startup chaos",
      "Deliver products that are both well-designed and technically maintainable"
    ],
    tools: [
      { name: "NEXT.JS", bg: "#000000", label: "N↗", color: "#ffffff" },
      { name: "REACT", bg: "#20232a", label: "⚛", color: "#61dafb" },
      { name: "TAILWIND", bg: "#0ea5e9", label: "TW", color: "#ffffff" },
      { name: "SUPABASE", bg: "#1e1e2e", label: "SB", color: "#3ecf8e" },
      { name: "VS CODE", bg: "#4a90d9", label: "◁", color: "#ffffff" },
      { name: "CURSOR AI", bg: "#000000", label: "AI", color: "#ffffff" }
    ],
    projects: [
      {
        title: "Finance Dashboard",
        tag: "FULL-STACK",
        year: "2024",
        description: "Designed and built a personal finance tracking dashboard — Next.js, Supabase, and Tailwind with interactive data visualization.",
        highlights: ["Next.js + Supabase", "Full-stack build", "Finance product", "Data viz"],
        caseStudyId: "dreamfly"
      },
      {
        title: "Dreamfly Platform",
        tag: "SAAS",
        year: "2024 — 2025",
        description: "Built the Dreamfly overseas education platform — product design, frontend development, and AI-assisted workflows.",
        highlights: ["SaaS platform", "AI-assisted", "Education niche", "End-to-end"],
        caseStudyId: "dreamfly"
      },
      {
        title: "Portfolio System",
        tag: "PERSONAL PROJECT",
        year: "2025",
        description: "This portfolio — built with TanStack Start, React 19, Tailwind v4, and Framer Motion. Designed and developed solo.",
        highlights: ["TanStack Start", "React 19 + SSR", "Tailwind v4", "Framer Motion"]
      },
      {
        title: "Startup Concepts",
        tag: "PROTOTYPES",
        year: "2024",
        description: "Multiple product prototypes for startup ideas — from ideation and design to clickable prototype to MVP code.",
        highlights: ["Rapid prototyping", "MVP builds", "AI-paired", "Multiple concepts"]
      }
    ]
  },
  {
    id: "startup",
    label: "Entrepreneurship",
    category: "ZERO TO ONE",
    title: "Ventures",
    image: startupImg,
    accent: "oklch(0.82 0.15 50)",
    tagline: "Building businesses from identified gap to first paying customer.",
    description: "I've started companies, acquired clients, and delivered across multiple countries. I know what it takes to build something from nothing — with limited resources and high stakes.",
    skills: [
      "Startup Building",
      "Business Development",
      "Product Strategy",
      "Leadership",
      "Client Management",
      "Pitching",
      "Problem Solving"
    ],
    valuePoints: [
      "Build businesses from identified gap to first paying customer",
      "Make strategic decisions under real resource constraints and still ship",
      "Navigate the full product journey: idea → design → build → sell → deliver",
      "Understand what founders actually need — because I've been one"
    ],
    tools: [
      { name: "NOTION", bg: "#000000", label: "N", color: "#ffffff" },
      { name: "LINEAR", bg: "#5e6ad2", label: "Ln", color: "#ffffff" },
      { name: "FIGMA", bg: "#1e1e1e", label: "Fg", color: "#a259ff" },
      { name: "STRIPE", bg: "#635bff", label: "St", color: "#ffffff" },
      { name: "OPENAI", bg: "#10a37f", label: "AI", color: "#ffffff" },
      { name: "SLACK", bg: "#4a154b", label: "Sl", color: "#ffffff" }
    ],
    projects: [
      {
        title: "Next Step Digital",
        tag: "FOUNDER",
        year: "2023 — Present",
        description: "Founded a digital marketing agency serving overseas education consultancies. Multiple active clients, recurring revenue.",
        highlights: ["Founder", "Multiple clients", "Recurring revenue", "2023 — Present"],
        caseStudyId: "nextstep"
      },
      {
        title: "Dreamfly",
        tag: "CO-FOUNDER",
        year: "2024 — 2025",
        description: "Co-built an overseas education platform connecting Pakistani students with international university opportunities.",
        highlights: ["EdTech startup", "Co-founded", "Pakistan market", "Platform"],
        caseStudyId: "dreamfly"
      },
      {
        title: "Skillful DG Khan",
        tag: "CO-FOUNDER",
        year: "2023",
        description: "Co-founded a skills training initiative in DG Khan, Pakistan — connecting local talent with digital work opportunities.",
        highlights: ["Community impact", "Skills training", "Pakistan", "Co-founded"]
      }
    ]
  }
];
const CASE_STUDIES = [
  {
    id: "oliverlott",
    title: "OliverLott IT Development",
    tag: "BRANDING & MARKETING",
    context: "WERKSTUDENT · EBERSTADT, DARMSTADT",
    year: "Oct 2024 — Apr 2026",
    role: "Branding Designer & LinkedIn Marketing Manager",
    image: designerImg,
    coverImage: coverOliverlott,
    screens: [csOliverlott1, csOliverlott2, csOliverlott3, csOliverlott4, csOliverlott5],
    accent: "oklch(0.85 0.15 30)",
    challenge: "OliverLott IT Development — a Cloud, DevOps, and SecOps company based in Eberstadt, Darmstadt — had the technical expertise but no visible brand presence. Without a recognisable identity, a website, or a consistent marketing voice, they were invisible to the German enterprise market. The problem wasn't capability — it was visibility. They needed a brand that could speak before anyone picked up the phone.",
    actionsToken: [
      "Joined as a working student (Werkstudent) from October 2024, embedded in the team at their Eberstadt office in Darmstadt",
      "Built the complete brand identity from zero: logo system, color palette, typography, and icon language reflecting their three core areas — Backend, DevOps, and Administration",
      "Designed and developed the company website oliverlott.de — from layout and copy structure to visual design and responsiveness",
      "Took office photography to create authentic, professional visual content for the brand and social media",
      "Managed and grew their LinkedIn presence: wrote and published regular posts, designed content templates, and established a consistent brand voice for the German IT market",
      "Launched and managed the company newsletter 'IT Systems & Trends' — writing and publishing biweekly issues that reached 150+ subscribers",
      "Designed marketing materials including pitch decks, social media templates, and campaign visuals tailored to the German B2B audience",
      "Gained hands-on experience in German market marketing strategies — tone, positioning, and B2B communication standards"
    ],
    outcome: "OliverLott went from no online presence to a fully functioning brand with a live website, active LinkedIn channel, and a biweekly newsletter with 150+ subscribers. The identity I built — logo, visual system, and content framework — is what Oliver Lott publicly launched at the start of 2025. The client's own words: 'Vielen Dank an Nadeem Saif für die exzellente kreative Begleitung und die Umsetzung.'",
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva", "PowerPoint", "LinkedIn", "Webflow / HTML"],
    skillsDemonstrated: ["Brand Identity", "Logo Design", "Web Design", "LinkedIn Marketing", "Content Strategy", "Newsletter Management", "Photography", "German B2B Marketing"],
    highlights: ["Werkstudent · 18 months", "Website oliverlott.de", "150+ newsletter subscribers", "Darmstadt, Germany"],
    testimonial: {
      name: "Oliver Lott",
      title: "Cloud- & DevOps-Architektur aus Darmstadt · Oliver Lott IT Development",
      quote: "2025 beginnt für mich mit der Präsentation meines neuen Brandings und Logos. An erster Stelle geht viel Dank an Nadeem Saif für die exzellente kreative Begleitung und die Umsetzung. Danke Nadeem dafür! 😊",
      highlightName: "Nadeem Saif",
      postUrl: "https://www.linkedin.com/posts/oliver-lott-it-development_2025-stellt-oliver-lott-it-development-mit-activity-7280191944322945024-GPcL?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJp5dkBYZ_a6crwcUEeQ4reoxHfgF4vbRk",
      date: "Jan 2025"
    },
    newsletter: {
      name: "IT Systems & Trends",
      description: "Biweekly insights on Cloud, DevOps, and SecOps by Oliver Lott IT Development — content strategy and writing by Nadeem Saif.",
      subscribers: 150,
      frequency: "Published biweekly",
      url: "https://www.linkedin.com/newsletters/7392177052684070912/"
    }
  },
  {
    id: "livingroom",
    title: "Livingroom Apartments",
    tag: "CONTENT + MARKETING",
    context: "FREELANCE · CLIENT",
    year: "2023 — 2024",
    role: "Content Creator & Marketing Designer",
    image: creatorImg,
    coverImage: coverLivingroom,
    accent: "oklch(0.82 0.14 80)",
    challenge: "A furnished apartment brand targeting international professionals in Germany had no consistent content presence. Potential tenants were searching online but finding nothing that built trust or showed the quality of the space.",
    actionsToken: [
      "Mapped the tenant journey from search to move-in to identify content moments that build trust at each stage",
      "Planned and executed 3 lifestyle photography sessions across the property — focused on warmth and comfort",
      "Produced 10+ short-form video reels for Instagram and LinkedIn targeting international professionals",
      "Designed seasonal campaign assets: story templates, post formats, and promotional banners",
      "Built a content calendar and managed publishing schedule across two platforms",
      "Created a reusable visual template system so the client could continue producing content independently"
    ],
    outcome: "Consistent social media presence established with a clear visual identity. Content successfully positioned the brand as the premium, trusted choice for international professionals relocating to Germany. Ongoing content partnership extended beyond the initial engagement.",
    tools: ["Premiere Pro", "Lightroom", "Adobe Photoshop", "Canva", "CapCut"],
    skillsDemonstrated: ["Content Strategy", "Photography", "Video Production", "Short-form Video", "Social Media Management", "Campaign Design", "Brand Storytelling"],
    highlights: ["Lifestyle photography", "Short-form video", "Social campaigns", "International audience"],
    instagramProof: {
      profileScreen: csLivingroomInsta,
      reels: [
        { thumbnail: csLivingroomReel1, views: "12.4K", likes: "847" },
        { thumbnail: csLivingroomReel2, views: "8.1K", likes: "612" }
      ],
      btsPhotos: [csLivingroomBts1, csLivingroomBts2]
    }
  },
  {
    id: "dreamfly",
    title: "Dreamfly Finance Platform",
    tag: "WEB APP · VIBE CODING",
    context: "FOUNDER · PERSONAL STARTUP",
    year: "2024 — 2025",
    role: "Founder, Product Designer & Developer",
    image: coderImg,
    coverImage: coverDreamfly,
    accent: "oklch(0.8 0.18 240)",
    challenge: "Running a startup with a small team exposed a painful financial blind spot: transaction reports never came on time. Partners and managers were expected to log expenses and income into a shared Excel sheet — but it was tedious, error-prone, and always delayed. Someone always needed to chase someone else. At month-end, reconciling everything took hours. The real cost wasn't money — it was lost trust and distraction from actual business. We needed an extra person just to manage a spreadsheet. I decided to build the tool instead.",
    actionsToken: [
      "Identified the core bottleneck: manual Excel entry was the single point of failure for team financial visibility",
      "Designed the full product architecture — role-based access for partners, managers, and admins — each with a personalised dashboard showing their own share, withdrawals, and transaction history",
      "Built the entire web app solo using AI-assisted development (vibe coding) — React, Next.js, Supabase, Tailwind CSS, TypeScript",
      "Built a real-time transaction entry system: any team member or manager can log a payment or expense from their phone the moment it happens",
      "Developed automatic cash flow tracking: incoming vs. outgoing, company asset balance, and partner equity — all updated live without manual input",
      "Implemented a monthly audit report generator — on the last day of the month, a full financial summary exports automatically, no accountant or extra hire needed",
      "Added role-separated partner dashboards: each partner sees only their share, withdrawals, and position — no spreadsheet, no confusion",
      "Shipped a fully functional production app used daily by the real team — not a prototype, a live internal tool solving a live business problem"
    ],
    outcome: "The platform eliminated the need for a dedicated finance admin entirely. Transaction reporting went from a weekly chase to a real-time feed. Partners stopped asking each other for updates — the dashboard answered everything. Month-end audit now takes minutes, not hours. Built solo, shipped to production, used daily. This was not a portfolio exercise — it was a real problem in a real company, solved by building the product myself.",
    tools: ["React", "Next.js", "Supabase", "Tailwind CSS", "TypeScript", "Figma", "Vercel"],
    skillsDemonstrated: ["Product Thinking", "Full-Stack Development", "UI/UX Design", "Supabase Auth & DB", "AI-Assisted Development", "System Architecture", "Business Problem Solving"],
    highlights: ["Live production app", "Zero extra hire needed", "Real-time audit reports", "Solo built & shipped"],
    screens: [csDreamfly1, csDreamfly2, csDreamfly3, csDreamfly4, csDreamfly5]
  },
  {
    id: "wisag",
    title: "WISAG Challenge",
    tag: "UX/UI DESIGN",
    context: "DESIGN COMPETITION · GERMANY",
    year: "2024",
    role: "UX/UI Designer",
    achievement: "1st Place",
    image: aiImg,
    coverImage: coverWisag,
    featuredScreen: csWisag1,
    platformUrl: "wisagpilot.app",
    platformCaption: "WISAGpilot · AI-Powered Financial Co-Pilot · Built in 32 hours",
    screens: [csWisag2, csWisag3, csWisag4, csWisag5, void 0],
    accent: "oklch(0.75 0.18 280)",
    challenge: "Building WISAG Pilot — an AI-powered Financial Co-Pilot that detects, explains and predicts Contribution Margin developments based on financial and operational data. The idea was simple but powerful: managers shouldn't just see that their margin dropped. They should understand why, and know exactly what to do about it.",
    actionsToken: [
      "Researched WISAG's existing operations and interviewed facility managers to identify the critical workflow breakdowns",
      "Built 3 user personas: a field worker, a team supervisor, and an operations manager — each with distinct needs",
      "Mapped end-to-end journeys for task assignment, issue reporting, and shift handover",
      "Designed information architecture optimised for one-handed mobile use in field environments",
      "Built an interactive Figma prototype with task flows, real-time notifications, and team status views",
      "Presented the solution to a jury of WISAG executives — won 1st Place in the national challenge"
    ],
    outcome: "The solution secured 1st Place by demonstrating how complex business data could be transformed into clear, actionable insights for decision-makers. The intuitive UX/UI approach enabled managers to compare key variables, identify trends, and make informed decisions faster without relying on technical specialists.",
    tools: ["Figma", "FigJam", "Notion", "Miro"],
    skillsDemonstrated: ["UX Research", "Persona Development", "Journey Mapping", "Information Architecture", "Mobile UI Design", "Figma Prototyping", "Stakeholder Presentation"],
    highlights: ["1st Place — Germany", "Mobile-first UX", "10k+ employee scope", "Enterprise pitch"]
  },
  {
    id: "kenergy",
    title: "Kenergy Challenge",
    tag: "PRODUCT STRATEGY",
    context: "DESIGN COMPETITION · GERMANY",
    year: "2024",
    role: "Designer & Product Strategist",
    achievement: "1st Place + Community Favorite",
    image: startupImg,
    coverImage: coverKenergy,
    featuredScreen: csKenergy1,
    platformUrl: "kenwatt.app",
    platformCaption: "Kenwatt · AI Energy Consultant · Built in 32 hours",
    screens: [csKenergy2, csKenergy3, csKenergy4, csKenergy5, void 0],
    accent: "oklch(0.82 0.15 50)",
    challenge: "Kenergy Solutions GmbH posed one question: how do you give anyone a personal plan to make their home energy efficient — no expert, no big budget? In 32 hours, we built Kenwatt — an AI energy consultant that turns a few simple questions into a personalised report: your home's rating, where money is leaking, and what to fix first. It works for renters and owners alike, estimates solar potential, simulates upgrade impact, and explains everything through Ken — a friendly mascot that makes energy decisions feel simple.",
    actionsToken: [
      "Researched behavioural economics literature on energy consumption, habit formation, and motivation design",
      "Identified 3 key behavioural levers: loss aversion (spending vs. saving framing), social proof (neighbourhood benchmarks), and progress momentum (visible streak and milestone systems)",
      "Designed a gamified challenge system with shared neighbourhood goals and a community leaderboard",
      "Created personalised savings recommendation logic based on usage history and household size",
      "Built the complete Figma prototype: onboarding, dashboard, social features, and reward system",
      "Delivered a competitive pitch to the Kenergy jury — won both the jury award and the community vote"
    ],
    outcome: "The only team in the competition to win both the jury's 1st Place and the Community Favorite Award — two separate evaluations. Judges specifically noted the combination of behavioural design rigour and business viability. The community vote signals that the concept resonated not just with experts, but with actual users.",
    tools: ["Figma", "FigJam", "Notion", "Whimsical"],
    skillsDemonstrated: ["Behavioral Design", "Gamification Strategy", "Product Strategy", "UX Research", "UI Design", "Competitive Pitching", "Sustainability Design"],
    highlights: ["1st Place + Comm. Fav", "Dual award winner", "Behavioral design", "Kenergy · Germany"]
  },
  {
    id: "nextstep",
    title: "Next Step Digital & Studio",
    tag: "ENTREPRENEURSHIP",
    context: "FOUNDED AGENCY · 6 YEARS",
    year: "2019 — Present",
    role: "Founder & Creative Director",
    image: marketerImg,
    coverImage: coverNextstep,
    accent: "oklch(0.8 0.18 330)",
    challenge: "What began as NS Production — a small creative studio producing ads for local clients — grew over six years into Next Step Digital & Studio: a full-service agency with a physical office, a working team, and a roster of national and international clients across branding, digital marketing, content production, and paid media. The evolution wasn't planned — it was built one client, one result, and one iteration at a time.",
    actionsToken: [
      "Started as NS Production — creating video ads and promotional content for businesses that needed visibility but didn't know how to get it",
      "Recognised that clients needed more than production: they needed strategy, consistency, and results — evolved the offering into NS Digital, a full digital marketing service",
      "Rebranded and expanded into Next Step Digital & Studio — a complete agency covering brand identity, social media, content, paid ads, and creative production",
      "Opened a physical office and built a team — hired, trained, and structured people around a delivery system that could handle multiple clients simultaneously",
      "Personally supervise every project: no deliverable goes out without my review — quality control is not delegated",
      "Built long-term client relationships across Pakistan and internationally — several clients have been with the agency for multiple years, returning because of results, not habit",
      "Acquired national and international clients across sectors: cargo, food, education, consulting, professional services, and more",
      "Developed repeatable creative workflows and campaign systems that allow the team to produce consistently without burning out or losing quality",
      "Managed the business alongside my own postgraduate education in Germany — running operations remotely while staying embedded in delivery"
    ],
    outcome: "Six years in, Next Step Digital & Studio is a running business — with a team, an office, and a client roster that spans national and international brands across multiple industries. Clients don't stay for years because of promises. They stay because the work delivers. I built this from a one-person ad studio to a structured agency, and I still personally supervise every project that goes out. This was not a side hustle — it is a business I built from zero.",
    tools: ["Figma", "Adobe Suite", "Meta Ads Manager", "Google Ads", "Canva", "Premiere Pro", "Notion", "LinkedIn"],
    skillsDemonstrated: ["Agency Building", "Team Leadership", "Brand Design", "Campaign Strategy", "Client Management", "Paid Advertising", "Content Production", "Creative Direction"],
    highlights: ["6 years running", "Team + office", "National & international clients", "Personally supervised"],
    screens: [csNextstep1, csNextstep2, csNextstep3, csNextstep4, csNextstep5],
    clientGallery: [
      { name: "Arascow", slug: "arascow", images: [nsArascow1, nsArascow2, nsArascow3, nsArascow4, nsArascow5, nsArascow6, nsArascow7, nsArascow8] },
      { name: "BCL", slug: "bcl", images: [nsBcl1, nsBcl2, nsBcl3, nsBcl4, nsBcl5, nsBcl6] },
      { name: "Potential Wecker", slug: "potentialwecker", images: [nsPotentialwecker1, nsPotentialwecker2, nsPotentialwecker3, nsPotentialwecker4, nsPotentialwecker5, nsPotentialwecker6, nsPotentialwecker7, nsPotentialwecker8] },
      { name: "Ednex", slug: "ednex", images: [nsEdnex1, nsEdnex2, nsEdnex3, nsEdnex4, nsEdnex5, nsEdnex6, nsEdnex7] },
      { name: "Mousa Albargi Cargo", slug: "mousamargi", images: [nsMousamargi1, nsMousamargi2, nsMousamargi3, nsMousamargi4, nsMousamargi5, nsMousamargi6] },
      { name: "Pak World Honey", slug: "pakworldhoney", images: [nsPakworldhoney1, nsPakworldhoney2, nsPakworldhoney3, nsPakworldhoney4, nsPakworldhoney5, nsPakworldhoney6, nsPakworldhoney7] }
    ]
  },
  {
    id: "dreamfly-consultancy",
    title: "Dreamfly Education Consultancy",
    tag: "EDTECH · CO-FOUNDED STARTUP",
    context: "CO-FOUNDED STARTUP · PAKISTAN",
    year: "2024 — Present",
    role: "Co-Founder & Creative Director",
    image: startupImg,
    coverImage: coverDreamflyConsultancy,
    accent: "oklch(0.72 0.19 210)",
    challenge: "Growing up in DG Khan, Pakistan, the path to studying abroad was buried in misinformation, unreliable agents, and zero guidance for students from smaller cities. Most families had no idea where to start, who to trust, or what was actually possible. My co-founder and I had both navigated this journey ourselves — and we knew the gap wasn't just real, it was fixable. We founded Dreamfly to become the guide we never had: honest, structured, and built around actual student outcomes.",
    actionsToken: [
      "Co-founded Dreamfly with a close friend as a dedicated overseas education consultancy for students in DG Khan and surrounding areas",
      "Set up a physical office and recruited a team of trained counsellors to handle student enquiries, documentation, and university applications end-to-end",
      "Designed the full brand identity — logo, visual language, social media system, and all client-facing materials",
      "Built and executed marketing campaigns across Meta, Instagram, and WhatsApp to reach students and their families in the target cities",
      "Organised awareness events where students could meet the team, ask questions, and hear directly from successful alumni who had gone abroad",
      "Documented and published student success stories — real faces, real visas, real countries — to build social proof and community trust",
      "Developed a content engine that kept Dreamfly visible, credible, and approachable on social media throughout the year",
      "Positioned Dreamfly as the leading consultancy in the region — through results, not just marketing"
    ],
    outcome: "Dreamfly is now a recognised consultancy with a physical office, a team of counsellors, and a growing list of students who have successfully received visas and gone on to study in Germany, the UK, and beyond. Success stories — real students from the same towns and communities — are the core of the brand's credibility. The business continues to grow through word of mouth, events, and active digital marketing. We didn't just build a consultancy. We built a path.",
    tools: ["Figma", "Canva", "Meta Ads Manager", "Instagram", "Premiere Pro", "WhatsApp Business", "Notion"],
    skillsDemonstrated: ["Startup Co-founding", "Brand Design", "Campaign Strategy", "Event Management", "Content Creation", "Community Building", "Social Media Marketing", "Student Counselling Systems"],
    highlights: ["Co-founded 2024", "Office + team", "Verified visa successes", "Leading consultancy · DG Khan"],
    screens: [csDfc1, csDfc2, csDfc3, csDfc4, csDfc5],
    eventGallery: [dfcEvent1, dfcEvent2, dfcEvent3, dfcEvent4, dfcEvent5, dfcEvent6, dfcEvent7, dfcEvent8, dfcEvent9],
    successStories: [
      { image: dfcSuccess1, caption: "Visa Approved ✓" },
      { image: dfcSuccess2, caption: "Visa Approved ✓" },
      { image: dfcSuccess3, caption: "Visa Approved ✓" },
      { image: dfcSuccess4, caption: "Visa Approved ✓" },
      { image: dfcSuccess5, caption: "Visa Approved ✓" },
      { image: dfcSuccess6, caption: "Visa Approved ✓" },
      { image: dfcSuccess7, caption: "Visa Approved ✓" },
      { image: dfcSuccess8, caption: "Visa Approved ✓" },
      { image: dfcSuccess9, caption: "Visa Approved ✓" },
      { image: dfcSuccess10, caption: "Visa Approved ✓" },
      { image: dfcSuccess11, caption: "Visa Approved ✓" },
      { image: dfcSuccess12, caption: "Visa Approved ✓" },
      { image: dfcSuccess13, caption: "Visa Approved ✓" }
    ],
    campaignGallery: [dfcCampaign1, dfcCampaign2, dfcCampaign3, dfcCampaign4, dfcCampaign5, dfcCampaign6, dfcCampaign7]
  }
];
const JOURNEY = [
  {
    era: "Pakistan",
    title: "Where it began",
    description: "Grew up in Pakistan with a deep curiosity for film, media, and visual storytelling. Studied Film & Television — learning to think in frames, sequences, and narrative from day one."
  },
  {
    era: "Media Production",
    title: "First creative chapter",
    description: "Produced film projects, short documentaries, and media content. Developed a strong eye for composition, narrative structure, and visual communication that still shapes everything I make."
  },
  {
    era: "Creative Industry",
    title: "Building real things",
    description: "Took on brand and design projects for real clients. Discovered the intersection of aesthetics and business strategy — and that the best design solves a problem."
  },
  {
    era: "Germany",
    title: "International move",
    description: "Relocated to Germany as an international student. Enrolled in Media, Technology and Society at postgraduate level. Adapted fast. Built faster."
  },
  {
    era: "Branding & Marketing",
    title: "Systems over aesthetics",
    description: "Led brand and marketing projects for German companies across IT, real estate, and consulting. Learned that design without strategy is just decoration."
  },
  {
    era: "Startups",
    title: "Founder mindset",
    description: "Founded Next Step Digital. Co-built Dreamfly and Skillful. Learned to own every layer of a product — from idea to client delivery — with limited resources and high stakes."
  },
  {
    era: "Product Design",
    title: "Design that works",
    description: "Won the WISAG Design Challenge and Kenergy Challenge — back to back. Started thinking about design not as screens, but as systems of behaviour and decision."
  },
  {
    era: "Today",
    title: "AI-Assisted Builder",
    description: "Building products, brands, and campaigns at the intersection of design, technology, and storytelling. Using AI as a collaborator. Always shipping."
  }
];
const WHY_ME = [
  {
    statement: "Most professionals specialize in one area. I connect five.",
    explanation: "Business problem → Brand → Marketing → Product → Code. This is the complete creative arc. Most companies need 4–5 people to cover it. I contribute across the whole journey — and the connections between disciplines are where the real value is created."
  },
  {
    statement: "I've competed against specialists — and won.",
    explanation: "WISAG and Kenergy both selected my work over dedicated design teams in national competitions. I don't win on breadth. I win by solving the right problem more completely than someone working in a single lane."
  },
  {
    statement: "I've worked in the German market for two years.",
    explanation: "IT, real estate, consulting — I understand precision, directness, and what builds trust in a German B2B context. International perspective, German professional standards."
  },
  {
    statement: "I ship products. Not presentations.",
    explanation: "The Finance Dashboard exists as deployed code. This portfolio is a production application with SSR. Next Step Digital has paying clients. I measure success by what gets done — not what gets designed."
  },
  {
    statement: "My Film & TV background is a design advantage.",
    explanation: "Narrative, composition, and emotional timing — skills most designers don't have. That perspective shapes every brand, every campaign, and every product. Storytelling is structure."
  },
  {
    statement: "I understand the brief and the business behind it.",
    explanation: "I've been the client, the designer, and the founder simultaneously. That context changes how I prioritize, communicate, and define 'done' — every single time."
  }
];
const ACHIEVEMENTS = [
  {
    value: "2+",
    label: "Years in Germany",
    description: "Working with German companies across IT, real estate, and marketing"
  },
  {
    value: "6",
    label: "Industries",
    description: "Branding, Marketing, Content, UX/UI, Web Dev, and Startups"
  },
  {
    value: "×2",
    label: "Design Challenge Winner",
    description: "1st Place at WISAG Challenge and Kenergy Design Challenge"
  },
  {
    value: "3",
    label: "Ventures Founded",
    description: "Next Step Digital, Dreamfly, and Skillful DG Khan"
  }
];
const AWARDS = [
  {
    title: "WISAG Design Challenge",
    result: "1st Place",
    year: "2024",
    description: "National design competition for WISAG, one of Germany's largest facility management companies. Designed a mobile-first internal tool for 10,000+ field employees."
  },
  {
    title: "Kenergy Design Challenge",
    result: "1st Place + Community Favorite",
    year: "2024",
    description: "The only team to win both the jury award and the community vote. Designed a behavioural energy-saving platform that turned sustainability into a social challenge."
  }
];
const WORKFLOW = [
  {
    stage: "01",
    label: "Idea",
    description: "Market gap identified. Problem defined. Direction chosen.",
    discipline: "Entrepreneurship"
  },
  {
    stage: "02",
    label: "Strategy",
    description: "Audience mapped. Positioning decided. Messaging clarified.",
    discipline: "Marketing"
  },
  {
    stage: "03",
    label: "Design",
    description: "Identity built. Interface created. System established.",
    discipline: "Brand & UX"
  },
  {
    stage: "04",
    label: "Content",
    description: "Stories told. Presence built. Attention earned.",
    discipline: "Content & Media"
  },
  {
    stage: "05",
    label: "Product",
    description: "Code written. Product shipped. Experience live.",
    discipline: "Web & AI Dev"
  },
  {
    stage: "06",
    label: "Growth",
    description: "Campaigns launched. Audience scaled. Revenue built.",
    discipline: "Marketing & Growth"
  }
];
const PUBLIC_BUILDS = [
  {
    year: "2023",
    title: "Next Step Digital",
    type: "FOUNDED AGENCY",
    result: "3+ retainer clients, recurring revenue — still running"
  },
  {
    year: "2023",
    title: "Skillful DG Khan",
    type: "CO-FOUNDED",
    result: "Skills training connecting local talent to digital work opportunities"
  },
  {
    year: "2024",
    title: "Livingroom Apartments",
    type: "FREELANCE · CONTENT + MARKETING",
    result: "Full content system delivered, ongoing partnership"
  },
  {
    year: "2024",
    title: "OliverLott",
    type: "FREELANCE · BRAND DESIGN",
    result: "Complete brand identity delivered and actively in use"
  },
  {
    year: "2024",
    title: "Finance Dashboard",
    type: "PRODUCT BUILT",
    result: "Full-stack MVP shipped solo — design to deployed code"
  },
  {
    year: "2024",
    title: "WISAG Challenge",
    type: "DESIGN COMPETITION",
    result: "1st Place — national UX challenge, Germany"
  },
  {
    year: "2024",
    title: "Kenergy Challenge",
    type: "DESIGN COMPETITION",
    result: "1st Place + Community Favorite — only team to win both"
  },
  {
    year: "2025",
    title: "Dreamfly Platform",
    type: "CO-FOUNDED + BUILT",
    result: "Overseas education SaaS, designed and developed end-to-end"
  },
  {
    year: "2025",
    title: "This Portfolio",
    type: "PERSONAL PROJECT",
    result: "Production site: TanStack Start, React 19, SSR, Framer Motion"
  }
];
const $$splitComponentImporter$1 = () => import("./index-BoqBOJvO.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: `${PERSONAL.name} — ${PERSONAL.title}`
    }, {
      name: "description",
      content: PERSONAL.description
    }, {
      name: "author",
      content: PERSONAL.name
    }, {
      property: "og:title",
      content: `${PERSONAL.name} — ${PERSONAL.title}`
    }, {
      property: "og:description",
      content: PERSONAL.description
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:url",
      content: "https://www.nadeemsaif.com/"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      name: "twitter:title",
      content: `${PERSONAL.name} — ${PERSONAL.title}`
    }, {
      name: "twitter:description",
      content: PERSONAL.description
    }],
    links: [{
      rel: "canonical",
      href: "https://www.nadeemsaif.com/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitNotFoundComponentImporter = () => import("./work._modeId-CFnVPZzV.mjs");
const $$splitComponentImporter = () => import("./work._modeId-DsxElph0.mjs");
const Route = createFileRoute("/work/$modeId")({
  loader: ({
    params
  }) => {
    const mode = MODES.find((m) => m.id === params.modeId);
    if (!mode) {
      console.error("Project not found. Invalid modeId:", params.modeId);
      throw notFound();
    }
    return {
      mode
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) return {};
    const {
      mode
    } = loaderData;
    const url = `https://www.nadeemsaif.com/work/${mode.id}`;
    return {
      meta: [{
        title: `${mode.label} — Nadeem Saif`
      }, {
        name: "description",
        content: mode.description
      }, {
        name: "author",
        content: "Nadeem Saif"
      }, {
        property: "og:title",
        content: `${mode.label} — Nadeem Saif`
      }, {
        property: "og:description",
        content: mode.description
      }, {
        property: "og:type",
        content: "website"
      }, {
        property: "og:url",
        content: url
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: `${mode.label} — Nadeem Saif`
      }, {
        name: "twitter:description",
        content: mode.tagline
      }],
      links: [{
        rel: "canonical",
        href: url
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const WorkModeIdRoute = Route.update({
  id: "/work/$modeId",
  path: "/work/$modeId",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  WorkModeIdRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ACHIEVEMENTS as A,
  CASE_STUDIES as C,
  JOURNEY as J,
  MODES as M,
  PERSONAL as P,
  Route as R,
  WHY_ME as W,
  AWARDS as a,
  WORKFLOW as b,
  PUBLIC_BUILDS as c,
  router as r
};
