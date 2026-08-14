import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/config";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import GalerieClient from "@/components/GalerieClient";
import BeforeAfter from "@/components/BeforeAfter";
import { KATEGORIE, PROMENY } from "@/data/galerie";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotogalerie zahrad, které jsme navrhli, založili nebo o ně pečujeme — hotové zahrady, záhony a výsadby, práce s kamenem a dřevem, proměny před a po.",
  alternates: { canonical: absoluteUrl("/galerie/") },
};

export default function Galerie() {
  return (
    <>
      <section>
        <Container className="py-14 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="Galerie"
            title="Naše práce v obrazech"
            lead="Všechny fotky jsou z našich zahrad v Jihočeském kraji — žádná ilustrační, žádná z fotobanky."
          />
          <nav aria-label="Kategorie galerie" className="mt-8 flex flex-wrap gap-2">
            {[...KATEGORIE.map((k) => ({ id: k.id, nazev: k.nazev })), { id: "promeny", nazev: "Před a po" }].map(
              (k) => (
                <a
                  key={k.id}
                  href={`#${k.id}`}
                  className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-moss hover:text-ink"
                >
                  {k.nazev}
                </a>
              ),
            )}
          </nav>
        </Container>
      </section>

      <section className="border-t border-line bg-sunken/30">
        <Container className="pb-16 pt-4 sm:pb-20">
          <GalerieClient />

          {/* Proměny — před a po */}
          <section
            id="promeny"
            aria-labelledby="galerie-promeny"
            className="scroll-mt-24 py-8"
          >
            <h2
              id="galerie-promeny"
              className="font-display text-2xl font-medium text-ink"
            >
              Před a po
            </h2>
            <p className="mt-1 max-w-2xl text-muted">
              Stejné místo, stejný úhel — jen s odstupem času. Táhněte
              posuvníkem.
            </p>
            <div className="mt-6 grid gap-10 lg:grid-cols-2">
              {PROMENY.map((p) => (
                <BeforeAfter
                  key={p.pred}
                  pred={p.pred}
                  po={p.po}
                  altPred={p.altPred}
                  altPo={p.altPo}
                  popisek={p.popisek}
                  sizes="(min-width: 1024px) 34rem, 100vw"
                />
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-card border border-line bg-paper p-8 text-center shadow-soft">
            <h2 className="font-display text-2xl font-medium text-ink">
              Chcete podobnou zahradu?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Napište nám, co se Vám v galerii líbilo — bude to dobrý začátek
              první schůzky.
            </p>
            <Link
              href="/kontakt/#poptavka"
              className="mt-6 inline-block rounded-full bg-moss px-8 py-3.5 font-semibold text-white shadow-soft transition-colors hover:bg-moss-deep"
            >
              Nezávazná poptávka
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
