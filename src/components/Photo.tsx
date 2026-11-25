import type { CSSProperties } from "react";
import manifest from "@/data/photos-manifest.json";
import { withBase } from "@/config";

/** Jména fotek jsou typovaná z manifestu — překlep je chyba při kompilaci. */
export type PhotoName = keyof typeof manifest;

/** Poměr stran fotky (šířka / výška) — pro výpočet `sizes` u ořezů (object-fit: cover). */
export function ratio(name: PhotoName): number {
  const { width, height } = manifest[name];
  return width / height;
}

/**
 * `sizes` pro fotku ořezanou do rámečku w × h (CSS px na počítači): prohlížeč vybírá
 * zdroj podle šířky, ale ořez „cover" potřebuje šířku max(w, h × poměr stran).
 * `phone` je buď hotová hodnota (výchozí 100vw), nebo rámeček [w, h] na telefonu.
 */
export function sizesFor(name: PhotoName, w: number, h: number, phone: string | [number, number] = "100vw"): string {
  const need = (bw: number, bh: number) => Math.ceil(Math.max(bw, bh * ratio(name)) / 20) * 20;
  const small = typeof phone === "string" ? phone : `${need(phone[0], phone[1])}px`;
  return `(min-width: 1024px) ${need(w, h)}px, ${small}`;
}

type Props = {
  name: PhotoName;
  alt: string;
  /** Přesné `sizes` podle layoutu, např. "(min-width: 1024px) 45vw, 100vw". */
  sizes?: string;
  className?: string;
  /** Jen pro LCP obrázek (hero) — eager + vysoká priorita. */
  priority?: boolean;
  /** Co na fotce je (kontrola kitu hlídá, že se fotka na stránce neopakuje). */
  subject?: string;
  style?: CSSProperties;
  hidden?: boolean;
  /** Atributy pro kit (např. data-peek-for). */
  data?: Record<`data-${string}`, string>;
};

export default function Photo({
  name,
  alt,
  sizes = "100vw",
  className,
  priority = false,
  subject,
  style,
  hidden,
  data,
}: Props) {
  const { width, height, widths } = manifest[name];
  const url = (w: number) => withBase(`/photos/${name}-${w}.webp`);
  // src = nejmenší varianta ≥ 960 px (fallback pro prohlížeče bez srcSet)
  const fallback = widths.find((w) => w >= 960) ?? widths[widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url(fallback)}
      srcSet={widths.map((w) => `${url(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={style}
      hidden={hidden}
      data-source="client"
      data-subject={subject ?? name}
      {...data}
    />
  );
}
