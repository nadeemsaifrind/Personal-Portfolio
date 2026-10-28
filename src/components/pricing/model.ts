import {
  DEFAULT_PRESET,
  PRESETS,
  PRICING,
  type FormatKey,
  type OnceKey,
  type PlatformKey,
  type PresetKey,
  type ServiceKey,
} from "@/config/pricing";
import type { I18n } from "./i18n";

export type Selection = {
  shoots: number;
  posts: number;
  format: FormatKey;
  platforms: Record<PlatformKey, boolean>;
  services: Record<ServiceKey, boolean>;
  once: Record<OnceKey, boolean>;
  term: number;
};

export type Client = { name: string; company: string; email: string; goal: string };

export const PLATFORM_KEYS = Object.keys(PRICING.platforms) as PlatformKey[];
export const SERVICE_KEYS = Object.keys(PRICING.services) as ServiceKey[];
export const ONCE_KEYS = Object.keys(PRICING.once) as OnceKey[];
export const FORMAT_KEYS = Object.keys(PRICING.formats) as FormatKey[];
export const PRESET_KEYS = Object.keys(PRESETS) as PresetKey[];

const noOnce = () =>
  Object.fromEntries(ONCE_KEYS.map((k) => [k, false])) as Record<OnceKey, boolean>;

export function fromPreset(key: PresetKey, once: Record<OnceKey, boolean> = noOnce()): Selection {
  const p = PRESETS[key];
  return {
    shoots: p.shoots,
    posts: p.posts,
    format: p.format as FormatKey,
    platforms: { ...p.platforms },
    services: { ...p.services },
    once: { ...once },
    term: p.term,
  };
}

export const defaultSelection = () => fromPreset(DEFAULT_PRESET);

export function matchPreset(s: Selection): PresetKey | null {
  for (const key of PRESET_KEYS) {
    const p = PRESETS[key];
    if (
      p.shoots === s.shoots &&
      p.posts === s.posts &&
      p.format === s.format &&
      p.term === s.term &&
      PLATFORM_KEYS.every((k) => p.platforms[k] === s.platforms[k]) &&
      SERVICE_KEYS.every((k) => p.services[k] === s.services[k])
    )
      return key;
  }
  return null;
}

export type Line =
  | { kind: "shoot"; n: number; v: number }
  | { kind: "posts"; n: number; unit: number; v: number }
  | { kind: "platform"; key: PlatformKey; v: number }
  | { kind: "service"; key: ServiceKey; v: number }
  | { kind: "once"; key: OnceKey; v: number };

export type Calc = ReturnType<typeof calc>;

/* Receipt maths in whole cents, so every shown total is exactly the sum of its
   lines: post price rounded to cents, contract discount to whole euros. */
const cents = (v: number) => Math.round(v * 100);

export function calc(s: Selection) {
  const tier = [...PRICING.post.tiers]
    .sort((a, b) => b.from - a.from)
    .find((t) => s.posts >= t.from);
  const tierPct = tier?.discount ?? 0;
  const unitCents = cents((PRICING.post.price + PRICING.formats[s.format]) * (1 - tierPct));
  const postUnit = unitCents / 100;

  const monthly: Line[] = [];
  if (s.shoots) monthly.push({ kind: "shoot", n: s.shoots, v: s.shoots * PRICING.shoot.price });
  monthly.push({ kind: "posts", n: s.posts, unit: postUnit, v: (s.posts * unitCents) / 100 });
  for (const key of PLATFORM_KEYS)
    if (s.platforms[key]) monthly.push({ kind: "platform", key, v: PRICING.platforms[key] });
  for (const key of SERVICE_KEYS)
    if (s.services[key]) monthly.push({ kind: "service", key, v: PRICING.services[key] });

  const subCents = monthly.reduce((a, l) => a + cents(l.v), 0);
  const termPct = PRICING.terms.find((t) => t.months === s.term)?.discount ?? 0;
  const disc = Math.round((subCents * termPct) / 100);
  const sub = subCents / 100;
  const month = (subCents - disc * 100) / 100;

  const once: Line[] = ONCE_KEYS.filter((k) => s.once[k]).map((key) => ({
    kind: "once",
    key,
    v: PRICING.once[key],
  }));
  const onceSum = once.reduce((a, l) => a + l.v, 0);

  return {
    monthly,
    sub,
    termPct,
    disc,
    month,
    once,
    onceSum,
    tierPct,
    postUnit,
    total: (cents(month) * s.term) / 100 + onceSum,
    perPost: month / s.posts,
  };
}

export const hasVat = () => PRICING.vatMode === "standard";

/** Label of one price line. */
export function lineLabel(line: Line, i: I18n) {
  switch (line.kind) {
    case "shoot":
      return i.t("l_shoot", { n: line.n });
    case "posts":
      return i.t("l_posts", { n: line.n, v: i.money(line.unit) });
    case "platform":
      return i.t(`pl_${line.key}`);
    case "service":
      return i.t(`sv_${line.key}`);
    case "once":
      return i.t(`on_${line.key}`);
  }
}

/** Instagram is always included, then the selected extra platforms. */
export function platformNames(s: Selection, i: I18n) {
  return [i.t("pl_ig"), ...PLATFORM_KEYS.filter((k) => s.platforms[k]).map((k) => i.t(`pl_${k}`))];
}

/** e.g. NS-261028-482 */
export function proposalNo(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `NS-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.floor(100 + Math.random() * 900)}`;
}

/** Proposal-NadeemSaif-capture21-Mueller-und-Soehne.pdf (umlauts spelled out, ß → ss). */
export function proposalFileName(client: Client, i: I18n) {
  const slug =
    (client.company || client.name)
      .replace(/ß/g, "ss")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/Ä/g, "Ae")
      .replace(/Ö/g, "Oe")
      .replace(/Ü/g, "Ue")
      .replace(/Æ/g, "Ae")
      .replace(/æ/g, "ae")
      .replace(/[ØŒ]/g, "Oe")
      .replace(/[øœ]/g, "oe")
      .replace(/Ł/g, "L")
      .replace(/ł/g, "l")
      .replace(/Đ/g, "D")
      .replace(/đ/g, "d")
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Za-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "Client";
  return `${i.t("file")}-NadeemSaif-capture21-${slug}.pdf`;
}

/** At most four lines of goal text, so a long list can't push the PDF past A4. */
export function tidyGoal(goal: string) {
  const lines = goal
    .split(/\n+/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return [...lines.slice(0, 3), lines.slice(3).join(" ")].filter(Boolean).join("\n");
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
