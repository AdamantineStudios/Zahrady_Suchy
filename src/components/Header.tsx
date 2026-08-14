"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ZsMark from "@/components/ZsMark";
import ZsWordmark from "@/components/ZsWordmark";

const NAV = [
  { href: "/navrh-zahrady/", label: "Návrh zahrady" },
  { href: "/realizace-zahrad/", label: "Realizace" },
  { href: "/udrzba-zelene/", label: "Údržba" },
  { href: "/galerie/", label: "Galerie" },
  { href: "/kontakt/", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Po přechodu na jinou stránku se mobilní menu samo zavře
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink"
          aria-label="Zahrady Suchý — úvodní stránka"
        >
          <ZsMark className="h-9 w-9 text-olive" />
          <ZsWordmark className="h-8 w-auto" />
        </Link>

        <nav aria-label="Hlavní navigace" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-olive-soft text-ink"
                  : "text-muted hover:bg-sunken hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt/#poptavka"
            className="ml-2 rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-moss-deep"
          >
            Poptávka
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sunken md:hidden"
          aria-expanded={open}
          aria-controls="mobilni-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Zavřít menu" : "Otevřít menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobilni-menu"
          aria-label="Mobilní navigace"
          className="border-t border-line bg-cream px-4 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    isActive(item.href)
                      ? "bg-olive-soft text-ink"
                      : "text-muted hover:bg-sunken hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/kontakt/#poptavka"
                className="block rounded-xl bg-moss px-4 py-3 text-center text-base font-semibold text-white hover:bg-moss-deep"
              >
                Nezávazná poptávka
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
