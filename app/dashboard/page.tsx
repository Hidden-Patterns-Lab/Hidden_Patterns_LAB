import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = { title: "Dashboard", description: "주요 경제·시장 지표를 비교하고 흐름을 읽는 데이터 대시보드입니다.", alternates: { canonical: "/dashboard" } };
export default function DashboardPage() {
  return <PlaceholderPage eyebrow="Data dashboard" title="Dashboard" description="부동산, 대출·금리, 금융시장과 경제지표의 흐름을 한 화면에서 비교하는 대시보드를 준비하고 있습니다." />;
}
