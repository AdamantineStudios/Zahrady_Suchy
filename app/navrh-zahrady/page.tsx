import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/config";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProcessSteps from "@/components/ProcessSteps";
import FaqList from "@/components/FaqList";
import { FAQ_NAVRH } from "@/data/faq";

export const metadata: Metadata = {
  title: "Návrh zahrady",
  description:
    "Návrhy zahrad v Českých Budějovicích a Jihočeském kraji. Projekt, díky kterému si představíte svou budoucí zahradu — a společně ho doladíme podle Vašich představ.",
  alternates: { canonical: absoluteUrl("/navrh-zahrady/") },
};

export default function NavrhZahrady() {
  return (
    <>
      <section>
        <Container className="py-14 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="Projekce"
            title="Návrh zahrady"
            lead="Každé realizaci předchází projekt, díky kterému si lépe dokážete představit, jak bude Vaše zahrada vypadat. V tomto kroku je možné diskutovat o různých změnách a úpravách, aby výsledek naplňoval co nejvěrněji Vaše představy."
          />
        </Container>
      </section>

      {/* Ukázka návrhu + realizovaný detail */}
      <section className="border-y border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <figure className="rounded-card border border-line bg-paper p-5 shadow-soft">
                <Photo
                  name="navrh-zahrady-plan"
                  alt="Situační návrh zahrady u rodinného domu s terasou, vodní plochou a trávníkem"
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="mx-auto w-full max-w-[640px] rounded-lg"
                />
                <figcaption className="mt-4 text-sm text-muted">
                  Ukázka situačního návrhu zahrady u rodinného domu — sauna,
                  vodní plocha, dřevěná terasa i cesta z pražců.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <figure>
                <Photo
                  name="prazcove-schody-detail"
                  alt="Detail schodů z dubových pražců s kamennou výplní"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[4/3] w-full rounded-card object-cover shadow-lift"
                />
                <figcaption className="mt-4 text-sm text-muted">
                  …a takhle vypadá cesta z pražců v jedné z našich realizací.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mt-14 max-w-2xl">
            <h2 className="font-display text-2xl font-medium text-ink">
              Co v návrhu řešíme
            </h2>
            <ul className="mt-5 grid gap-3 text-muted sm:grid-cols-2">
              {[
                "rozvržení ploch, cest a posezení",
                "terasy, vodní prvky a zahradní stavby",
                "osazovací plán dřevin a trvalek",
                "trávník — výsev, nebo travní koberec",
                "materiály: dřevo, kámen, kov, voda",
                "úpravy návrhu podle Vašich připomínek",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-olive"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Kde v procesu jsme"
            title="Návrh je začátek cesty"
          />
          <div className="mt-10">
            <ProcessSteps highlight={[1, 2]} />
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
            <FaqList items={FAQ_NAVRH} />
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/kontakt/?sluzba=navrh#poptavka"
              className="inline-block rounded-full bg-moss px-8 py-4 font-semibold text-white shadow-lift transition-colors hover:bg-moss-deep"
            >
              Poptat návrh zahrady
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
