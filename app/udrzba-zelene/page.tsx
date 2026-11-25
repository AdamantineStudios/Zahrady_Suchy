import type { Metadata } from "next";
import { absoluteUrl } from "@/config";
import Site, { AKCE, ZAVOLAT } from "@/components/Site";
import HeroSplit from "@/components/HeroSplit";
import Photo, { sizesFor, type PhotoName } from "@/components/Photo";
import Faq from "@/components/Faq";
import { alt } from "@/data/fotky";
import { FAQ_UDRZBA } from "@/data/faq";

export const metadata: Metadata = {
  title: "Údržba zeleně",
  description:
    "Údržba zeleně v Českých Budějovicích a Jihočeském kraji — péče o trvalkové záhony a trávníky, řez keřů, řez a kácení stromů. Pravidelně i jednorázově.",
  alternates: { canonical: absoluteUrl("/udrzba-zelene/") },
};

/* Rozdáno skillem: moment picture-develops (#pece, vzhled „film"). */

const PECE = [
  { nazev: "Záhony a trvalky", text: "Jarní a podzimní řezy, odplevelení, mulčování a doplnění výsadeb." },
  { nazev: "Trávník", text: "Pravidelná péče, aby trávník zůstal hustý a svěží." },
  { nazev: "Keře a živé ploty", text: "Udržovací a tvarovací řezy v pravý čas." },
  { nazev: "Stromy", text: "Výškové řezy i postupné kácení tam, kde už strom nejde zachovat." },
];

const STROMY: PhotoName[] = ["rez-stromu-vyska", "kaceni-jehlicnanu", "prorezavka-keru"];

export default function UdrzbaZelene() {
  return (
    <Site current="udrzba" close={{ foto: "zahrada-trvalky-podzim", alt: alt("zahrada-trvalky-podzim") }}>
      <HeroSplit
        kicker="Ing. Šimon Suchý · České Budějovice"
        title="Údržba zeleně a péče o zahradu"
        lead="Staráme se o zahrady v Českých Budějovicích a po celém Jihočeském kraji — pravidelně, nebo jednorázově, když zahrada potřebuje větší zásah."
        primary={AKCE}
        secondary={ZAVOLAT}
        foto="zahon-denivky-detail"
        pos="60% 60%"
      />

      <section className="section" id="pece" aria-labelledby="pece-h">
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="span-5">
              <div className="section-head">
                <h2 id="pece-h">Co údržba zeleně zahrnuje</h2>
                <p>
                  Založením trávníku a vysázením rostlin péče o zahradu nekončí. Jsme připraveni Vám
                  pomoci dlouhodobě s Vaší zahradou. Pravidelná údržba zeleně prodlužuje životnost Vaší
                  zahrady, aby byla stále svěží a plná rozkvetlých rostlin.
                </p>
              </div>
              <ul className="rows">
                {PECE.map((p) => (
                  <li key={p.nazev}>
                    <span className="rows__name">{p.nazev}</span>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <figure
              className="develop span-6 start-7"
              data-moment="picture-develops"
              data-moment-opts={JSON.stringify({ look: "film" })}
            >
              <Photo name="chodnik-zahony-trvalek" alt={alt("chodnik-zahony-trvalek")} sizes={sizesFor("chodnik-zahony-trvalek", 628, 708)} />
            </figure>
          </div>
        </div>
      </section>

      <section className="section" id="stromy" aria-labelledby="stromy-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="stromy-h">Řez a kácení stromů v zahradě</h2>
            <p>Výškové řezy z žebříku, postupné kácení tam, kde už strom nejde zachovat, i prořezávka přerostlých živých plotů.</p>
          </div>
          <div className="grid fit trojice">
            {STROMY.map((f) => (
              <div className="frame frame--photo span-4" key={f}>
                <Photo name={f} alt={alt(f)} className="frame__img" sizes={sizesFor(f, 405, 558)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq title="Otázky k údržbě zeleně" items={FAQ_UDRZBA} foto="zahon-u-terasy-gabiony" />
    </Site>
  );
}
