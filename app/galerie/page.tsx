import type { Metadata } from "next";
import { absoluteUrl } from "@/config";
import Site, { AKCE, ZAVOLAT } from "@/components/Site";
import HeroSplit from "@/components/HeroSplit";
import Photo from "@/components/Photo";
import Galerie from "@/components/Galerie";
import { alt } from "@/data/fotky";
import { SVAH } from "@/data/galerie";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotogalerie zahrad, které jsme navrhli, založili nebo o ně pečujeme — hotové zahrady, záhony a výsadby, práce s kamenem a dřevem.",
  alternates: { canonical: absoluteUrl("/galerie/") },
};

/* Rozdáno skillem: moment photo-chapters (#svah). Žádná fotka se na stránce
   neopakuje: hero, tři kapitoly svahu, 16 fotek galerie a závěr jsou různé. */

/** Kapitoly fotek: na šířku obsahu, na tabletu a telefonu na výšku ořez do vysokého rámečku. */
const CHAPTER_SIZES = "(min-width: 1280px) 1280px, (min-width: 1024px) 100vw, (orientation: portrait) 200vw, 100vw";

export default function GaleriePage() {
  return (
    <Site current="galerie" close={{ foto: "pozemek-pred-realizaci", alt: alt("pozemek-pred-realizaci") }}>
      <HeroSplit
        kicker="Ing. Šimon Suchý · České Budějovice"
        title="Galerie našich zahrad"
        lead="Všechny fotky jsou z&nbsp;našich zahrad v&nbsp;Jihočeském kraji — žádná ilustrační, žádná z&nbsp;fotobanky."
        primary={AKCE}
        secondary={ZAVOLAT}
        foto="chodnik-zahony-trvalek"
        pos="50% 55%"
      />

      <section className="section" id="svah" data-moment="photo-chapters" aria-labelledby="svah-h">
        <div className="wrap mo-ph">
          <div className="mo-ph__head">
            <h2 id="svah-h">Proměna zahrady ve svahu</h2>
            <p>Svah mezi břízami od terénních úprav po hotovou zpevněnou plochu.</p>
          </div>
          <ol className="mo-ph__list">
            {SVAH.map((ch) => (
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

      <Galerie />
    </Site>
  );
}
