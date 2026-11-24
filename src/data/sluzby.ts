export type Sluzba = {
  slug: "navrh-zahrady" | "realizace-zahrad" | "udrzba-zelene";
  nazev: string;
  /** Jeden řádek do seznamu služeb na úvodní stránce. */
  radek: string;
  /** Původní text z první verze webu (2022) — ponechán doslova, perex stránky služby. */
  kratky: string;
};

/** Pořadí v poli = pořadí řádků na úvodní stránce. */
export const SLUZBY: Sluzba[] = [
  {
    slug: "navrh-zahrady",
    nazev: "Návrh zahrady",
    radek: "Projekt, díky kterému si lépe představíte, jak bude Vaše zahrada vypadat.",
    kratky:
      "Každé realizaci předchází projekt, díky kterému si lépe dokážete představit, jak bude Vaše zahrada vypadat. V tomto kroku je možné diskutovat o různých změnách a úpravách, aby výsledek naplňoval co nejvěrněji Vaše představy.",
  },
  {
    slug: "realizace-zahrad",
    nazev: "Realizace zahrad",
    radek: "Terénní úpravy, výsadby, trávníky i práce se dřevem, kamenem, kovem a vodou.",
    kratky:
      "Po vyhotovení projektu následuje samotná realizace. S naším týmem se vždy snažíme odvést tu nejlepší práci, abyste se ve Vaší zahradě cítili opravdu příjemně.",
  },
  {
    slug: "udrzba-zelene",
    nazev: "Údržba zeleně",
    radek: "Pravidelná péče, aby zahrada zůstala svěží a plná rozkvetlých rostlin.",
    kratky:
      "Založením trávníku a vysázením rostlin péče o zahradu nekončí. Jsme připraveni Vám pomoci dlouhodobě s Vaší zahradou. Pravidelná údržba zeleně prodlužuje životnost Vaší zahrady, aby byla stále svěží a plná rozkvetlých rostlin.",
  },
];
