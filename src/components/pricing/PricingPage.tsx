import { ArrowLeft, ArrowUpRight, Check, Minus, Plus } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { PRESETS, PRICING, type PresetKey } from "@/config/pricing";
import { cn } from "@/lib/utils";
import { CoBrand } from "./CoBrand";
import { createI18n, detectLang, splitAccent, storeLang, type I18n, type Lang } from "./i18n";
import {
  calc,
  defaultSelection,
  FORMAT_KEYS,
  fromPreset,
  hasVat,
  lineLabel,
  matchPreset,
  ONCE_KEYS,
  PLATFORM_KEYS,
  PRESET_KEYS,
  SERVICE_KEYS,
  withVat,
  type Client,
  type Selection,
} from "./model";
import { ProposalDialog } from "./ProposalDialog";
import { FOCUS, INK, INK2, INK3, PAGE_BG } from "./ui";

/* Compact, Apple-style configurator below a dark hero.
   Greys: #1d1d1f text, #6e6e73 secondary, #86868b tertiary, #f5f5f7 fills. */

const NAV_OFFSET = 76; // sticky summary sits below the floating nav

function Accent({ text }: { text: string }) {
  return (
    <>
      {splitAccent(text).map((p, k) =>
        p.accent ? (
          <span
            key={k}
            className="font-normal italic tracking-[-0.01em] text-primary"
            style={{ fontFamily: "var(--font-serif-accent)" }}
          >
            {p.text}
          </span>
        ) : (
          p.text
        ),
      )}
    </>
  );
}

function Section({
  step,
  title,
  hint,
  aside,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-[18px] border border-black/[0.05] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className={cn(
              "grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#f5f5f7] text-[11px] font-semibold tabular-nums",
              INK2,
            )}
          >
            {step}
          </span>
          <h2 className={cn("text-[15px] font-semibold tracking-[-0.01em]", INK)}>{title}</h2>
        </div>
        {aside}
      </div>
      {hint && <p className={cn("-mt-1.5 pl-[32px] text-[13px] leading-snug", INK2)}>{hint}</p>}
      {children}
    </section>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
  decLabel,
  incLabel,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  decLabel: string;
  incLabel: string;
}) {
  const btn = cn(
    "grid h-9 w-9 place-items-center rounded-full transition-all enabled:hover:bg-white enabled:hover:shadow-[0_1px_3px_rgba(0,0,0,0.12)] disabled:cursor-default disabled:opacity-25",
    INK,
    FOCUS,
  );
  return (
    <div className="inline-flex items-center rounded-full bg-[#f5f5f7] p-[3px]">
      <button
        type="button"
        className={btn}
        aria-label={decLabel}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={14} weight="bold" />
      </button>
      <output
        aria-live="polite"
        className={cn("min-w-[40px] text-center text-[18px] font-semibold tabular-nums", INK)}
      >
        {value}
      </output>
      <button
        type="button"
        className={btn}
        aria-label={incLabel}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={14} weight="bold" />
      </button>
    </div>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium tabular-nums transition-colors",
        pressed ? "bg-[#1d1d1f] text-white" : cn("bg-[#f5f5f7] hover:bg-[#ebebef]", INK),
        FOCUS,
      )}
    >
      {children}
    </button>
  );
}

function Badge({ children, onDark }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-px text-[11px] font-semibold tabular-nums",
        onDark ? "bg-brand text-white" : "bg-brand/10 text-[#00805f]",
      )}
    >
      {children}
    </span>
  );
}

