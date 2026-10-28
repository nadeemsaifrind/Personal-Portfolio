import { PRICING } from "@/config/pricing";

/* English / German texts for /pricing and the PDF proposal.
   {name} placeholders are filled in by t(). *Text in asterisks* is rendered
   as the Instrument Serif italic accent. */

export type Lang = "en" | "de";

const en = {
  back: "Portfolio",
  lang_label: "Language",
  h1: "Build your *social media* package.",
  lead: "Pick only what you need. The price updates instantly, with no hidden costs. When you are happy, download your personal proposal as a PDF.",
  presets_label: "Packages",
  p_start: "Start",
  p_start_d: "Be visible with little effort",
  p_grow: "Growth",
  p_grow_d: "More reach, more channels",
  p_prem: "Premium",
  p_prem_d: "We take care of everything",
  s_shoot: "Photo & video sessions",
  s_shoot_d: "On-site recording and shoot with capture21. This becomes your content for the month.",
  shoot_0: "No session. You send us your own photos and videos.",
  shoot_n: "{n}× per month on site",
  each: "{v} each",
  shoot_dec: "One session fewer",
  shoot_inc: "One session more",
  s_posts: "Posts per month",
  s_posts_d: "Includes planning, editing, retouching and captions.",
  posts_dec: "One post fewer",
  posts_inc: "One post more",
  per_week: "about {n} per week",
  tier_first: "−{p} % per post from {n} posts",
  tier_next: "−{p} % from {n} posts",
  tier_end: ".",
  s_format: "Type of posts",
  f_mix: "Reels & carousels",
  f_mix_d: "Best mix",
  f_photo: "Images only",
  f_photo_d: "{d} per post",
  f_reels: "Reels only",
  f_reels_d: "{d} per post",
  s_platforms: "Platforms",
  s_platforms_d: "Same content, adapted to each platform.",
  pl_ig: "Instagram",
  pl_fb: "Facebook",
  pl_tt: "TikTok",
  pl_gb: "Google Business Profile",
  pl_ig_d: "Always included",
  pl_fb_d: "Posts also on Facebook",
  pl_tt_d: "Reels in TikTok format with own captions",
  pl_gb_d: "Updates shown in Google Search and Maps",
  included: "included",
  mo: "/ month",
  once_lbl: "one-time",
  s_services: "Extra services",
  sv_posting: "Publishing & channel care",
  sv_posting_d: "We post at the best time. You do nothing.",
  sv_stories: "Stories",
  sv_stories_d: "8 stories per month, e.g. behind the scenes and offers.",
  sv_community: "Community management",
  sv_community_d: "Replies to comments and messages on weekdays.",
  sv_report: "Monthly report",
  sv_report_d: "Reach, new followers and what worked best.",
  sv_ads: "Ads management",
  sv_ads_d: "Setup and optimisation. You pay the ad budget directly to Meta.",
  s_once: "One-time services",
  on_setup: "Profile setup & optimisation",
  on_setup_d: "Profile picture, bio, highlights and links done professionally.",
  on_workshop: "Strategy session",
  on_workshop_d: "90 minutes: audience, topics and content plan.",
  s_term: "Contract length",
  s_term_d: "The longer, the lower the monthly price.",
  m1: "1 month",
  mN: "{n} months",
  months: "months",
  month: "month",
  flex: "Cancel monthly.",
  save: "−{p} %",
  sum: "Your package",
  net: "net",
  gross: "gross",
  vat_label: "Show prices",
  g_month: "Monthly",
  g_once: "One-time",
  l_shoot: "{n}× photo/video session",
  l_posts: "{n} posts × {v}",
  l_term: "Contract discount {p} %",
  per_month: "per month",
  plus_vat: "plus {r} % VAT = {v} gross",
  has_vat: "includes {v} VAT",
  no_vat: "No VAT charged (§ 19 UStG)",
  x_once: "One-time at start",
  x_term: "Total over {n}",
  x_post: "Price per post",
  get: "Get my proposal",
  reset: "Reset",
  legal: "Non-binding price overview. Ad budgets are not included.",
  biz: "Offer for businesses. Prices net plus {r} % VAT.",
  biz_none: "Offer for businesses. No VAT charged (§ 19 UStG).",
  f_title: "Your proposal",
  f_desc:
    "Add your details and we create a PDF proposal with your package. Nothing is sent to us until you get in touch.",
  f_desc_leads: "Add your details and we create a PDF proposal with your package.",
  f_name: "Your name",
  f_company: "Company",
  f_email: "Email",
  f_goal: "What do you want to achieve?",
  f_goal_ph: "e.g. more bookings for our apartment",
  optional: "optional",
  f_submit: "Download PDF proposal",
  f_busy: "Creating your PDF…",
  f_close: "Back to configurator",
  close: "Close",
  f_need_name: "Please enter your name.",
  f_need_email: "Please enter a valid email address.",
  f_err: "The PDF could not be created. Please reload the page and try again.",
  f_privacy:
    "When you download, your details and your selected package are sent to Nadeem Saif and capture21 so we can contact you about this proposal.",
  f_privacy_link: "Privacy policy",
  f_done: "Your proposal has been downloaded.",
  f_send: "Ready to start? Send it to {e} and we will reply within one working day.",
  f_open: "Download didn’t start? Open the PDF",
  /* PDF */
  pdf_title: "Social media proposal",
  cv_made: "made for",
  pdf_for: "Prepared for",
  pdf_date: "Date",
  pdf_no: "Proposal no.",
  pdf_valid: "Valid until",
  pdf_glance: "Your package at a glance",
  pdf_intro:
    "Thank you for your interest. This is the package you put together, with every price itemised. Content strategy, design and editing come from Nadeem Saif; photo and video production from capture21.",
  pdf_goal: "Your goal",
  t_shoots: "Sessions / month",
  t_posts: "Posts / month",
  t_platforms: "Platforms",
  t_term: "Contract",
  pdf_invest: "Investment",
  pdf_month_total: "Monthly investment",
  pdf_total_term: "Total over {n}",
  pdf_once: "One-time at start",
  pdf_note_std:
    "All prices in euros, net, plus {r} % VAT. Ad budgets are paid directly to the platform and are not included. This proposal is valid for {d} days.",
  pdf_note_none:
    "All prices in euros. No VAT is charged under § 19 UStG. Ad budgets are paid directly to the platform and are not included. This proposal is valid for {d} days.",
  pdf_incl: "What is included",
  inc_plan: "Content planning",
  inc_plan_d: "Monthly editorial calendar, topics and ideas.",
  inc_edit: "Editing & retouching",
  inc_edit_d: "Cutting, colour grading, music and subtitles.",
  inc_caps: "Captions & hashtags",
  inc_caps_d: "Written for your audience, in German.",
  inc_posts: "{n} posts per month",
  inc_shoot: "{n}× photo & video session per month",
  inc_shoot_d: "On-site recording and shoot, produced by capture21.",
  inc_own: "Your own photos & videos",
  inc_own_d: "You send the material, we edit and plan it.",
  inc_pl: "Platforms",
  pdf_steps: "Next steps",
  st1: "Confirm",
  st1_d: "Reply by email or sign this proposal.",
  st2: "Kick-off call",
  st2_d: "30 minutes on goals, audience and style.",
  st3: "Plan & first shoot",
  st3_d: "Content plan and first session within two weeks.",
  st4: "Go live",
  st4_d: "Your first posts are published.",
  pdf_accept: "Acceptance",
  pdf_accept_d: "I accept this proposal as described above.",
  acc_place: "Place, date",
  acc_sign: "Signature",
  close_h: "Let’s create something *people remember.*",
  get_touch: "Get in touch",
  page: "Page {n} / {t}",
  file: "Proposal",
};

