"use client";

import { useId, useState } from "react";
import Photo, { type PhotoName } from "@/components/Photo";

type Props = {
  pred: PhotoName;
  po: PhotoName;
  altPred: string;
  altPo: string;
  /** Popisek dvojice pod posuvníkem. */
  popisek?: string;
  sizes?: string;
};

/**
 * Porovnání před/po: dvě fotky přes sebe, horní („po") se ořezává
 * podle polohy posuvníku. Ovládá se nativním input[type=range] —
 * funguje myší, dotykem i klávesnicí. Bez JS se zobrazí půl na půl.
 */
export default function BeforeAfter({
  pred,
  po,
  altPred,
  altPo,
  popisek,
  sizes = "(min-width: 1024px) 60rem, 100vw",
}: Props) {
  const [pos, setPos] = useState(50);
  const labelId = useId();

  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-card border border-line shadow-lift"
        style={{ ["--pos" as string]: `${pos}%` }}
      >
        <Photo name={pred} alt={altPred} sizes={sizes} className="block w-full" />
        <div
          className="absolute inset-0"
          style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}
        >
          <Photo name={po} alt={altPo} sizes={sizes} className="block h-full w-full object-cover" />
        </div>

        {/* Dělicí linka */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_8px_rgb(0_0_0/0.4)]"
          style={{ left: "var(--pos)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lift"
          style={{ left: "var(--pos)" }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Po
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Před
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-labelledby={labelId}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>
      <figcaption
        id={labelId}
        className="mt-3 text-sm text-muted"
      >
        {popisek ? `${popisek} — ` : ""}posuvník porovnává stav před a po.
      </figcaption>
    </figure>
  );
}