function ToggleRow({
  pressed,
  locked,
  title,
  desc,
  price,
  onClick,
}: {
  pressed: boolean;
  locked?: boolean;
  title: string;
  desc: string;
  price: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-disabled={locked || undefined}
      onClick={locked ? undefined : onClick}
      className={cn(
        "grid w-full grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-3 rounded-[12px] border px-3.5 py-2.5 text-left transition-colors",
        locked
          ? "cursor-default border-transparent bg-[#f5f5f7]"
          : pressed
            ? "border-brand/60 bg-[#f3faf7]"
            : "border-black/[0.08] bg-white hover:border-black/[0.18]",
        FOCUS,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] transition-colors",
          locked
            ? "border-[#86868b] bg-[#86868b] text-white"
            : pressed
              ? "border-brand bg-brand text-white"
              : "border-[#c7c7cc] bg-white text-transparent",
        )}
      >
        <Check size={10} weight="bold" />
      </span>
      <span className="flex min-w-0 flex-col">
        <b className={cn("text-[14px] font-medium", INK)}>{title}</b>
        <small className={cn("text-[12px] leading-snug", INK2)}>{desc}</small>
      </span>
      {price}
    </button>
  );
}

/* Package cards (on the dark hero) share one look; a level meter (1–3 bars)
   tells the tiers apart. Only the selected card gets the green outline. */
const TIER_LEVEL: Record<PresetKey, number> = { start: 1, grow: 2, prem: 3 };

function LevelMeter({ level }: { level: number }) {
  return (
    <span aria-hidden="true" className="inline-flex items-end gap-[3px]">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn("w-[4px] rounded-full", n <= level ? "bg-brand" : "bg-white/20")}
          style={{ height: 5 + n * 3 }}
        />
      ))}
    </span>
  );
}

