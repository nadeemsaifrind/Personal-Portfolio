import {
  Circle,
  Defs,
  Document,
  Ellipse,
  Page,
  Path,
  RadialGradient,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";

import { CONTACT, PRICING } from "@/config/pricing";
import { splitAccent, type I18n } from "../i18n";
import {
  calc,
  hasVat,
  lineLabel,
  platformNames,
  SERVICE_KEYS,
  ONCE_KEYS,
  type Client,
  type Selection,
} from "../model";
import { C21_ORANGE } from "../brand";
import { serifCovers } from "./fonts";

/* 4-page A4 proposal: dark cover → package & investment → what's included,
   next steps, signature → dark closing page with the team.
   All sizes in pt (A4 = 595 × 842). Real text, embedded subset fonts. */

const W = 595.28;
const H = 841.89;

const C = {
  ink: "#0b0d10",
  muted: "#5d636b",
  line: "#e6e8eb",
  soft: "#f4f6f7",
  brand: "#00a67c",
  brandBright: "#00ba8d",
  brandSoft: "#e5f6f1",
  dark: "#010102",
  darkFg: "#f4f5f7",
  darkMuted: "#8d9299",
  darkSoftFg: "#c8ccd0",
  darkLine: "#232426", // rgba(244,245,247,.14) on #010102
  darkCard: "#08090a", // rgba(244,245,247,.03) on #010102
  c21: C21_ORANGE,
};

const SANS = "Inter";
const SERIF = "Serif";
const MONO = "Mono";

/** 0 = normal, 1 = compact spacing, 2 = no summary tiles, 3 = smallest table */
export type Density = 0 | 1 | 2 | 3;
export type PageDensity = { p2: Density; p3: Density };

/** Pages report which PDF page numbers they ended up on, so the generator can
    detect an overflow (one design page spilling onto two) and tighten it. */
export type PageProbe = Record<string, Set<number>>;

export type ProposalProps = {
  i: I18n;
  s: Selection;
  client: Client & { no: string };
  now: Date;
  density: PageDensity;
  probe: PageProbe;
};

const st = StyleSheet.create({
  page: {
    fontFamily: SANS,
    color: C.ink,
    backgroundColor: "#ffffff",
    paddingVertical: 42,
    paddingHorizontal: 45,
    fontSize: 10,
  },
  dark: { backgroundColor: C.dark, color: C.darkFg },
  mono: { fontFamily: MONO },
  label: {
    fontFamily: MONO,
    fontSize: 7.5,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: C.muted,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 13.5,
    borderBottomWidth: 0.75,
    borderBottomColor: C.line,
  },
  h2: { fontSize: 22.5, fontWeight: 700, letterSpacing: -0.9, marginBottom: 8 },
  p: { fontSize: 10, lineHeight: 1.6, color: C.muted },
  foot: {
    marginTop: "auto",
    paddingTop: 13.5,
    borderTopWidth: 0.75,
    borderTopColor: C.line,
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: MONO,
    fontSize: 7.5,
    letterSpacing: 0.45,
    color: C.muted,
  },
});

function Logos({ size, dark }: { size: number; dark?: boolean }) {
  return (
    <Text style={{ fontSize: size, color: dark ? C.darkFg : C.ink }}>
      <Text style={{ fontWeight: 700, letterSpacing: -0.06 * size }}>
        nadeem<Text style={{ color: C.brand }}>.</Text>
      </Text>
      <Text style={{ fontWeight: 400, color: dark ? "#5d6268" : "#9aa0a6", fontSize: size * 0.82 }}>
        {"  ×  "}
      </Text>
      {/* capture21 wordmark (text). Swap for the official SVG logo once Philipp sends it. */}
      <Text style={{ fontWeight: 700, letterSpacing: -0.01 * size }}>
        capture<Text style={{ color: C.c21 }}>21</Text>
      </Text>
    </Text>
  );
}

function Probe({ id, probe }: { id: string; probe: PageProbe }) {
  return (
    <Text
      fixed
      style={{ position: "absolute", top: 0, left: 0, fontSize: 1, color: "#ffffff", opacity: 0 }}
      render={({ pageNumber }) => {
        (probe[id] ??= new Set()).add(pageNumber);
        return " ";
      }}
    />
  );
}

function Accent({ text, color }: { text: string; color: string }) {
  return (
    <>
      {splitAccent(text).map((part, k) =>
        part.accent ? (
          <Text
            key={k}
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: 0,
              color,
            }}
          >
            {part.text}
          </Text>
        ) : (
          part.text
        ),
      )}
    </>
  );
}

