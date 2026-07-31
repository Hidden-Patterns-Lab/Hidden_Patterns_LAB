import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Contact", description: "Hidden Patterns Lab 문의 페이지입니다.", alternates: { canonical: "/contact" } };
export default function ContactPage() {
  return <PlaceholderPage eyebrow="Get in touch" title="Contact" description="제보, 데이터 오류 정정, 협업과 기타 문의를 위한 공식 연락 채널을 준비하고 있습니다." />;
}
