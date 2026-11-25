"use client";

import { useEffect } from "react";
import { SITE } from "@/config";

/** Text poptávky z vyplněných polí: oslovení, řádky „Pole: hodnota", zpráva, rozloučení. */
function textPoptavky(form: HTMLFormElement): string {
  const radky: string[] = [];
  for (const [name, value] of new FormData(form).entries()) {
    const v = String(value).replace(/\u00a0/g, " ").trim();
    if (!v) continue;
    radky.push(name === "Zpráva" ? `\n${v}` : `${name}: ${v}`);
  }
  return ["Dobrý den,", "", ...radky, "", "Děkuji a přeji hezký den."].join("\n");
}

/**
 * Odeslání formuláře: s JavaScriptem sestaví e-mail sám (stejný text jako kopírování,
 * služba v předmětu, konce řádků CRLF), takže v každém prohlížeči i poštovní aplikaci vypadá
 * stejně. Bez JavaScriptu formulář odešle prohlížeč sám (mailto v action). Kontrolu polí
 * a chybové hlášky dělá kit (system.js): neplatný formulář tu jen propustíme dál.
 */
export function OdeslaniPoptavky({ formId }: { formId: string }) {
  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;
    const onSubmit = (e: SubmitEvent) => {
      if (e.defaultPrevented || !form.checkValidity()) return;
      e.preventDefault();
      const sluzba = String(new FormData(form).get("Služba") ?? "").replace(/\u00a0/g, " ").trim();
      const predmet = sluzba ? `${SITE.predmetPoptavky} — ${sluzba}` : SITE.predmetPoptavky;
      const telo = textPoptavky(form).replace(/\n/g, "\r\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(predmet)}&body=${encodeURIComponent(telo)}`;
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [formId]);
  return null;
}

/**
 * Záloha k formuláři (mailto): když se v počítači neotevře poštovní
 * aplikace, návštěvník si text poptávky zkopíruje a pošle ho z webové pošty.
 * Výsledek hlásí do stavového řádku formuláře (jeden stavový řádek, kit).
 */
export function KopirovatPoptavku({ formId }: { formId: string }) {
  const copy = async () => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;
    const status = form.querySelector<HTMLElement>("[data-form-status]");
    try {
      await navigator.clipboard.writeText(textPoptavky(form));
      if (status) status.textContent = `Text poptávky je ve schránce. Vložte ho do e-mailu na ${SITE.email}.`;
    } catch {
      if (status) status.textContent = `Kopírování se nepovedlo. Napište nám prosím přímo na ${SITE.email}.`;
    }
  };
  return (
    <button type="button" className="btn btn--secondary" onClick={copy}>
      Zkopírovat text poptávky
    </button>
  );
}
