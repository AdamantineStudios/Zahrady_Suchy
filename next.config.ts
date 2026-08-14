import type { NextConfig } from "next";

// Web běží na GitHub Pages pod cestou /Zahrady_Suchy.
// Při přechodu na vlastní doménu (zahradysuchy.cz) stačí buildit
// s NEXT_PUBLIC_BASE_PATH="" — viz README.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Zahrady_Suchy";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
