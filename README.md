# Zahrady Suchý 🌳

Web zahradnické firmy **Zahrady Suchý** — návrhy, realizace a údržba
zahrad v Českých Budějovicích a po celém Jihočeském kraji.

**Stack:** Next.js 15 (App Router, statický export) · TypeScript ·
designový kit [taste-skill](https://github.com/leonxlnx/taste-skill) 2.5.1 (CSS a JS
v `public/assets/`) · sharp (fotky) · GitHub Actions → GitHub Pages

---

## Rychlé úpravy (česky)

Nejčastější věci, které budete chtít změnit — vždy jeden soubor:

| Co změnit | Kde |
| --- | --- |
| **Telefon, e-mail, adresa, IČO** | `src/config.ts` — objekt `SITE` |
| **Texty služeb** (řádky na úvodu) | `src/data/sluzby.ts` |
| **Fotky v galerii** | `src/data/galerie.ts` — jména fotek po kategoriích (plné řady: 6, 6, 4) |
| **Popis fotky** (alt text) | `src/data/fotky.ts` — jeden řádek na fotku, co na ní opravdu je |
| **Příběh svahu** (galerie) | `src/data/galerie.ts` — pole `SVAH` |
| **Časté otázky** | `src/data/faq.ts` — odpovědi jsou na webu vždy otevřené |
| **Delší texty stránek** | `app/<stránka>/page.tsx` |

Po úpravě: commit + push do `main` → web se sám přebuilduje a nasadí
(cca 3 minuty).

### Přidání nové fotky

1. Zkopírujte fotky (JPG, PNG) do složky `photos-inbox/` — název nevadí,
   klidně `IMG_1234.JPG` nebo `Zahrada u Nováků.jpg`.
2. Spusťte `npm run photos:import` — fotky narovná, zmenší na nejvýš
   3000 px, **odstraní všechna metadata včetně GPS polohy zahrady klienta**
   a uloží je do `photos-src/` pod webovým názvem bez diakritiky.
3. Spusťte `npm run photos` — vygeneruje zmenšené WebP verze pro web.
4. Přidejte jméno fotky do kategorie v `src/data/galerie.ts` a jeden řádek
   s popisem (alt) do `src/data/fotky.ts` — bez popisu build spadne.

**Proč přes import:** repozitář je veřejný, takže originál s GPS by si kdokoli
mohl stáhnout z GitHubu a zjistit adresu klienta. Build to hlídá — fotka
s polohou v `photos-src/` ho zastaví (`npm run photos:check`). Složka
`photos-inbox/` se do gitu nikdy nedostane.

Na fotkách hlídejte i obličeje klientů a dětí, SPZ aut a čitelná čísla domů.

---

## Lokální vývoj

```bash
npm install
npm run photos   # jednorázově: vygeneruje public/photos/ + manifest
npm run dev      # → http://localhost:3000/Zahrady_Suchy/
```

`npm run build` vyrobí statický web do `out/` (fotky se přegenerují
automaticky přes `prebuild`).

## Nasazení (GitHub Pages)

Každý push do `main` spustí `.github/workflows/deploy.yml`, který web
sestaví a nasadí na GitHub Pages:

**https://adamantinestudios.github.io/Zahrady_Suchy/**

Jednorázově (pokud automatika neprojde): repo **Settings → Pages →
Build and deployment → Source: GitHub Actions**.

Pull requesty prochází build kontrolou přes `.github/workflows/ci.yml`.

## Přepnutí na vlastní doménu zahradysuchy.cz

Doména dnes ukazuje na starý web u původního hostingu. Přepnutí je
**jen nastavení, žádná změna kódu** — build si cestu i doménu bere
z nastavení GitHub Pages. Celé zabere asi 15 minut:

1. *(Doporučeno, jednorázově)* Ověřte doménu na GitHubu: profil
   AdamantineStudios → **Settings → Pages → Add a domain** → přidejte u
   registrátora TXT záznam, který GitHub ukáže. Zabrání tomu, aby si doménu
   „půjčil" cizí GitHub účet.