function DarkBackdrop() {
  return (
    <Svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      fixed
    >
      <Defs>
        <RadialGradient id="glowGreen">
          <Stop offset={0} stopColor={C.brand} stopOpacity={0.3} />
          <Stop offset={0.7} stopColor={C.brand} stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="glowWhite">
          <Stop offset={0} stopColor={C.darkFg} stopOpacity={0.07} />
          <Stop offset={0.7} stopColor={C.darkFg} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={W} height={H} fill={C.dark} />
      <Ellipse cx={W * 0.82} cy={H * 0.18} rx={W * 0.6} ry={H * 0.5} fill="url(#glowGreen)" />
      <Ellipse cx={W * 0.1} cy={H} rx={W * 0.5} ry={H * 0.4} fill="url(#glowWhite)" />
    </Svg>
  );
}

function Check() {
  return (
    <Svg width={13.5} height={13.5} viewBox="0 0 18 18" style={{ marginTop: 0.5 }}>
      <Circle cx={9} cy={9} r={9} fill={C.brandSoft} />
      <Path
        d="M5.6 9.3l2.3 2.2 4.6-4.9"
        stroke={C.brand}
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function LightHeader({ i, no, compact }: { i: I18n; no: string; compact: boolean }) {
  return (
    <View style={[st.head, { marginBottom: compact ? 18 : 25.5 }]}>
      <Logos size={12} />
      <Text style={[st.label, { fontSize: 7.5, letterSpacing: 0.75 }]}>
        {i.t("pdf_title")} · {no}
      </Text>
    </View>
  );
}

function Foot({
  left,
  right,
  dark,
  marginTop,
}: {
  left: ReactNode;
  right: ReactNode;
  dark?: boolean;
  marginTop?: number;
}) {
  return (
    <View
      style={[
        st.foot,
        dark ? { borderTopColor: C.darkLine, color: C.darkMuted } : {},
        marginTop !== undefined ? { marginTop } : {},
      ]}
    >
      <Text>{left}</Text>
      <Text>{right}</Text>
    </View>
  );
}

function coverSize(name: string) {
  const n = name.length;
  if (n <= 14) return 57;
  if (n <= 22) return 46;
  if (n <= 34) return 38;
  if (n <= 50) return 31;
  return 26;
}

export function ProposalDocument({ i, s, client, now, density, probe }: ProposalProps) {
  const c = calc(s);
  const no = client.no;
  const who = client.company || client.name;
  const valid = new Date(now.getTime() + PRICING.validDays * 864e5);
  const platforms = platformNames(s, i);
  const vat = hasVat();

  const cover = coverSize(who);
  const d2 = density.p2;
  const d3 = density.p3;
  const pad = (d: Density) => ({ paddingVertical: d ? 33 : 42 });

  const included: [string, string][] = [
    s.shoots
      ? [i.t("inc_shoot", { n: s.shoots }), i.t("inc_shoot_d")]
      : [i.t("inc_own"), i.t("inc_own_d")],
    [i.t("inc_posts", { n: s.posts }), i.t(`f_${s.format}`)],
    [i.t("inc_plan"), i.t("inc_plan_d")],
    [i.t("inc_edit"), i.t("inc_edit_d")],
    [i.t("inc_caps"), i.t("inc_caps_d")],
    [i.t("inc_pl"), platforms.join(", ")],
    ...SERVICE_KEYS.filter((k) => s.services[k]).map((k): [string, string] => [
      i.t(`sv_${k}`),
      i.t(`sv_${k}_d`),
    ]),
    ...ONCE_KEYS.filter((k) => s.once[k]).map((k): [string, string] => [
      `${i.t(`on_${k}`)} (${i.t("once_lbl")})`,
      i.t(`on_${k}_d`),
    ]),
  ];

  // Investment table rows
  const rowPad = d2 >= 3 ? 3.5 : d2 >= 1 ? 4.5 : 6;
  const rowFont = d2 >= 3 ? 9 : 9.75;
  type Row = { label: string; value: string; kind?: "sub" | "disc" | "group" };
  const rows: Row[] = [
    ...c.monthly.map((l) => ({ label: lineLabel(l, i), value: i.money(l.v) })),
    ...(c.disc
      ? [
          { label: i.t("l_sub"), value: i.money(c.sub), kind: "sub" as const },
          {
            label: i.t("l_term", { p: Math.round(c.termPct * 100) }),
            value: `−${i.money(c.disc)}`,
            kind: "disc" as const,
          },
        ]
      : []),
    ...(c.once.length ? [{ label: i.t("g_once"), value: "", kind: "group" as const }] : []),
    ...c.once.map((l) => ({ label: lineLabel(l, i), value: i.money(l.v) })),
  ];

  const tiles = [
    { big: String(s.shoots), label: i.t("t_shoots") },
    { big: String(s.posts), label: i.t("t_posts") },
    { big: platforms.join(", "), label: i.t("t_platforms"), small: true },
    {
      big: String(s.term),
      label: `${i.t("t_term")} · ${s.term === 1 ? i.t("month") : i.t("months")}`,
    },
  ];

  const partnerLines = [CONTACT.partnerPerson, CONTACT.partnerPlace, CONTACT.partnerWebsite].filter(
    Boolean,
  );
  const ownLines = [CONTACT.email, CONTACT.phone, CONTACT.website].filter(Boolean);

  return (
    <Document
      title={`${i.t("pdf_title")} ${no}`}
      author="Nadeem Saif × capture21"
      subject={`${i.t("pdf_title")} · ${who}`}
      creator="nadeemsaif.com"
      producer="nadeemsaif.com"
      language={i.lang === "de" ? "de-DE" : "en"}
    >
      {/* ── 1. Cover ── */}
      <Page size="A4" style={[st.page, st.dark]}>
        <Probe id="p1" probe={probe} />
        <DarkBackdrop />
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Logos size={15} dark />
          <Text style={[st.label, { color: C.darkMuted, letterSpacing: 1.05 }]}>{no}</Text>
        </View>

        <View style={{ marginTop: "auto" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: C.brand,
                marginRight: 7.5,
              }}
            />
            <Text style={[st.label, { fontSize: 8.25, letterSpacing: 1.5, color: C.darkMuted }]}>
              {i.t("pdf_title")} · {now.getFullYear()}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 16.5,
              fontSize: cover,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: -0.05 * cover,
            }}
          >
            {"Social media\n"}
            <Text
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: -0.02 * cover,
                color: C.brandBright,
              }}
            >
              {i.t("cv_made")}
            </Text>
            {`\n${who}.`}
          </Text>

          <View
            style={{
              marginTop: 42,
              flexDirection: "row",
              borderTopWidth: 0.75,
              borderTopColor: C.darkLine,
              paddingTop: 15,
            }}
          >
            {[
              { k: i.t("pdf_for"), v: client.name, sub: client.company, flex: 1.4 },
              { k: i.t("pdf_date"), v: i.date(now), flex: 1 },
              { k: i.t("pdf_no"), v: no, flex: 1 },
              { k: i.t("pdf_valid"), v: i.date(valid), flex: 1 },
            ].map((m, idx) => (
              <View key={idx} style={{ flex: m.flex, paddingRight: idx < 3 ? 13.5 : 0 }}>
                <Text
                  style={[
                    st.label,
                    { fontSize: 7.1, letterSpacing: 1.05, color: C.darkMuted, marginBottom: 4.5 },
                  ]}
                >
                  {m.k}
                </Text>
                <Text style={{ fontSize: 10.5, fontWeight: 600, lineHeight: 1.35 }}>{m.v}</Text>
                {m.sub ? (
                  <Text style={{ fontSize: 9, color: C.darkMuted, lineHeight: 1.35 }}>{m.sub}</Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        <Foot dark marginTop={42} left={CONTACT.website} right={CONTACT.partnerWebsite} />
      </Page>

      {/* ── 2. Package & investment ── */}
      <Page size="A4" style={[st.page, pad(d2)]}>
        <Probe id="p2" probe={probe} />
        <LightHeader i={i} no={no} compact={d2 >= 1} />
        <Text style={st.h2}>{i.t("pdf_glance")}</Text>
        <Text style={[st.p, { maxWidth: 400 }, d2 >= 3 ? { fontSize: 9.5, lineHeight: 1.5 } : {}]}>
          {i.t("pdf_intro")}
        </Text>

        {client.goal ? (
          <View
            style={{
              marginTop: d2 >= 2 ? 10.5 : 16.5,
              borderLeftWidth: 1.5,
              borderLeftColor: C.brand,
              paddingLeft: 12,
              paddingVertical: 3,
            }}
          >
            <Text style={[st.label, { marginBottom: 4.5 }]}>{i.t("pdf_goal")}</Text>
            <Text
              style={
                serifCovers(client.goal)
                  ? {
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: d2 >= 2 ? 12.75 : 15,
                      lineHeight: 1.35,
                      color: C.ink,
                    }
                  : {
                      fontFamily: SANS,
                      fontStyle: "italic",
                      fontSize: d2 >= 2 ? 10.5 : 12,
                      lineHeight: 1.45,
                      color: C.ink,
                    }
              }
            >
              “{client.goal}”
            </Text>
          </View>
        ) : null}

        {d2 < 2 ? (
          <View style={{ flexDirection: "row", marginTop: 18 }}>
            {tiles.map((tile, idx) => (
              <View
                key={idx}
                style={{
                  flex: 1,
                  marginLeft: idx ? 7.5 : 0,
                  backgroundColor: C.soft,
                  borderRadius: 10.5,
                  padding: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={
                    tile.small
                      ? { fontSize: 10.5, fontWeight: 700, lineHeight: 1.3, letterSpacing: -0.1 }
                      : { fontSize: 19.5, fontWeight: 700, letterSpacing: -0.8, lineHeight: 1.05 }
                  }
                >
                  {tile.big}
                </Text>
                <Text style={[st.label, { fontSize: 7, letterSpacing: 0.7, marginTop: 4.5 }]}>
                  {tile.label}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={{ marginTop: d2 >= 1 ? 15 : 22.5 }}>
          <Text style={[st.label, { marginBottom: 9 }]}>{i.t("pdf_invest")}</Text>
          {rows.map((r, idx) =>
            r.kind === "group" ? (
              <Text
                key={idx}
                style={[
                  st.label,
                  { fontSize: 7.1, paddingTop: rowPad + 6, paddingBottom: rowPad - 1 },
                ]}
              >
                {r.label}
              </Text>
            ) : (
              <View
                key={idx}
                wrap={false}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: rowPad,
                  borderBottomWidth: 0.75,
                  borderBottomColor: C.line,
                }}
              >
                <Text
                  style={{
                    fontSize: rowFont,
                    fontWeight: r.kind === "sub" ? 600 : 400,
                    color: r.kind === "disc" ? C.brand : C.ink,
                    flex: 1,
                    paddingRight: 12,
                  }}
                >
                  {r.label}
                </Text>
                <Text
                  style={{
                    fontFamily: MONO,
                    fontSize: rowFont - 0.4,
                    fontWeight: r.kind === "sub" ? 500 : 400,
                    color: r.kind === "disc" ? C.brand : C.ink,
                  }}
                >
                  {r.value}
                </Text>
              </View>
            ),
          )}

          <View
            wrap={false}
            style={{
              marginTop: 12,
              borderRadius: 12,
              backgroundColor: C.dark,
              color: C.darkFg,
              paddingVertical: d2 >= 1 ? 12 : 15,
              paddingHorizontal: d2 >= 1 ? 15 : 16.5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View>
              <Text style={[st.label, { color: C.darkMuted, letterSpacing: 0.9 }]}>
                {i.t("pdf_month_total")}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: -1.5,
                  lineHeight: 1,
                }}
              >
                {i.money(c.month)}
                <Text
                  style={{ fontSize: 9.75, fontWeight: 500, letterSpacing: 0, color: C.darkMuted }}
                >
                  {"  "}
                  {i.perMonth()}
                </Text>
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                fontFamily: MONO,
                fontSize: 8.6,
                color: C.darkSoftFg,
                marginLeft: 12,
              }}
            >
              {c.onceSum ? (
                <Text
                  style={{ marginBottom: 3 }}
                >{`${i.t("pdf_once")}: ${i.money(c.onceSum)}`}</Text>
              ) : null}
              <Text
                style={{ color: C.brandBright, fontWeight: 500 }}
              >{`${i.t("pdf_total_term", { n: i.termLabel(s.term) })}: ${i.money(c.total)}`}</Text>
            </View>
          </View>
          <Text style={[st.p, { fontSize: 8.25, lineHeight: 1.5, marginTop: 9 }]}>
            {i.t(vat ? "pdf_note_std" : "pdf_note_none", { d: PRICING.validDays })}
          </Text>
        </View>

        <Foot
          left={`${CONTACT.website} · ${CONTACT.partnerWebsite}`}
          right={i.t("page", { n: 2, t: 4 })}
        />
      </Page>

      {/* ── 3. What's included, next steps, acceptance ── */}
      <Page size="A4" style={[st.page, pad(d3)]}>
        <Probe id="p3" probe={probe} />
        <LightHeader i={i} no={no} compact={d3 >= 1} />
        <Text style={st.h2}>{i.t("pdf_incl")}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: d3 >= 1 ? 9 : 13.5 }}>
          {included.map(([b, small], idx) => (
            <View
              key={idx}
              wrap={false}
              style={{
                width: "50%",
                paddingRight: idx % 2 ? 0 : 16.5,
                marginBottom: d3 >= 2 ? 6 : d3 >= 1 ? 7.5 : 10.5,
                flexDirection: "row",
              }}
            >
              <Check />
              <View style={{ flex: 1, marginLeft: 7.5 }}>
                <Text style={{ fontSize: 9.75, fontWeight: 600, lineHeight: 1.4 }}>{b}</Text>
                <Text style={{ fontSize: 8.6, color: C.muted, lineHeight: 1.4 }}>{small}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ marginTop: d3 >= 1 ? 18 : 27 }} wrap={false}>
          <Text style={[st.label, { marginBottom: 9 }]}>{i.t("pdf_steps")}</Text>
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4].map((n) => (
              <View
                key={n}
                style={{
                  flex: 1,
                  marginLeft: n > 1 ? 7.5 : 0,
                  borderWidth: 0.75,
                  borderColor: C.line,
                  borderRadius: 10.5,
                  padding: 10.5,
                }}
              >
                <Text style={{ fontFamily: MONO, fontSize: 8.25, color: C.brand }}>0{n}</Text>
                <Text
                  style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: -0.1, marginTop: 4.5 }}
                >
                  {i.t(`st${n}` as "st1")}
                </Text>
                <Text style={{ fontSize: 8.6, color: C.muted, lineHeight: 1.45, marginTop: 4.5 }}>
                  {i.t(`st${n}_d` as "st1_d")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginTop: d3 >= 1 ? 18 : 27 }} wrap={false}>
          <Text style={[st.label, { marginBottom: 9 }]}>{i.t("pdf_accept")}</Text>
          <Text style={st.p}>{i.t("pdf_accept_d")}</Text>
          <View style={{ flexDirection: "row", marginTop: d3 >= 1 ? 26 : 34.5 }}>
            {[i.t("acc_place"), i.t("acc_sign")].map((label, idx) => (
              <View
                key={idx}
                style={{
                  flex: 1,
                  marginLeft: idx ? 25.5 : 0,
                  borderTopWidth: 0.75,
                  borderTopColor: C.ink,
                  paddingTop: 6,
                }}
              >
                <Text style={[st.label, { letterSpacing: 0.75 }]}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Foot
          left={`${CONTACT.website} · ${CONTACT.partnerWebsite}`}
          right={i.t("page", { n: 3, t: 4 })}
        />
      </Page>

      {/* ── 4. Closing page ── */}
      <Page size="A4" style={[st.page, st.dark]}>
        <Probe id="p4" probe={probe} />
        <DarkBackdrop />
        <Logos size={15} dark />
        <View style={{ marginTop: "auto" }}>
          <Text
            style={{
              fontSize: 40.5,
              lineHeight: 1.04,
              fontWeight: 700,
              letterSpacing: -2.2,
              maxWidth: 470,
            }}
          >
            <Accent text={i.t("close_h")} color={C.brandBright} />
          </Text>

          <View
            style={{
              marginTop: 36,
              borderTopWidth: 0.75,
              borderTopColor: C.darkLine,
              paddingTop: 15,
            }}
          >
            <Text style={[st.label, { color: C.darkMuted, letterSpacing: 1.05 }]}>
              {i.t("get_touch")}
            </Text>
            {/* Philipp / capture21 first, then Nadeem */}
            <View style={{ flexDirection: "row", marginTop: 10.5 }}>
              {[partnerLines, ownLines].map((lines, idx) => (
                <View key={idx} style={{ flex: 1, paddingRight: idx ? 0 : 13.5 }}>
                  {lines.map((x, k) => (
                    <Text
                      key={x}
                      style={{
                        fontFamily: MONO,
                        fontSize: 9.75,
                        lineHeight: 1.6,
                        color: k === 0 ? C.darkFg : C.darkSoftFg,
                      }}
                    >
                      {x}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
        <Foot dark marginTop={42} left={no} right={i.t("page", { n: 4, t: 4 })} />
      </Page>
    </Document>
  );
}
