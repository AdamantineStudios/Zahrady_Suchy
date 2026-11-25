import type { Metadata } from "next";
import { SITE, withBase } from "@/config";
import { stranka } from "@/meta";
import Site, { AKCE, ZAVOLAT } from "@/components/Site";
import HeroSplit from "@/components/HeroSplit";
import Photo, { sizesFor } from "@/components/Photo";
import { alt } from "@/data/fotky";
import { SLUZBY } from "@/data/sluzby";

export const metadata: Metadata = stranka({ description: SITE.description, path: "/" });

/* Rozdáno skillem (moments.mjs pick --page service --count 2):
   picture-develops (#o-nas) a photo-chapters (#promena). Hero nese původní úvodní fotku
   a Šimonův slogan; kapitoly #promena vyprávějí, jak vznikla právě tahle zahrada
   (poslední kapitola je záměrně tatáž fotka jako hero). */

const PROMENA = [
  {
    foto: "zalozeni-zahonu-kruh",
    title: "Založení zahrady",
    text: "Ocelová obruba vymezila kruhové posezení a\u00a0kolem něj se vysázely první trvalky.",
  },
  {
    foto: "kruhove-posezeni-spalky",
    title: "Hotové posezení",
    text: "Štěrkový kruh s\u00a0dřevěnými špalky a\u00a0stojanem na houpací síť, za ním kvetoucí astry.",
  },
  {
    foto: "zahrada-trvalky-podzim",
    title: "Zahrada v\u00a0plné barvě",
    text: "Astry, levandule a\u00a0okrasné trávy kolem posezení na podzim.",
  },
] as const;

const KROKY = [
  {
    foto: "pozemek-pred-realizaci",
    title: "Projdeme zahradu s\u00a0Vámi",
    text: "Na schůzce u\u00a0Vás probereme, jak chcete zahradu používat, a\u00a0možnosti, jak to uskutečnit.",
  },
  {
    foto: "navrh-zahrady-plan",
    title: "Připravíme návrh zahrady",
    text: "Projekt Vám ukáže, jak bude zahrada vypadat. Změny a\u00a0úpravy doladíme společně.",
  },
  {
    foto: "sucha-zidka-stavba",
    title: "Zahradu založíme",
    text: "Terénní úpravy, výsadby, trávník i\u00a0práce s\u00a0kamenem a\u00a0dřevem — vše podle návrhu.",
  },
] as const;

/** Kapitoly fotek: na šířku obsahu, na tabletu a telefonu na výšku ořez do vysokého rámečku. */
const CHAPTER_SIZES = "(min-width: 1280px) 1280px, (min-width: 1024px) 100vw, (orientation: portrait) 200vw, 100vw";

