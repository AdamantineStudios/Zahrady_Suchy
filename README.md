# Zahrady Suchý 🌳

Web zahradnické firmy **Zahrady Suchý** — návrhy, realizace a údržba
zahrad v Českých Budějovicích a po celém Jihočeském kraji.

**Stack:** Next.js 15 (App Router, statický export) · Tailwind CSS 4 ·
TypeScript · sharp (fotky) · GitHub Actions → GitHub Pages

---

## Rychlé úpravy (česky)

Nejčastější věci, které budete chtít změnit — vždy jeden soubor:

| Co změnit | Kde |
| --- | --- |
| **Telefon, e-mail, adresa, IČO** | `src/config.ts` — objekt `SITE` |
| **Texty služeb** (karty na úvodu) | `src/data/sluzby.ts` |
| **Fotky v galerii + popisky** | `src/data/galerie.ts` — každá fotka je blok `{ foto, alt, kategorie, popisek }` |
| **Proměny před/po** | `src/data/galerie.ts` — pole `PROMENY` |
| **Časté otázky** | `src/data/faq.ts` |
| **Delší texty stránek** | `app/<stránka>/page.tsx` |

Po úpravě: commit + push do `main` → web se sám přebuilduje a nasadí
(cca 3 minuty).

### Přidání nové fotky

1. Vložte JPG do `photos-src/` s rozumným názvem bez diakritiky a mezer,
   např. `zahrada-jarni-zahon.jpg`.
2. Spusťte `npm run photos` — vygeneruje zmenšené WebP verze a
   **odstraní EXIF metadata včetně GPS polohy zahrady klienta**.
3. Přidejte záznam do `src/data/galerie.ts` s krátkým popisem (`alt`)
   toho, co na fotce opravdu je.

Originály v `photos-src/` se na web nikdy nedostanou — publikují se jen
zmenšené, očištěné verze z `public/photos/` (ty se negenerují do gitu).

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

Doména dnes ukazuje na starý web u původního hostingu. Přepnutí na
GitHub Pages (zdarma, bez výpadku — starý web běží, dokud se nepřepne
DNS):

1. U registrátora domény nastavte DNS:
   - `A` záznamy pro `zahradysuchy.cz` → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` pro `www` → `adamantinestudios.github.io`
2. V repu **Settings → Pages → Custom domain** vyplňte
   `zahradysuchy.cz` a po ověření zapněte **Enforce HTTPS**.
3. V `.github/workflows/deploy.yml` přidejte do kroku `npm run build`:
   ```yaml
   env:
     NEXT_PUBLIC_BASE_PATH: ""
   ```
4. V `src/config.ts` změňte `origin` na `https://zahradysuchy.cz`.

Vše ostatní (odkazy, sitemap, OG náhledy) se přizpůsobí samo — všechny
URL procházejí přes `withBase()`/`absoluteUrl()` v `src/config.ts`.

## Soukromí

- Web nepoužívá cookies, analytiku ani externí služby — fonty i skripty
  se servírují z vlastní domény, žádná cookie lišta není potřeba.
- Poptávkový formulář jen připraví e-mail v poštovní aplikaci
  návštěvníka (`mailto:`) — na serveru se nic neukládá; rozepsaná
  poptávka zůstává jen v prohlížeči návštěvníka (localStorage).
- Fotky se při buildu přeukládají a **EXIF (včetně GPS souřadnic zahrad
  klientů a data pořízení) se zahazuje**.

## Struktura

```
app/                  stránky (App Router) + globals.css
src/components/       Header, Footer, galerie, formulář, před/po…
src/data/             VŠECHNY editovatelné texty a seznamy fotek
src/config.ts         kontakty, adresa, doména
photos-src/           originály fotek (nikdy nejdou ven)
scripts/              fotopipeline + generátor ikon/OG
.github/workflows/    CI + nasazení na Pages
```
