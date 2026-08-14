export const SITE = {
  name: "Zahrady Suchý",
  /** Fakturační / právní identita (povinné údaje na webu podnikatele). */
  legalName: "Ing. Šimon Suchý",
  ico: "09088644",
  tagline: "Zahrada. Místo nekonečných možností.",
  description:
    "Návrhy, realizace a údržba zahrad v Českých Budějovicích a po celém Jihočeském kraji. Terénní úpravy, výsadby dřevin a trvalek, trávníky i práce se dřevem, kamenem, kovem a vodou.",
  /** E-mail, kam chodí poptávky. Změna = jeden řádek tady. */
  email: "simon@zahradysuchy.cz",
  telefon: "+420 721 050 997",
  telefonHref: "+420721050997",
  adresa: { ulice: "Zahradní 786/19", mesto: "370 05 České Budějovice" },
  mesto: "České Budějovice",
  region: "Jihočeský kraj",
  /** Sociální sítě zatím nejsou — po založení sem stačí doplnit URL. */
  instagram: "",
  facebook: "",
  /** Doména, na které web běží (bez basePath). */
  origin: "https://adamantinestudios.github.io",
} as const;

/** Cesta, pod kterou web běží (GitHub Pages: „/Zahrady_Suchy", vlastní doména: „"). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixuje cestu k souborům v public/, aby fungovala i pod basePath. */
export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** Absolutní URL stránky pro SEO (canonical, sitemap, OG). */
export function absoluteUrl(path: string): string {
  return `${SITE.origin}${BASE_PATH}${path}`;
}
