import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/config";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";
import { FAQ_UDRZBA } from "@/data/faq";

export const metadata: Metadata = {
  title: "Údržba zeleně",
  description:
    "Údržba zeleně v Českých Budějovicích a Jihočeském kraji — péče o trvalkové záhony a trávníky, řez keřů, řez a kácení stromů. Pravidelně i jednorázově.",
  alternates: { canonical: absoluteUrl("/udrzba-zelene/") },
};

const PECE = [
  {
    nazev: "Záhony a trvalky",
    text: "Jarní a podzimní řezy, odplevelení, mulčování a doplnění výsadeb.",
  },
  {
    nazev: "Trávník",
    text: "Pravidelná péče, aby trávník zůstal hustý a svěží.",
  },
  {
    nazev: "Keře a živé ploty",
    text: "Udržovací a tvarovací řezy v pravý čas.",
  },
  {
    nazev: "Stromy",
    text: "Výškové řezy i postupné kácení tam, kde už strom nejde zachovat.",
  },
];

export default function UdrzbaZelene() {
  return (
    <>
      <section>
        <Container className="py-14 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="Údržba"
            title="Údržba zeleně"
            lead="Založením trávníku a vysázením rostlin péče o zahradu nekončí. Jsme připraveni Vám pomoci dlouhodobě s Vaší zahradou. Pravidelná údržba zeleně prodlužuje životnost Vaší zahrady, aby byla stále svěží a plná rozkvetlých rostlin."
          />
        </Container>
      </section>

      <section className="border-y border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Co údržba zahrnuje"
                title="Péče, která zahradě prodlužuje život"
              />
              <ul className="mt-8 space-y-5">
                {PECE.map((p) => (
                  <li key={p.nazev} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-olive"
                    />
                    <div>
                      <h3 className="font-semibold text-ink">{p.nazev}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {p.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                <Photo
                  name="rez-stromu-vyska"
                  alt="Výškový řez borovice z žebříku"
                  sizes="(min-width: 1024px) 22rem, 45vw"
                  className="w-full rounded-card object-cover shadow-lift"
                />
                <Photo
                  name="kaceni-jehlicnanu"
                  alt="Postupné kácení jehličnanu"
                  sizes="(min-width: 1024px) 22rem, 45vw"
                  className="w-full rounded-card object-cover shadow-lift"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <Photo
                name="chodnik-zahony-trvalek"
                alt="Dlážděný chodník mezi udržovanými záhony trvalek"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
              />
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Zahrada v péči"
                title="Aby kvetla i za pět let"
              />
              <p className="mt-6 leading-relaxed text-muted">
                Zahrada je živá — a s dobrou péčí každým rokem krásnější.
                Domluvíme se na pravidelné údržbě, nebo přijedeme jednorázově,
                když zahrada potřebuje větší zásah.
              </p>
            </Reveal>
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
            <FaqList items={FAQ_UDRZBA} />
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/kontakt/?sluzba=udrzba#poptavka"
              className="inline-block rounded-full bg-moss px-8 py-4 font-semibold text-white shadow-lift transition-colors hover:bg-moss-deep"
            >
              Poptat údržbu zeleně
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
