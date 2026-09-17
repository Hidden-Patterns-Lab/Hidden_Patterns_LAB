import type { Metadata } from "next";
import { DashboardWorkspace } from "@/components/dashboard/dashboard-workspace";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "부동산, 대출·금리, 금융시장, 경제지표의 목업 시계열을 비교하고 구조적 신호를 읽는 데이터 대시보드입니다.",
  alternates: { canonical: "/dashboard" },
  openGraph: {
    type: "website",
    url: "/dashboard",
    title: "Dashboard | Hidden Patterns Lab",
    description: "주요 지표의 방향과 속도를 비교하는 데이터 대시보드입니다. 현재 수치는 프로토타입입니다.",
  },
  twitter: {
    card: "summary",
    title: "Dashboard | Hidden Patterns Lab",
    description: "주요 지표의 방향과 속도를 비교하는 데이터 대시보드입니다. 현재 수치는 프로토타입입니다.",
  },
};

export default function DashboardPage() {
  return <DashboardWorkspace />;
}
