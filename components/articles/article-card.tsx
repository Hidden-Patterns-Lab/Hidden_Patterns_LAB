import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/types/article";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <article className="article-card group relative flex h-full flex-col border bg-surface p-6 sm:p-7">
      <div className="article-visual mb-7 flex aspect-[16/7] items-end justify-between overflow-hidden bg-surface-muted p-5" aria-hidden="true">
        <span className="text-5xl font-bold tracking-[-0.07em] text-accent/25">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-16 bg-accent/45 transition-all group-hover:w-24" />
      </div>
      <p className="text-sm font-semibold text-accent">{article.category}</p>
      <h2 className="mt-3 text-2xl leading-snug font-bold tracking-[-0.03em]">
        <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
          {article.title}
        </Link>
      </h2>
      <p className="mt-4 line-clamp-3 leading-7 text-muted">{article.summary}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-7 text-sm text-muted">
        <p>
          <time dateTime={article.publishedAt}>{article.displayDate}</time> · {article.readingTime}
        </p>
        <ArrowUpRight aria-hidden="true" className="shrink-0 text-accent" size={18} />
      </div>
    </article>
  );
}
