import manifest from "@/data/photos-manifest.json";
import { withBase } from "@/config";

/** Jména fotek jsou typovaná z manifestu — překlep je chyba při kompilaci. */
export type PhotoName = keyof typeof manifest;

type Props = {
  name: PhotoName;
  alt: string;
  /** Přesné `sizes` podle layoutu, např. "(min-width: 1024px) 45vw, 100vw". */
  sizes?: string;
  className?: string;
  /** Jen pro LCP obrázek (hero) — eager + vysoká priorita. */
  priority?: boolean;
};

export default function Photo({
  name,
  alt,
  sizes = "100vw",
  className,
  priority = false,
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
    />
  );
}
