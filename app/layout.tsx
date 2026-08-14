import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Lora } from "next/font/google";
import { SITE, absoluteUrl, withBase } from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
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
  icons: { apple: withBase("/apple-icon.png") },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#faf7f0" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${lora.variable} ${hanken.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased">
        {/* Brána pro odhalovací animace: bez JS zůstává obsah viditelný */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-moss focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Přeskočit na obsah
        </a>
        <Header />
        <main id="obsah">{children}</main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
