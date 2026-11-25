import type { NextConfig } from "next";

// Cestu a doménu dodává při nasazení GitHub Actions podle nastavení Pages
// (viz .github/workflows/deploy.yml): bez vlastní domény „/Zahrady_Suchy",
// s doménou zahradysuchy.cz prázdná cesta. Lokálně a v CI pull requestů
// platí výchozí hodnoty níže.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/Zahrady_Suchy").replace(/\/$/, "");
const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://adamantinestudios.github.io")
  .replace(/\/$/, "")
  // certifikát pro novou doménu může chvíli chybět; kanonické odkazy vždy https
  .replace(/^http:/, "https:");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_ORIGIN: siteOrigin },
};

export default nextConfig;
