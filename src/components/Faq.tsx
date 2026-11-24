import type { CSSProperties } from "react";
import type { FaqItem } from "@/data/faq";
import { ZAVOLAT } from "@/components/Site";
import Photo, { sizesFor, type PhotoName } from "@/components/Photo";
import { alt } from "@/data/fotky";

/**
 * Časté otázky podle kitu: vlevo nadpis, šedý řádek, odkaz na telefon a fotka
 * až k patě sekce; vpravo .faq na sdílené lince splitů (start-7) — všechny
 * odpovědi otevřené (žádný akordeon). Na telefonu přesně dvě obrazovky (--hm).
 */
export default function Faq({
  id = "otazky",
  title,
  items,
  foto,
}: {
  id?: string;
  title: string;
  items: FaqItem[];
  foto: PhotoName;
}) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-h`} style={{ "--hm": 2 } as CSSProperties}>
      <div className="wrap">
        <div className="grid fill split-fill">
          <div className="split-col foto-col span-5">
            <div className="section-head">
              <h2 id={`${id}-h`}>{title}</h2>
              <p className="muted">Nenašli jste odpověď? Zavolejte nebo napište, rádi poradíme.</p>
            </div>
            <a className="link" href={ZAVOLAT.href}>
              {ZAVOLAT.label}
            </a>
            <div className="frame frame--photo col-foto">
              <Photo name={foto} alt={alt(foto)} className="frame__img" sizes={sizesFor(foto, 519, 380, [342, 560])} />
            </div>
          </div>
          <div className="faq span-6 start-7">
            {items.map((q) => (
              <div className="faq__item" key={q.otazka}>
                <h3>{q.otazka}</h3>
                <p>{q.odpoved}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
