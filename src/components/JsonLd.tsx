import { SITE, absoluteUrl } from "@/config";

/**
 * Strukturovaná data pro vyhledávače (LocalBusiness).
 * Všechny údaje jsou skutečné — telefon a e-mail z webu,
 * IČO a sídlo z veřejného rejstříku.
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
    image: absoluteUrl("/og.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.adresa.ulice,
      addressLocality: "České Budějovice",
      postalCode: "370 05",
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
