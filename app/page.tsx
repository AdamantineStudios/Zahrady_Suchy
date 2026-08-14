import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/config";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProcessSteps from "@/components/ProcessSteps";
import { SLUZBY } from "@/data/sluzby";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

const GALERIE_TEASER = [
  {
    name: "zahrada-trvalky-podzim",
    alt: "Vzrostlá zahrada na podzim s astrami a travami",
  },
  { name: "zahon-denivky-detail", alt: "Kvetoucí záhon s denivkami u domu" },
  { name: "sterkovy-zahon-balvany", alt: "Štěrková zahrada s žulovými balvany" },
  { name: "posezeni-pod-brizou", alt: "Posezení pod břízou v nové zahradě" },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero — fotka přes celou šířku, původní slogan z roku 2022 */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <Photo
          name="zahrada-trvalky-podzim"
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent"
        />
        <Container className="pb-16 pt-40 sm:pb-24">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-olive" />
            Zahradnická firma · České Budějovice
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Zahrada. Místo nekonečných možností.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            Stačí je objevit. Dovolte nám být u toho s Vámi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt/#poptavka"
              className="rounded-full bg-moss px-7 py-3.5 font-semibold text-white shadow-lift transition-colors hover:bg-moss-deep"
            >
              Nezávazná poptávka
            </Link>
            <Link
              href="/galerie/"
              className="rounded-full border-2 border-white/80 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/15"
            >
              Prohlédnout galerii
            </Link>
          </div>
        </Container>
      </section>

      {/* O nás — původní text doslova */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <SectionHeading
                eyebrow="O nás"
                title="Zahrada jako další část Vašeho bydlení"
              />
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                <p>
                  Jsme firma z Českých Budějovic, odraz naší práce však můžete
                  vidět po celém Jihočeském kraji. Věnujeme se návrhům,
                  realizacím a údržbám zahrad. Při realizacích zahrad se
                  zabýváme terénními úpravami, výsadbou dřevin a trvalkových
                  záhonů, výsevem travních ploch, či pokládkou travních
                  koberců. Máme zkušenosti také s prací se dřevem, kamenem,
                  kovem a vodou.
                </p>
                <p>
                  Naším cílem je vytvořit z Vaší zahrady další část Vašeho
                  bydlení, kde budete trávit Váš volný čas s rodinou a
                  odpočívat po dlouhém pracovním dni. Uvědomujeme si, že každý
                  klient je jedinečný, a proto každé realizaci předchází
                  schůzka, na které prodiskutujeme Vaše představy a možnosti,
                  jak je uskutečnit.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-olive-soft"
                />
                <Photo
                  name="posezeni-pod-brizou"
                  alt="Posezení pod břízou obklopené čerstvě osázenými záhony"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Služby */}
      <section className="border-y border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Naše služby"
            title="Od první čáry v návrhu po pravidelnou péči"
            lead="Zahradu s Vámi projdeme celou cestou — návrh, realizace i dlouhodobá údržba."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SLUZBY.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper shadow-soft transition-shadow hover:shadow-lift">
                  <div className="overflow-hidden">
                    <Photo
                      name={s.foto}
                      alt={s.fotoAlt}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-medium text-ink">
                      <Link
                        href={`/${s.slug}/`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {s.nazev}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {s.kratky}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-4 text-sm font-semibold text-moss-deep"
                    >
                      Více o službě →
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Jak pracujeme */}
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Jak pracujeme"
            title="Čtyři kroky k Vaší zahradě"
            lead="Každý klient je jedinečný — proto všechno začíná schůzkou u Vás na zahradě."
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      {/* Dřevo, kámen, kov a voda — cik-cak pás */}
      <section className="border-y border-line bg-sunken/50">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <Photo
                name="schody-prazce-balvany"
                alt="Schody z dubových pražců mezi balvany nad kamennou zdí"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
              />
            </Reveal>
            <Reveal delay={120} className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="Řemeslo"
                title="Dřevo, kámen, kov a voda"
              />
              <p className="mt-6 leading-relaxed text-muted">
                Zahrada nejsou jen rostliny. Schody z dubových pražců, ručně
                skládané suché zídky, štěrkové záhony s balvany — přírodní
                materiály dávají zahradě tvar a charakter, který s lety jen
                získává.
              </p>
              <Link
                href="/galerie/#kamen-a-drevo"
                className="mt-6 inline-block font-semibold text-moss-deep underline-offset-4 hover:underline"
              >
                Ukázky práce s kamenem a dřevem →
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="Výsadby" title="Záhony, které kvetou celý rok" />
              <p className="mt-6 leading-relaxed text-muted">
                Trvalkové záhony skládáme tak, aby zahrada měnila barvy s
                ročními obdobími — od jarních cibulovin po podzimní astry a
                trávy zlátnoucí do zimy.
              </p>
              <Link
                href="/galerie/#vysadby"
                className="mt-6 inline-block font-semibold text-moss-deep underline-offset-4 hover:underline"
              >
                Prohlédnout výsadby →
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <Photo
                name="sterkovy-zahon-balvany"
                alt="Štěrková zahrada s žulovými balvany a šlapákovou cestou"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Galerie teaser */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Galerie"
              title="Naše práce v obrazech"
            />
            <Link
              href="/galerie/"
              className="font-semibold text-moss-deep underline-offset-4 hover:underline"
            >
              Celá galerie →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GALERIE_TEASER.map((f, i) => (
              <Reveal key={f.name} delay={i * 70}>
                <Link href="/galerie/" className="group block overflow-hidden rounded-card shadow-soft">
                  <Photo
                    name={f.name}
                    alt={f.alt}
                    sizes="(min-width: 1024px) 22rem, 45vw"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Závěrečné CTA */}
      <section className="relative isolate overflow-hidden bg-ink grain">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium text-cream sm:text-4xl">
            Pojďme se potkat nad Vaší zahradou
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/80">
            Všechno začíná nezávaznou schůzkou u Vás. Probereme Vaše představy
            a možnosti, jak je uskutečnit.
          </p>
          <Link
            href="/kontakt/#poptavka"
            className="mt-8 inline-block rounded-full bg-olive px-8 py-4 font-semibold text-ink shadow-lift transition-transform hover:scale-[1.03]"
          >
            Napsat poptávku
          </Link>
        </Container>
      </section>
    </>
  );
}
