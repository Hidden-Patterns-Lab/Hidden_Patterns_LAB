import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DatasetRecord } from "@/types/dataset";

export function DatasetCard({ dataset }: { dataset: DatasetRecord }) {
  return (
    <article className="group relative flex h-full flex-col border bg-surface p-6 transition-colors hover:border-accent sm:p-7">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="bg-accent-soft px-2.5 py-1 text-accent">{dataset.category}</span>
        <span className="border px-2.5 py-1 text-muted">{dataset.frequency}</span>
        <span className="border px-2.5 py-1 text-muted">원천 연결 예정</span>
      </div>
      <h2 className="mt-5 text-xl leading-snug font-bold tracking-[-0.025em] sm:text-2xl">
        <Link href={`/data/${dataset.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
          {dataset.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 leading-7 text-muted">{dataset.summary}</p>
      <div className="mt-7 flex items-end justify-between gap-4 border-t pt-5 text-sm">
        <div>
          <p className="font-semibold">{dataset.provider}</p>
          <p className="mt-1 text-muted">{dataset.geography} · {dataset.unit}</p>
        </div>
        <ArrowUpRight aria-hidden="true" className="shrink-0 text-accent" size={19} />
      </div>
    </article>
  );
}
