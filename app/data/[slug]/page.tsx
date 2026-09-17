import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { catalogReviewedAt, datasets, getDatasetBySlug } from "@/content/datasets";
import { SITE_NAME } from "@/lib/constants/site";

type DatasetPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return datasets.map((dataset) => ({ slug: dataset.slug }));
}

export async function generateMetadata({ params }: DatasetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);

  if (!dataset) return { title: "데이터셋을 찾을 수 없습니다" };

  const url = `/data/${dataset.slug}`;

  return {
    title: dataset.title,
    description: dataset.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      siteName: SITE_NAME,
      title: `${dataset.title} | Data Explorer`,
      description: dataset.summary,
    },
    twitter: {
      card: "summary",
      title: `${dataset.title} | Data Explorer`,
      description: dataset.summary,
    },
  };
}

export default async function DatasetPage({ params }: DatasetPageProps) {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);

  if (!dataset) notFound();

  return (
    <>
      <header className="border-b bg-surface">
        <Container className="py-10 md:py-16">
          <Link href="/data" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent">
            <ArrowLeft aria-hidden="true" size={17} /> Data Explorer
          </Link>
          <div className="mt-9 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="bg-accent-soft px-3 py-1.5 text-accent">{dataset.category}</span>
            <span className="border px-3 py-1.5 text-muted">{dataset.frequency} 단위 공표</span>
            <span className="border px-3 py-1.5 text-muted">원천 연결 예정</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl leading-tight font-bold tracking-[-0.05em] sm:text-5xl">{dataset.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{dataset.summary}</p>
        </Container>
      </header>

      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="min-w-0">
          <section aria-labelledby="dataset-definition">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Dataset definition</p>
            <h2 id="dataset-definition" className="mt-3 text-2xl font-bold tracking-[-0.035em]">무엇을 담는 자료인가</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{dataset.definition}</p>
          </section>

          <section aria-labelledby="dataset-fields" className="mt-12">
            <h2 id="dataset-fields" className="text-2xl font-bold tracking-[-0.035em]">주요 항목</h2>
            <div className="mt-5 overflow-x-auto border bg-surface">
              <table className="w-full min-w-[30rem] border-collapse text-left">
                <caption className="sr-only">{dataset.title} 주요 항목과 설명</caption>
                <thead className="bg-surface-muted/50 text-sm">
                  <tr><th scope="col" className="w-40 px-5 py-4 font-semibold">항목</th><th scope="col" className="px-5 py-4 font-semibold">의미</th></tr>
                </thead>
                <tbody>
                  {dataset.fields.map((field) => (
                    <tr key={field.name} className="border-t">
                      <th scope="row" className="px-5 py-4 font-semibold">{field.name}</th>
                      <td className="px-5 py-4 leading-7 text-muted">{field.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="dataset-uses" className="mt-12 border-t pt-10">
            <h2 id="dataset-uses" className="text-2xl font-bold tracking-[-0.035em]">어떻게 활용할 수 있나</h2>
            <ul className="mt-5 grid gap-3">
              {dataset.useCases.map((item) => <li key={item} className="flex gap-3 leading-7"><ArrowRight aria-hidden="true" size={18} className="mt-1 shrink-0 text-accent" />{item}</li>)}
            </ul>
          </section>

          <section aria-labelledby="dataset-caveats" className="mt-12 border bg-surface-muted/50 p-6 sm:p-8">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Before using</p>
            <h2 id="dataset-caveats" className="mt-3 text-2xl font-bold tracking-[-0.035em]">해석할 때 주의할 점</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-muted">
              {dataset.caveats.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </div>

        <aside className="border-t pt-7 lg:sticky lg:top-24" aria-label="데이터셋 메타데이터와 원천">
          <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Metadata</p>
          <h2 className="mt-3 text-xl font-bold">자료 정보</h2>
          <dl className="mt-5 divide-y border-y text-sm">
            {[
              ["제공 기관", dataset.provider],
              ["주제", dataset.category],
              ["공표 주기", dataset.frequency],
              ["지역 범위", dataset.geography],
              ["표시 단위", dataset.unit],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-3">
                <dt className="shrink-0 text-muted">{label}</dt>
                <dd className="text-right font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-muted">카탈로그 확인일: <time dateTime={catalogReviewedAt}>2026. 09. 17</time> · 실제 원천 자료의 최종 갱신일과 다릅니다.</p>

          <div className="mt-8 border-t pt-6">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Official source</p>
            <h2 className="mt-3 text-xl font-bold">원천 자료</h2>
            <a href={dataset.source.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-start gap-2 font-semibold text-accent hover:underline">
              {dataset.source.label} <ExternalLink aria-hidden="true" size={16} className="mt-1 shrink-0" />
            </a>
            <p className="mt-4 text-sm leading-6 text-muted">이곳에는 원자료를 복제하거나 실시간으로 갱신하지 않습니다. 실제 값·공표일·이용 조건은 제공 기관에서 확인하세요.</p>
          </div>
        </aside>
      </Container>

      <section className="border-t bg-surface py-10">
        <Container>
          <Link href="/data" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">
            전체 데이터셋 보기 <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </Container>
      </section>
    </>
  );
}
