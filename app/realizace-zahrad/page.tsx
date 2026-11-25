import type { Metadata } from "next";
import { absoluteUrl } from "@/config";
import Site, { AKCE, ZAVOLAT } from "@/components/Site";
import HeroSplit from "@/components/HeroSplit";
import Photo, { sizesFor, type PhotoName } from "@/components/Photo";
import Faq from "@/components/Faq";
import { alt } from "@/data/fotky";
import { FAQ_REALIZACE } from "@/data/faq";

export const metadata: Metadata = {
  title: "Realizace zahrad",
  description:
    "Realizace zahrad v Českých Budějovicích a Jihočeském kraji — terénní úpravy, výsadby dřevin a trvalek, trávníky, práce se dřevem, kamenem, kovem a vodou.",
  alternates: { canonical: absoluteUrl("/realizace-zahrad/") },
};

/* Rozdáno skillem: moment pinned-chapters (#co-umime) — sekce drží na
   obrazovce, zatímco se posouvají čtyři kroky; fotka vpravo se mění s nimi. */

const UMIME: { foto: PhotoName; title: string; text: string }[] = [
  {
    foto: "sterkova-plocha-svah",
    title: "Terénní úpravy zahrady",
    text: "Modelace terénu, svahy, zpevněné plochy a přípravné práce.",
  },
  {
    foto: "cerstva-vysadba-mulc",
    title: "Dřeviny a trvalky do zahrady",
    text: "Trvalkové záhony a dřeviny, které mění zahradu s ročními obdobími.",
  },
  {
    foto: "detske-hriste-houpacky",
    title: "Zahradní trávníky",
    text: "Výsev travních ploch i pokládka travních koberců.",
  },
  {
    foto: "schody-prazce-balvany",
    title: "Dřevo, kámen, kov a voda v zahradě",
    text: "Suché zídky, schody z pražců, štěrkové záhony i vodní prvky.",
  },
];

export default function RealizaceZahrad() {
  return (
    <Site
      current="realizace"
      close={{ foto: "sucha-zidka-stavba", alt: alt("sucha-zidka-stavba"), pos: "50% 62%" }}
    >
      <HeroSplit
        kicker="Ing. Šimon Suchý · České Budějovice"
        title="Realizace Vaší zahrady"
        lead="Po vyhotovení projektu následuje samotná realizace. S naším týmem se vždy snažíme odvést tu nejlepší práci, abyste se ve Vaší zahradě cítili opravdu příjemně."
        primary={AKCE}
        secondary={ZAVOLAT}
        foto="nova-zahrada-terasa"
        pos="50% 60%"
      />

      <section
        className="section"
        id="co-umime"
        data-moment="pinned-chapters"
        style={{ "--h": 2 } as React.CSSProperties}
        aria-labelledby="co-umime-h"
      >
        <div className="wrap mo-pc__grid">
          <div className="mo-pc__text">
            <h2 id="co-umime-h">Co při realizaci zahrady děláme</h2>
            <ol className="mo-pc__steps">
              {UMIME.map((u) => (
                <li className="mo-pc__step" key={u.foto}>
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                  <figure className="mo-pc__visual">
                    <Photo name={u.foto} alt={alt(u.foto)} sizes={sizesFor(u.foto, 628, 600)} />
                  </figure>
                </li>
              ))}
            </ol>
          </div>
          <div className="mo-pc__visuals frame"></div>
        </div>
      </section>

      <section className="section" id="promena" aria-labelledby="promena-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="promena-h">Proměna zahrady ve svahu</h2>
            <p>Vlevo svah při terénních úpravách, vpravo hotová zpevněná plocha na stejném místě.</p>
          </div>
          <div className="grid fit dvojice">
            {(["terenni-upravy-svah", "sterkova-plocha-hotovo"] as const).map((f) => (
              <div className="frame frame--photo span-6" key={f}>
                <Photo name={f} alt={alt(f)} className="frame__img" sizes={sizesFor(f, 628, 558)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq title="Otázky k realizaci zahrady" items={FAQ_REALIZACE} foto="predzahradka-gabiony-vysadba" />
    </Site>
  );
}
