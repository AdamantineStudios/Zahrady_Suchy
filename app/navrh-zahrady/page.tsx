import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { stranka } from "@/meta";
import Site, { AKCE, ZAVOLAT } from "@/components/Site";
import HeroSplit from "@/components/HeroSplit";
import Photo from "@/components/Photo";
import Faq from "@/components/Faq";
import { alt } from "@/data/fotky";
import { FAQ_NAVRH } from "@/data/faq";

export const metadata: Metadata = stranka({
  title: "Návrh zahrady",
  description:
    "Návrhy zahrad v Českých Budějovicích a Jihočeském kraji. Projekt, díky kterému si představíte svou budoucí zahradu — a společně ho doladíme podle Vašich představ.",
  path: "/navrh-zahrady/",
});

/* Rozdáno skillem: moment word-highlight (#slovo). Šimonův odstavec o návrhu
   je rozdělený: první věta v #projekt, druhá jako výrok v #slovo (doslova). */

const RESIME = [
  "Rozvržení ploch, cest a\u00a0posezení",
  "Terasy, vodní prvky a\u00a0zahradní stavby",
  "Osazovací plán dřevin a\u00a0trvalek",
  "Trávník — výsev nebo travní koberec",
  "Materiály: dřevo, kámen, kov a\u00a0voda",
  "Úpravy návrhu podle Vašich připomínek",
];

export default function NavrhZahrady() {
  return (
    <Site current="navrh" close={{ foto: "sterkovy-zahon-balvany", alt: alt("sterkovy-zahon-balvany") }}>
      <HeroSplit
        kicker="Ing. Šimon Suchý · České Budějovice"
        title="Návrh Vaší budoucí zahrady"
        lead="Navrhujeme zahrady v&nbsp;Českých Budějovicích a&nbsp;po celém Jihočeském kraji. Návrh vzniká až po schůzce u&nbsp;Vás na zahradě."
        primary={AKCE}
        secondary={ZAVOLAT}
        foto="zahon-u-terasy-gabiony"
        pos="50% 55%"
      />

      <section className="section" id="projekt" aria-labelledby="projekt-h">
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="span-5">
              <div className="section-head">
                <h2 id="projekt-h">Co v&nbsp;návrhu zahrady řešíme</h2>
                <p>
                  Každé realizaci předchází projekt, díky kterému si lépe dokážete představit, jak bude
                  Vaše zahrada vypadat.
                </p>
              </div>
              <ul className="rows">
                {RESIME.map((r) => (
                  <li key={r}>
                    <span className="rows__name">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="frame frame--photo frame--fill frame--plan span-6 start-7">
              <Photo
                name="navrh-zahrady-plan"
                alt={alt("navrh-zahrady-plan")}
                className="frame__img"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section statement" id="slovo" data-moment="word-highlight" aria-labelledby="slovo-h">
        <div className="wrap">
          <h2 className="t-label" id="slovo-h">
            Návrh zahrady s&nbsp;Vámi
          </h2>
          <p className="mo-wh__text">
            V&nbsp;tomto kroku je možné diskutovat o&nbsp;různých změnách a&nbsp;úpravách, aby výsledek naplňoval co
            nejvěrněji <strong>Vaše představy</strong>.
          </p>
          <div className="frame frame--photo fit statement-foto">
            <Photo
              name="nova-zahrada-terasa"
              alt={alt("nova-zahrada-terasa")}
              className="frame__img"
              sizes="(min-width: 1280px) 1280px, 100vw"
              style={{ "--ly-pos": "50% 62%" } as CSSProperties}
            />
          </div>
        </div>
      </section>

      <Faq title="Otázky k&nbsp;návrhu zahrady" items={FAQ_NAVRH} foto="dvorek-lavicky" />
    </Site>
  );
}
