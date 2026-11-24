// Generátor QR kódů pro auto a letáky → marketing/qr/
//
// Kóduje https://zahradysuchy.cz s nejvyšší opravou chyb (H, ~30 %): kód
// přežije špínu na autě, odlesk i logo uprostřed. Výstupy jsou vektorové
// (SVG, PDF) pro polep a tiskárnu a PNG pro Canvu / Word. Každý soubor
// se po vygenerování zpětně přečte dekodérem — chybný kód se nevydá.
//
// Spuštění: node scripts/make-qr.mjs
// PDF potřebují Playwright s Chromiem (npx playwright install chromium);
// bez něj se vytvoří jen SVG a PNG.
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import jsQR from "jsqr";
import QRCode from "qrcode";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const URL_ = "https://zahradysuchy.cz";
const OUT = "marketing/qr";
const QUIET = 4; // tichá zóna v modulech — norma ji vyžaduje
const PX = 80; // pixelů na modul v PNG → 2960 px ≈ 25 cm při 300 dpi
const INK = "#1f2a21";
const OLIVE = "#8f9d24";

const qr = QRCode.create(URL_, { errorCorrectionLevel: "H" });
const N = qr.modules.size;
const SIZE = N + 2 * QUIET;
const dark = (r, c) => qr.modules.get(r, c) === 1;

// Logo uprostřed: vyčištěný čtverec 7×7 modulů (mimo vyhledávací a
// zarovnávací vzory). Zbytek kódu ho díky opravě chyb H dopočítá.
const LOGO = 7;
const L0 = (N - LOGO) / 2;
const inLogo = (r, c) => r >= L0 && r < L0 + LOGO && c >= L0 && c < L0 + LOGO;

/** Moduly jako jedna cesta; vodorovné běhy sloučené, ať je soubor malý. */
function modulesPath(skip = () => false) {
  let d = "";
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; ) {
      if (!dark(r, c) || skip(r, c)) { c++; continue; }
      let run = 1;
      while (c + run < N && dark(r, c + run) && !skip(r, c + run)) run++;
      d += `M${c + QUIET} ${r + QUIET}h${run}v1h-${run}z`;
      c += run;
    }
  }
  return d;
}

// Strom z loga — tytéž křivky, které používá web (src/components/ZsMark.tsx).
const markSrc = await readFile("src/components/ZsMark.tsx", "utf8");
const markPaths = [...markSrc.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
if (markPaths.length !== 6) throw new Error("ZsMark: čekám 6 cest loga");

function qrSvg({ color, logo, size = "50mm" }) {
  const body = `<path fill="${color}" shape-rendering="crispEdges" d="${modulesPath(logo ? inLogo : undefined)}"/>`;
  let mark = "";
  if (logo) {
    // logo 5,6 modulu široké, uprostřed vyčištěného čtverce (viewBox loga 173 jednotek)
    const s = 5.6, x = QUIET + N / 2 - s / 2;
    mark =
      `<g transform="translate(${x} ${x}) scale(${s / 173}) translate(-197 -22)" fill="${OLIVE}">` +
      markPaths.map((d) => `<path d="${d}"/>`).join("") +
      `</g>`;
  }
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${size}" height="${size}">` +
    `<title>QR kód: ${URL_}</title>` +
    `<rect width="${SIZE}" height="${SIZE}" fill="#ffffff"/>${body}${mark}</svg>\n`
  );
}

async function decode(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return jsQR(new Uint8ClampedArray(data), info.width, info.height)?.data ?? null;
}

const checks = [];
async function expectDecodes(label, input) {
  const got = await decode(input);
  checks.push({ label, ok: got === URL_ });
}

await mkdir(OUT, { recursive: true });

const variants = [
  { file: "zahradysuchy-qr", color: "#000000", logo: false },
  { file: "zahradysuchy-qr-logo", color: INK, logo: true },
];

for (const v of variants) {
  const svg = qrSvg(v);
  await writeFile(path.join(OUT, `${v.file}.svg`), svg);
  const png = await sharp(Buffer.from(qrSvg({ ...v, size: String(SIZE * PX) })))
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(OUT, `${v.file}.png`), png);

  // Kontroly: plná velikost, leták 2,5 cm při 300 dpi (295 px), rozmazání,
  // a „špína" — šedá skvrna přes ~10 % plochy kódu mimo vyhledávací vzory.
  await expectDecodes(`${v.file}.png`, png);
  const small = await sharp(png).resize(295, 295).toBuffer();
  await expectDecodes(`${v.file} @ 2,5 cm`, small);
  await expectDecodes(`${v.file} @ 2,5 cm + rozmazání`, await sharp(small).blur(1).toBuffer());
  const r = Math.sqrt((0.1 * N * N) / Math.PI) * PX;
  const cx = (QUIET + 22.5) * PX, cy = (QUIET + 14.5) * PX;
  const blob = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE * PX}" height="${SIZE * PX}">` +
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8a8a8a"/></svg>`,
  );
  await expectDecodes(`${v.file} + skvrna 10 %`, await sharp(png).composite([{ input: blob }]).png().toBuffer());
}

