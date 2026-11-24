import { SITE, absoluteUrl } from "@/config";

/**
 * Strukturovaná data pro vyhledávače (LocalBusiness).
 * Všechny údaje jsou skutečné — telefon a e-mail z webu, IČO z veřejného
 * rejstříku. Firma jezdí za zákazníky (oblast působnosti), proto adresa jen
 * jako obec: ulici s číslem a PSČ vyhledávače nepotřebují — úplné sídlo
 * (povinný údaj podnikatele) je v patičce každé stránky.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    legalName: SITE.legalName,
    identifier: SITE.ico,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.telefonHref,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og.jpg"),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.mesto,
      addressRegion: SITE.region,
      addressCountry: "CZ",
    },
    areaServed: SITE.region,
    priceRange: "cena na dotaz",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
