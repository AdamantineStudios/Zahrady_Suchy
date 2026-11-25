# QR kód na auto a letáky — Zahrady Suchý

Kód vede na **https://zahradysuchy.cz**.

> ⚠️ **Tiskněte až po přepnutí domény.** Dokud doména zahradysuchy.cz ukazuje
> na starý web, kód by lidi poslal tam. Před tiskem si kód naskenujte telefonem:
> musí se otevřít nový web a v adresním řádku zámek (https).
> Postup přepnutí je v hlavním README (sekce „Přepnutí na vlastní doménu").

## Co je v balíčku

| Soubor | K čemu |
| --- | --- |
| `zahradysuchy-qr.svg` / `.pdf` | **Auto (polep).** Černý kód na bílé, čistý vektor — pro polepovou dílnu. |
| `zahradysuchy-qr.png` | Totéž v pixelech (2960 × 2960 px, ≈ 25 cm při 300 dpi). |
| `zahradysuchy-qr-logo.svg` / `.pdf` / `.png` | **Letáky, vizitky.** Kód v barvě webu se stromem uprostřed. |
| `zahradysuchy-qr-stitek.pdf` / `.png` | **Hotový štítek** (70 × 92 mm): kód + zahradysuchy.cz + výzva. Stačí vložit do letáku. |

Pro tiskárnu a polep posílejte **PDF nebo SVG** (vektor — dá se zvětšit na
libovolnou velikost bez ztráty ostrosti). PNG je pro Canvu, Word a podobně.

## Velikost

Kód se načte zhruba z desetinásobku své šířky.

| Kde | Nejmenší šířka kódu | Načte se z |
| --- | --- | --- |
| Auto (dveře, zadní okno) | **20 cm**, lépe 25–30 cm | 2–3 m |
| Leták A5/A6 | **2,5 cm**, lépe 3 cm | 25–30 cm |
| Vizitka | 2 cm | 20 cm |

## Pravidla pro tisk a polep

- **Bílý okraj kolem kódu nechte volný** — je součástí souborů a čtečka ho
  potřebuje. Nic do něj nezasahujte (text, rámeček, hrana auta).
- **Vždy tmavý kód na světlém podkladu.** Na tmavý lak auta dejte kód na bílé
  pole. Nikdy ho neinvertujte (bílý kód na tmavém některé telefony nepřečtou).
- **Neroztahujte ani nedeformujte** — kód musí zůstat čtvercový.
- **Matný povrch**: lesklá fólie odráží slunce a kód pak nejde načíst.
- **Na autě ne přes prolisy a hrany** dveří — kód musí ležet na rovné ploše.
- **Před tiskem celé série** si nechte poslat nátisk a otestujte ho iPhonem
  i Androidem (stačí fotoaparát).

## Technicky

QR verze 3 (29 × 29 modulů), oprava chyb **H** — kód přečte telefon, i když je
až ~30 % plochy poškozené nebo zakryté (špína na autě, logo uprostřed).
Každý soubor byl po vygenerování zpětně ověřen dekodérem, včetně zmenšení na
2,5 cm, rozmazání a skvrny přes 10 % plochy.

Přegenerování (např. při změně adresy): `node scripts/make-qr.mjs`.
