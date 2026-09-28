import { site } from "@/lib/site";
export const dynamic = "force-static";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  return origin ? [{ url: origin, changeFrequency: "monthly", priority: 1 }] : [];
}
