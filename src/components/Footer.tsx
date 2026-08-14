import Link from "next/link";
import { SITE } from "@/config";
import ZsMark from "@/components/ZsMark";
import ZsWordmark from "@/components/ZsWordmark";

const NAV = [
  { href: "/navrh-zahrady/", label: "Návrh zahrady" },
  { href: "/realizace-zahrad/", label: "Realizace zahrad" },
  { href: "/udrzba-zelene/", label: "Údržba zeleně" },
  { href: "/galerie/", label: "Galerie" },
  { href: "/kontakt/", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <ZsMark className="h-9 w-9 text-olive" />
              <ZsWordmark className="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Návrhy, realizace a údržba zahrad. Z Českých Budějovic pro celý
              Jihočeský kraj.
            </p>
          </div>

          <nav aria-label="Patičková navigace">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/60">
              Na webu
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/85 underline-offset-4 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/60">
              Kontakt
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${SITE.telefonHref}`}
                  className="text-cream/85 underline-offset-4 hover:text-white hover:underline"
                >
                  {SITE.telefon}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-cream/85 underline-offset-4 hover:text-white hover:underline"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="pt-1 text-cream/70">
                {SITE.mesto} · působíme po celém Jihočeském kraji
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            {SITE.legalName} · IČO {SITE.ico} · {SITE.adresa.ulice},{" "}
            {SITE.adresa.mesto}
          </p>
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