function PresetCard({
  id,
  i,
  pressed,
  price,
  onClick,
}: {
  id: PresetKey;
  i: I18n;
  pressed: boolean;
  price: string;
  onClick: () => void;
}) {
  const p = PRESETS[id];
  const platforms = 1 + PLATFORM_KEYS.filter((k) => p.platforms[k]).length;
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden rounded-[18px] border p-4 text-left transition-all duration-200 sm:p-5",
        pressed
          ? "border-brand bg-white/[0.07] shadow-[0_0_0_1px_var(--brand),0_14px_40px_-14px_rgba(0,166,124,0.55)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
        FOCUS,
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2">
          <LevelMeter level={TIER_LEVEL[id]} />
          <b className="text-[17px] font-semibold tracking-[-0.02em] text-white">
            {i.t(`p_${id}`)}
          </b>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid h-5 w-5 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors",
            pressed ? "border-brand bg-brand text-white" : "border-white/25 text-transparent",
          )}
        >
          <Check size={10} weight="bold" />
        </span>
      </span>

      <span className="mt-1 flex min-h-[20px] flex-wrap items-center gap-x-2 gap-y-1">
        <small className="text-[13px] text-[#a1a1a6]">{i.t(`p_${id}_d`)}</small>
      </span>

      <span className="mt-auto pt-4">
        <span className="flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-[26px] font-semibold leading-none tracking-[-0.035em] text-white tabular-nums">
            {price}
          </span>
          <span className="text-[12px] text-[#86868b]">{i.t("mo")}</span>
        </span>
        <span className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
          {[
            { n: p.shoots, label: i.t("t_shoots") },
            { n: p.posts, label: i.t("t_posts") },
            { n: platforms, label: i.t("t_platforms") },
          ].map((stat) => (
            <span key={stat.label} className="flex min-w-0 flex-col">
              <span className="text-[14px] font-semibold text-white tabular-nums">{stat.n}</span>
              <span className="text-[10.5px] leading-tight text-[#86868b]">{stat.label}</span>
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

/* ── Page ── */

export function PricingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [s, setS] = useState<Selection>(defaultSelection);
  const [gross, setGross] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [client, setClient] = useState<Client>({ name: "", company: "", email: "", goal: "" });
  const summaryRef = useRef<HTMLElement>(null);

  // Browser language / remembered choice. Runs before the page loader fades out.
  useEffect(() => setLang(detectLang()), []);
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [lang]);
  // Light page: match the overscroll area (iOS rubber-band) to it
  useEffect(() => {
    const html = document.documentElement;
    html.style.backgroundColor = PAGE_BG;
    return () => {
      html.style.backgroundColor = "";
    };
  }, []);
  // The summary never scrolls inside itself. If it is taller than the window,
  // it sticks by its bottom edge so the total and the button stay in view.
  useEffect(() => {
    const el = summaryRef.current;
    if (!el) return;
    const fit = () => {
      el.style.top = `${Math.min(NAV_OFFSET, window.innerHeight - el.offsetHeight - 16)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  const i = useMemo(() => createI18n(lang), [lang]);
  const c = useMemo(() => calc(s), [s]);
  const active = matchPreset(s);
  const vat = hasVat();
  const shown = (v: number) => (vat && gross ? withVat(v) : v);
  const mode = vat ? (gross ? i.t("gross") : i.t("net")) : "";

  const update = (patch: Partial<Selection>) => setS((prev) => ({ ...prev, ...patch }));
  const chooseLang = (l: Lang) => {
    setLang(l);
    storeLang(l);
  };

  const priceTag = (v: number, monthly: boolean) =>
    v ? (
      <span
        className={cn("whitespace-nowrap text-right text-[13px] font-medium tabular-nums", INK)}
      >
        +{i.money0(shown(v))}
        <small className={cn("block text-[10.5px] font-normal", INK3)}>
          {monthly ? i.t("mo") : i.t("once_lbl")}
        </small>
      </span>
    ) : (
      <span className={cn("text-[12px]", INK2)}>{i.t("included")}</span>
    );

  const formatDelta = (d: number) => (d > 0 ? "+" : "−") + i.money(Math.abs(shown(d)));
  const vatNote = !vat
    ? i.t("no_vat")
    : gross
      ? i.t("has_vat", { v: i.money0(c.month * PRICING.vatRate) })
      : i.t("plus_vat", { v: i.money0(withVat(c.month)) });

  const openDialog = () => setDialogOpen(true);
  const unit = cn("text-[12px] tabular-nums", INK2);
  const row = "flex justify-between gap-3";
  const groupLabel = cn("text-[10.5px] font-semibold uppercase tracking-[0.08em]", INK3);

  return (
    <div className={cn("min-h-screen", INK)} style={{ backgroundColor: PAGE_BG }}>
      <div className="mx-auto max-w-[1120px] px-[max(16px,env(safe-area-inset-left))] pb-32 pt-[max(12px,env(safe-area-inset-top))] sm:px-6 lg:pb-16">
        {/* Nav */}
        <nav
          aria-label="Main"
          className="sticky top-[max(12px,env(safe-area-inset-top))] z-40 flex items-center justify-between gap-3 rounded-full border border-black/[0.06] bg-white/75 py-1.5 pl-4 pr-1.5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.12)] backdrop-blur-xl backdrop-saturate-150"
        >
          <a
            href="/"
            aria-label="Nadeem Saif × capture21"
            className={cn("rounded-full text-[15px]", INK, FOCUS)}
          >
            <CoBrand />
          </a>
          <div className="flex items-center gap-1">
            <a
              href="/"
              className={cn(
                "hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors hover:text-[#1d1d1f] sm:inline-flex",
                INK2,
                FOCUS,
              )}
            >
              <ArrowLeft size={12} weight="bold" aria-hidden="true" />
              {i.t("back")}
            </a>
            <div
              role="group"
              aria-label={i.t("lang_label")}
              className="inline-flex rounded-full bg-[#f5f5f7] p-[3px]"
            >
              {(["en", "de"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  lang={l}
                  aria-pressed={lang === l}
                  aria-label={l === "en" ? "English" : "Deutsch"}
                  onClick={() => chooseLang(l)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all",
                    lang === l
                      ? "bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                      : cn("hover:text-[#1d1d1f]", INK2),
                    FOCUS,
                  )}
                >
                  <span className="sm:hidden">{l.toUpperCase()}</span>
                  <span className="hidden sm:inline">{l === "en" ? "English" : "Deutsch"}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main>
          {/* Dark stage: headline + the three packages. The light configurator starts below. */}
          <section
            className="relative mt-3 overflow-hidden rounded-[26px] px-5 pb-5 pt-8 text-[#f5f5f7] sm:px-8 sm:pb-8 sm:pt-11 lg:px-12 lg:pb-10 lg:pt-14"
            style={{
              background:
                "radial-gradient(55% 60% at 88% 0%, rgba(0,166,124,0.22), transparent 65%), radial-gradient(70% 60% at 70% 0%, rgba(255,255,255,0.05), transparent 60%), linear-gradient(180deg, #131317, #050506)",
            }}
          >
            <header>
              <h1 className="mb-3.5 max-w-[15ch] text-balance text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-[-0.045em]">
                <Accent text={i.t("h1")} />
              </h1>
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-[#a1a1a6] sm:text-base">
                {i.t("lead")}
              </p>
            </header>

            <div
              role="group"
              aria-label={i.t("presets_label")}
              className="mt-8 grid items-stretch gap-3 sm:mt-10 md:grid-cols-3"
            >
              {PRESET_KEYS.map((key) => (
                <PresetCard
                  key={key}
                  id={key}
                  i={i}
                  pressed={active === key}
                  price={i.money0(shown(calc(fromPreset(key)).month))}
                  onClick={() => setS((prev) => fromPreset(key, prev.once))}
                />
              ))}
            </div>
          </section>

          <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Options */}
            <div className="flex min-w-0 flex-col gap-3">
              <Section
                step={1}
                title={i.t("s_shoot")}
                hint={i.t("s_shoot_d")}
                aside={
                  <span className={unit}>
                    {i.t("each", { v: i.money0(shown(PRICING.shoot.price)) })}
                  </span>
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Stepper
                    value={s.shoots}
                    min={0}
                    max={PRICING.shoot.max}
                    onChange={(shoots) => update({ shoots })}
                    decLabel={i.t("shoot_dec")}
                    incLabel={i.t("shoot_inc")}
                  />
                  <span className={cn("min-w-0 flex-[1_1_180px] text-[13px]", INK2)}>
                    {s.shoots ? i.t("shoot_n", { n: s.shoots }) : i.t("shoot_0")}
                  </span>
                </div>
              </Section>

              <Section
                step={2}
                title={i.t("s_posts")}
                hint={i.t("s_posts_d")}
                aside={
                  <span className={cn("inline-flex items-center gap-1.5", unit)}>
                    {c.tierPct ? <Badge>−{Math.round(c.tierPct * 100)} %</Badge> : null}
                    {i.t("each", { v: i.money(shown(c.postUnit)) })}
                  </span>
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Stepper
                    value={s.posts}
                    min={PRICING.post.min}
                    max={PRICING.post.max}
                    onChange={(posts) => update({ posts })}
                    decLabel={i.t("posts_dec")}
                    incLabel={i.t("posts_inc")}
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {PRICING.post.quickPicks.map((n) => (
                      <Chip key={n} pressed={s.posts === n} onClick={() => update({ posts: n })}>
                        {n}
                      </Chip>
                    ))}
                  </div>
                  <span className={cn("min-w-0 flex-[1_1_120px] text-[13px]", INK2)}>
                    {i.t("per_week", { n: i.num(s.posts / 4.33) })}
                  </span>
                </div>
                <p className={cn("text-[12px]", INK3)}>{i.tierHint()}</p>
              </Section>

              <Section step={3} title={i.t("s_format")}>
                <div className="grid gap-2 sm:grid-cols-3">
                  {FORMAT_KEYS.map((k) => {
                    const d = PRICING.formats[k];
                    const pressed = s.format === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        aria-pressed={pressed}
                        onClick={() => update({ format: k })}
                        className={cn(
                          "flex min-w-0 flex-col gap-0.5 rounded-[12px] border px-3.5 py-2.5 text-left transition-all",
                          pressed
                            ? "border-brand bg-[#f3faf7] shadow-[inset_0_0_0_1px_var(--brand)]"
                            : "border-black/[0.08] bg-white hover:border-black/[0.18]",
                          FOCUS,
                        )}
                      >
                        <b className={cn("text-[14px] font-medium", INK)}>{i.t(`f_${k}`)}</b>
                        <small className={cn("text-[12px] tabular-nums", INK2)}>
                          {d
                            ? i.t(`f_${k}_d` as "f_photo_d", { d: formatDelta(d) })
                            : i.t("f_mix_d")}
                        </small>
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section step={4} title={i.t("s_platforms")} hint={i.t("s_platforms_d")}>
                <div className="flex flex-col gap-1.5">
                  <ToggleRow
                    pressed
                    locked
                    title={i.t("pl_ig")}
                    desc={i.t("pl_ig_d")}
                    price={priceTag(0, true)}
                  />
                  {PLATFORM_KEYS.map((k) => (
                    <ToggleRow
                      key={k}
                      pressed={s.platforms[k]}
                      title={i.t(`pl_${k}`)}
                      desc={i.t(`pl_${k}_d`)}
                      price={priceTag(PRICING.platforms[k], true)}
                      onClick={() =>
                        update({ platforms: { ...s.platforms, [k]: !s.platforms[k] } })
                      }
                    />
                  ))}
                </div>
              </Section>

              <Section step={5} title={i.t("s_services")}>
                <div className="flex flex-col gap-1.5">
                  {SERVICE_KEYS.map((k) => (
                    <ToggleRow
                      key={k}
                      pressed={s.services[k]}
                      title={i.t(`sv_${k}`)}
                      desc={i.t(`sv_${k}_d`)}
                      price={priceTag(PRICING.services[k], true)}
                      onClick={() => update({ services: { ...s.services, [k]: !s.services[k] } })}
                    />
                  ))}
                </div>
              </Section>

              <Section step={6} title={i.t("s_once")}>
                <div className="flex flex-col gap-1.5">
                  {ONCE_KEYS.map((k) => (
                    <ToggleRow
                      key={k}
                      pressed={s.once[k]}
                      title={i.t(`on_${k}`)}
                      desc={i.t(`on_${k}_d`)}
                      price={priceTag(PRICING.once[k], false)}
                      onClick={() => update({ once: { ...s.once, [k]: !s.once[k] } })}
                    />
                  ))}
                </div>
              </Section>

              <Section step={7} title={i.t("s_term")} hint={i.t("s_term_d")}>
                <div className="flex flex-wrap gap-1.5">
                  {PRICING.terms.map(({ months, discount }) => (
                    <Chip
                      key={months}
                      pressed={s.term === months}
                      onClick={() => update({ term: months })}
                    >
                      {i.termLabel(months)}
                      {discount ? (
                        <Badge onDark={s.term === months}>
                          {i.t("save", { p: Math.round(discount * 100) })}
                        </Badge>
                      ) : null}
                    </Chip>
                  ))}
                </div>
                {s.term === 1 && <p className={cn("text-[12px]", INK3)}>{i.t("flex")}</p>}
              </Section>
            </div>

            {/* Summary: always shows every line, never scrolls inside itself */}
            <aside
              ref={summaryRef}
              aria-label={i.t("sum")}
              className="flex min-w-0 flex-col rounded-[18px] border border-black/[0.06] bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.22)] lg:sticky"
            >
              <div className="flex items-center justify-between gap-2 px-4 pb-2 pt-4">
                <h2 className={cn("text-[15px] font-semibold tracking-[-0.01em]", INK)}>
                  {i.t("sum")}
                </h2>
                {vat && (
                  <div
                    role="group"
                    aria-label={i.t("vat_label")}
                    className="inline-flex rounded-full bg-[#f5f5f7] p-[2px]"
                  >
                    {[false, true].map((g) => (
                      <button
                        key={String(g)}
                        type="button"
                        aria-pressed={gross === g}
                        onClick={() => setGross(g)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all",
                          gross === g
                            ? "bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                            : cn("hover:text-[#1d1d1f]", INK2),
                          FOCUS,
                        )}
                      >
                        {g ? i.t("gross") : i.t("net")}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <ul className="flex flex-col gap-[7px] px-4 pb-3 text-[12.5px] tabular-nums">
                <li className={groupLabel}>{i.t("g_month")}</li>
                {c.monthly.map((l, idx) => (
                  <li key={idx} className={row}>
                    <span className={cn("min-w-0", INK2)}>
                      {lineLabel(l, i, (v) => i.money(shown(v)))}
                    </span>
                    <span className={cn("whitespace-nowrap font-medium", INK)}>
                      {i.money(shown(l.v))}
                    </span>
                  </li>
                ))}
                {c.disc > 0 && (
                  <li className={cn(row, "text-[#00805f]")}>
                    <span>{i.t("l_term", { p: Math.round(c.termPct * 100) })}</span>
                    <span className="whitespace-nowrap font-medium">−{i.money(shown(c.disc))}</span>
                  </li>
                )}
                {c.once.length > 0 && (
                  <>
                    <li className={cn(groupLabel, "pt-1")}>{i.t("g_once")}</li>
                    {c.once.map((l, idx) => (
                      <li key={idx} className={row}>
                        <span className={cn("min-w-0", INK2)}>{lineLabel(l, i)}</span>
                        <span className={cn("whitespace-nowrap font-medium", INK)}>
                          {i.money(shown(l.v))}
                        </span>
                      </li>
                    ))}
                  </>
                )}
              </ul>

              <div
                className="mx-2.5 flex flex-col gap-1 rounded-[14px] px-4 py-3.5 text-white"
                style={{
                  background:
                    "radial-gradient(90% 120% at 100% 0%, rgba(0,166,124,0.38), transparent 60%), linear-gradient(160deg, #26262a, #0b0b0d)",
                }}
              >
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a1a1a6]">
                  {i.t("per_month")}
                  {mode && ` · ${mode}`}
                </span>
                <span
                  aria-live="polite"
                  className="text-[32px] font-semibold leading-none tracking-[-0.04em] tabular-nums"
                >
                  {i.money0(shown(c.month))}
                </span>
                <span className="text-[11px] tabular-nums text-[#a1a1a6]">{vatNote}</span>
              </div>

              <div className="flex flex-col gap-1.5 px-4 pt-3 text-[12.5px] tabular-nums">
                {c.onceSum > 0 && (
                  <div className={row}>
                    <span className={INK2}>{i.t("x_once")}</span>
                    <span className={cn("whitespace-nowrap font-medium", INK)}>
                      {i.money0(shown(c.onceSum))}
                    </span>
                  </div>
                )}
                <div className={row}>
                  <span className={INK2}>{i.t("x_post")}</span>
                  <span className={cn("whitespace-nowrap font-medium", INK)}>
                    {i.money(shown(c.perPost), 2)}
                  </span>
                </div>
                <div className={row}>
                  <span className={INK2}>{i.t("x_term", { n: i.termLabel(s.term) })}</span>
                  <span className={cn("whitespace-nowrap font-medium", INK)}>
                    {i.money0(shown(c.total))}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 px-4 pb-4 pt-3">
                <button
                  type="button"
                  onClick={openDialog}
                  className={cn(
                    "inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-brand px-5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,166,124,0.7)] transition-colors hover:bg-[#00946f]",
                    FOCUS,
                  )}
                >
                  {i.t("get")}
                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setS(defaultSelection())}
                  className={cn(
                    "mx-auto rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors hover:text-[#1d1d1f]",
                    INK2,
                    FOCUS,
                  )}
                >
                  {i.t("reset")}
                </button>
                <p className={cn("text-[11px] leading-relaxed", INK3)}>
                  {vat ? i.t("biz") : i.t("biz_none")} {i.t("legal")}
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Phone & tablet portrait: sticky price bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-black/[0.08] bg-white/85 px-[max(16px,env(safe-area-inset-right))] pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl backdrop-saturate-150 lg:hidden">
        <div className="min-w-0">
          <span className={cn("text-[20px] font-semibold tracking-[-0.03em] tabular-nums", INK)}>
            {i.money0(shown(c.month))}
          </span>
          <small className={cn("block truncate text-[11px]", INK2)}>
            {i.t("per_month")}
            {mode && ` · ${mode}`}
          </small>
        </div>
        <button
          type="button"
          onClick={openDialog}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#00946f]",
            FOCUS,
          )}
        >
          {i.t("get")}
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </button>
      </div>

      <ProposalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        i={i}
        selection={s}
        client={client}
        onClientChange={setClient}
      />
    </div>
  );
}
