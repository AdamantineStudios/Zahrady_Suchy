import type { PhotoName } from "@/components/Photo";

export type GalerieKategorie = {
  id: "hotove" | "vysadby" | "kamen-a-drevo";
  nazev: string;
  uvod: string;
  /** Pořadí v poli = pořadí v galerii. Popis (alt) bere z src/data/fotky.ts. */
  fotky: PhotoName[];
};

/**
 * Fotogalerie po kategoriích. Bez popisků pod fotkami — co na fotce je,
 * říká alt text (src/data/fotky.ts). Počty drží plné řady (6, 6, 4).
 * Nová fotka: přidat jméno do kategorie a alt do fotky.ts.
 */
export const KATEGORIE: GalerieKategorie[] = [
  {
    id: "hotove",
    nazev: "Hotové zahrady",
    uvod: "Zahrady, které už žijí svým životem — od posezení po dětské koutky.",
    fotky: [
      "kruhove-posezeni-spalky",
      "zahrada-trvalky-podzim",
      "posezeni-pod-brizou",
      "dvorek-lavicky",
      "detske-hriste-houpacky",
      "predzahradka-slapaky",
    ],
  },
  {
    id: "vysadby",
    nazev: "Zahradní záhony a výsadby",
    uvod: "Trvalkové záhony, trávy a dřeviny krátce po výsadbě i v plné síle.",
    fotky: [
      "zahon-denivky-detail",
      "zahon-u-terasy-gabiony",
      "nova-zahrada-terasa",
      "cerstva-vysadba-mulc",
      "predzahradka-gabiony-vysadba",
      "zalozeni-zahonu-kruh",
    ],
  },
  {
    id: "kamen-a-drevo",
    nazev: "Kámen a dřevo v zahradě",
    uvod: "Suché zídky, štěrkové záhony a schody z pražců — přírodní materiály a ruční práce.",
    fotky: [
      "sucha-zidka-stavba",
      "sterkovy-zahon-balvany",
      "schody-prazce-balvany",
      "prazcove-schody-detail",
    ],
  },
];

/** Proměna zahrady ve svahu mezi břízami — tři fotky jednoho místa (galerie). */
export const SVAH = [
  {
    foto: "terenni-upravy-svah",
    title: "Terénní úpravy zahrady",
    text: "Svah mezi břízami se nejdřív upravil a připravil pro novou plochu.",
  },
  {
    foto: "sterkova-plocha-svah",
    title: "Štěrková plocha v zahradě",
    text: "Štěrková plocha s ocelovou obrubou se zapustila do svahu.",
  },
  {
    foto: "sterkova-plocha-hotovo",
    title: "Hotová zahrada ve svahu",
    text: "Zpevněná štěrková plocha mezi břízami, připravená k posezení.",
  },
] as const satisfies readonly { foto: PhotoName; title: string; text: string }[];
