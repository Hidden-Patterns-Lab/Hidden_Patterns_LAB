import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export const metadata: Metadata = { title: "개인정보처리방침", description: "Hidden Patterns Lab 개인정보처리방침 안내 페이지입니다.", alternates: { canonical: "/privacy" } };
export default function PrivacyPage() {
  return <PlaceholderPage eyebrow="Legal" title="개인정보처리방침" description="서비스 출시 범위와 실제 수집 항목에 맞는 개인정보처리방침을 준비하고 있습니다." />;
}
