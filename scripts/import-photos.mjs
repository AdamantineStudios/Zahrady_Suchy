// Import nových fotek: photos-inbox/ → photos-src/.
//
// Každou fotku narovná podle EXIF orientace, zmenší na nejvýš 3000 px
// delší strany, uloží jako JPEG a ZAHODÍ VŠECHNA METADATA (GPS polohu
// zahrady klienta, datum, model telefonu). Název se převede na webový
// tvar bez diakritiky a mezer: „Zahrada u Nováků (2).JPG" → „zahrada-u-novaku-2.jpg".
//
// Použití: zkopírujte fotky do photos-inbox/ a spusťte `npm run photos:import`.
// Originály v photos-inbox/ se do gitu nedostanou (je v .gitignore).
import { access, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INBOX = "photos-inbox";
const SRC = "photos-src";
const MAX = 3000;

const slug = (name) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "fotka";

const exists = (p) => access(p).then(() => true, () => false);

await mkdir(INBOX, { recursive: true });
const all = await readdir(INBOX);
const heic = all.filter((f) => /\.hei[cf]$/i.test(f));
const files = all.filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));

if (heic.length) {
  console.warn(
    `! Fotky ve formátu HEIC (${heic.length}) přeskočeny — převeďte je na JPG ` +
      `(na iPhonu: Nastavení → Fotoaparát → Formáty → Nejkompatibilnější).`,
  );
}
if (files.length === 0) {
  console.log(`V ${INBOX}/ nejsou žádné fotky k importu.`);
  process.exit(0);
}

await mkdir(SRC, { recursive: true });
for (const file of files) {
  const base = slug(path.parse(file).name);
  let name = `${base}.jpg`;
  for (let n = 2; await exists(path.join(SRC, name)); n++) name = `${base}-${n}.jpg`;

  await sharp(path.join(INBOX, file))
    .rotate() // narovnat podle EXIF, pak se metadata zahodí
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(SRC, name));
  console.log(`✓ ${file} → ${SRC}/${name}`);
}
const n = files.length;
const fotek = n === 1 ? "fotka" : n < 5 ? "fotky" : "fotek";
console.log(
  `\nHotovo: ${n} ${fotek} bez metadat v ${SRC}/. ` +
    `Originály v ${INBOX}/ můžete smazat. Dál: npm run photos`,
);
