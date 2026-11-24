"use client";

import { SITE } from "@/config";

/**
 * Záloha k formuláři (mailto): když se v počítači neotevře poštovní
 * aplikace, návštěvník si text poptávky zkopíruje a pošle ho z webové pošty.
 * Výsledek hlásí do stavového řádku formuláře (jeden stavový řádek, kit).
 */
export default function KopirovatPoptavku({ formId }: { formId: string }) {
  const copy = async () => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;
    const status = form.querySelector<HTMLElement>("[data-form-status]");
    const data = new FormData(form);
    const radky: string[] = [];
    for (const [name, value] of data.entries()) {
      const v = String(value).trim();
      if (!v) continue;
      radky.push(name === "Zpráva" ? `\n${v}` : `${name}: ${v}`);
    }
    const text = ["Dobrý den,", "", ...radky, "", "Děkuji a přeji hezký den."].join("\n");
    try {
      await navigator.clipboard.writeText(text);
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
