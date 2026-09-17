import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "About", description: "Hidden Patterns Lab의 관점과 분석 원칙을 소개합니다.", alternates: { canonical: "/about" } };
export default function AboutPage() {
  return <PlaceholderPage eyebrow="About the lab" title="About" description="Hidden Patterns Lab이 데이터를 선택하고 연결하며 해석하는 관점과 편집 원칙을 정리하고 있습니다." />;
}
