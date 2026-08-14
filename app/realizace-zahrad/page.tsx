import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/config";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProcessSteps from "@/components/ProcessSteps";
import FaqList from "@/components/FaqList";
import BeforeAfter from "@/components/BeforeAfter";
import { FAQ_REALIZACE } from "@/data/faq";
import { PROMENY } from "@/data/galerie";

export const metadata: Metadata = {
  title: "Realizace zahrad",
  description:
    "Realizace zahrad v Českých Budějovicích a Jihočeském kraji — terénní úpravy, výsadby dřevin a trvalek, trávníky, práce se dřevem, kamenem, kovem a vodou.",
  alternates: { canonical: absoluteUrl("/realizace-zahrad/") },
};

const UMIME = [
  {
    nazev: "Terénní úpravy",
    text: "Modelace terénu, svahy, zpevněné plochy a přípravné práce.",
  },
  {
    nazev: "Výsadby dřevin a trvalek",
    text: "Trvalkové záhony a dřeviny, které mění zahradu s ročními obdobími.",
  },
  {
    nazev: "Trávníky",
    text: "Výsev travních ploch i pokládka travních koberců.",
  },
  {
    nazev: "Dřevo, kámen, kov a voda",
    text: "Suché zídky, pražcové schody, štěrkové záhony, vodní prvky.",
  },
];

export default function RealizaceZahrad() {
  const promena = PROMENY[1];
  return (
    <>
      <section>
        <Container className="py-14 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="Realizace"
            title="Realizace zahrad"
            lead="Po vyhotovení projektu následuje samotná realizace. S naším týmem se vždy snažíme odvést tu nejlepší práci, abyste se ve Vaší zahradě cítili opravdu příjemně."
          />
        </Container>
      </section>

      <section className="border-y border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Co všechno umíme"
            title="Od hrubého terénu po poslední rostlinu"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {UMIME.map((u, i) => (
              <Reveal key={u.nazev} delay={i * 80}>
                <div className="h-full rounded-card border border-line bg-paper p-6 shadow-soft">
                  <h3 className="font-semibold text-ink">{u.nazev}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {u.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Proměna před/po */}
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Proměna"
            title="Stejné místo, jiná zahrada"
            lead="Kruhové posezení od založení záhonů po vzrostlou zahradu — táhněte posuvníkem."
          />
          <div className="mx-auto mt-10 max-w-4xl">
            <BeforeAfter
              pred={promena.pred}
              po={promena.po}
              altPred={promena.altPred}
              altPo={promena.altPo}
              popisek={promena.popisek}
            />
          </div>
        </Container>
      </section>

      {/* Ukázky prací */}
      <section className="border-y border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Z našich realizací" title="Kousek po kousku" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                {
                  name: "nova-zahrada-terasa",
                  alt: "Čerstvě založená zahrada s namulčovanými záhony a mlatovou cestou",
                },
                {
                  name: "predzahradka-gabiony-vysadba",
                  alt: "Nově osázená předzahrádka s tvarovaným stromkem u gabionového plotu",
                },
                {
                  name: "dvorek-lavicky",
                  alt: "Proměněný vnitroblok s lavičkami a novými výsadbami",
                },
                {
                  name: "sucha-zidka-stavba",
                  alt: "Ručně skládaná suchá zídka z lomového kamene",
                },
              ] as const
            ).map((f, i) => (
              <Reveal key={f.name} delay={i * 70}>
                <Photo
                  name={f.name}
                  alt={f.alt}
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                  className="aspect-[4/3] w-full rounded-card object-cover shadow-soft"
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/galerie/"
              className="font-semibold text-moss-deep underline-offset-4 hover:underline"
            >
              Více fotek v galerii →
            </Link>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Jak to probíhá" title="Čtyři kroky k hotové zahradě" />
          <div className="mt-10">
            <ProcessSteps highlight={[3]} />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Časté otázky"
              title="Na co se ptáte nejčastěji"
            />
            <FaqList items={FAQ_REALIZACE} />
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/kontakt/?sluzba=realizace#poptavka"
              className="inline-block rounded-full bg-moss px-8 py-4 font-semibold text-white shadow-lift transition-colors hover:bg-moss-deep"
            >
              Poptat realizaci zahrady
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
