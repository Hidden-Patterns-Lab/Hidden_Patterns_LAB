"use client";

import { useState } from "react";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MetricCard } from "@/components/dashboard/metric-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { dashboardDatasets, dashboardMonths, dashboardUpdatedAt } from "@/data/mock/dashboard";
import type { DashboardCategory } from "@/types/dashboard";

const periods = [6, 12] as const;

export function DashboardWorkspace() {
  const [category, setCategory] = useState<DashboardCategory>("housing");
  const [period, setPeriod] = useState<(typeof periods)[number]>(12);
  const dataset = dashboardDatasets.find((item) => item.id === category) ?? dashboardDatasets[0];
  const startIndex = dashboardMonths.length - period;
  const visibleMonths = dashboardMonths.slice(startIndex);
  const dateRange = `${visibleMonths[0]}–${visibleMonths.at(-1)}`;

  return (
    <>
      <section className="border-b bg-surface">
        <Container className="py-9 md:py-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Data dashboard</p>
              <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">Dashboard</h1>
              <p className="mt-3 max-w-2xl leading-7 text-muted">핵심 지표의 방향과 속도를 비교하고, 다음에 확인할 신호를 살펴보세요.</p>
            </div>
            <p className="flex items-center gap-2 border bg-accent-soft px-3 py-2 text-sm font-semibold text-accent">
              <FlaskConical aria-hidden="true" size={17} /> 모든 수치는 목업 데이터
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="대시보드 필터" className="sticky top-18 z-20 border-b bg-background/95 backdrop-blur-sm">
        <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold text-muted">주제 선택</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="주제 선택">
              {dashboardDatasets.map((item) => (
                <button key={item.id} type="button" onClick={() => setCategory(item.id)} aria-pressed={category === item.id}
                  className={`min-h-10 border px-4 text-sm font-semibold transition-colors ${category === item.id ? "border-navy bg-navy text-white" : "bg-surface text-muted hover:border-accent hover:text-accent"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted">기간 선택</p>
            <div className="flex gap-2" role="group" aria-label="기간 선택">
              {periods.map((value) => (
                <button key={value} type="button" onClick={() => setPeriod(value)} aria-pressed={period === value}
                  className={`min-h-10 border px-4 text-sm font-semibold transition-colors ${period === value ? "border-accent bg-accent text-white" : "bg-surface text-muted hover:border-accent hover:text-accent"}`}>
                  최근 {value}개월
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10 md:py-14">
        <div aria-live="polite" aria-atomic="true" className="sr-only">{dataset.label}, 최근 {period}개월 선택됨</div>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-accent">{dataset.label} · {dateRange}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] sm:text-3xl">{dataset.headline}</h2>
            <p className="mt-2 text-muted">{dataset.description}</p>
          </div>
          <p className="text-sm text-muted">목업 기준일 <time dateTime={dashboardUpdatedAt}>2026. 09. 14</time></p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {dataset.series.map((series) => <MetricCard key={series.id} series={series} previousIndex={startIndex} />)}
        </div>

        <section className="mt-10" aria-labelledby="trend-heading">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="trend-heading" className="text-2xl font-bold tracking-[-0.035em]">월별 흐름</h2>
            <p className="text-sm text-muted">서로 다른 단위이므로 각 차트의 축을 따로 읽어야 합니다.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {dataset.series.map((series) => (
              <TrendChart key={series.id} series={series} period={dateRange} updatedAt={dashboardUpdatedAt} points={visibleMonths.map((month, index) => ({ month, value: series.values[startIndex + index] }))} />
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <section className="border bg-surface p-6 sm:p-8" aria-labelledby="table-heading">
            <h2 id="table-heading" className="text-2xl font-bold tracking-[-0.035em]">월별 비교표</h2>
            <p className="mt-2 text-sm text-muted">기간: {dateRange} · 값은 모두 예시입니다.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <caption className="sr-only">{dataset.label} 월별 목업 지표 비교</caption>
                <thead>
                  <tr className="border-y bg-surface-muted/50">
                    <th scope="col" className="px-3 py-3 font-semibold">월</th>
                    {dataset.series.map((series) => <th key={series.id} scope="col" className="px-3 py-3 text-right font-semibold">{series.label} ({series.unit})</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[...visibleMonths].reverse().map((month, reverseIndex) => {
                    const index = startIndex + visibleMonths.length - 1 - reverseIndex;
                    return (
                      <tr key={month} className="border-b last:border-b-0">
                        <th scope="row" className="px-3 py-3 font-medium">{month}</th>
                        {dataset.series.map((series) => <td key={series.id} className="px-3 py-3 text-right tabular-nums">{series.values[index].toLocaleString("ko-KR")}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="flex flex-col gap-4" aria-label="지표 해석">
            <section className="bg-navy p-7 text-white sm:p-8">
              <p className="text-xs font-bold tracking-[0.16em] text-orange uppercase">Reading the pattern</p>
              <h2 className="mt-3 text-2xl font-bold">지금 읽을 구조</h2>
              <p className="mt-5 leading-8 text-white/80">{dataset.takeaway}</p>
              <div className="mt-8 border-t border-white/20 pt-6">
                <p className="flex items-center gap-2 font-semibold"><ArrowRight aria-hidden="true" size={18} /> 다음에 볼 것</p>
                <p className="mt-3 leading-7 text-white/75">{dataset.watch}</p>
              </div>
            </section>
            <section className="border bg-surface-muted/50 p-6 text-sm leading-7 text-muted">
              <h2 className="font-bold text-foreground">데이터 이용 안내</h2>
              <p className="mt-2">이 화면의 수치는 실제 발표값이 아닌 가상 시계열입니다. 출처명은 향후 검증할 공식 기관을 가리키며, 현재 수치의 출처를 뜻하지 않습니다.</p>
              <p className="mt-3">실제 분석이나 투자 판단에는 각 기관의 최신 원자료를 확인하세요.</p>
            </section>
          </aside>
        </div>
      </Container>
    </>
  );
}