type Dict = typeof en;
export type TKey = keyof Dict;

const de: Dict = {
  back: "Portfolio",
  lang_label: "Sprache",
  h1: "Stellen Sie Ihr *Social-Media*-Paket zusammen.",
  lead: "Wählen Sie nur, was Sie brauchen. Der Preis passt sich sofort an, ohne versteckte Kosten. Danach laden Sie Ihr persönliches Angebot als PDF herunter.",
  presets_label: "Pakete",
  p_start: "Start",
  p_start_d: "Präsent sein, mit wenig Aufwand",
  p_grow: "Wachstum",
  p_grow_d: "Mehr Reichweite, mehr Kanäle",
  p_prem: "Premium",
  p_prem_d: "Wir kümmern uns um alles",
  s_shoot: "Foto- & Video-Termine",
  s_shoot_d:
    "Aufnahmen und Shooting vor Ort mit capture21. Daraus entstehen Ihre Beiträge für den Monat.",
  shoot_0: "Kein Termin. Sie schicken uns Ihre eigenen Fotos und Videos.",
  shoot_n: "{n}× im Monat vor Ort",
  each: "je {v}",
  shoot_dec: "Ein Termin weniger",
  shoot_inc: "Ein Termin mehr",
  s_posts: "Beiträge pro Monat",
  s_posts_d: "Inklusive Planung, Schnitt, Bildbearbeitung und Texte.",
  posts_dec: "Ein Beitrag weniger",
  posts_inc: "Ein Beitrag mehr",
  per_week: "ca. {n} pro Woche",
  tier_first: "Ab {n} Beiträgen −{p} %",
  tier_next: "ab {n} Beiträgen −{p} %",
  tier_end: " pro Beitrag.",
  s_format: "Art der Beiträge",
  f_mix: "Reels & Karussells",
  f_mix_d: "Der beste Mix",
  f_photo: "Nur Bilder",
  f_photo_d: "{d} pro Beitrag",
  f_reels: "Nur Reels",
  f_reels_d: "{d} pro Beitrag",
  s_platforms: "Plattformen",
  s_platforms_d: "Gleiche Inhalte, angepasst an jede Plattform.",
  pl_ig: "Instagram",
  pl_fb: "Facebook",
  pl_tt: "TikTok",
  pl_gb: "Google Unternehmensprofil",
  pl_ig_d: "Immer dabei",
  pl_fb_d: "Beiträge auch auf Facebook",
  pl_tt_d: "Reels im TikTok-Format mit eigenen Texten",
  pl_gb_d: "Neuigkeiten in der Google-Suche und auf Maps",
  included: "inklusive",
  mo: "/ Monat",
  once_lbl: "einmalig",
  s_services: "Zusatzleistungen",
  sv_posting: "Veröffentlichen & Kanalpflege",
  sv_posting_d: "Wir posten zur besten Uhrzeit. Sie müssen nichts tun.",
  sv_stories: "Stories",
  sv_stories_d: "8 Stories im Monat, z. B. Einblicke und Angebote.",
  sv_community: "Community-Management",
  sv_community_d: "Antworten auf Kommentare und Nachrichten, werktags.",
  sv_report: "Monatlicher Bericht",
  sv_report_d: "Reichweite, neue Follower und was am besten lief.",
  sv_ads: "Werbeanzeigen-Betreuung",
  sv_ads_d: "Einrichtung und Optimierung. Das Werbebudget zahlen Sie direkt an Meta.",
  s_once: "Einmalige Leistungen",
  on_setup: "Profil einrichten & optimieren",
  on_setup_d: "Profilbild, Bio, Highlights und Links professionell gestaltet.",
  on_workshop: "Strategie-Gespräch",
  on_workshop_d: "90 Minuten: Zielgruppe, Themen und Redaktionsplan.",
  s_term: "Laufzeit",
  s_term_d: "Je länger, desto günstiger der Monatspreis.",
  m1: "1 Monat",
  mN: "{n} Monate",
  months: "Monate",
  month: "Monat",
  flex: "Monatlich kündbar.",
  save: "−{p} %",
  sum: "Ihr Paket",
  net: "netto",
  gross: "brutto",
  vat_label: "Preise anzeigen",
  g_month: "Monatlich",
  g_once: "Einmalig",
  l_shoot: "{n}× Foto-/Video-Termin",
  l_posts: "{n} Beiträge × {v}",
  l_term: "Laufzeit-Rabatt {p} %",
  per_month: "pro Monat",
  plus_vat: "zzgl. {r} % MwSt. = {v} brutto",
  has_vat: "enthält {v} MwSt.",
  no_vat: "Kein Umsatzsteuerausweis (§ 19 UStG)",
  x_once: "Einmalig zum Start",
  x_term: "Gesamt über {n}",
  x_post: "Preis pro Beitrag",
  get: "Angebot erhalten",
  reset: "Zurücksetzen",
  legal: "Unverbindliche Preisübersicht. Werbebudgets sind nicht enthalten.",
  biz: "Angebot für Unternehmen. Preise netto zzgl. {r} % MwSt.",
  biz_none: "Angebot für Unternehmen. Kein Umsatzsteuerausweis (§ 19 UStG).",
  f_title: "Ihr Angebot",
  f_desc:
    "Geben Sie Ihre Daten ein und wir erstellen ein PDF-Angebot mit Ihrem Paket. Es wird nichts an uns gesendet, bis Sie sich melden.",
  f_desc_leads: "Geben Sie Ihre Daten ein und wir erstellen ein PDF-Angebot mit Ihrem Paket.",
  f_name: "Ihr Name",
  f_company: "Unternehmen",
  f_email: "E-Mail",
  f_goal: "Was möchten Sie erreichen?",
  f_goal_ph: "z. B. mehr Buchungen für unsere Wohnung",
  optional: "optional",
  f_submit: "PDF-Angebot herunterladen",
  f_busy: "PDF wird erstellt…",
  f_close: "Zurück zum Konfigurator",
  close: "Schließen",
  f_need_name: "Bitte geben Sie Ihren Namen ein.",
  f_need_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  f_err:
    "Das PDF konnte nicht erstellt werden. Bitte laden Sie die Seite neu und versuchen Sie es noch einmal.",
  f_privacy:
    "Beim Herunterladen werden Ihre Angaben und Ihr gewähltes Paket an Nadeem Saif und capture21 übermittelt, damit wir Sie zu diesem Angebot kontaktieren können.",
  f_privacy_link: "Datenschutzerklärung",
  f_done: "Ihr Angebot wurde heruntergeladen.",
  f_send: "Bereit zum Start? Senden Sie es an {e}. Wir antworten innerhalb eines Werktags.",
  f_open: "Download nicht gestartet? PDF öffnen",
  pdf_title: "Social-Media-Angebot",
  cv_made: "gemacht für",
  pdf_for: "Erstellt für",
  pdf_date: "Datum",
  pdf_no: "Angebots-Nr.",
  pdf_valid: "Gültig bis",
  pdf_glance: "Ihr Paket auf einen Blick",
  pdf_intro:
    "Vielen Dank für Ihr Interesse. Dies ist das Paket, das Sie zusammengestellt haben, mit allen Preisen im Detail. Strategie, Design und Schnitt kommen von Nadeem Saif, die Foto- und Videoproduktion von capture21.",
  pdf_goal: "Ihr Ziel",
  t_shoots: "Termine / Monat",
  t_posts: "Beiträge / Monat",
  t_platforms: "Plattformen",
  t_term: "Laufzeit",
  pdf_invest: "Investition",
  pdf_month_total: "Monatliche Investition",
  pdf_total_term: "Gesamt über {n}",
  pdf_once: "Einmalig zum Start",
  pdf_note_std:
    "Alle Preise in Euro, netto, zzgl. {r} % MwSt. Werbebudgets werden direkt an die Plattform gezahlt und sind nicht enthalten. Dieses Angebot ist {d} Tage gültig.",
  pdf_note_none:
    "Alle Preise in Euro. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Werbebudgets werden direkt an die Plattform gezahlt und sind nicht enthalten. Dieses Angebot ist {d} Tage gültig.",
  pdf_incl: "Leistungsumfang",
  inc_plan: "Content-Planung",
  inc_plan_d: "Monatlicher Redaktionsplan, Themen und Ideen.",
  inc_edit: "Schnitt & Bildbearbeitung",
  inc_edit_d: "Schnitt, Farbkorrektur, Musik und Untertitel.",
  inc_caps: "Texte & Hashtags",
  inc_caps_d: "Passend für Ihre Zielgruppe, auf Deutsch.",
  inc_posts: "{n} Beiträge pro Monat",
  inc_shoot: "{n}× Foto- & Video-Termin pro Monat",
  inc_shoot_d: "Aufnahmen und Shooting vor Ort, produziert von capture21.",
  inc_own: "Ihre eigenen Fotos & Videos",
  inc_own_d: "Sie liefern das Material, wir planen und bearbeiten es.",
  inc_pl: "Plattformen",
  pdf_steps: "Nächste Schritte",
  st1: "Bestätigen",
  st1_d: "Per E-Mail antworten oder dieses Angebot unterschreiben.",
  st2: "Kick-off-Gespräch",
  st2_d: "30 Minuten zu Zielen, Zielgruppe und Stil.",
  st3: "Planung & erster Dreh",
  st3_d: "Redaktionsplan und erster Termin innerhalb von zwei Wochen.",
  st4: "Live gehen",
  st4_d: "Ihre ersten Beiträge gehen online.",
  pdf_accept: "Auftragsbestätigung",
  pdf_accept_d: "Hiermit nehme ich das obige Angebot an.",
  acc_place: "Ort, Datum",
  acc_sign: "Unterschrift",
  close_h: "Lassen Sie uns etwas schaffen, das *in Erinnerung bleibt.*",
  get_touch: "Kontakt",
  page: "Seite {n} / {t}",
  file: "Angebot",
};

