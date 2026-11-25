export type FaqItem = { otazka: string; odpoved: string };

/**
 * Odpovědi drží jen to, co web opravdu slibuje: schůzka na začátku,
 * návrh před realizací, působnost v Jihočeském kraji, cena na dotaz.
 * Žádná smyšlená čísla ani termíny. Otázka do 60 znaků, odpověď do 50 slov
 * a začíná odpovědí (pravidla kitu pro FAQ — odpovědi jsou vždy otevřené).
 */
export const FAQ_NAVRH: FaqItem[] = [
  {
    otazka: "Jak celý proces začíná?",
    odpoved:
      "Schůzkou přímo u\u00a0Vás. Projdeme si pozemek, probereme Vaše představy a\u00a0možnosti, jak je uskutečnit. Teprve potom vzniká návrh.",
  },
  {
    otazka: "Můžu do návrhu mluvit?",
    odpoved:
      "Ano, od toho návrh je. Nad projektem společně probereme změny a\u00a0úpravy, aby výsledek co nejvěrněji naplňoval Vaše představy.",
  },
  {
    otazka: "Kolik návrh zahrady stojí?",
    odpoved:
      "Záleží na velikosti pozemku a\u00a0rozsahu návrhu. Cenu Vám rádi upřesníme podle konkrétní zahrady — zavolejte nebo napište.",
  },
  {
    otazka: "Kde zahrady navrhujete?",
    odpoved: "V\u00a0Českých Budějovicích a\u00a0po celém Jihočeském kraji.",
  },
  {
    otazka: "Zahradu podle návrhu i\u00a0založíte?",
    odpoved:
      "Ano. Po vyhotovení projektu následuje realizace: terénní úpravy, výsadby, trávníky i\u00a0práce se dřevem, kamenem, kovem a\u00a0vodou.",
  },
];

export const FAQ_REALIZACE: FaqItem[] = [
  {
    otazka: "Kde všude realizujete?",
    odpoved: "Po celém Jihočeském kraji. Jsme z\u00a0Českých Budějovic.",
  },
  {
    otazka: "Musím mít hotový návrh?",
    odpoved:
      "Ne, návrh Vám rádi připravíme. Realizaci ale vždy předchází projekt, díky kterému si výsledek dopředu představíte.",
  },
  {
    otazka: "Kolik realizace zahrady stojí?",
    odpoved:
      "Cena se odvíjí od rozsahu prací a\u00a0materiálů. Po schůzce a\u00a0návrhu dostanete konkrétní nabídku.",
  },
  {
    otazka: "Upravíte i\u00a0zahradu ve svahu?",
    odpoved:
      "Ano. Terénní úpravy ve svahu i\u00a0zpevněné plochy do něj zapuštěné patří k\u00a0naší práci — jednu takovou proměnu vidíte výše.",
  },
  {
    otazka: "Postaráte se o\u00a0zahradu i\u00a0po dokončení?",
    odpoved:
      "Ano. Hotovou zahradu můžeme dlouhodobě udržovat, aby zůstala svěží a\u00a0plná rozkvetlých rostlin.",
  },
];

export const FAQ_UDRZBA: FaqItem[] = [
  {
    otazka: "Staráte se i\u00a0o\u00a0zahrady, které jste nezakládali?",
    odpoved:
      "Ano. Ozvěte se nám, domluvíme si schůzku a\u00a0probereme, co Vaše zahrada potřebuje.",
  },
  {
    otazka: "Jak často má údržba probíhat?",
    odpoved:
      "Podle typu zahrady a\u00a0ročního období. Na frekvenci se domluvíme individuálně, od jednorázových zásahů po pravidelnou péči.",
  },
  {
    otazka: "Co všechno údržba zahrnuje?",
    odpoved:
      "Péči o\u00a0trvalkové záhony a\u00a0trávník, řez keřů a\u00a0stromů i\u00a0sezónní práce. Rozsah přizpůsobíme tomu, co Vaše zahrada zrovna potřebuje.",
  },
  {
    otazka: "Kácíte i\u00a0vzrostlé stromy na zahradě?",
    odpoved:
      "Ano. Tam, kde už strom nejde zachovat, ho postupně pokácíme. Jindy stačí výškový nebo udržovací řez.",
  },
  {
    otazka: "Kde údržbu zeleně nabízíte?",
    odpoved: "V\u00a0Českých Budějovicích a\u00a0po celém Jihočeském kraji.",
  },
];