// ── Štítek: QR s logem + doména + výzva, ve fontech webu → vektorové PDF ──
function fontFace(family, pkg, weight) {
  const dir = path.join("node_modules", "@fontsource", pkg, "files");
  return ["latin", "latin-ext"].map(async (subset) => {
    const f = path.join(dir, `${pkg}-${subset}-${weight}-normal.woff2`);
    const b64 = (await readFile(f)).toString("base64");
    const range = subset === "latin"
      ? "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
      : "U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
    return `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${b64}) format('woff2');unicode-range:${range}}`;
  });
}

let chromium = null;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.warn("! Playwright není k dispozici — PDF se nevytvoří (SVG a PNG ano).");
}

if (chromium) {
  const fonts = (await Promise.all([
    ...fontFace("Lora", "lora", 400),
    ...fontFace("Hanken Grotesk", "hanken-grotesk", 400),
  ])).join("");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pdfOf = async (html, w, h) => {
    await page.setContent(
      `<!doctype html><meta charset="utf-8"><style>${fonts}@page{size:${w} ${h};margin:0}` +
        `html,body{margin:0;width:${w};height:${h};background:#fff}svg{display:block}</style>${html}`,
      { waitUntil: "load" },
    );
    await page.evaluate(() => document.fonts.ready);
    return page.pdf({ width: w, height: h, printBackground: true });
  };

  for (const v of variants) {
    const pdf = await pdfOf(qrSvg(v), "50mm", "50mm");
    await writeFile(path.join(OUT, `${v.file}.pdf`), pdf);
  }

  const badge =
    `<div style="box-sizing:border-box;width:70mm;height:92mm;padding:6mm;border:0.3mm solid #e4dfd2;` +
    `border-radius:4mm;display:flex;flex-direction:column;align-items:center;font-family:'Hanken Grotesk'">` +
    qrSvg({ color: INK, logo: true, size: "58mm" }) +
    `<div style="font-family:Lora;font-size:19pt;color:${INK};margin-top:3.2mm;letter-spacing:-0.01em">zahradysuchy.cz</div>` +
    `<div style="font-size:9.5pt;line-height:1.35;color:#49564a;margin-top:1.6mm;text-align:center;text-wrap:balance">Naskenujte a prohlédněte si naše zahrady</div></div>`;
  await writeFile(path.join(OUT, "zahradysuchy-qr-stitek.pdf"), await pdfOf(badge, "70mm", "92mm"));
  await page.setViewportSize({ width: 265, height: 348 });
  const ctx = await browser.newContext({ deviceScaleFactor: 300 / 96, viewport: { width: 265, height: 348 } });
  const p2 = await ctx.newPage();
  await p2.setContent(
    `<!doctype html><meta charset="utf-8"><style>${fonts}html,body{margin:0;background:#fff}svg{display:block}</style>${badge}`,
    { waitUntil: "load" },
  );
  await p2.evaluate(() => document.fonts.ready);
  const badgePng = await p2.locator("body > div").screenshot();
  await writeFile(path.join(OUT, "zahradysuchy-qr-stitek.png"), badgePng);
  await expectDecodes("zahradysuchy-qr-stitek.png", badgePng);
  await browser.close();

  // PDF zpětně vyrastrovat (poppler) a přečíst — ověří i samotný tiskový soubor.
  const tmp = await mkdtemp(path.join(os.tmpdir(), "qr-pdf-"));
  try {
    for (const f of (await readdir(OUT)).filter((x) => x.endsWith(".pdf"))) {
      const base = path.join(tmp, path.parse(f).name);
      execFileSync("pdftoppm", ["-r", "300", "-png", "-singlefile", path.join(OUT, f), base]);
      await expectDecodes(f, `${base}.png`);
    }
  } catch (e) {
    if (e.code === "ENOENT") console.warn("! pdftoppm chybí — PDF se zpětně neověřila.");
    else throw e;
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

const failed = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? "✓" : "✗"} ${c.label}`);
console.log(`\nQR verze ${qr.version} (${N}×${N} modulů), oprava chyb H, obsah: ${URL_}`);
if (failed.length) {
  console.error(`\n✗ ${failed.length} kontrol selhalo — QR kódy nepoužívejte.`);
  process.exit(1);
}
console.log(`✓ Všech ${checks.length} kontrol prošlo → ${OUT}/`);
