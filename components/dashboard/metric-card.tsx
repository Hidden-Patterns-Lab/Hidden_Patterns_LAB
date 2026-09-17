import type { DashboardSeries } from "@/types/dashboard";

function formatValue(value: number) {
  return Number.isInteger(value) ? value.toLocaleString("ko-KR") : value.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
}

export function MetricCard({ series, previousIndex }: { series: DashboardSeries; previousIndex: number }) {
  const current = series.values.at(-1) ?? 0;
  const previous = series.values[previousIndex] ?? current;
  const difference = current - previous;
  const signed = difference > 0 ? "+" : "";

  return (
    <article className="metric-card border bg-surface p-6">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full" style={{ backgroundColor: series.color }} aria-hidden="true" />
        <h2 className="text-sm font-semibold text-muted">{series.label}</h2>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
        {formatValue(current)} <span className="text-base font-medium text-muted">{series.unit}</span>
      </p>
      <p className="mt-4 text-sm text-muted">
        선택 기간 시작 대비 <span className="font-semibold text-foreground">{signed}{formatValue(Number(difference.toFixed(2)))} {series.unit}</span>
      </p>
      <p className="mt-5 border-t pt-4 text-sm leading-6 text-muted">{series.insight}</p>
    </article>
  );
}