2. V repu **Settings → Pages → Custom domain** vyplňte `zahradysuchy.cz` → Save.
3. **Actions → Deploy to GitHub Pages → Run workflow** — web se sestaví pro
   novou doménu.
4. U poskytovatele DNS domény (tam, kde se spravují záznamy):
   - `A` záznamy pro `zahradysuchy.cz` → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (staré `A` záznamy smažte)
   - `CNAME` pro `www` → `adamantinestudios.github.io`
   - **Neměňte MX záznamy ani nameservery** — jinak přestane chodit
     e-mail na simon@zahradysuchy.cz.

   Kroky 2–4 udělejte najednou: od kroku 2 přesměrovává stará adresa
   github.io na doménu, a ta do kroku 4 ukazuje ještě starý web.
5. Až GitHub u domény ukáže zelenou fajfku, zapněte **Enforce HTTPS**
   (certifikát bývá do hodiny).
6. Vyzkoušejte https://zahradysuchy.cz, www.zahradysuchy.cz i starou adresu,
   pošlete zkušební e-mail na simon@ a naskenujte QR kód. Pak teprve tisk.

Odkazy, sitemap, kanonické URL i náhledy pro sdílení se přizpůsobí samy.

## QR kód na auto a letáky

Hotové soubory a pravidla pro tiskárnu jsou ve složce
[`marketing/qr/`](marketing/qr/README.md). Kód vede na https://zahradysuchy.cz
— **tiskněte až po přepnutí domény** (viz výše).

## Soukromí

- Web nepoužívá cookies, analytiku ani externí služby — fonty i skripty
  se servírují z vlastní domény, žádná cookie lišta není potřeba.
- Poptávkový formulář otevře poštovní aplikaci návštěvníka (`mailto:`)
  s vyplněnými poli — nic se neukládá na serveru ani v prohlížeči. Když se
  pošta neotevře, tlačítko „Zkopírovat text poptávky" dá text do schránky.
- Fotky se při buildu přeukládají a **EXIF (včetně GPS souřadnic zahrad
  klientů a data pořízení) se zahazuje**.

## Vzhled: kit taste-skill

Rozvržení, typografie a pohyb stojí na kitu
[taste-skill](https://github.com/leonxlnx/taste-skill) 2.5.1 (licence MIT):

- **`public/assets/` se NEUPRAVUJE** — soubory kitu jsou bajt po bajtu zkopírované
  (viz `public/assets/README.md`). Vlastní vzhled patří do `app/globals.css`.
- Každá sekce je přesně jedna (nebo dvě) obrazovky; sousední sekce se liší rozvržením.
- Písma Lora (nadpisy) a Nunito Sans (text), barvy ze Šimonova loga — tokeny `--p-*`
  v `app/globals.css`.
- Na každé stránce jeden „moment" při posouvání: úvod — proměna zahrady (kapitoly)
  a vyvolání fotky, návrh — zvýrazněný výrok, realizace — kroky se střídající fotkou,
  údržba — vyvolání fotky, galerie — proměna svahu, kontakt — Šimonova slova.
  Kdo má v systému omezené animace, vidí vše hned v klidu.
- Hlavní akce je všude stejnými slovy: **Domluvit schůzku** (`AKCE` v `src/components/Site.tsx`).

## Struktura

```
app/                  stránky (App Router) + globals.css (vlastní CSS nad kitem)
public/assets/        kit taste-skill — NEUPRAVOVAT
src/components/       Site (lišta, závěr, patička), hero, galerie, FAQ…
src/data/             VŠECHNY editovatelné texty a seznamy fotek
src/config.ts         kontakty, adresa, doména
photos-src/           fotky pro web, bez metadat (zdroj pro WebP verze)
photos-inbox/         nové fotky před importem (mimo git)
scripts/              import a kontrola fotek, fotopipeline, ikony/OG, QR kód
marketing/qr/         QR kód na auto a letáky + pravidla pro tisk
.github/workflows/    CI + nasazení na Pages
```
