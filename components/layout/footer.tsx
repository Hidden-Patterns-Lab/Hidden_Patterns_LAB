import Link from "next/link";
import { Container } from "@/components/shared/container";
import { NAV_ITEMS, SITE_NAME, SITE_SLOGAN } from "@/lib/constants/site";

const legalLinks = [
  { label: "Contact", href: "/contact" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "방법론", href: "/methodology" },
  { label: "데이터 출처", href: "/sources" },
];

export function Footer() {
  return (
    <footer className="bg-foreground py-14 text-white">
      <Container>
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-xl font-bold">{SITE_NAME}</p>
            <p className="mt-2 text-sm tracking-[0.16em] text-orange uppercase">{SITE_SLOGAN}</p>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/60">
              모든 분석은 사용한 데이터의 출처를 밝히며, 해석의 기준과 한계를 함께 설명합니다.
            </p>
            <p className="mt-4 text-xs text-white/40">소셜 채널 준비 중</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label="하단 주요 메뉴" className="grid content-start grid-cols-2 gap-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="text-white/70 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav aria-label="정책 및 정보" className="grid content-start gap-3 text-sm">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-white/70 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Hidden Patterns Lab. All rights reserved.</p>
          <p>Independent data intelligence for clearer decisions.</p>
        </div>
      </Container>
    </footer>
  );
}
