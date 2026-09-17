import type { Metadata } from "next";
import { DatasetCatalog } from "@/components/data-explorer/dataset-catalog";

export const metadata: Metadata = {
  title: "Data Explorer",
  description: "경제·금융·부동산·인구 데이터셋의 정의, 공표 주기, 단위, 출처와 해석상 주의사항을 탐색합니다.",
  alternates: { canonical: "/data" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/data",
    title: "Data Explorer | Hidden Patterns Lab",
    description: "데이터의 위치와 해석 조건을 확인하는 데이터셋 카탈로그입니다.",
  },
  twitter: {
    card: "summary",
    title: "Data Explorer | Hidden Patterns Lab",
    description: "데이터의 위치와 해석 조건을 확인하는 데이터셋 카탈로그입니다.",
  },
};

export default function DataPage() {
  return <DatasetCatalog />;
}
