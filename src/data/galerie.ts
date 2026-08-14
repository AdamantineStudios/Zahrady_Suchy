import type { PhotoName } from "@/components/Photo";

export type GalerieKategorie = "realizace" | "vysadby" | "kamen-a-drevo";

export type GalerieFoto = {
  foto: PhotoName;
  alt: string;
  kategorie: GalerieKategorie;
  popisek?: string;
};

export const KATEGORIE: {
  id: GalerieKategorie;
  nazev: string;
  uvod: string;
}[] = [
  {
    id: "realizace",
    nazev: "Hotové zahrady",
    uvod: "Zahrady, které už žijí svým životem — od posezení po dětské koutky.",
  },
  {
    id: "vysadby",
    nazev: "Záhony a výsadby",
    uvod: "Trvalkové záhony, trávy a dřeviny krátce po výsadbě i v plné síle.",
  },
  {
    id: "kamen-a-drevo",
    nazev: "Kámen a dřevo",
    uvod: "Suché zídky, štěrkové záhony, schody z pražců — přírodní materiály, ruční práce.",
  },
];

/** Pořadí v poli = pořadí ve fotogalerii (v rámci kategorie). */
export const GALERIE: GalerieFoto[] = [
  // ── Hotové zahrady ──
  {
    foto: "zahrada-trvalky-podzim",
    alt: "Vzrostlá zahrada na podzim — fialové astry, levandule a okrasné trávy kolem štěrkového posezení",
    kategorie: "realizace",
    popisek: "Podzimní zahrada v plné barvě",
  },
  {
    foto: "kruhove-posezeni-spalky",
    alt: "Kruhové posezení ze štěrku s dubovými špalky a stojanem na houpací síť",
    kategorie: "realizace",
    popisek: "Kruhové posezení se špalky a houpací sítí",
  },
  {
    foto: "chodnik-zahony-trvalek",
    alt: "Dlážděný chodník mezi záhony trvalek s rudbekiemi a flóxy",
    kategorie: "realizace",
    popisek: "Chodník lemovaný trvalkami",
  },
  {
    foto: "posezeni-pod-brizou",
    alt: "Posezení pod břízou obklopené čerstvě osázenými záhony",
    kategorie: "realizace",
    popisek: "Posezení ve stínu břízy",
  },
  {
    foto: "dvorek-lavicky",
    alt: "Lavičky se stolkem u zdi mezi nově založenými záhony a mladými stromy",
    kategorie: "realizace",
    popisek: "Posezení mezi mladými výsadbami",
  },
  {
    foto: "detske-hriste-houpacky",
    alt: "Dětský koutek s houpačkami, skluzavkou a pískovištěm v nové zahradě",
    kategorie: "realizace",
    popisek: "Zahrada i pro děti",
  },
  // ── Záhony a výsadby ──
  {
    foto: "zahon-denivky-detail",
    alt: "Záhon u domu s denivkami, třapatkami a perovskií",
    kategorie: "vysadby",
    popisek: "Kvetoucí záhon u domu",
  },
  {
    foto: "zahon-u-terasy-gabiony",
    alt: "Trvalkový záhon u terasy s trávami a levandulí, v pozadí gabionové stěny",
    kategorie: "vysadby",
    popisek: "Záhon u terasy",
  },
  {
    foto: "nova-zahrada-terasa",
    alt: "Čerstvě založená zahrada — namulčované záhony, mlatová cesta a plocha připravená pro trávník",
    kategorie: "vysadby",
    popisek: "Čerstvě založená zahrada",
  },
  {
    foto: "cerstva-vysadba-mulc",
    alt: "Nová výsadba trvalek a trav v mulči s nášlapnými deskami",
    kategorie: "vysadby",
    popisek: "Výsadba krátce po dokončení",
  },
  {
    foto: "predzahradka-slapaky",
    alt: "Předzahrádka s nášlapnými kameny, jehličnany a kačírkem u fasády",
    kategorie: "vysadby",
    popisek: "Předzahrádka se šlapáky",
  },
  {
    foto: "predzahradka-gabiony-vysadba",
    alt: "Nově osázená předzahrádka s tvarovaným stromkem u gabionového plotu",
    kategorie: "vysadby",
    popisek: "Nová předzahrádka",
  },
  // ── Kámen a dřevo ──
  {
    foto: "sucha-zidka-stavba",
    alt: "Ručně skládaná suchá zídka z lomového kamene s novým záhonem",
    kategorie: "kamen-a-drevo",
    popisek: "Suchá zídka z lomového kamene",
  },
  {
    foto: "sterkovy-zahon-balvany",
    alt: "Štěrková zahrada s žulovými balvany a šlapákovou cestou",
    kategorie: "kamen-a-drevo",
    popisek: "Štěrková zahrada s balvany",
  },
  {
    foto: "schody-prazce-balvany",
    alt: "Schody z dubových pražců mezi balvany nad kamennou zdí",
    kategorie: "kamen-a-drevo",
    popisek: "Schody z dubových pražců",
  },
  {
    foto: "prazcove-schody-detail",
    alt: "Detail schodů z dubových pražců s kamennou výplní",
    kategorie: "kamen-a-drevo",
    popisek: "Detail pražcových schodů",
  },
];

export type Promena = {
  pred: PhotoName;
  po: PhotoName;
  altPred: string;
  altPo: string;
  popisek: string;
};

/** Před a po — vždy stejné místo, poctivě. */
export const PROMENY: Promena[] = [
  {
    pred: "terenni-upravy-svah",
    po: "sterkova-plocha-hotovo",
    altPred: "Terénní úpravy zarostlého svahu v průběhu prací",
    altPo: "Dokončená zpevněná štěrková plocha ve svahu",
    popisek: "Terénní úpravy v lesním svahu — od výkopu po zpevněnou plochu",
  },
  {
    pred: "zalozeni-zahonu-kruh",
    po: "kruhove-posezeni-spalky",
    altPred: "Založení záhonů kolem kruhového posezení s ocelovou obrubou",
    altPo: "Hotové štěrkové posezení s dubovými špalky uprostřed vzrostlých záhonů",
    popisek: "Kruhové posezení — od založení po vzrostlou zahradu",
  },
];
