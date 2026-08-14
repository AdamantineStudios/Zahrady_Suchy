"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { GALERIE, KATEGORIE } from "@/data/galerie";

/**
 * Fotogalerie s lightboxem nad nativním <dialog> — showModal() dává
 * zdarma focus trap i zavření Escapem. Šipky listují, tahem prstu
 * se přechází mezi fotkami, čtečkám se hlásí popisek a pozice.
 */
export default function GalerieClient() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    openerRef.current = document.activeElement as HTMLElement;
    setIndex(i);
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setIndex((i) =>
      i === null ? i : (i + dir + GALERIE.length) % GALERIE.length,
    );
  }, []);

  // Otevření/zavření dialogu podle stavu
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  }, [index]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setIndex(null);
      document.documentElement.style.overflow = "";
      openerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? GALERIE[index] : null;

  return (
    <>
      {KATEGORIE.map((kat) => {
        const fotky = GALERIE.filter((f) => f.kategorie === kat.id);
        return (
          <section
            key={kat.id}
            id={kat.id}
            aria-labelledby={`galerie-${kat.id}`}
            className="scroll-mt-24 py-8"
          >
            <h2
              id={`galerie-${kat.id}`}
              className="font-display text-2xl font-medium text-ink"
            >
              {kat.nazev}
            </h2>
            <p className="mt-1 max-w-2xl text-muted">{kat.uvod}</p>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fotky.map((f, i) => {
                const globalIndex = GALERIE.indexOf(f);
                return (
                  <li key={f.foto}>
                    <Reveal delay={(i % 3) * 70}>
                      <button
                        type="button"
                        onClick={() => open(globalIndex)}
                        aria-haspopup="dialog"
                        aria-label={`Zvětšit fotku: ${f.popisek ?? f.alt}`}
                        className="group block w-full overflow-hidden rounded-card border border-line bg-paper shadow-soft transition-shadow hover:shadow-lift"
                      >
                        <span className="block overflow-hidden">
                          <Photo
                            name={f.foto}
                            alt={f.alt}
                            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        </span>
                        {f.popisek ? (
                          <span className="block px-4 py-3 text-left text-sm text-muted">
                            {f.popisek}
                          </span>
                        ) : null}
                      </button>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <dialog
        ref={dialogRef}
        aria-label="Zvětšená fotografie"
        className="m-auto w-full max-w-none bg-transparent p-0 backdrop:bg-ink/90"
        onClick={(e) => {
          // klik mimo obsah (na podklad dialogu) zavírá
          if (e.target === dialogRef.current) close();
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        {current ? (
          <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 p-4 sm:p-8">
            <Photo
              name={current.foto}
              alt={current.alt}
              sizes="100vw"
              className="max-h-[78dvh] w-auto max-w-full rounded-xl object-contain shadow-lift"
            />
            <p
              className="max-w-2xl text-center text-sm text-white/85"
              aria-live="polite"
            >
              {current.popisek ?? current.alt} · {index! + 1} / {GALERIE.length}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Předchozí fotka"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/25"
              >
                Zavřít
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Další fotka"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
