import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Articles",
  description: "경제, 금융, 부동산, 정책 데이터를 구조적으로 해석한 분석을 만나보세요.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return <PlaceholderPage eyebrow="Analysis archive" title="Articles" description="데이터가 보여주는 현상과 그 뒤의 원인, 구조적 메커니즘을 깊이 있게 설명하는 분석 아카이브를 준비하고 있습니다." />;
}