export default function Home() {
  return (
    <Site current="uvod" close={{ foto: "chodnik-zahony-trvalek", alt: alt("chodnik-zahony-trvalek"), pos: "50% 60%" }}>
      <HeroSplit
        kicker="Návrhy, realizace a&nbsp;údržba zahrad"
        title="Zahrada. Místo nekonečných možností."
        lead="Stačí je objevit. Navrhujeme, zakládáme a&nbsp;udržujeme zahrady v&nbsp;Českých Budějovicích a&nbsp;po celém Jihočeském kraji."
        primary={AKCE}
        secondary={ZAVOLAT}
        foto="zahrada-trvalky-podzim"
        pos="45% 55%"
      />

      <section className="section" id="promena" data-moment="photo-chapters" aria-labelledby="promena-h">
        <div className="wrap mo-ph">
          <div className="mo-ph__head">
            <h2 id="promena-h">Proměna jedné zahrady</h2>
            <p>Zahrada z&nbsp;úvodní fotky: od založení po plnou barvu.</p>
          </div>
          <ol className="mo-ph__list">
            {PROMENA.map((ch) => (
              <li className="mo-ph__ch" key={ch.foto}>
                <figure className="mo-ph__pic">
                  <Photo name={ch.foto} alt={alt(ch.foto)} sizes={CHAPTER_SIZES} />
                </figure>
                <h3>{ch.title}</h3>
                <p>{ch.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="o-nas" aria-labelledby="onas-h">
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="span-6">
              <div className="section-head">
                <h2 id="onas-h">Zahrada jako další část Vašeho bydlení</h2>
                <p>Dovolte nám být u&nbsp;toho s&nbsp;Vámi.</p>
              </div>
              <div className="stack-4 onas">
                <p>
                  Jsme firma z&nbsp;Českých Budějovic, odraz naší práce však můžete vidět po celém
                  Jihočeském kraji. Věnujeme se návrhům, realizacím a&nbsp;údržbám zahrad.
                </p>
                <p>
                  Při realizacích zahrad se zabýváme terénními úpravami, výsadbou dřevin a&nbsp;trvalkových záhonů, výsevem travních ploch či pokládkou travních koberců. Máme
                  zkušenosti také s&nbsp;prací se dřevem, kamenem, kovem a&nbsp;vodou.
                </p>
                <p>
                  Naším cílem je vytvořit z&nbsp;Vaší zahrady další část Vašeho bydlení, kde budete trávit
                  svůj volný čas s&nbsp;rodinou a&nbsp;odpočívat po dlouhém pracovním dni.
                </p>
                <p>
                  Uvědomujeme si, že každý klient je jedinečný, a&nbsp;proto každé realizaci předchází
                  schůzka, na které prodiskutujeme Vaše představy a&nbsp;možnosti, jak je uskutečnit.
                </p>
              </div>
            </div>
            <figure
              className="develop span-6 start-7"
              data-moment="picture-develops"
              data-moment-opts={JSON.stringify({ look: "film" })}
            >
              <Photo name="posezeni-pod-brizou" alt={alt("posezeni-pod-brizou")} sizes={sizesFor("posezeni-pod-brizou", 628, 708)} />
            </figure>
          </div>
        </div>
      </section>

      <section className="section" id="postup" aria-labelledby="postup-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="postup-h">Tři kroky k&nbsp;Vaší zahradě</h2>
            <p>O&nbsp;hotovou zahradu se pak postaráme i&nbsp;dál — pravidelnou údržbou zeleně.</p>
          </div>
          <div className="grid">
            {KROKY.map((k, i) => (
              <article className="card card--row span-4" key={k.foto}>
                <span className="step-num">{i + 1}</span>
                <h3>{k.title}</h3>
                <p>{k.text}</p>
                <div className="panel">
                  <Photo
                    name={k.foto}
                    alt={alt(k.foto)}
                    className="frame__img"
                    sizes={sizesFor(k.foto, 405, 336)}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="sluzby" aria-labelledby="sluzby-h">
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="span-5">
              <div className="section-head">
                <h2 id="sluzby-h">Návrh, realizace a&nbsp;údržba zahrad</h2>
                <p>Zahradu s&nbsp;Vámi projdeme celou cestou, od první čáry v&nbsp;návrhu po pravidelnou péči.</p>
              </div>
              <ul className="rows">
                {SLUZBY.map((s) => (
                  <li key={s.slug}>
                    <a className="rows__name" href={withBase(`/${s.slug}/`)}>
                      {s.nazev}
                    </a>
                    <p>{s.radek}</p>
                  </li>
                ))}
              </ul>
              <p>
                <a className="link" href={withBase("/galerie/")}>
                  Prohlédnout zahrady v&nbsp;galerii
                </a>
              </p>
            </div>
            <div className="frame frame--photo frame--fill span-6 start-7">
              <Photo
                name="zahon-u-terasy-gabiony"
                alt={alt("zahon-u-terasy-gabiony")}
                className="frame__img"
                sizes={sizesFor("zahon-u-terasy-gabiony", 628, 708)}
              />
            </div>
          </div>
        </div>
      </section>
    </Site>
  );
}
