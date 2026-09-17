import type { Metadata } from "next";
import { VisitorTracker } from "@/components/analytics/visitor-tracker";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isVisitorAnalyticsConfigured } from "@/lib/analytics/visitor-stats";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hidden Patterns Lab | 데이터 뒤에 숨은 패턴을 발견합니다",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Hidden Patterns Lab | 데이터 뒤에 숨은 패턴을 발견합니다",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hidden Patterns Lab | 데이터 뒤에 숨은 패턴을 발견합니다",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col antialiased">
        <a className="skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {isVisitorAnalyticsConfigured() && <VisitorTracker />}
      </body>
    </html>
  );
}
