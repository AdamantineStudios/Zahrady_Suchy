import type { PhotoName } from "@/components/Photo";

export type Sluzba = {
  slug: "navrh-zahrady" | "realizace-zahrad" | "udrzba-zelene";
  nazev: string;
  /** Původní text z první verze webu (2022) — ponechán doslova. */
  kratky: string;
  foto: PhotoName;
  fotoAlt: string;
};

/** Pořadí v poli = pořadí karet na úvodní stránce. */
export const SLUZBY: Sluzba[] = [
  {
    slug: "navrh-zahrady",
    nazev: "Návrh zahrady",
    kratky:
      "Každé realizaci předchází projekt, díky kterému si lépe dokážete představit, jak bude Vaše zahrada vypadat. V tomto kroku je možné diskutovat o různých změnách a úpravách, aby výsledek naplňoval co nejvěrněji Vaše představy.",
    foto: "navrh-zahrady-plan",
    fotoAlt:
      "Situační návrh zahrady u rodinného domu s terasou, vodní plochou a trávníkem",
  },
  {
    slug: "realizace-zahrad",
    nazev: "Realizace zahrad",
    kratky:
      "Po vyhotovení projektu následuje samotná realizace. S naším týmem se vždy snažíme odvést tu nejlepší práci, abyste se ve Vaší zahradě cítili opravdu příjemně.",
    foto: "nova-zahrada-terasa",
    fotoAlt:
      "Čerstvě založená zahrada — namulčované záhony a připravená plocha pro trávník",
  },
  {
    slug: "udrzba-zelene",
    nazev: "Údržba zeleně",
    kratky:
      "Založením trávníku a vysázením rostlin péče o zahradu nekončí. Jsme připraveni Vám pomoci dlouhodobě s Vaší zahradou. Pravidelná údržba zeleně prodlužuje životnost Vaší zahrady, aby byla stále svěží a plná rozkvetlých rostlin.",
    foto: "rez-stromu-vyska",
    fotoAlt: "Výškový řez borovice z žebříku",
  },
];
