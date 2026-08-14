import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/navrh-zahrady/"), priority: 0.9 },
    { url: absoluteUrl("/realizace-zahrad/"), priority: 0.9 },
    { url: absoluteUrl("/udrzba-zelene/"), priority: 0.9 },
    { url: absoluteUrl("/galerie/"), priority: 0.8 },
    { url: absoluteUrl("/kontakt/"), priority: 0.8 },
  ];
}
