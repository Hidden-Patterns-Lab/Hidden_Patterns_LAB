"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const signals = [
  {
    id: "housing",
    label: "주택 거래",
    value: "4,812",
    unit: "건",
    change: "+8.4%",
    trend: "up",
    note: "서울 아파트 거래량 · 전월 대비",
    bars: [32, 41, 38, 49, 46, 58, 64, 71, 67, 82, 76, 91],
  },
  {
    id: "loans",
    label: "가계 대출",
    value: "1,128",
    unit: "조원",
    change: "+0.6%",
    trend: "up",
    note: "예금취급기관 잔액 · 전월 대비",
    bars: [48, 50, 53, 51, 56, 59, 58, 63, 67, 69, 73, 76],
  },
  {
    id: "exchange",
    label: "원/달러",
    value: "1,371",
    unit: "원",
    change: "-1.2%",
    trend: "down",
    note: "월초 대비 · 서울외국환중개",
    bars: [89, 83, 86, 75, 79, 68, 72, 61, 65, 54, 48, 43],
  },
] as const;

export function SignalPanel() {
  const [activeId, setActiveId] = useState<(typeof signals)[number]["id"]>("housing");
  const active = signals.find((signal) => signal.id === activeId) ?? signals[0];
  const TrendIcon = active.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="signal-panel" aria-label="주요 데이터 시그널 미리보기">
      <div className="flex items-center justify-between border-b border-white/12 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="live-dot" aria-hidden="true" />
          <span className="text-xs font-bold tracking-[0.14em] text-white/70 uppercase">
            Market pulse
          </span>
        </div>
        <span className="font-mono text-[0.68rem] text-white/40">LOCAL / MOCK DATA</span>
      </div>

      <div className="grid grid-cols-3 border-b border-white/12" role="tablist" aria-label="지표 선택">
        {signals.map((signal) => (
          <button
            key={signal.id}
            type="button"
            role="tab"
            aria-selected={activeId === signal.id}
            onClick={() => setActiveId(signal.id)}
            className={`min-h-13 border-r border-white/12 px-2 text-xs font-semibold transition-colors last:border-r-0 ${
              activeId === signal.id ? "bg-white text-navy" : "text-white/55 hover:bg-white/8 hover:text-white"
            }`}
          >
            {signal.label}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/55">{active.label}</p>
            <p className="mt-2 text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              {active.value}
              <span className="ml-2 text-base font-medium tracking-normal text-white/50">
                {active.unit}
              </span>
            </p>
          </div>
          <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1.5 text-sm font-bold text-orange">
            <TrendIcon aria-hidden="true" size={16} />
            {active.change}
          </span>
        </div>

        <div className="data-bars mt-9" aria-hidden="true">
          {active.bars.map((height, index) => (
            <span
              key={`${active.id}-${index}`}
              style={{ height: `${height}%`, animationDelay: `${index * 24}ms` }}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between font-mono text-[0.62rem] text-white/35">
          <span>12M AGO</span>
          <span>NOW</span>
        </div>
        <p className="mt-6 border-t border-white/12 pt-4 text-xs leading-5 text-white/55">
          {active.note}
        </p>
      </div>
    </div>
  );
}
