import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Data Explorer", description: "신뢰할 수 있는 데이터셋과 메타데이터를 탐색합니다.", alternates: { canonical: "/data" } };
export default function DataPage() {
  return <PlaceholderPage eyebrow="Dataset catalog" title="Data Explorer" description="분석에 활용한 공공·경제·시장 데이터셋을 출처, 단위, 주기와 함께 탐색하는 공간을 준비하고 있습니다." />;
}
