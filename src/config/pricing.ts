/*
  Pricing configurator settings for the hidden /pricing page
  (Nadeem Saif × capture21 social media packages).

  Change prices and settings HERE only. The page, the PDF proposal and the
  lead email all read from this file.

  - All prices are NET (without VAT), in euros.
  - Keys like "fb", "stories" or "setup" are also used to look up their
    texts in src/components/pricing/i18n.ts. If you ADD a new platform,
    service or one-time item, add its English + German texts there too
    (e.g. sv_<key> and sv_<key>_d). Changing a price needs no text change.
*/

/* ── Contact details (shown in the PDF and the "send it to us" hint) ── */
export const CONTACT = {
  name: "Nadeem Saif",
  website: "nadeemsaif.com",
  email: "nsaif092@gmail.com",
  phone: "", // e.g. "+49 151 …". Empty = not shown
  partner: "capture21",
  partnerPerson: "Philipp Schäfer",
  partnerWebsite: "capture21.de",
  partnerPlace: "Dreieich · Frankfurt am Main",
};

/* ── Lead email (Web3Forms) ──
   Every PDF download sends you the client's details + package by email.
   The access key comes from the env variable VITE_WEB3FORMS_KEY (see
   .env.example; on Vercel add it under Project → Settings → Environment
   Variables and redeploy). No key = no email is sent and the email field
   becomes optional. */
export const LEADS = {
  web3formsKey: (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined)?.trim() ?? "",
  endpoint: "https://api.web3forms.com/submit",
  fromName: "nadeemsaif.com · Packages",
  requireEmail: true, // only applies while a key is set
  privacyUrl: "", // e.g. "/datenschutz". Empty = no link under the form
};

/* ── Prices & rules ── */
export type VatMode = "standard" | "none";

export const PRICING = {
  // "standard" = net prices plus VAT (Regelbesteuerung).
  // "none" = Kleinunternehmer, no VAT charged (§ 19 UStG).
  vatMode: "standard" as VatMode,
  vatRate: 0.19,

  // Days the PDF proposal is valid
  validDays: 30,

  // Photo & video sessions with capture21 (on-site recording and shoot)
  shoot: {
    price: 229, // per session
    max: 4, // max sessions per month (minimum is always 0)
  },

  // Posts per month
  post: {
    price: 65, // base price per post (before format surcharge and volume discount)
    min: 2,
    max: 20,
    quickPicks: [4, 8, 12, 16], // shortcut chips next to the stepper
    // Volume discount per post: from `from` posts on, every post gets `discount` off.
    // The highest matching tier wins. The discounted post price is rounded to cents.
    tiers: [
      { from: 8, discount: 0.05 },
      { from: 12, discount: 0.1 },
    ],
  },

  // Price change per post depending on the type of posts (+ surcharge / − reduction)
  formats: {
    mix: 0, // Reels & carousels
    photo: -15, // Images only
    reels: 20, // Reels only
  },

  // Extra platforms per month. Instagram is always included at no cost.
  platforms: {
    fb: 29, // Facebook
    tt: 59, // TikTok
    gb: 39, // Google Business Profile
  },

  // Extra monthly services
  services: {
    posting: 59, // Publishing & channel care
    stories: 69, // Stories
    community: 179, // Community management
    report: 39, // Monthly report
    ads: 189, // Ads management (ad budget not included)
  },

  // One-time services at the start
  once: {
    setup: 149, // Profile setup & optimisation
    workshop: 249, // Strategy session
  },

  // Contract length in months → discount on the monthly subtotal.
  // The discount is rounded to whole euros.
  terms: [
    { months: 1, discount: 0 },
    { months: 3, discount: 0.05 },
    { months: 6, discount: 0.08 },
    { months: 12, discount: 0.12 },
  ],
};

export type FormatKey = keyof typeof PRICING.formats;
export type PlatformKey = keyof typeof PRICING.platforms;
export type ServiceKey = keyof typeof PRICING.services;
export type OnceKey = keyof typeof PRICING.once;

/* ── Presets (the three cards at the top) ──
   A preset sets everything except the one-time services. */
export type Preset = {
  shoots: number;
  posts: number;
  format: FormatKey;
  platforms: Record<PlatformKey, boolean>;
  services: Record<ServiceKey, boolean>;
  term: number;
};

export const PRESETS = {
  start: {
    shoots: 1,
    posts: 4,
    format: "mix",
    platforms: { fb: true, tt: false, gb: false },
    services: { posting: true, stories: false, community: false, report: false, ads: false },
    term: 3,
  },
  grow: {
    shoots: 1,
    posts: 8,
    format: "mix",
    platforms: { fb: true, tt: true, gb: false },
    services: { posting: true, stories: true, community: false, report: true, ads: false },
    term: 6,
  },
  prem: {
    shoots: 2,
    posts: 12,
    format: "mix",
    platforms: { fb: true, tt: true, gb: true },
    services: { posting: true, stories: true, community: true, report: true, ads: true },
    term: 12,
  },
} satisfies Record<string, Preset>;

export type PresetKey = keyof typeof PRESETS;

// Preset loaded when the page opens and on "Reset"
export const DEFAULT_PRESET: PresetKey = "grow";
