# Vendorovaný kit taste-skill — NEUPRAVOVAT

Soubory v této složce jsou bajt po bajtu zkopírované z
[leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) **2.5.1**, commit `6c0b5c7`
(licence MIT, viz `LICENSE-taste-skill.txt`).

- `system.css`, `ui/cards.css`, `layout/layout.css` — systém rozvržení (vkládá se do CSS webu ve vrstvě `kit`,
  viz `app/globals.css`).
- `system.js` — chování stránky: mobilní menu, akční lišta na telefonu, otevřené FAQ, načítání momentů.
- `motion/` — hover mikroanimace a vstup hera.
- `moments/` — scroll „momenty" (picture-develops, photo-chapters, pinned-chapters, word-highlight).

**Nic tu neupravujte.** Kontrola kitu (`gate.mjs`, kontrola `kit-edited`) upravené soubory odmítne.
Změny vzhledu patří do `app/globals.css` nebo do komponent. Aktualizace = zkopírovat znovu všechny
soubory z jedné verze kitu.
