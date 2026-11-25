"use client";

import { useEffect } from "react";
import { withBase } from "@/config";

/**
 * Načte chování kitu taste-skill (public/assets) až po hydrataci Reactu:
 * system.js (mobilní menu, akční lišta, otevřené FAQ, momenty) a motion.js
 * (hover a vstup hera). Kit mění DOM — kdyby běžel dřív, React by při
 * hydrataci hlásil nesoulad. Odkazy na webu jsou obyčejné (celé načtení
 * stránky), takže se kit inicializuje pro každou stránku znovu, jak počítá.
 */
export default function KitRuntime() {
  useEffect(() => {
    import(/* webpackIgnore: true */ withBase("/assets/system.js"));
    import(/* webpackIgnore: true */ withBase("/assets/motion/motion.js"));
  }, []);
  return null;
}
