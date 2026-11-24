"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo, { type PhotoName } from "@/components/Photo";
import { alt } from "@/data/fotky";
import { KATEGORIE } from "@/data/galerie";

const VSECHNY = KATEGORIE.flatMap((k) => k.fotky);

/**
 * Fotogalerie: tři sekce kategorií (každá jinak rozvržená — sousední sekce
 * nesdílí rozvržení) a náhled přes celou obrazovku nad nativním <dialog>:
 * showModal() dává focus trap i zavření Escapem, šipky a tah prstem listují.
 * Bez popisků — fotku popisuje alt text.
 */
export default function Galerie() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (foto: PhotoName) => {
    openerRef.current = document.activeElement as HTMLElement;
    setIndex(VSECHNY.indexOf(foto));
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + VSECHNY.length) % VSECHNY.length)),
    [],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && index !== null && !dialog.open) dialog.showModal();
  }, [index]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setIndex(null);
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

  const fotky = (list: PhotoName[], className: string, sizes: string) => (
    <ul className={`fotky ${className}`}>
      {list.map((f) => (
        <li key={f}>
          <button
            type="button"
            className="fotka"
            onClick={() => open(f)}
            aria-haspopup="dialog"
            aria-label={`Zvětšit fotku: ${alt(f)}`}
          >
            <Photo name={f} alt={alt(f)} sizes={sizes} />
          </button>
        </li>
      ))}
    </ul>
  );

  const head = (k: (typeof KATEGORIE)[number]) => (
    <div className="section-head">
      <h2 id={`${k.id}-h`}>{k.nazev}</h2>
      <p>{k.uvod}</p>
    </div>
  );

  const [hotove, vysadby, kamen] = KATEGORIE;
  const current = index !== null ? VSECHNY[index] : null;

  return (
    <>
      {/* Hotové zahrady: text vlevo, šest fotek ve dvou sloupcích vpravo (pravý sloupec na lince splitů) */}
      <section className="section" id={hotove.id} aria-labelledby={`${hotove.id}-h`}>
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="span-5">{head(hotove)}</div>
            {fotky(hotove.fotky, "fotky--2 fill-rows span-6 start-7", "(min-width: 1024px) 320px, 50vw")}
          </div>
        </div>
      </section>

      {/* Záhony a výsadby: nadpis nahoře, šest fotek ve třech sloupcích přes celou šířku */}
      <section className="section" id={vysadby.id} aria-labelledby={`${vysadby.id}-h`}>
        <div className="wrap">
          {head(vysadby)}
          {fotky(vysadby.fotky, "fotky--3 fit fill-rows", "(min-width: 1024px) 420px, (min-width: 640px) 33vw, 50vw")}
        </div>
      </section>

      {/* Kámen a dřevo: text vlevo, čtyři fotky 2 × 2 vpravo */}
      <section className="section" id={kamen.id} aria-labelledby={`${kamen.id}-h`}>
        <div className="wrap">
          <div className="grid fill split-fill">
            <div className="span-5">{head(kamen)}</div>
            {fotky(kamen.fotky, "fotky--2 fill-rows span-6 start-7", "(min-width: 1024px) 460px, 80vw")}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="viewer"
        aria-label="Zvětšená fotografie"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current ? (
          <div className="viewer__stage">
            <Photo name={current} alt={alt(current)} sizes="100vw" />
            <div className="viewer__bar">
              <button type="button" className="viewer__btn" onClick={() => step(-1)} aria-label="Předchozí fotka">
                ←
              </button>
              <span className="viewer__count" aria-live="polite">
                {index! + 1} / {VSECHNY.length}
              </span>
              <button type="button" className="viewer__btn" onClick={() => step(1)} aria-label="Další fotka">
                →
              </button>
              <button type="button" className="viewer__btn" onClick={close}>
                Zavřít
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
