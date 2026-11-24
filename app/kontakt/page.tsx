import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/config";
import Site, { AKCE, ZAVOLAT } from "@/components/Site";
import HeroSplit from "@/components/HeroSplit";
import type { CSSProperties } from "react";
import Photo, { sizesFor } from "@/components/Photo";
import KopirovatPoptavku from "@/components/KopirovatPoptavku";
import { alt } from "@/data/fotky";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt na Zahrady Suchý — Ing. Šimon Suchý, České Budějovice. Telefon, e-mail a nezávazná poptávka návrhu, realizace nebo údržby zahrady.",
  alternates: { canonical: absoluteUrl("/kontakt/") },
};

/* Rozdáno skillem: moment word-highlight (#vasen, Šimonova slova doslova).
   Formulář podle kitu (form.form): kontroluje ho system.js a bez data-endpoint
   ho prohlížeč odešle sám — otevře poštovní aplikaci (mailto) s vyplněnými
   poli. Žádné „Děkujeme" bez skutečného odeslání. */

const PREDMET = encodeURIComponent("Poptávka z webu");

export default function Kontakt() {
  return (
    <Site current="kontakt" close={{ foto: "posezeni-pod-brizou", alt: alt("posezeni-pod-brizou") }}>
      <HeroSplit
        kicker="Ing. Šimon Suchý · České Budějovice"
        title="Schůzka přímo u Vás na zahradě"
        lead="Zavolejte, napište, nebo pošlete poptávku formulářem — ozveme se Vám co nejdřív. Jezdíme po Českých Budějovicích a celém Jihočeském kraji."
        primary={AKCE}
        secondary={ZAVOLAT}
        foto="kruhove-posezeni-spalky"
        pos="50% 60%"
      />

      <section className="section" id="poptavka" aria-labelledby="poptavka-h" style={{ "--hm": 2 } as CSSProperties}>
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="split-col foto-col span-5">
              <div className="section-head">
                <h2 id="poptavka-h">Napište nám o Vaší zahradě</h2>
                <p>
                  Formulář otevře Vaši poštovní aplikaci s připravenou zprávou. Ozveme se a domluvíme si
                  schůzku u Vás na zahradě. Můžete také zavolat na{" "}
                  <a href={`tel:${SITE.telefonHref}`}>{SITE.telefon}</a> nebo napsat na{" "}
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </p>
              </div>
              <div className="frame frame--photo col-foto">
                <Photo
                  name="zahrada-trvalky-podzim"
                  alt={alt("zahrada-trvalky-podzim")}
                  className="frame__img"
                  sizes={sizesFor("zahrada-trvalky-podzim", 519, 460)}
                />
              </div>
            </div>
            <div className="form-panel span-6 start-7">
              <form
                className="form"
                id="poptavka-form"
                action={`mailto:${SITE.email}?subject=${PREDMET}`}
                method="post"
                encType="text/plain"
                noValidate
                data-fix="Opravte prosím vyznačená pole (počet: {n})."
              >
                <div className="field">
                  <label htmlFor="f-jmeno">Jméno</label>
                  <input id="f-jmeno" name="Jméno" type="text" autoComplete="name" required aria-describedby="f-jmeno-err" />
                  <p className="field__error" id="f-jmeno-err" hidden>
                    Napište prosím své jméno.
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="f-telefon">Telefon (nepovinné)</label>
                  <input id="f-telefon" name="Telefon" type="tel" autoComplete="tel" inputMode="tel" />
                </div>
                <div className="field">
                  <label htmlFor="f-obec">Obec, kde je zahrada</label>
                  <input id="f-obec" name="Obec" type="text" autoComplete="address-level2" />
                </div>
                <div className="field">
                  <label htmlFor="f-sluzba">Co poptáváte</label>
                  <select id="f-sluzba" name="Služba" defaultValue="">
                    <option value="">Vyberte službu</option>
                    <option>Návrh zahrady</option>
                    <option>Realizace zahrady</option>
                    <option>Návrh i realizace</option>
                    <option>Údržba zeleně</option>
                    <option>Něco jiného</option>
                  </select>
                </div>
                <div className="field field--full">
                  <label htmlFor="f-zprava">Zpráva</label>
                  <textarea id="f-zprava" name="Zpráva" rows={4} required aria-describedby="f-zprava-err" />
                  <p className="field__error" id="f-zprava-err" hidden>
                    Napište prosím pár slov o Vaší zahradě.
                  </p>
                </div>
                <div className="btn-row">
                  <button className="btn btn--primary" type="submit">
                    {AKCE.label}
                  </button>
                  <KopirovatPoptavku formId="poptavka-form" />
                </div>
                <p className="form__status" role="status" data-form-status></p>
                <p className="t-small">
                  Neotevřela se pošta? Zkopírujte text poptávky a pošlete ho na {SITE.email}. Web nepoužívá
                  cookies a nic z formuláře neukládá.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="kdo-jsem" aria-labelledby="kdo-jsem-h">
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="span-5">
              <div className="section-head">
                <h2 id="kdo-jsem-h">Kdo se o Vaši zahradu postará</h2>
                <p>Ing. Šimon Suchý</p>
              </div>
              <p>
                Svá studia jsem prožil na Moravě. Na Zahradnické fakultě Mendelovy univerzity v Brně jsem
                získal inženýrský titul v oboru zahradní a krajinné realizace v programu Zahradní a krajinné
                architektury. Moje srdce však patří do jižních Čech. Miluju naši krajinu a přírodu, ze které
                čerpám inspiraci při tvorbě zahrad.
              </p>
            </div>
            <div className="frame frame--photo frame--fill span-6 start-7">
              <Photo
                name="schody-prazce-balvany"
                alt={alt("schody-prazce-balvany")}
                className="frame__img"
                sizes={sizesFor("schody-prazce-balvany", 628, 708)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section statement" id="vasen" data-moment="word-highlight" aria-labelledby="vasen-h">
        <div className="wrap">
          <h2 className="t-label" id="vasen-h">
            Tvorba zahrad podle Šimona
          </h2>
          <p className="mo-wh__text">
            Tvorba zahrad je nejen prací, ale i <strong>vášní a zálibou</strong>. Rád se postavím novým
            výzvám, které skýtají neotřelé požadavky klientů.
          </p>
        </div>
      </section>
    </Site>
  );
}
