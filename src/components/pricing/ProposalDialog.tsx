import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import {
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONTACT, LEADS } from "@/config/pricing";
import { cn } from "@/lib/utils";
import type { I18n } from "./i18n";
import { leadsEnabled, sendLead } from "./lead";
import { isEmail, proposalNo, tidyGoal, type Client, type Selection } from "./model";
import { FOCUS } from "./ui";

type Done = { url: string; fileName: string };

function saveFile(url: string, fileName: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a); // Firefox only clicks attached links
  a.click();
  a.remove();
}

export function ProposalDialog({
  open,
  onOpenChange,
  i,
  selection,
  client,
  onClientChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  i: I18n;
  selection: Selection;
  client: Client;
  onClientChange: (c: Client) => void;
}) {
  const ids = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const botRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<{ field?: "name" | "email"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);

  const leads = leadsEnabled();
  const emailRequired = leads && LEADS.requireEmail;

  // The PDF's object URL stays alive for the "open the PDF" fallback link
  // until the dialog closes or a new PDF replaces it.
  useEffect(() => {
    if (!done) return;
    return () => URL.revokeObjectURL(done.url);
  }, [done]);
  // Opened from the summary or the mobile bar: return focus there on close
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) {
      setDone(null);
      setError(null);
    }
  }, [open]);

  const set = (key: keyof Client) => (e: { target: { value: string } }) => {
    onClientChange({ ...client, [key]: e.target.value });
    if (error?.field === key) setError(null);
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const c: Client = {
      name: client.name.trim(),
      company: client.company.trim(),
      email: client.email.trim(),
      goal: tidyGoal(client.goal),
    };
    if (!c.name) {
      setError({ field: "name", text: i.t("f_need_name") });
      nameRef.current?.focus();
      return;
    }
    if ((emailRequired || c.email) && !isEmail(c.email)) {
      setError({ field: "email", text: i.t("f_need_email") });
      emailRef.current?.focus();
      return;
    }
    setError(null);
    setBusy(true);
    const withNo = { ...c, no: proposalNo() };
    if (!botRef.current?.checked) sendLead(withNo, selection, i.lang);
    try {
      const { createProposalPdf } = await import("./pdf/generate");
      const { blob, fileName } = await createProposalPdf(i.lang, selection, withNo);
      const url = URL.createObjectURL(blob);
      saveFile(url, fileName);
      setDone({ url, fileName });
    } catch (err) {
      console.error(err);
      setError({ text: i.t("f_err") });
    } finally {
      setBusy(false);
    }
  }

  const optional = <span className="text-[#86868b]"> · {i.t("optional")}</span>;
  const field =
    "w-full rounded-[12px] border border-transparent bg-[#f5f5f7] px-3.5 py-2.5 text-base text-[#1d1d1f] placeholder:text-[#86868b] transition-colors focus:border-brand focus:bg-white focus:outline-none aria-[invalid=true]:border-[#d70015]";
  const label = "text-[12px] font-medium text-[#6e6e73]";
  const mail = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${i.t("pdf_title")} – ${client.company || client.name}`)}`;
  const [sendBefore, sendAfter] = i.t("f_send", { e: "\u0000" }).split("\u0000");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm" />
        <DialogPrimitive.Content
          data-lenis-prevent
          lang={i.lang}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            opener.current = document.activeElement as HTMLElement | null; // still the button that opened it
            nameRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
          className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-[22px] border border-black/[0.06] bg-white p-5 text-[#1d1d1f] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-7"
        >
          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-3.5">
            <div className="pr-10">
              <DialogTitle className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#1d1d1f]">
                {i.t("f_title")}
              </DialogTitle>
              <DialogDescription className="mt-1 text-[14px] text-[#6e6e73]">
                {i.t(leads ? "f_desc_leads" : "f_desc")}
              </DialogDescription>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${ids}-name`} className={label}>
                  {i.t("f_name")}
                </label>
                <input
                  ref={nameRef}
                  id={`${ids}-name`}
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={80}
                  value={client.name}
                  onChange={set("name")}
                  aria-invalid={error?.field === "name"}
                  aria-describedby={error?.field === "name" ? `${ids}-err` : undefined}
                  className={field}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${ids}-company`} className={label}>
                  {i.t("f_company")}
                  {optional}
                </label>
                <input
                  id={`${ids}-company`}
                  name="company"
                  autoComplete="organization"
                  maxLength={80}
                  value={client.company}
                  onChange={set("company")}
                  className={field}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${ids}-email`} className={label}>
                {i.t("f_email")}
                {!emailRequired && optional}
              </label>
              <input
                ref={emailRef}
                id={`${ids}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required={emailRequired}
                maxLength={120}
                value={client.email}
                onChange={set("email")}
                aria-invalid={error?.field === "email"}
                aria-describedby={error?.field === "email" ? `${ids}-err` : undefined}
                className={field}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${ids}-goal`} className={label}>
                {i.t("f_goal")}
                {optional}
              </label>
              <textarea
                id={`${ids}-goal`}
                name="goal"
                rows={3}
                maxLength={400}
                placeholder={i.t("f_goal_ph")}
                value={client.goal}
                onChange={set("goal")}
                className={cn(field, "min-h-[88px] resize-y")}
              />
            </div>

            {/* Honeypot: invisible to people, bots tick it → no lead email */}
            <input
              ref={botRef}
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
            />

            {leads && (
              <p className="text-xs leading-relaxed text-[#86868b]">
                {i.t("f_privacy")}
                {LEADS.privacyUrl && (
                  <>
                    {" "}
                    <a
                      href={LEADS.privacyUrl}
                      target="_blank"
                      rel="noopener"
                      className={cn(
                        "text-[#6e6e73] underline underline-offset-2 hover:text-[#1d1d1f]",
                        FOCUS,
                      )}
                    >
                      {i.t("f_privacy_link")}
                    </a>
                  </>
                )}
              </p>
            )}

            <p
              id={`${ids}-err`}
              role="alert"
              className="min-h-[1em] text-[13px] text-[#d70015] empty:hidden"
            >
              {error?.text ?? ""}
            </p>

            {done && (
              <div
                role="status"
                className="flex flex-col gap-1.5 rounded-[14px] border border-brand/30 bg-[#f3faf7] px-4 py-3.5 text-sm"
              >
                <b className="font-semibold">{i.t("f_done")}</b>
                {CONTACT.email && (
                  <span className="text-[#6e6e73]">
                    {sendBefore}
                    <a
                      href={mail}
                      className={cn(
                        "font-medium text-[#00805f] underline-offset-2 hover:underline",
                        FOCUS,
                      )}
                    >
                      {CONTACT.email}
                    </a>
                    {sendAfter}
                  </span>
                )}
                <a
                  href={done.url}
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    "w-fit text-[13px] text-[#6e6e73] underline underline-offset-2 hover:text-[#1d1d1f]",
                    FOCUS,
                  )}
                >
                  {i.t("f_open")}
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              <button
                type="submit"
                disabled={busy}
                aria-busy={busy}
                className={cn(
                  "inline-flex flex-[1_1_auto] items-center whitespace-nowrap justify-center gap-2 rounded-full bg-brand h-11 px-5 text-[14px] font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,166,124,0.7)] transition-colors hover:bg-[#00946f] disabled:cursor-progress disabled:opacity-70",
                  FOCUS,
                )}
              >
                {busy && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                )}
                {busy ? i.t("f_busy") : i.t("f_submit")}
              </button>
              <DialogPrimitive.Close
                type="button"
                className={cn(
                  "inline-flex flex-[1_1_auto] items-center whitespace-nowrap justify-center rounded-full bg-[#f5f5f7] h-11 px-5 text-[14px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#ebebef]",
                  FOCUS,
                )}
              >
                {i.t("f_close")}
              </DialogPrimitive.Close>
            </div>
          </form>

          <DialogPrimitive.Close
            aria-label={i.t("close")}
            className={cn(
              "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-[#6e6e73] transition-colors hover:bg-[#ebebef] hover:text-[#1d1d1f]",
              FOCUS,
            )}
          >
            <X size={16} weight="bold" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}
