import { Font } from "@react-pdf/renderer";

// Inter 4.1 (OFL), Latin + Latin Extended in ONE file per weight. Made from
// the inter-ui package's WOFF2 files (the PDF engine can't read WOFF2) with:
//   pyftsubset Inter-<Weight>.woff2 --flavor=woff --layout-features='*'
//     --unicodes="U+0000-024F,U+0259,U+02B0-02FF,U+0300-036F,U+1E00-1EFF,
//                 U+2000-206F,U+20A0-20CF,U+2100-214F,U+2190-21FF,U+2212,U+FEFF,U+FFFD"
import inter400 from "@/assets/Fonts/pdf/Inter-Regular.woff?url";
import inter400i from "@/assets/Fonts/pdf/Inter-Italic.woff?url";
import inter500 from "@/assets/Fonts/pdf/Inter-Medium.woff?url";
import inter600 from "@/assets/Fonts/pdf/Inter-SemiBold.woff?url";
import inter700 from "@/assets/Fonts/pdf/Inter-Bold.woff?url";
// Instrument Serif + Geist Mono: Latin incl. ä ö ü ß € (only fixed texts,
// plus the client's goal, which falls back to Inter Italic if needed)
import serif from "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff?url";
import mono400 from "@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff?url";
import mono500 from "@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff?url";

/* Embedded (and subset) into the PDF. One file per weight on purpose: the PDF
   engine caches fonts by PostScript name, so per-script fallback files of the
   same weight would overwrite each other and scramble text. */
let registered = false;

export function registerPdfFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: "Inter",
    fonts: [
      { src: inter400, fontWeight: 400 },
      { src: inter400i, fontWeight: 400, fontStyle: "italic" },
      { src: inter500, fontWeight: 500 },
      { src: inter600, fontWeight: 600 },
      { src: inter700, fontWeight: 700 },
    ],
  });
  Font.register({ family: "Serif", fonts: [{ src: serif, fontStyle: "italic" }] });
  Font.register({
    family: "Mono",
    fonts: [
      { src: mono400, fontWeight: 400 },
      { src: mono500, fontWeight: 500 },
    ],
  });

  // No automatic hyphenation. Very long words (e.g. compound company names)
  // may still break so they never run off the page.
  Font.registerHyphenationCallback((word) =>
    word.length > 22 ? (word.match(/.{1,12}/g) ?? [word]) : [word],
  );
}

/** True if Instrument Serif's Latin file covers every character of `text`. */
const SERIF_EXTRA = new Set([
  0x131, 0x152, 0x153, 0x2bb, 0x2bc, 0x2c6, 0x2da, 0x2dc, 0x20ac, 0x2122, 0x2212,
]);
export function serifCovers(text: string) {
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    if (cp > 0xff && !(cp >= 0x2000 && cp <= 0x206f) && !SERIF_EXTRA.has(cp)) return false;
  }
  return true;
}
