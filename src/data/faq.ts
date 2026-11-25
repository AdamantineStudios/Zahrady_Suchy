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
      "Schůzkou přímo u Vás. Projdeme si pozemek, probereme Vaše představy a možnosti, jak je uskutečnit. Teprve potom vzniká návrh.",
  },
  {
    otazka: "Můžu do návrhu mluvit?",
    odpoved:
      "Ano, od toho návrh je. Nad projektem společně probereme změny a úpravy, aby výsledek co nejvěrněji naplňoval Vaše představy.",
  },
  {
    otazka: "Kolik návrh zahrady stojí?",
    odpoved:
      "Záleží na velikosti pozemku a rozsahu návrhu. Cenu Vám rádi upřesníme podle konkrétní zahrady — zavolejte nebo napište.",
  },
  {
    otazka: "Kde zahrady navrhujete?",
    odpoved: "V Českých Budějovicích a po celém Jihočeském kraji.",
  },
  {
    otazka: "Zahradu podle návrhu i založíte?",
    odpoved:
      "Ano. Po vyhotovení projektu následuje realizace: terénní úpravy, výsadby, trávníky i práce se dřevem, kamenem, kovem a vodou.",
  },
];

export const FAQ_REALIZACE: FaqItem[] = [
  {
    otazka: "Kde všude realizujete?",
    odpoved: "Po celém Jihočeském kraji. Jsme z Českých Budějovic.",
  },
  {
    otazka: "Musím mít hotový návrh?",
    odpoved:
      "Ne, návrh Vám rádi připravíme. Realizaci ale vždy předchází projekt, díky kterému si výsledek dopředu představíte.",
  },
  {
    otazka: "Kolik realizace zahrady stojí?",
    odpoved:
      "Cena se odvíjí od rozsahu prací a materiálů. Po schůzce a návrhu dostanete konkrétní nabídku.",
  },
  {
    otazka: "Upravíte i zahradu ve svahu?",
    odpoved:
      "Ano. Terénní úpravy ve svahu i zpevněné plochy do něj zapuštěné patří k naší práci — jednu takovou proměnu vidíte výše.",
  },
  {
    otazka: "Postaráte se o zahradu i po dokončení?",
    odpoved:
      "Ano. Hotovou zahradu můžeme dlouhodobě udržovat, aby zůstala svěží a plná rozkvetlých rostlin.",
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
      "Podle typu zahrady a ročního období. Na frekvenci se domluvíme individuálně, od jednorázových zásahů po pravidelnou péči.",
  },
  {
    otazka: "Co všechno údržba zahrnuje?",
    odpoved:
      "Péči o trvalkové záhony a trávník, řez keřů a stromů i sezónní práce. Rozsah přizpůsobíme tomu, co Vaše zahrada zrovna potřebuje.",
  },
  {
    otazka: "Kácíte i vzrostlé stromy na zahradě?",
    odpoved:
      "Ano. Tam, kde už strom nejde zachovat, ho postupně pokácíme. Jindy stačí výškový nebo udržovací řez.",
  },
  {
    otazka: "Kde údržbu zeleně nabízíte?",
    odpoved: "V Českých Budějovicích a po celém Jihočeském kraji.",
  },
];
