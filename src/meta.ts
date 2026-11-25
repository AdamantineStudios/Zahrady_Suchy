import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/config";

/** Titulek úvodní stránky — zároveň výchozí titulek náhledu při sdílení. */
export const HOME_TITLE = `${SITE.name} — návrhy, realizace a údržba zahrad`;

/** Společný základ náhledu při sdílení odkazu (Facebook, WhatsApp, Messenger…). */
export const OG_BASE = {
  type: "website" as const,
  siteName: SITE.name,
  locale: "cs_CZ",
  images: [{ url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: SITE.name }],
};

/**
 * Metadata jedné stránky: titulek, popis, kanonická adresa a náhled při sdílení.
 * Next.js objekt openGraph z layoutu celý nahradí, nedoplní ho — bez toho by každá
 * podstránka sdílela titulek a popis úvodní stránky.
 */
export function stranka({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { ...OG_BASE, title: title ? `${title} · ${SITE.name}` : HOME_TITLE, description, url: absoluteUrl(path) },
  };
}
