/* Loaded with a dynamic import only when the visitor clicks "Download PDF
   proposal", so @react-pdf and the fonts never touch the initial page load. */
import { pdf } from "@react-pdf/renderer";
import { createElement } from "react";

import { createI18n, type Lang } from "../i18n";
import { calc, proposalFileName, type Client, type Selection } from "../model";
import { registerPdfFonts } from "./fonts";
import {
  ProposalDocument,
  type Density,
  type PageDensity,
  type PageProbe,
} from "./ProposalDocument";

/* Each render pass takes 1–2 s, so start page 2 at the density it will most
   likely need: table rows + goal length (measured across all package sizes,
   both languages). The overflow check below still corrects it if needed. */
function initialDensity(s: Selection, goal: string): Density {
  const c = calc(s);
  const rows = c.monthly.length + (c.disc ? 2 : 0) + (c.once.length ? c.once.length + 1 : 0);
  const goalLines = goal
    ? goal.split("\n").reduce((n, p) => n + Math.max(1, Math.ceil(p.length / 100)), 0)
    : 0;
  const score = rows + goalLines;
  return score >= 15 ? 2 : score >= 12 ? 1 : 0;
}

export async function createProposalPdf(lang: Lang, s: Selection, client: Client & { no: string }) {
  registerPdfFonts();
  const i = createI18n(lang);
  const now = new Date();
  const density: PageDensity = { p2: initialDensity(s, client.goal), p3: 0 };

  // Render; if a page spilled over onto a second sheet, tighten that page and
  // render again. Keeps the proposal at exactly four A4 pages for every package.
  for (let attempt = 0; ; attempt++) {
    const probe: PageProbe = {};
    const blob = await pdf(
      createElement(ProposalDocument, { i, s, client, now, density, probe }) as never,
    ).toBlob();
    const overflow = (id: "p2" | "p3") => (probe[id]?.size ?? 1) > 1;
    let changed = false;
    for (const id of ["p2", "p3"] as const) {
      if (overflow(id) && density[id] < 3) {
        density[id] = (density[id] + 1) as Density;
        changed = true;
      }
    }
    if (!changed || attempt >= 6) {
      if (import.meta.env.DEV) console.info("[proposal] passes", attempt + 1, "density", density);
      return { blob, fileName: proposalFileName(client, i) };
    }
  }
}
