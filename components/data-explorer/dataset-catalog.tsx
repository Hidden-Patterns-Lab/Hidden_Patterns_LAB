"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { Container } from "@/components/shared/container";
import { DatasetCard } from "@/components/data-explorer/dataset-card";
import { datasetCategories, datasetFrequencies, datasets } from "@/content/datasets";
import type { DatasetCategory, DatasetFrequency } from "@/types/dataset";

type CategoryFilter = DatasetCategory | "전체";
type FrequencyFilter = DatasetFrequency | "전체";

export function DatasetCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("전체");
  const [frequency, setFrequency] = useState<FrequencyFilter>("전체");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ko-KR");

    return datasets.filter((dataset) => {
      if (category !== "전체" && dataset.category !== category) return false;
      if (frequency !== "전체" && dataset.frequency !== frequency) return false;
      if (!normalized) return true;

      return [dataset.title, dataset.summary, dataset.provider, dataset.category, ...dataset.keywords]
        .some((value) => value.toLocaleLowerCase("ko-KR").includes(normalized));
    });
  }, [query, category, frequency]);

  const reset = () => {
    setQuery("");
    setCategory("전체");
    setFrequency("전체");
  };

  return (
    <>
      <section className="border-b bg-surface">
        <Container className="grid gap-6 py-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:py-14">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Dataset catalog</p>
            <h1 className="mt-3 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">Data Explorer</h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted">어떤 데이터를 어디서 얻고, 무엇을 조심해 읽어야 하는지 먼저 확인하세요. 현재는 원천을 정리한 카탈로그이며 데이터 값은 수집하지 않습니다.</p>
        </Container>
      </section>

      <Container className="py-9 md:py-12">
        <section aria-label="데이터셋 검색 및 필터" className="border bg-surface p-5 sm:p-7">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_.8fr_.7fr_auto] lg:items-end">
            <div>
              <label htmlFor="dataset-search" className="mb-2 block text-sm font-semibold">데이터셋 검색</label>
              <div className="relative">
                <Search aria-hidden="true" className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" size={19} />
                <input id="dataset-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
                  placeholder="예: 물가, 가계신용, 한국은행" className="min-h-12 w-full border bg-background pr-3 pl-11 text-base" />
              </div>
            </div>
            <div>
              <label htmlFor="dataset-category" className="mb-2 block text-sm font-semibold">주제</label>
              <select id="dataset-category" value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)} className="min-h-12 w-full border bg-background px-3 text-base">
                {datasetCategories.map((item) => <option key={item} value={item}>{item === "전체" ? "모든 주제" : item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="dataset-frequency" className="mb-2 block text-sm font-semibold">공표 주기</label>
              <select id="dataset-frequency" value={frequency} onChange={(event) => setFrequency(event.target.value as FrequencyFilter)} className="min-h-12 w-full border bg-background px-3 text-base">
                {datasetFrequencies.map((item) => <option key={item} value={item}>{item === "전체" ? "모든 주기" : item}</option>)}
              </select>
            </div>
            <button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center gap-2 border px-4 text-sm font-semibold text-muted hover:border-accent hover:text-accent">
              <RotateCcw aria-hidden="true" size={16} /> 초기화
            </button>
          </div>
        </section>

        <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Explore sources</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em]">데이터셋 목록</h2>
          </div>
          <p aria-live="polite" className="text-sm text-muted">{filtered.length}개 / 전체 {datasets.length}개</p>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((dataset) => <DatasetCard key={dataset.slug} dataset={dataset} />)}
          </div>
        ) : (
          <div className="mt-6 border bg-surface px-6 py-14 text-center" role="status">
            <p className="text-xl font-bold">일치하는 데이터셋이 없습니다</p>
            <p className="mt-3 text-muted">검색어를 줄이거나 주제·주기 필터를 바꿔 보세요.</p>
            <button type="button" onClick={reset} className="mt-6 min-h-11 bg-navy px-5 font-semibold text-white">전체 목록 보기</button>
          </div>
        )}

        <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-6 text-muted">이 카탈로그는 데이터의 위치와 해석 조건을 안내합니다. 원천 자료의 실제 값, 갱신 시점, 이용 조건은 제공처에서 다시 확인해야 합니다.</p>
      </Container>
    </>
  );
}
