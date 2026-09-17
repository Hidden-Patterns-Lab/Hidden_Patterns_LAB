import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/articles/article-card";
import { Container } from "@/components/shared/container";
import { articles, getArticleBySlug, getRelatedArticles } from "@/content/articles";
import { SITE_NAME } from "@/lib/constants/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: "분석을 찾을 수 없습니다" };

  const url = `/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url,
      siteName: SITE_NAME,
      title: article.title,
      description: article.summary,
      publishedTime: article.publishedAt,
      section: article.category,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = getRelatedArticles(slug);

  return (
    <>
      <article>
        <header className="border-b bg-surface">
          <Container className="py-12 md:py-18">
            <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent">
              <ArrowLeft aria-hidden="true" size={17} /> Articles
            </Link>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_17rem] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="bg-accent-soft px-3 py-1 font-semibold text-accent">{article.category}</span>
                  <span className="border px-3 py-1 font-semibold text-muted">프로토타입 분석</span>
                </div>
                <h1 className="mt-7 max-w-4xl text-4xl leading-[1.16] font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">{article.title}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{article.summary}</p>
              </div>
              <dl className="grid grid-cols-2 gap-5 border-t pt-6 text-sm lg:grid-cols-1">
                <div>
                  <dt className="text-muted">발행</dt>
                  <dd className="mt-1 font-semibold"><time dateTime={article.publishedAt}>{article.displayDate}</time></dd>
                </div>
                <div>
                  <dt className="text-muted">읽는 시간</dt>
                  <dd className="mt-1 font-semibold">{article.readingTime}</dd>
                </div>
              </dl>
            </div>
          </Container>
        </header>

        <section className="bg-navy text-white">
          <Container className="grid gap-8 py-10 md:grid-cols-[.72fr_1.28fr] md:items-center md:py-12">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-orange uppercase">Core signal</p>
              <p className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">{article.signal.value}</p>
              <p className="mt-2 text-sm text-white/65">{article.signal.label}</p>
            </div>
            <p className="border-l border-white/20 pl-6 text-lg leading-8 text-white/80">{article.signal.context}</p>
          </Container>
        </section>

        <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
          <div className="min-w-0">
            <section aria-labelledby="key-points" className="border-y py-8">
              <p id="key-points" className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Three takeaways</p>
              <ol className="mt-6 grid gap-5">
                {article.keyPoints.map((point, index) => (
                  <li key={point} className="grid grid-cols-[2rem_1fr] gap-3 leading-7">
                    <span className="font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{point}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="article-body mt-12">
              {article.sections.map((section) => (
                <section key={section.heading} className="mb-12 last:mb-0">
                  <h2 className="text-3xl font-bold tracking-[-0.04em]">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-[1.05rem] leading-8 text-muted">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-14 border bg-surface p-7 sm:p-9">
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Watch next</p>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em]">다음에 확인할 지표</h2>
              <ul className="mt-6 grid gap-4">
                {article.watchNext.map((item) => (
                  <li key={item} className="flex gap-3 leading-7"><ArrowRight aria-hidden="true" className="mt-1 shrink-0 text-accent" size={18} />{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="border-t pt-7 lg:sticky lg:top-24" aria-label="분석 정보">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Sources</p>
            <h2 className="mt-3 text-xl font-bold">근거 자료</h2>
            <ul className="mt-5 grid gap-5">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 font-semibold hover:text-accent hover:underline">
                    {source.name}<ExternalLink aria-hidden="true" className="mt-0.5 shrink-0" size={15} />
                  </a>
                  <p className="mt-2 text-sm leading-6 text-muted">{source.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t pt-6 text-sm leading-6 text-muted">
              <p className="font-semibold text-foreground">편집 주의사항</p>
              <p className="mt-2">이 글은 콘텐츠 구조 검증용 프로토타입이며 투자·정책 판단을 위한 최신 분석이 아닙니다. 실제 발행 전 원자료 재검증이 필요합니다.</p>
            </div>
            <Link href="/methodology" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
              분석 방법론 <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </aside>
        </Container>
      </article>

      <section className="border-t bg-surface py-14 md:py-18">
        <Container>
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Continue reading</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">이어 읽을 분석</h2>
            </div>
            <Link href="/articles" className="hidden items-center gap-2 font-semibold text-accent hover:underline sm:inline-flex">전체 보기 <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border bg-border md:grid-cols-2">
            {relatedArticles.map((related, index) => <ArticleCard key={related.slug} article={related} index={index} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
