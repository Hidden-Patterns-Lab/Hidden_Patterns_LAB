import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { datasets } from "@/content/datasets";
import { SITE_URL } from "@/lib/constants/site";

const routes = ["", "/articles", "/dashboard", "/data", "/premium", "/about", "/contact", "/privacy", "/terms", "/methodology", "/sources"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(route === "/data" ? "2026-09-17" : "2026-09-14"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const datasetRoutes: MetadataRoute.Sitemap = datasets.map((dataset) => ({
    url: `${SITE_URL}/data/${dataset.slug}`,
    lastModified: new Date("2026-09-17"),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...datasetRoutes];
}
