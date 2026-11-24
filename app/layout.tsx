import type { Metadata, Viewport } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import { SITE, absoluteUrl, withBase } from "@/config";
import JsonLd from "@/components/JsonLd";
import KitRuntime from "@/components/KitRuntime";
import "./globals.css";

// Písma podle páru „lora" z kitu taste-skill (Lora / Nunito Sans), latin-ext
// kvůli české diakritice. next/font je hostuje u webu — žádný Google za běhu.
const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${SITE.name} — návrhy, realizace a údržba zahrad`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "cs_CZ",
    title: `${SITE.name} — návrhy, realizace a údržba zahrad`,
    description: SITE.description,
    images: [
      { url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: SITE.name },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { apple: withBase("/apple-icon.png") },
  robots: { index: true, follow: true },
  // druh stránky pro kit taste-skill (služba, ne technologie)
  other: { "page-type": "service", "site-kind": "other" },
};

export const viewport: Viewport = { themeColor: "#faf7f0" };

// Hlavičkové řádky kitu: vstup hera (m-enter) a pojistka momentů (mo-js/mo-safe).
const HEAD_ENTER =
  "document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)";
const HEAD_MOMENTS =
  "document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      data-type="service"
      data-radius="soft"
      data-buttons="arrow"
      data-motion=""
      className={`${lora.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_ENTER }} />
        <script dangerouslySetInnerHTML={{ __html: HEAD_MOMENTS }} />
        <link rel="stylesheet" href={withBase("/assets/motion/motion.css")} />
        <link rel="modulepreload" href={withBase("/assets/system.js")} />
        <link rel="modulepreload" href={withBase("/assets/motion/motion.js")} />
        <link rel="modulepreload" href={withBase("/assets/moments/moments.js")} />
        <link rel="modulepreload" href={withBase("/assets/moments/lib.js")} />
      </head>
      <body>
        {children}
        <KitRuntime />
        <JsonLd />
      </body>
    </html>
  );
}
