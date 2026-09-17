export type ArticleCategory = "가계금융" | "부동산" | "금융시장" | "정책";

export type ArticleSource = {
  name: string;
  description: string;
  url: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type Article = {
  slug: string;
  category: ArticleCategory;
  eyebrow: string;
  title: string;
  summary: string;
  publishedAt: string;
  displayDate: string;
  readingTime: string;
  featured?: boolean;
  signal: {
    value: string;
    label: string;
    context: string;
  };
  keyPoints: readonly string[];
  sections: readonly ArticleSection[];
  watchNext: readonly string[];
  sources: readonly ArticleSource[];
};
