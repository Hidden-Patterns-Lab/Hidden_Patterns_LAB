import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export const metadata: Metadata = { title: "데이터 출처", description: "Hidden Patterns Lab 분석에 활용하는 데이터 출처를 안내합니다.", alternates: { canonical: "/sources" } };
export default function SourcesPage() {
  return <PlaceholderPage eyebrow="Source index" title="데이터 출처" description="분석에 활용하는 기관, 원천 데이터와 갱신 주기를 확인할 수 있는 출처 목록을 준비하고 있습니다." />;
}