const DICTS: Record<Lang, Dict> = { en, de };

export const LANG_STORAGE_KEY = "ns-lang";

/** Stored choice first, then the browser language (German → de), else English. */
export function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "en" || stored === "de") return stored;
  } catch {
    /* storage blocked */
  }
  const langs =
    typeof navigator !== "undefined" ? (navigator.languages ?? [navigator.language]) : [];
  return (langs[0] ?? "").toLowerCase().startsWith("de") ? "de" : "en";
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage blocked */
  }
}

export type I18n = ReturnType<typeof createI18n>;

/** Texts + number formatting for one language. de-DE: "1.299 €", en: "€1,299". */
export function createI18n(lang: Lang) {
  const dict = DICTS[lang];
  const locale = lang === "de" ? "de-DE" : "en-IE";
  const vatPct = Math.round(PRICING.vatRate * 100);

  const t = (key: TKey, vars: Record<string, string | number> = {}) =>
    dict[key].replace(/\{(\w+)\}/g, (_, v: string) =>
      v === "r" && vars.r === undefined ? String(vatPct) : String(vars[v] ?? ""),
    );

  // Whole euros without decimals, otherwise two decimals (e.g. €44.10)
  const money = (v: number, decimals?: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: decimals ?? (Math.abs(v - Math.round(v)) < 0.005 ? 0 : 2),
      maximumFractionDigits: decimals ?? 2,
    }).format(v);
  const money0 = (v: number) => money(Math.round(v), 0);
  const num = (v: number, maxDecimals = 1) =>
    v.toLocaleString(locale, { maximumFractionDigits: maxDecimals });
  const termLabel = (m: number) => (m === 1 ? t("m1") : t("mN", { n: m }));
  const date = (d: Date) =>
    new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(d);

  // "−10 % per post from 8 posts, −15 % from 12 posts." built from the config tiers
  const tierHint = () => {
    const tiers = [...PRICING.post.tiers].sort((a, b) => a.from - b.from);
    if (!tiers.length) return "";
    return (
      tiers
        .map((tier, i) =>
          t(i ? "tier_next" : "tier_first", { n: tier.from, p: Math.round(tier.discount * 100) }),
        )
        .join(", ") + t("tier_end")
    );
  };

  return { lang, locale, t, money, money0, num, termLabel, date, tierHint, vatPct };
}

/** Splits "*accent*" markup into plain/accent parts. */
export function splitAccent(text: string): { text: string; accent: boolean }[] {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}
