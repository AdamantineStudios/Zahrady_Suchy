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
    nazev: "Zahradní záhony a\u00a0výsadby",
    uvod: "Trvalkové záhony, trávy a\u00a0dřeviny krátce po výsadbě i\u00a0v\u00a0plné síle.",
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
    nazev: "Kámen a\u00a0dřevo v\u00a0zahradě",
    uvod: "Suché zídky, štěrkové záhony a\u00a0schody z\u00a0pražců — přírodní materiály a\u00a0ruční práce.",
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
    text: "Svah mezi břízami se nejdřív upravil a\u00a0připravil pro novou plochu.",
  },
  {
    foto: "sterkova-plocha-svah",
    title: "Štěrková plocha v\u00a0zahradě",
    text: "Štěrková plocha s\u00a0ocelovou obrubou se zapustila do svahu.",
  },
  {
    foto: "sterkova-plocha-hotovo",
    title: "Hotová zahrada ve svahu",
    text: "Zpevněná štěrková plocha mezi břízami, připravená k\u00a0posezení.",
  },
] as const satisfies readonly { foto: PhotoName; title: string; text: string }[];
