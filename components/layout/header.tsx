"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/shared/container";
import { NAV_ITEMS } from "@/lib/constants/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/92 backdrop-blur-md">
      <Container className="flex min-h-18 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3 leading-none" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center bg-navy text-xs font-bold tracking-[-0.05em] text-white transition-colors group-hover:bg-accent">
            HP
          </span>
          <span>
          <span className="block text-[1.05rem] font-bold tracking-[-0.035em]">Hidden Patterns Lab</span>
          <span className="mt-1 block text-[0.58rem] font-semibold tracking-[0.2em] text-accent uppercase">
            Data • Patterns • Insights
          </span>
          </span>
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-6 text-sm font-semibold transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:bg-accent after:transition-transform hover:text-accent ${
                isActive(item.href) ? "text-accent after:scale-x-100" : "text-muted after:scale-x-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>
      {open ? (
        <nav id="mobile-navigation" aria-label="모바일 메뉴" className="border-t bg-surface lg:hidden">
          <Container className="grid py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`border-b py-4 font-semibold last:border-b-0 ${
                  isActive(item.href) ? "text-accent" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
