import type { Metadata, Viewport } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import { SITE, absoluteUrl, withBase } from "@/config";
import { HOME_TITLE, OG_BASE } from "@/meta";
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
    default: HOME_TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: { ...OG_BASE, title: HOME_TITLE, description: SITE.description },
  twitter: { card: "summary_large_image" },
  // ikony vypsané celé: favicon.ico pro Safari a starší prohlížeče (SVG ikonu neumí), SVG pro
  // ostatní, apple-touch-icon pro plochu iPhonu — vše pod basePath, ať funguje i na github.io
  icons: {
    icon: [
      { url: withBase("/favicon.ico"), sizes: "32x32" },
      { url: withBase("/icon.svg"), type: "image/svg+xml" },
    ],
    apple: withBase("/apple-icon.png"),
  },
  // iPhone jinak dělá z IČO v patičce odkaz na volání; telefon je odkazem i tak (tel:)
  formatDetection: { telephone: false },
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
