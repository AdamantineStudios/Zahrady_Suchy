// Pojistka před každým buildem: žádná fotka v photos-src/ nesmí nést GPS
// polohu. Repozitář je veřejný, takže by se originál s polohou zahrady
// klienta dal stáhnout přímo z GitHubu (web samotný metadata nemá).
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileHasGps } from "./exif-gps.mjs";

const SRC = "photos-src";
const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f));
const leaks = [];
for (const f of files) {
  if (await fileHasGps(path.join(SRC, f))) leaks.push(f);
}

const fotek = (n) => (n === 1 ? "fotka obsahuje" : n < 5 ? "fotky obsahují" : "fotek obsahuje");

if (leaks.length > 0) {
  console.error(
    `\n✗ ${leaks.length} ${fotek(leaks.length)} v ${SRC}/ GPS polohu:\n` +
      leaks.map((f) => `  - ${f}`).join("\n") +
      `\n\nNové fotky dávejte do photos-inbox/ a spusťte \`npm run photos:import\`` +
      ` — import polohu i ostatní metadata odstraní.\n`,
  );
  process.exit(1);
}
console.log(`✓ ${files.length} fotek bez GPS polohy`);
