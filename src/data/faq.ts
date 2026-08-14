export type FaqItem = { otazka: string; odpoved: string };

/**
 * Odpovědi drží jen to, co web opravdu slibuje: schůzka na začátku,
 * návrh před realizací, působnost v Jihočeském kraji, cena na dotaz.
 * Žádná smyšlená čísla ani termíny.
 */
export const FAQ_NAVRH: FaqItem[] = [
  {
    otazka: "Jak celý proces začíná?",
    odpoved:
      "Schůzkou přímo u Vás. Projdeme si pozemek, probereme Vaše představy a možnosti, jak je uskutečnit. Teprve potom vzniká návrh.",
  },
  {
    otazka: "Můžu do návrhu mluvit?",
    odpoved:
      "Určitě — od toho je. Nad návrhem společně diskutujeme o změnách a úpravách, aby výsledek co nejvěrněji naplňoval Vaše představy.",
  },
  {
    otazka: "Kolik návrh stojí?",
    odpoved:
      "Záleží na velikosti pozemku a rozsahu. Napište nebo zavolejte — cenu Vám rádi upřesníme na základě konkrétní situace.",
  },
];

export const FAQ_REALIZACE: FaqItem[] = [
  {
    otazka: "Kde všude realizujete?",
    odpoved:
      "Jsme z Českých Budějovic a pracujeme po celém Jihočeském kraji.",
  },
  {
    otazka: "Musím mít hotový návrh?",
    odpoved:
      "Realizaci vždy předchází projekt — pomůže Vám představit si výsledek a nám odvést práci přesně podle Vašich představ. Návrh pro Vás rádi připravíme.",
  },
  {
    otazka: "Kolik realizace stojí?",
    odpoved:
      "Cena se odvíjí od rozsahu prací a materiálů. Po schůzce a návrhu dostanete konkrétní nabídku.",
  },
];

export const FAQ_UDRZBA: FaqItem[] = [
  {
    otazka: "Staráte se i o zahrady, které jste nezakládali?",
    odpoved:
      "Ano. Ozvěte se nám, domluvíme si schůzku a probereme, co Vaše zahrada potřebuje.",
  },
  {
    otazka: "Jak často má údržba probíhat?",
    odpoved:
      "Podle typu zahrady a ročního období — na frekvenci se domluvíme individuálně, od jednorázových zásahů po pravidelnou péči.",
  },
  {
    otazka: "Co všechno údržba zahrnuje?",
    odpoved:
      "Péči o trvalkové záhony a trávník, řez keřů a stromů i sezónní práce. Rozsah přizpůsobíme tomu, co Vaše zahrada zrovna potřebuje.",
  },
];
