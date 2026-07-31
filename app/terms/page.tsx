import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export const metadata: Metadata = { title: "이용약관", description: "Hidden Patterns Lab 서비스 이용약관 안내 페이지입니다.", alternates: { canonical: "/terms" } };
export default function TermsPage() {
  return <PlaceholderPage eyebrow="Legal" title="이용약관" description="서비스의 이용 범위와 권리, 책임을 명확히 안내할 이용약관을 준비하고 있습니다." />;
}
