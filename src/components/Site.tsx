import type { ReactNode } from "react";
import { SITE, withBase } from "@/config";
import Photo, { ratio, type PhotoName } from "@/components/Photo";
import ZsMark from "@/components/ZsMark";
import ZsWordmark from "@/components/ZsWordmark";

/*
 * Kostra každé stránky podle kitu taste-skill: pevná lišta (nav-centre),
 * <main> se sekcemi, poslední obrazovka footer.closing (close-photo na tmavém
 * podkladu) a na telefonu akční lišta. Vše je statický HTML — chování
 * (mobilní menu, lišta) přidává po načtení system.js z kitu.
 * Odkazy jsou obyčejné <a> (celé načtení stránky), proto withBase().
 */

export type PageKey = "uvod" | "navrh" | "realizace" | "udrzba" | "galerie" | "kontakt";

const NAV: { key: PageKey; href: string; label: string }[] = [
  { key: "navrh", href: "/navrh-zahrady/", label: "Návrh" },
  { key: "realizace", href: "/realizace-zahrad/", label: "Realizace" },
  { key: "udrzba", href: "/udrzba-zelene/", label: "Údržba" },
  { key: "galerie", href: "/galerie/", label: "Galerie" },
  { key: "kontakt", href: "/kontakt/", label: "Kontakt" },
];

/** Hlavní akce webu — všude stejnými slovy (lišta, hero, závěr, akční lišta). */
export const AKCE = { label: "Domluvit schůzku", href: "/kontakt/#poptavka" };
export const ZAVOLAT = { label: `Zavolat ${SITE.telefon.replace("+420 ", "")}`, href: `tel:${SITE.telefonHref}` };

function Logo() {
  return (
    <a className="nav__logo" href={withBase("/")} aria-label="Zahrady Suchý — úvodní stránka">
      <ZsMark className="zs-mark" />
      <ZsWordmark className="zs-wordmark" />
    </a>
  );
}

function SiteHeader({ current }: { current?: PageKey }) {
  return (
    <header className="nav nav--centre">
      <a className="skip-link" href="#obsah">
        Přeskočit na obsah
      </a>
      <div className="wrap nav__bar">
        <Logo />
        <nav className="nav__links" aria-label="Hlavní navigace">
          {NAV.map((item) => (
            <div className="nav__item" key={item.key}>
              <a
                className="nav__link"
                href={withBase(item.href)}
                aria-current={current === item.key ? "page" : undefined}
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary" href={withBase(AKCE.href)}>
            {AKCE.label}
          </a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export type Close = { foto: PhotoName; alt: string; pos?: string };

/** Závěrečná fotka: na počítači pruh přes obsah, na telefonu ořez do rámečku ~342 × 380 px. */
function closeSizes(foto: PhotoName): string {
  const phone = Math.ceil(Math.max(342, 380 * ratio(foto)) / 20) * 20;
  return `(min-width: 1280px) 1280px, (min-width: 640px) 100vw, ${phone}px`;
}

function Closing({ close }: { close: Close }) {
  return (
    <footer className="footer closing footer--dark ground-inverse" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--photo">
          <div className="section-head--split">
            <div>
              <h2 id="close-h">Pojďme se potkat nad Vaší zahradou</h2>
              <p className="t-lead">
                Všechno začíná nezávaznou schůzkou u Vás na zahradě. Probereme Vaše představy a
                možnosti, jak je uskutečnit.
              </p>
            </div>
            <a className="btn btn--primary" href={withBase(AKCE.href)}>
              {AKCE.label}
            </a>
          </div>
          <div className="close__media">
            <Photo
              name={close.foto}
              alt={close.alt}
              sizes={closeSizes(close.foto)}
              style={close.pos ? ({ "--pos": close.pos } as React.CSSProperties) : undefined}
            />
          </div>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <Logo />
              <p className="footer__lede">
                Návrhy, realizace a údržba zahrad. Z Českých Budějovic pro celý Jihočeský kraj.
              </p>
            </div>
            <div className="span-2 footer__col">
              <h3>Služby</h3>
              <ul>
                <li><a href={withBase("/navrh-zahrady/")}>Návrh zahrady</a></li>
                <li><a href={withBase("/realizace-zahrad/")}>Realizace zahrad</a></li>
                <li><a href={withBase("/udrzba-zelene/")}>Údržba zeleně</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Na webu</h3>
              <ul>
                <li><a href={withBase("/galerie/")}>Galerie</a></li>
                <li><a href={withBase("/kontakt/")}>Kontakt</a></li>
              </ul>
            </div>
            <div className="span-4 footer__col">
              <h3>Kontakt</h3>
              <ul>
                <li><a href={`tel:${SITE.telefonHref}`}>{SITE.telefon}</a></li>
                <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li>České Budějovice a celý Jihočeský kraj</li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>
              {SITE.legalName} · IČO {SITE.ico} · {SITE.adresa.ulice}, {SITE.adresa.mesto}
            </span>
            <span>© {new Date().getFullYear()} {SITE.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ActionBar() {
  return (
    <nav className="actionbar" aria-label="Rychlé akce">
      <a className="btn btn--secondary" href={ZAVOLAT.href}>
        Zavolat
      </a>
      <a className="btn btn--primary" href={withBase(AKCE.href)}>
        {AKCE.label}
      </a>
    </nav>
  );
}

export default function Site({
  current,
  close,
  children,
}: {
  current?: PageKey;
  close: Close;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader current={current} />
      <main id="obsah">{children}</main>
      <Closing close={close} />
      <ActionBar />
    </>
  );
}
