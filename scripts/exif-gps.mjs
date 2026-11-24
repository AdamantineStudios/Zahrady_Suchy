// Čtení a odstranění metadat JPEGu bez závislostí. Poloha (GPS) se v
// JPEGu může schovávat ve dvou segmentech APP1: v EXIF (IFD 0x8825 se
// zeměpisnou šířkou a délkou) a v XMP (exif:GPSLatitude). Sdílí ho
// check-photos.mjs a strip-gps.mjs.
import { readFile } from "node:fs/promises";

const APP1 = 0xe1;
const SOS = 0xda;
const XMP_ID = "http://ns.adobe.com/xap/1.0/\0";

/** Projde segmenty JPEGu až po začátek obrazových dat (SOS). */
function* segments(buf) {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return;
  let i = 2;
  while (i + 4 <= buf.length && buf[i] === 0xff) {
    const marker = buf[i + 1];
    if (marker === SOS) return;
    const length = buf.readUInt16BE(i + 2);
    yield { marker, start: i, end: i + 2 + length };
    i += 2 + length;
  }
}

const isExif = (buf, s) =>
  s.marker === APP1 && buf.toString("latin1", s.start + 4, s.start + 10) === "Exif\0\0";
const isXmp = (buf, s) =>
  s.marker === APP1 &&
  buf.toString("latin1", s.start + 4, s.start + 4 + XMP_ID.length) === XMP_ID;

function exifHasGps(buf, s) {
  const t = s.start + 10; // začátek TIFF hlavičky
  const le = buf.toString("latin1", t, t + 2) === "II";
  const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  const ifd0 = t + u32(t + 4);
  const count = u16(ifd0);
  for (let k = 0; k < count; k++) {
    const e = ifd0 + 2 + k * 12;
    if (u16(e) !== 0x8825) continue;
    const gps = t + u32(e + 8);
    const n = u16(gps);
    const tags = new Set();
    for (let j = 0; j < n; j++) tags.add(u16(gps + 2 + j * 12));
    return tags.has(2) && tags.has(4);
  }
  return false;
}

/** Hodnota EXIF Orientation (1–8), nebo null, když chybí. */
export function orientation(buf) {
  for (const s of segments(buf)) {
    if (!isExif(buf, s)) continue;
    const t = s.start + 10;
    const le = buf.toString("latin1", t, t + 2) === "II";
    const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd0 = t + u32(t + 4);
    for (let k = 0; k < u16(ifd0); k++) {
      const e = ifd0 + 2 + k * 12;
      if (u16(e) === 0x0112) return u16(e + 8);
    }
  }
  return null;
}

/** true, když JPEG nese GPS souřadnice v EXIF nebo XMP. */
export function hasGps(buf) {
  for (const s of segments(buf)) {
    if (isExif(buf, s) && exifHasGps(buf, s)) return true;
    if (isXmp(buf, s) && /GPSLatitude|GPSLongitude/.test(buf.toString("latin1", s.start, s.end))) {
      return true;
    }
  }
  return false;
}

/**
 * Vrátí JPEG bez segmentů EXIF a XMP. Obrazová data zůstávají bajt po bajtu
 * stejná (žádná rekomprese). Bezpečné jen pro fotky bez otočení v EXIF —
 * jinak by se po odstranění zobrazily natočené (volající to hlídá).
 */
export function stripExifAndXmp(buf) {
  const drop = [...segments(buf)].filter((s) => isExif(buf, s) || isXmp(buf, s));
  if (drop.length === 0) return buf;
  const parts = [];
  let at = 0;
  for (const s of drop) {
    parts.push(buf.subarray(at, s.start));
    at = s.end;
  }
  parts.push(buf.subarray(at));
  return Buffer.concat(parts);
}

export async function fileHasGps(path) {
  return hasGps(await readFile(path));
}
