import type { PhotoName } from "@/components/Photo";

/**
 * Popis každé fotky (alt text) — jedno místo pro celý web. Píše se, co na
 * fotce opravdu je; čte ho nevidomý návštěvník i vyhledávač.
 * Nová fotka: `npm run photos:import`, `npm run photos`, pak sem jeden řádek.
 */
export const FOTKY: Partial<Record<PhotoName, string>> = {
  "predzahradka-slapaky":
    "Předzahrádka u domu: nášlapné kameny v mulči mezi jehličnany, trvalkami a trávníkem",
  "zahon-u-terasy-gabiony":
    "Trvalkový záhon u dlážděné terasy s třapatkami, levandulí a trávami, v pozadí gabionové zdi",
  "posezeni-pod-brizou":
    "Dřevěné posezení pod břízou na zpevněné ploše, kolem nově osázené záhony",
  "zalozeni-zahonu-kruh":
    "Založení zahrady: kruh s ocelovou obrubou a kolem něj první vysázené trvalky",
  "kruhove-posezeni-spalky":
    "Kruhové štěrkové posezení s dřevěnými špalky a stojanem na houpací síť, za ním kvetoucí astry",
  "zahrada-trvalky-podzim":
    "Zahrada na podzim: fialové astry, levandule a okrasné trávy kolem štěrkového posezení",
  "pozemek-pred-realizaci":
    "Srovnaný pozemek u novostavby s chodníkem, připravený pro založení zahrady",
  "navrh-zahrady-plan":
    "Situační návrh zahrady u rodinného domu s terasou, saunou, vodní plochou a trávníkem",
  "sucha-zidka-stavba":
    "Ručně skládaná suchá zídka z lomového kamene s nově připraveným záhonem",
  "dvorek-lavicky":
    "Dvě lavičky se stolkem a slunečníkem u zdi, kolem mladé stromky a nové záhony",
  "zahon-denivky-detail":
    "Záhon u domu s kvetoucími denivkami, třapatkami a perovskií",
  "schody-prazce-balvany":
    "Schody z dřevěných pražců mezi balvany nad kamennou zdí",
  "chodnik-zahony-trvalek":
    "Dlážděný chodník mezi záhony trvalek a keřů, nad ním borovice",
  "sterkovy-zahon-balvany":
    "Štěrková zahrada s balvany a cestou z kamenných šlapáků",
  "prazcove-schody-detail":
    "Detail schodů z dřevěných pražců s kamennou výplní",
  "nova-zahrada-terasa":
    "Čerstvě založená zahrada: namulčované záhony, mlatová cesta a plocha připravená pro trávník",
  "cerstva-vysadba-mulc":
    "Nová výsadba trvalek a trav v mulči s nášlapnými deskami",
  "predzahradka-gabiony-vysadba":
    "Nově osázená předzahrádka s mladým stromkem u gabionového plotu",
  "detske-hriste-houpacky":
    "Dětský koutek s houpačkami, skluzavkou a pískovištěm v zahradě",
  "terenni-upravy-svah":
    "Terénní úpravy ve svahu mezi břízami v průběhu prací",
  "sterkova-plocha-svah":
    "Štěrková plocha s ocelovou obrubou zapuštěná do svahu",
  "sterkova-plocha-hotovo":
    "Dokončená zpevněná štěrková plocha ve svahu mezi břízami",
  "rez-stromu-vyska":
    "Výškový řez borovice z žebříku",
  "kaceni-jehlicnanu":
    "Postupné kácení vzrostlého jehličnanu",
  "prorezavka-keru":
    "Prořezávka přerostlého jehličnatého živého plotu, odřezané větve na zemi",
  "vycisteny-pozemek":
    "Vyčištěný pruh pozemku podél plotu připravený pro novou výsadbu",
};

/** Alt text fotky; bez záznamu build spadne na typové kontrole použití. */
export function alt(name: PhotoName): string {
  const text = FOTKY[name];
  if (!text) throw new Error(`Chybí popis fotky „${name}" v src/data/fotky.ts`);
  return text;
}
