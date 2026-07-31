export const featuredInsight = {
  category: "가계대출",
  date: "2026. 07. 28",
  title: "금리가 멈춘 뒤에도 가계의 이자 부담은 왜 바로 줄지 않을까",
  summary:
    "대출금리의 하락 속도보다 기존 고금리 대출의 재산정 주기가 느립니다. 기준금리와 체감 이자 부담 사이에는 구조적인 시차가 존재합니다.",
  metric: "18개월",
  metricLabel: "변동금리 대출의 대표적 재산정 시차 예시",
  source: "한국은행 경제통계시스템(프로토타입용 재구성)",
} as const;

export const latestArticles = [
  {
    category: "부동산",
    title: "거래량이 늘었는데도 지역별 회복 온도가 다른 이유",
    summary:
      "서울 주택시장의 거래 회복을 가격대, 입주 물량, 대출 여건으로 나누어 살펴봅니다.",
    date: "2026. 07. 26",
    readingTime: "8분",
  },
  {
    category: "금융시장",
    title: "원화 변동성을 키우는 세 개의 연결 고리",
    summary:
      "금리 차이, 수출 결제 수요, 글로벌 위험 선호가 환율에 전달되는 경로를 분석합니다.",
    date: "2026. 07. 23",
    readingTime: "10분",
  },
  {
    category: "정책",
    title: "정책 발표와 실제 체감 사이에 생기는 시간차",
    summary:
      "정책의 발표, 집행, 시장 반응이 서로 다른 속도로 움직이는 구조를 데이터로 설명합니다.",
    date: "2026. 07. 20",
    readingTime: "7분",
  },
] as const;

export const metrics = [
  {
    label: "서울 아파트 거래량",
    value: "4,812건",
    change: "+8.4%",
    positive: true,
    period: "2026년 6월 · 전월 대비",
    insight: "중저가 지역을 중심으로 거래 회복이 확산되는 모습입니다.",
    source: "서울부동산정보광장 (목업)",
  },
  {
    label: "가계대출 잔액",
    value: "1,128조",
    change: "+0.6%",
    positive: true,
    period: "2026년 6월 · 전월 대비",
    insight: "주택 관련 대출 증가가 전체 잔액의 상승을 이끌었습니다.",
    source: "한국은행 (목업)",
  },
  {
    label: "원/달러 환율",
    value: "1,371원",
    change: "-1.2%",
    positive: false,
    period: "2026년 7월 · 월초 대비",
    insight: "수출 결제와 위험 선호 회복이 원화 강세에 일부 기여했습니다.",
    source: "한국은행 (목업)",
  },
] as const;

export const dashboardCategories = ["부동산", "대출·금리", "금융시장", "경제지표"] as const;
export const topics = ["부동산", "대출", "금융시장", "경제", "정책", "기업", "AI·기술", "기후"] as const;
export const methodology = [
  "공신력 있는 원천 데이터",
  "정제와 기준 통일",
  "비교와 추세 분석",
  "구조적 메커니즘 해석",
  "명확한 시각화",
  "다음 지표를 위한 인사이트",
] as const;
