import type { CSSProperties } from "react";
import { withBase } from "@/config";
import Photo, { sizesFor, type PhotoName } from "@/components/Photo";
import { alt } from "@/data/fotky";

type Akce = { label: string; href: string };

/**
 * Hero „split" (rozdán skillem: text vlevo na span-5, fotka vpravo na
 * span-6 od sloupce 7). Celý je na první obrazovce; data-enter = vstupní
 * animace z motion.js. Tlačítka: hlavní akce + nejvýš jedna další.
 */
export default function HeroSplit({
  kicker,
  title,
  lead,
  primary,
  secondary,
  foto,
  pos = "50% 50%",
}: {
  kicker?: string;
  title: string;
  lead: string;
  primary: Akce;
  secondary?: Akce;
  foto: PhotoName;
  pos?: string;
}) {
  const href = (a: Akce) => (a.href.startsWith("/") ? withBase(a.href) : a.href);
  return (
    <section className="hero hero--split" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="hero__text span-5">
            {kicker ? (
              <p className="hero__kicker">
                <span className="dot" aria-hidden="true"></span>
                {kicker}
              </p>
            ) : null}
            <h1 id="hero-h">{title}</h1>
            <p className="hero__lead">{lead}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={href(primary)}>
                {primary.label}
              </a>
              {secondary ? (
                <a className="btn btn--secondary" href={href(secondary)}>
                  {secondary.label}
                </a>
              ) : null}
            </div>
          </div>
          <div className="hero__media span-6 start-7">
            <Photo
              name={foto}
              alt={alt(foto)}
              priority
              sizes={sizesFor(foto, 628, 716)}
              style={{ "--ly-pos": pos } as CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
