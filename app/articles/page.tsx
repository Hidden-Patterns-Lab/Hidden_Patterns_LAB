import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { ArticleCard } from "@/components/articles/article-card";
import { Container } from "@/components/shared/container";
import { articles, articleCategories } from "@/content/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "경제, 금융, 부동산, 정책 데이터를 구조적으로 해석한 Hidden Patterns Lab의 분석 아카이브입니다.",
  alternates: { canonical: "/articles" },
  openGraph: {
    type: "website",
    url: "/articles",
    title: "Articles | Hidden Patterns Lab",
    description: "숫자 뒤의 원인과 구조, 장기적 의미를 설명하는 데이터 분석 아카이브입니다.",
  },
  twitter: {
    card: "summary",
    title: "Articles | Hidden Patterns Lab",
    description: "숫자 뒤의 원인과 구조, 장기적 의미를 설명하는 데이터 분석 아카이브입니다.",
  },
};

export default function ArticlesPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <section className="border-b bg-surface">
        <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">Analysis archive</p>
            <h1 className="mt-4 text-5xl font-bold tracking-[-0.055em] sm:text-6xl">Articles</h1>
          </div>
          <div>
            <p className="max-w-3xl text-xl leading-9 font-semibold tracking-[-0.02em] sm:text-2xl">
              숫자를 나열하는 대신, 변화가 만들어지는 구조를 추적합니다.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              경제와 시장의 움직임을 원인, 전달 경로, 장기적 의미, 다음 관찰 지표의 순서로 읽는 분석 아카이브입니다.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b bg-surface-muted/55">
        <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-muted">
            <BookOpenText aria-hidden="true" size={17} className="text-accent" />
            현재 글과 수치는 정보 구조 검증을 위한 프로토타입 콘텐츠입니다.
          </p>
          <nav aria-label="글 주제 바로가기" className="flex flex-wrap gap-2">
            {articleCategories.map((category) => (
              <Link
                key={category}
                href={category === "전체" ? "#all-articles" : `#${category}`}
                className="border bg-surface px-3 py-2 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {category}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <section className="py-16 md:py-22">
        <Container>
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Editor&apos;s pick</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">이번 주 깊이 읽기</h2>
            </div>
            <p className="hidden text-sm text-muted sm:block">{articles.length}개의 프로토타입 분석</p>
          </div>
          <article id={featured.category} className="editorial-card scroll-mt-24 overflow-hidden border bg-surface lg:grid lg:grid-cols-[1.2fr_.8fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold text-accent">{featured.category}</p>
              <h2 className="mt-5 max-w-3xl text-3xl leading-tight font-bold tracking-[-0.04em] sm:text-4xl">
                <Link href={`/articles/${featured.slug}`} className="hover:text-accent">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">{featured.summary}</p>
              <Link href={`/articles/${featured.slug}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
                분석 읽기 <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
            <div className="article-signal flex min-h-72 flex-col justify-between bg-navy p-7 text-white sm:p-10 lg:p-12">
              <p className="text-xs font-bold tracking-[0.16em] text-orange uppercase">Key structure</p>
              <div>
                <p className="text-3xl font-bold tracking-[-0.045em] sm:text-4xl">{featured.signal.value}</p>
                <p className="mt-3 text-sm text-white/70">{featured.signal.label}</p>
              </div>
              <p className="border-t border-white/20 pt-5 text-sm leading-6 text-white/65">{featured.signal.context}</p>
            </div>
          </article>
        </Container>
      </section>

      <section id="all-articles" className="scroll-mt-24 border-t bg-surface py-16 md:py-22">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">All analysis</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">최신 분석</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">발행일 기준으로 정렬했습니다. 각 글에서 근거 자료와 해석의 한계를 함께 확인할 수 있습니다.</p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border bg-border md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, index) => (
              <div key={article.slug} id={article.category} className="scroll-mt-24">
                <ArticleCard article={article} index={index + 1} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
