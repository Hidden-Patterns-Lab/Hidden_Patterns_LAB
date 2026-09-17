import type { DashboardDataset } from "@/types/dashboard";

export const dashboardMonths = [
  "2025.10", "2025.11", "2025.12", "2026.01", "2026.02", "2026.03",
  "2026.04", "2026.05", "2026.06", "2026.07", "2026.08", "2026.09",
] as const;

export const dashboardUpdatedAt = "2026-09-14";

// All values are invented to demonstrate dashboard interactions and must not be cited as statistics.
export const dashboardDatasets: readonly DashboardDataset[] = [
  {
    id: "housing",
    label: "부동산",
    description: "거래와 가격의 속도를 나눠 봅니다.",
    headline: "거래 회복과 가격 반응 사이의 간격",
    takeaway: "거래량은 먼저 반등하지만 가격지수는 완만하게 움직이는 가상 시나리오입니다. 단일 월보다 연속된 방향을 확인해야 합니다.",
    watch: "거래량 증가가 여러 지역으로 확산되는지, 가격지수가 뒤따르는지 확인하세요.",
    series: [
      { id: "transactions", label: "서울 아파트 거래량", unit: "건", definition: "월별 서울 아파트 매매 계약 건수(예시)", source: "국토교통부 실거래가 공개시스템(참고 출처, 수치는 목업)", color: "#b85f48", values: [3180, 2920, 2710, 3060, 3340, 3650, 3910, 4270, 4510, 4380, 4720, 4860], insight: "저점 이후 거래 건수는 늘었지만 최근 구간의 증가 속도는 일정하지 않습니다." },
      { id: "price", label: "주택가격지수", unit: "지수", definition: "기준시점 100의 서울 주택가격지수(예시)", source: "한국부동산원(참고 출처, 수치는 목업)", color: "#263746", values: [99.2, 99.0, 98.9, 98.8, 98.9, 99.1, 99.2, 99.4, 99.5, 99.7, 99.8, 100.0], insight: "가격지수는 거래 증가에 비해 완만하게 반응합니다." },
    ],
  },
  {
    id: "credit",
    label: "대출·금리",
    description: "금리와 부채의 전달 시차를 읽습니다.",
    headline: "금리 변화가 잔액에 도달하는 시간",
    takeaway: "대출금리가 내려가는 가상 구간에서도 가계대출 잔액은 즉시 줄지 않습니다. 신규 대출과 기존 상환 흐름을 함께 봐야 합니다.",
    watch: "신규 취급 금리와 잔액 기준 금리의 간격, 대출 증가율의 방향을 비교하세요.",
    series: [
      { id: "loan-rate", label: "가계대출 금리", unit: "%", definition: "예금은행 신규 취급액 기준 가계대출 평균 금리(예시)", source: "한국은행 ECOS(참고 출처, 수치는 목업)", color: "#b85f48", values: [4.62, 4.58, 4.55, 4.52, 4.49, 4.44, 4.40, 4.36, 4.32, 4.30, 4.26, 4.23], insight: "신규 금리는 완만한 하락 경로를 그립니다. 기존 차주의 부담과는 시차가 있습니다." },
      { id: "credit-balance", label: "가계대출 잔액", unit: "조 원", definition: "금융권 가계대출 월말 잔액(예시)", source: "한국은행 ECOS(참고 출처, 수치는 목업)", color: "#263746", values: [1092, 1096, 1099, 1101, 1104, 1108, 1112, 1117, 1120, 1124, 1128, 1131], insight: "금리 하락과 별개로 잔액은 꾸준히 증가하는 가상 흐름입니다." },
    ],
  },
  {
    id: "markets",
    label: "금융시장",
    description: "환율과 위험 선호의 연결을 봅니다.",
    headline: "환율과 주가가 꼭 반대로 움직이지는 않습니다",
    takeaway: "환율과 주가의 가상 월별 경로를 나란히 두면 한 지표만으로 시장 심리를 단정하기 어렵다는 점이 드러납니다.",
    watch: "금리 기대, 외국인 자금 흐름, 주요 통화의 동조화를 함께 추적하세요.",
    series: [
      { id: "exchange", label: "원/달러 환율", unit: "원", definition: "월말 원/달러 기준 환율(예시)", source: "한국은행 ECOS(참고 출처, 수치는 목업)", color: "#b85f48", values: [1382, 1390, 1376, 1401, 1392, 1384, 1378, 1366, 1372, 1360, 1354, 1362], insight: "등락이 반복돼 한 달의 방향만으로 추세를 판단하기 어렵습니다." },
      { id: "equity", label: "주가지수", unit: "지수", definition: "국내 대표 주가지수 월말 값(예시)", source: "한국거래소(참고 출처, 수치는 목업)", color: "#263746", values: [2510, 2470, 2535, 2490, 2550, 2610, 2635, 2590, 2680, 2720, 2705, 2760], insight: "주가 상승 구간에도 환율의 월별 변동은 지속됩니다." },
    ],
  },
  {
    id: "economy",
    label: "경제지표",
    description: "물가와 소비의 온도 차를 봅니다.",
    headline: "물가 둔화와 소비 회복은 다른 이야기",
    takeaway: "물가 상승률이 낮아져도 가격 수준은 높게 남을 수 있습니다. 소비 심리의 개선이 실제 지출로 이어지는지를 따로 확인해야 합니다.",
    watch: "실질소득과 소비지출, 품목별 가격 수준의 변화를 함께 보세요.",
    series: [
      { id: "inflation", label: "소비자물가 상승률", unit: "%", definition: "전년 동월 대비 소비자물가 상승률(예시)", source: "KOSIS 국가통계포털(참고 출처, 수치는 목업)", color: "#b85f48", values: [2.8, 2.7, 2.6, 2.5, 2.6, 2.4, 2.3, 2.2, 2.3, 2.1, 2.0, 2.1], insight: "상승률은 둔화했지만 물가 수준이 하락했다는 뜻은 아닙니다." },
      { id: "sentiment", label: "소비자심리지수", unit: "지수", definition: "소비자심리지수 월별 값(예시)", source: "한국은행 ECOS(참고 출처, 수치는 목업)", color: "#263746", values: [96, 95, 97, 98, 96, 99, 100, 101, 99, 102, 103, 104], insight: "심리 개선이 이어지는지 실제 소비지표로 교차 확인해야 합니다." },
    ],
  },
];
