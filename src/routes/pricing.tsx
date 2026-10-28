import { createFileRoute } from "@tanstack/react-router";

import { PricingPage } from "@/components/pricing/PricingPage";

/* Hidden page: not linked anywhere and not in the sitemap. noindex is set
   here (not in robots.txt) so crawlers can still read it. */
const TITLE = "Pricing · Nadeem Saif × capture21";
const DESCRIPTION =
  "Build your social media package with Nadeem Saif and capture21. See the price instantly and download your personal proposal as a PDF.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#f5f5f7" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://www.nadeemsaif.com/pricing" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: PricingPage,
});
