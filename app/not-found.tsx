import { withBase } from "@/config";
import Site, { AKCE } from "@/components/Site";
import { alt } from "@/data/fotky";

export default function NotFound() {
  return (
    <Site close={{ foto: "dvorek-lavicky", alt: alt("dvorek-lavicky") }}>
      <section className="section" aria-labelledby="nf-h">
        <div className="wrap">
          <div className="section-head">
            <p className="t-label muted">Chyba 404</p>
            <h1 id="nf-h">Tahle cesta v zahradě nikam nevede</h1>
            <p>Stránka, kterou hledáte, tu není. Zkuste to od úvodní stránky, nebo se podívejte do galerie.</p>
          </div>
          <div className="btn-row">
            <a className="btn btn--primary" href={withBase(AKCE.href)}>
              {AKCE.label}
            </a>
            <a className="btn btn--secondary" href={withBase("/galerie/")}>
              Prohlédnout galerii
            </a>
          </div>
          <p>
            <a className="link" href={withBase("/")}>
              Přejít na úvodní stránku
            </a>
          </p>
        </div>
      </section>
    </Site>
  );
}
