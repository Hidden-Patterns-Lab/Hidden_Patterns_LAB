import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { SITE_URL } from "@/lib/constants/site";

const routes = ["", "/articles", "/dashboard", "/data", "/premium", "/about", "/contact", "/privacy", "/terms", "/methodology", "/sources"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-09-14"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
