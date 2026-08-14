// Připraví fotky pro web: z photos-src/ vyrobí zmenšené WebP verze
// do public/photos/ a zapíše manifest s rozměry.
//
// Důležité: výstup NEobsahuje žádná EXIF metadata (sharp je nekopíruje),
// takže na web nikdy neunikne GPS poloha ani datum pořízení fotky.
// .rotate() bez argumentů zároveň narovná fotky podle EXIF orientace.
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "photos-src";
const OUT = "public/photos";
const MANIFEST = "src/data/photos-manifest.json";
const WIDTHS = [480, 960, 1600, 2400];
const QUALITY = 78;

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (files.length === 0) {
  console.error(`V ${SRC}/ nejsou žádné fotky.`);
  process.exit(1);
}
await mkdir(OUT, { recursive: true });

const manifest = {};
for (const file of files) {
  const name = path.parse(file).name;
  const base = sharp(path.join(SRC, file)).rotate();
  const meta = await base.metadata();
  // Orientace 5–8 v EXIF znamená, že po narovnání se prohodí šířka a výška
  const swapped = (meta.orientation ?? 1) >= 5;
  const width = swapped ? meta.height : meta.width;
  const height = swapped ? meta.width : meta.height;

  // Nikdy nezvětšujeme: malé zdroje (např. sken návrhu, 794 px) dostanou
  // jen šířky, které skutečně mají — srcSet pak nelže o rozlišení.
  const emit = WIDTHS.filter((w) => w < width);
  const cap = Math.min(width, WIDTHS[WIDTHS.length - 1]);
  if (!emit.includes(cap)) emit.push(cap);

  manifest[name] = { width, height, widths: emit };

  await Promise.all(
    emit.map((w) =>
      base
        .clone()
        .resize({ width: w })
        .webp({ quality: QUALITY })
        .toFile(path.join(OUT, `${name}-${w}.webp`)),
    ),
  );
  console.log(`✓ ${name} (${width}×${height}) → ${emit.join(", ")}`);
}

const sorted = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
);
await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
console.log(`Manifest: ${MANIFEST} (${files.length} fotek)`);
