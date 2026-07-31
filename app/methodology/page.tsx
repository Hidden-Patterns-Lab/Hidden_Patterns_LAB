import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export const metadata: Metadata = { title: "방법론", description: "Hidden Patterns Lab의 데이터 정제와 분석 원칙을 소개합니다.", alternates: { canonical: "/methodology" } };
export default function MethodologyPage() {
  return <PlaceholderPage eyebrow="Research standards" title="방법론" description="데이터 정제, 비교 기준, 해석 원칙과 분석의 한계를 투명하게 설명하는 문서를 준비하고 있습니다." />;
}
