"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashboardSeries } from "@/types/dashboard";

type ChartPoint = { month: string; value: number };

export function TrendChart({ series, points, period, updatedAt }: { series: DashboardSeries; points: readonly ChartPoint[]; period: string; updatedAt: string }) {
  return (
    <section className="border bg-surface p-5 sm:p-7" aria-label={`${series.label} 추이 차트`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{series.label}</h3>
          <p className="mt-1 text-sm text-muted">단위: {series.unit}</p>
        </div>
        <span className="h-1 w-10 shrink-0 rounded-full" style={{ backgroundColor: series.color }} aria-hidden="true" />
      </div>
      <div className="mt-7 h-64 w-full" role="img" aria-label={`${series.label}: ${points.map((point) => `${point.month} ${point.value}${series.unit}`).join(", ")}`}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={points} margin={{ top: 8, right: 8, bottom: 2, left: -20 }} accessibilityLayer>
            <CartesianGrid stroke="#e8e0d5" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6d645d", fontSize: 12 }} tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={16} />
            <YAxis tick={{ fill: "#6d645d", fontSize: 12 }} tickLine={false} axisLine={false} width={58} domain={["auto", "auto"]} />
            <Tooltip formatter={(value) => [`${Number(value).toLocaleString("ko-KR")} ${series.unit}`, series.label]} contentStyle={{ border: "1px solid #d9d0c4", borderRadius: 0, background: "#fffdf9" }} />
            <Line type="monotone" dataKey="value" stroke={series.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-5 border-t pt-4 text-sm leading-6 text-muted">{series.insight}</p>
      <dl className="mt-4 grid gap-2 text-xs leading-5 text-muted">
        <div><dt className="inline font-semibold text-foreground">정의 · </dt><dd className="inline">{series.definition}</dd></div>
        <div><dt className="inline font-semibold text-foreground">기간 · </dt><dd className="inline">{period}</dd></div>
        <div><dt className="inline font-semibold text-foreground">출처 · </dt><dd className="inline">{series.source}</dd></div>
        <div><dt className="inline font-semibold text-foreground">목업 기준일 · </dt><dd className="inline">{updatedAt}</dd></div>
      </dl>
    </section>
  );
}
