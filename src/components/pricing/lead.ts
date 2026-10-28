import { LEADS } from "@/config/pricing";
import { createI18n, type Lang } from "./i18n";
import {
  calc,
  hasVat,
  lineLabel,
  platformNames,
  withVat,
  type Client,
  type Selection,
} from "./model";

export const leadsEnabled = () => !!LEADS.web3formsKey;

/** Sends the client's details + package to Web3Forms. Always in English.
    Fire-and-forget: never awaited, never blocks or breaks the PDF download. */
export function sendLead(client: Client & { no: string }, s: Selection, clientLang: Lang) {
  if (!leadsEnabled()) return;
  const i = createI18n("en");
  const c = calc(s);

  const pkg = [
    ...c.monthly.map((l) => `${lineLabel(l, i)}: ${i.money(l.v)}`),
    c.disc ? `${i.t("l_term", { p: Math.round(c.termPct * 100) })}: −${i.money(c.disc)}` : "",
    ...c.once.map((l) => `${lineLabel(l, i)} (one-time): ${i.money(l.v)}`),
  ]
    .filter(Boolean)
    .join("\n");

  const body = {
    access_key: LEADS.web3formsKey,
    subject: `New proposal ${client.no}: ${client.company || client.name} – ${i.money0(c.month)}/month`,
    from_name: LEADS.fromName,
    ...(client.email ? { replyto: client.email } : {}),
    "Proposal no.": client.no,
    Name: client.name,
    Company: client.company || "–",
    Email: client.email || "–",
    Goal: client.goal || "–",
    "Client language": clientLang === "de" ? "German" : "English",
    "Monthly price (net)": i.money0(c.month),
    "Monthly price (gross)": hasVat() ? i.money0(withVat(c.month)) : "no VAT",
    "One-time (net)": c.onceSum ? i.money0(c.onceSum) : "–",
    "Contract length": i.termLabel(s.term),
    "Total over contract (net)": i.money0(c.total),
    "Sessions per month": s.shoots,
    "Posts per month": `${s.posts} (${i.t(`f_${s.format}`)})`,
    Platforms: platformNames(s, i).join(", "),
    "Package details": pkg,
  };

  try {
    fetch(LEADS.endpoint, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    }).catch((err) => console.warn("Lead email failed", err));
  } catch (err) {
    console.warn("Lead email failed", err);
  }
}
