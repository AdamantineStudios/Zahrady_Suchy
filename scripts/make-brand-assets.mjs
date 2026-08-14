// Jednorázový generátor brandových souborů (výstupy jsou v gitu):
//   public/apple-icon.png  – 180×180 ikona pro iOS
//   public/favicon.ico     – 32×32 fallback favicona (ICO obal nad PNG)
//   public/og.jpg          – 1200×630 náhled pro sdílení (hero foto + logo)
// Spouští se ručně: node scripts/make-brand-assets.mjs
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const iconSvg = await readFile("app/icon.svg");

// --- apple-icon.png (180×180) ---
await sharp(iconSvg, { density: 300 })
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("public/apple-icon.png");
console.log("✓ public/apple-icon.png");

// --- favicon.ico (ICO kontejner s jedním 32×32 PNG — platné od Visty) ---
const png32 = await sharp(iconSvg, { density: 300 })
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // rezervováno
header.writeUInt16LE(1, 2); // typ: ikona
header.writeUInt16LE(1, 4); // počet obrázků
header.writeUInt8(32, 6); // šířka
header.writeUInt8(32, 7); // výška
header.writeUInt8(0, 8); // barvy palety
header.writeUInt8(0, 9); // rezervováno
header.writeUInt16LE(1, 10); // barevné roviny
header.writeUInt16LE(32, 12); // bitů na pixel
header.writeUInt32LE(png32.length, 14); // velikost dat
header.writeUInt32LE(22, 18); // offset dat
await writeFile("public/favicon.ico", Buffer.concat([header, png32]));
console.log("✓ public/favicon.ico");

// --- og.jpg (1200×630): hero fotka + tmavý přechod + nápis ---
const photo = await sharp("photos-src/zahrada-trvalky-podzim.jpg")
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .toBuffer();

// Nápis ZAHRADY SUCHÝ jako vektor (křivky z logos/logo_svg_ZS_2.svg,
// „ZAHRADY" krémově, „SUCHÝ" olivově) na tmavém přechodu — žádná
// závislost na fontech.
const wordmark = await readFile("logos/logo_svg_ZS_2.svg", "utf8");
const paths = wordmark
  .replace(/^.*?<defs>.*?<\/defs>/s, "")
  .replace(/<\/svg>\s*$/s, "")
  .replaceAll('class="cls-1"', 'fill="#faf7f0"')
  .replaceAll('class="cls-2"', 'fill="#a9b93c"');

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.3" stop-color="#1f2a21" stop-opacity="0"/>
      <stop offset="1" stop-color="#1f2a21" stop-opacity="0.94"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80, 380) scale(1.55) translate(-173, -46.57)">${paths}</g>
</svg>`);

await sharp(photo)
  .composite([{ input: overlay }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("✓ public/og.jpg");
