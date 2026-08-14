import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/config";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt na Zahrady Suchý — Ing. Šimon Suchý, České Budějovice. Telefon, e-mail a nezávazná poptávka návrhu, realizace nebo údržby zahrady.",
  alternates: { canonical: absoluteUrl("/kontakt/") },
};

export default function Kontakt() {
  return (
    <>
      <section>
        <Container className="py-14 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="Kontakt"
            title="Domluvme si schůzku na Vaší zahradě"
            lead="Zavolejte, napište, nebo pošlete poptávku formulářem níže — ozveme se Vám co nejdřív."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a
              href={`tel:${SITE.telefonHref}`}
              className="group rounded-card border border-line bg-paper p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-deep">
                Telefon
              </p>
              <p className="mt-2 text-lg font-semibold text-ink group-hover:underline group-hover:underline-offset-4">
                {SITE.telefon}
              </p>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="group rounded-card border border-line bg-paper p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-deep">
                E-mail
              </p>
              <p className="mt-2 break-all text-lg font-semibold text-ink group-hover:underline group-hover:underline-offset-4">
                {SITE.email}
              </p>
            </a>
            <div className="rounded-card border border-line bg-paper p-6 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss-deep">
                Kde působíme
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">
                {SITE.mesto} a celý Jihočeský kraj
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Kdo jsem — osobní část z původního webu, doslova (s opravou překlepů) */}
      <section className="border-y border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <Photo
                name="schody-prazce-balvany"
                alt="Schody z dubových pražců mezi balvany — ukázka práce Zahrad Suchý"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
              />
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading eyebrow="Kdo jsem" title="Ing. Šimon Suchý" />
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                <p>
                  Svá studia jsem prožil na Moravě. Na Zahradnické fakultě
                  Mendelovy univerzity v Brně jsem získal inženýrský titul v
                  oboru zahradní a krajinné realizace v programu Zahradní a
                  krajinné architektury. Moje srdce však patří do jižních Čech.
                  Miluju naši krajinu a přírodu, ze které čerpám inspiraci při
                  tvorbě zahrad.
                </p>
                <p>
                  Tvorba zahrad je nejen prací, ale i vášní a zálibou. Rád se
                  postavím novým výzvám, které skýtají neotřelé požadavky
                  klientů.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Poptávka */}
      <section id="poptavka" className="scroll-mt-24">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Poptávka"
            title="Napište nám o Vaší zahradě"
            lead="Formulář Vám připraví e-mail — odešlete ho ze své poštovní aplikace, žádná data se neukládají na serveru."
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Fakturační údaje + soukromí */}
      <section className="border-t border-line">
        <Container className="py-10">
          <div className="grid gap-6 text-sm text-muted sm:grid-cols-2">
            <div>
              <h2 className="font-semibold text-ink">Fakturační údaje</h2>
              <p className="mt-2">
                {SITE.legalName}
                <br />
                {SITE.adresa.ulice}, {SITE.adresa.mesto}
                <br />
                IČO {SITE.ico}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-ink">Soukromí</h2>
              <p className="mt-2">
                Tento web nepoužívá cookies ani analytiku. Poptávka odchází
                jako obyčejný e-mail z Vaší poštovní aplikace — nic se
                neukládá u nás ani u třetích stran.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
