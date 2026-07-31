import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChartNoAxesCombined,
  Landmark,
  LineChart,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { SignalPanel } from "@/components/home/signal-panel";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { ButtonLink } from "@/components/ui/button-link";
import {
  dashboardCategories,
  featuredInsight,
  latestArticles,
  metrics,
  methodology,
  topics,
} from "@/data/mock/home";

const dashboardIcons = [Building2, Landmark, LineChart, ChartNoAxesCombined];

export default function Home() {
  return (
    <>
      <section className="hero-grid relative overflow-hidden border-b bg-surface">
        <Container className="relative grid gap-12 py-16 md:py-22 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-26">
          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
                Korean data intelligence media
              </p>
            </div>
            <h1 className="max-w-4xl text-[2.7rem] leading-[1.08] font-bold tracking-[-0.055em] sm:text-6xl lg:text-[4.6rem]">
              데이터 너머,
              <br />
              <span className="relative inline-block text-accent">
                변화의 구조
                <span className="absolute right-0 -bottom-1 left-0 h-[3px] bg-accent/25" aria-hidden="true" />
              </span>
              를 읽습니다
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
              공공데이터와 경제지표를 연결해 현상 뒤의 원인과 메커니즘,
              그리고 다음에 주목할 신호를 명확하게 설명합니다.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#today">오늘의 인사이트 보기</ButtonLink>
              <ButtonLink href="/dashboard" variant="outline">
                데이터 대시보드 둘러보기
              </ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t pt-5 text-xs font-semibold text-muted">
              <span>공신력 있는 원천 데이터</span>
              <span>출처 기반 분석</span>
              <span>매주 새로운 인사이트</span>
            </div>
          </div>
          <SignalPanel />
        </Container>
      </section>

      <section id="today" className="py-18 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Today’s hidden pattern"
            title="오늘의 숨은 패턴"
            description="한 개의 숫자를 맥락과 구조 속에서 읽습니다."
          />
          <article className="editorial-card mt-9 overflow-hidden border bg-surface lg:grid lg:grid-cols-[1.25fr_.75fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="bg-accent-soft px-3 py-1 font-semibold text-accent">
                  {featuredInsight.category}
                </span>
                <time className="text-muted">{featuredInsight.date}</time>
              </div>
              <h2 className="mt-7 max-w-3xl text-3xl leading-tight font-bold tracking-[-0.035em] sm:text-4xl">
                {featuredInsight.title}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {featuredInsight.summary}
              </p>
              <Link
                href="/articles"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:underline"
              >
                전체 분석 보기 <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
            <div className="flex flex-col justify-between bg-navy p-7 text-white sm:p-10 lg:p-12">
              <div>
                <p className="text-sm text-white/65">핵심 지표</p>
                <p className="mt-4 text-5xl font-bold tracking-[-0.05em] sm:text-6xl">
                  {featuredInsight.metric}
                </p>
                <p className="mt-3 text-sm text-white/75">
                  {featuredInsight.metricLabel}
                </p>
              </div>
              <p className="mt-12 border-t border-white/20 pt-5 text-xs text-white/65">
                출처: {featuredInsight.source}
              </p>
            </div>
          </article>
        </Container>
      </section>

      <section className="border-y bg-surface py-18 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Latest analysis"
            title="최신 분석"
            description="표면의 변화를 넘어 원인과 연결 구조를 추적합니다."
            action={{ label: "모든 글 보기", href: "/articles" }}
          />
          <div className="mt-9 grid gap-px overflow-hidden border bg-border md:grid-cols-3">
            {latestArticles.map((article, index) => (
              <article key={article.title} className="article-card group relative bg-surface p-7 sm:p-8">
                <div
                  className="article-visual mb-7 flex aspect-[16/8] items-end overflow-hidden bg-surface-muted p-5"
                  aria-hidden="true"
                >
                  <span className="text-5xl font-bold text-accent/25">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-sm font-semibold text-accent">{article.category}</p>
                <h3 className="mt-3 text-xl leading-snug font-bold tracking-[-0.025em]">
                  <Link href="/articles" className="after:absolute after:inset-0 group-hover:text-accent">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 leading-7 text-muted">
                  {article.summary}
                </p>
                <p className="mt-6 text-xs text-muted">
                  {article.date} · {article.readingTime}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-18 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Featured data"
            title="숫자에서 읽는 변화"
            description="핵심 지표와 해석을 한눈에 확인하세요."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <article key={metric.label} className="metric-card border bg-surface p-7">
                <p className="text-sm font-semibold text-muted">{metric.label}</p>
                <div className="mt-5 flex items-baseline gap-3">
                  <strong className="text-4xl tracking-[-0.04em]">{metric.value}</strong>
                  <span className={metric.positive ? "text-accent" : "text-navy"}>
                    {metric.change}
                  </span>
                </div>
                <p className="mt-5 min-h-14 leading-7 text-muted">{metric.insight}</p>
                <div className="mt-6 border-t pt-4 text-xs leading-5 text-muted">
                  <p>{metric.period}</p>
                  <p>출처: {metric.source}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-18 text-white md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Dashboard preview"
            title="흩어진 지표를 한 화면에서"
            description="주요 경제·시장 데이터를 비교하고 흐름을 읽는 대시보드를 준비하고 있습니다."
            inverse
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardCategories.map((category, index) => {
              const Icon = dashboardIcons[index];
              return (
                <Link
                  key={category}
                  href="/dashboard"
                  className="dashboard-tile group border border-white/20 p-6 transition-colors hover:bg-white hover:text-navy"
                >
                  <Icon aria-hidden="true" size={26} strokeWidth={1.6} />
                  <p className="mt-10 text-lg font-semibold">{category}</p>
                  <span className="mt-2 flex items-center gap-1 text-sm text-white/60 group-hover:text-navy/70">
                    지표 살펴보기 <ArrowRight aria-hidden="true" size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b bg-surface py-18 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Topics"
            title="관심 주제로 탐색하기"
            description="서로 떨어져 보이는 지표 사이의 연결을 주제별로 발견합니다."
          />
          <div className="mt-9 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Link
                key={topic}
                href="/articles"
              className="topic-pill border bg-background px-5 py-3 font-semibold transition-all hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {topic}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-18 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <div className="mb-6 flex size-12 items-center justify-center bg-accent-soft text-accent">
              <ShieldCheck aria-hidden="true" />
            </div>
            <p className="text-sm font-bold tracking-[0.15em] text-accent uppercase">
              Our methodology
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
              숫자의 출처부터
              <br />
              해석의 근거까지
            </h2>
            <p className="mt-5 leading-7 text-muted">
              분석에 사용한 출처와 기준을 밝히고, 데이터가 말할 수 있는 범위와
              한계를 함께 설명합니다.
            </p>
          </div>
          <ol className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {methodology.map((step, index) => (
              <li key={step} className="bg-surface p-6">
                <span className="text-sm font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-8 font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t bg-surface-muted py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-5 flex size-11 items-center justify-center bg-navy text-white">
              <Mail aria-hidden="true" size={21} />
            </div>
            <h2 className="text-3xl font-bold tracking-[-0.035em]">
              중요한 변화를 놓치지 마세요
            </h2>
            <p className="mt-3 text-muted">
              매주 핵심 데이터와 구조적 해석을 정리한 뉴스레터를 준비하고
              있습니다.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" action="#">
            <label htmlFor="newsletter-email" className="sr-only">
              이메일 주소
            </label>
            <input
              id="newsletter-email"
              type="email"
              disabled
              placeholder="email@example.com"
              className="min-h-12 flex-1 border bg-surface px-4 disabled:cursor-not-allowed disabled:opacity-70"
            />
            <button
              type="button"
              disabled
              className="min-h-12 bg-navy px-6 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              준비 중
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
