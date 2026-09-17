import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Premium", description: "더 깊은 데이터 분석과 리서치 리포트를 제공할 예정입니다.", alternates: { canonical: "/premium" } };
export default function PremiumPage() {
  return <PlaceholderPage eyebrow="In-depth research" title="Premium" description="의사결정에 필요한 심층 데이터 분석, 구조적 시나리오와 정기 리서치 리포트를 준비하고 있습니다." />;
}
