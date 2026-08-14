"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/config";

/** Delší mailto: odkazy některé klienty (hlavně Windows) oříznou. */
const MAILTO_LIMIT = 1900;
const STORAGE_KEY = "zs:poptavka:v1";

const SLUZBY_VOLBY = [
  { id: "navrh", label: "Návrh zahrady" },
  { id: "realizace", label: "Realizace zahrady" },
  { id: "udrzba", label: "Údržba zeleně" },
  { id: "jine", label: "Něco jiného" },
] as const;

type FormState = {
  jmeno: string;
  obec: string;
  telefon: string;
  email: string;
  sluzby: string[];
  zprava: string;
};

const EMPTY: FormState = {
  jmeno: "",
  obec: "",
  telefon: "",
  email: "",
  sluzby: [],
  zprava: "",
};

function buildEmailText(f: FormState): string {
  const sluzby = SLUZBY_VOLBY.filter((s) => f.sluzby.includes(s.id))
    .map((s) => s.label)
    .join(", ");
  const lines = [
    "Dobrý den,",
    "",
    "rád/a bych poptal/a Vaše služby.",
    "",
    sluzby ? `Co poptávám: ${sluzby}` : null,
    f.obec ? `Obec / lokalita: ${f.obec}` : null,
    f.telefon ? `Telefon: ${f.telefon}` : null,
    f.email ? `E-mail: ${f.email}` : null,
    f.zprava ? "" : null,
    f.zprava || null,
    "",
    "Děkuji a přeji hezký den,",
    f.jmeno || "",
  ].filter((l): l is string => l !== null);
  // \r\n kvůli správnému zobrazení v poštovních klientech (Outlook)
  return lines.join("\r\n");
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Obnovení rozepsané poptávky + předvyplnění služby z ?sluzba=…
  // (location.search čteme až v efektu — statický export nemá searchParams)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormState>;
        setForm((f) => ({
          ...f,
          ...parsed,
          sluzby: Array.isArray(parsed.sluzby)
            ? parsed.sluzby.filter((s): s is string => typeof s === "string")
            : [],
        }));
      }
    } catch {
      // poškozené úložiště ignorujeme
    }
    const sluzba = new URLSearchParams(window.location.search).get("sluzba");
    if (sluzba && SLUZBY_VOLBY.some((s) => s.id === sluzba)) {
      setForm((f) =>
        f.sluzby.includes(sluzba) ? f : { ...f, sluzby: [...f.sluzby, sluzba] },
      );
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // např. anonymní režim — formulář funguje dál, jen se neukládá
    }
  }, [form]);

  const emailText = useMemo(() => buildEmailText(form), [form]);

  const mailtoHref = useMemo(() => {
    const subject = `Poptávka z webu — ${form.jmeno || "nová"}`;
    const full = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailText)}`;
    if (full.length <= MAILTO_LIMIT) return full;
    // Příliš dlouhý text: otevřeme klienta jen s předmětem a krátkou
    // instrukcí — celý text si návštěvník zkopíruje z pole níže.
    const stub =
      "Dobrý den,\r\n\r\n(sem prosím vložte text poptávky zkopírovaný z webu)\r\n";
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(stub)}`;
  }, [form.jmeno, emailText]);

  const isLong =
    mailtoHref.length <= MAILTO_LIMIT &&
    `mailto:?body=${encodeURIComponent(emailText)}`.length > MAILTO_LIMIT;

  const copy = async () => {
    const value = emailText;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // starší prohlížeče / http: označíme text a použijeme execCommand
      const ta = textareaRef.current;
      if (ta) {
        ta.focus();
        ta.select();
        document.execCommand("copy");
        setCopied(true);
      }
    }
    window.setTimeout(() => setCopied(false), 2000);
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleSluzba = (id: string) =>
    setForm((f) => ({
      ...f,
      sluzby: f.sluzby.includes(id)
        ? f.sluzby.filter((s) => s !== id)
        : [...f.sluzby, id],
    }));

  const inputCls =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted/60 focus:border-moss";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        aria-label="Poptávkový formulář"
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">
              Jméno
            </span>
            <input
              type="text"
              autoComplete="name"
              value={form.jmeno}
              onChange={(e) => set("jmeno", e.target.value)}
              className={inputCls}
              placeholder="Jan Novák"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">
              Obec / lokalita
            </span>
            <input
              type="text"
              value={form.obec}
              onChange={(e) => set("obec", e.target.value)}
              className={inputCls}
              placeholder="České Budějovice"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">
              Telefon <span className="font-normal text-muted">(nepovinné)</span>
            </span>
            <input
              type="tel"
              autoComplete="tel"
              value={form.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              className={inputCls}
              placeholder="+420 …"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">
              E-mail <span className="font-normal text-muted">(nepovinné)</span>
            </span>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
              placeholder="jan@novak.cz"
            />
          </label>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink">
            Co poptáváte?
          </legend>
          <div className="flex flex-wrap gap-2">
            {SLUZBY_VOLBY.map((s) => {
              const checked = form.sluzby.includes(s.id);
              return (
                <label
                  key={s.id}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    checked
                      ? "border-moss bg-moss text-white"
                      : "border-line bg-paper text-muted hover:border-moss hover:text-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSluzba(s.id)}
                    className="sr-only"
                  />
                  {s.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            Zpráva
          </span>
          <textarea
            rows={5}
            value={form.zprava}
            onChange={(e) => set("zprava", e.target.value)}
            className={inputCls}
            placeholder="Popište nám Vaši zahradu a co byste si přáli…"
          />
        </label>
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-card border border-line bg-sunken/60 p-6">
          <h3 className="font-semibold text-ink">Náhled e-mailu</h3>
          <p className="mt-1 text-sm text-muted">
            Tlačítko otevře Vaši poštovní aplikaci s předvyplněnou zprávou —
            nikam jinam se nic neodesílá.
          </p>
          <textarea
            ref={textareaRef}
            readOnly
            value={emailText}
            aria-label="Text poptávky ke zkopírování"
            rows={9}
            className="mt-4 w-full rounded-xl border border-line bg-paper px-4 py-3 font-mono text-xs leading-relaxed text-muted"
          />
          {isLong ? (
            <p className="mt-2 text-xs text-muted">
              Zpráva je delší, než některé poštovní aplikace zvládnou převzít —
              po otevření e-mailu do něj prosím text vložte tlačítkem
              „Zkopírovat text".
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={mailtoHref}
              className="rounded-full bg-moss px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-moss-deep"
            >
              Otevřít e-mail
            </a>
            <button
              type="button"
              onClick={copy}
              className="rounded-full border-2 border-moss px-5 py-2.5 text-sm font-semibold text-moss-deep transition-colors hover:bg-olive-soft"
            >
              {copied ? "Zkopírováno ✓" : "Zkopírovat text"}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? "Text poptávky zkopírován do schránky" : ""}
            </span>
          </div>
          <p className="mt-4 text-xs text-muted">
            Nefunguje e-mail? Zavolejte na{" "}
            <a href={`tel:${SITE.telefonHref}`} className="font-semibold text-moss-deep underline underline-offset-2">
              {SITE.telefon}
            </a>{" "}
            nebo napište přímo na{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-moss-deep underline underline-offset-2">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
