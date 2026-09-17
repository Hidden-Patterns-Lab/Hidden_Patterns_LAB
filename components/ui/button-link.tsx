import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
}) {
  const styles =
    variant === "primary"
      ? "border-navy bg-navy text-white hover:bg-accent hover:border-accent"
      : "border-border bg-transparent text-foreground hover:border-navy";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center border px-6 font-semibold transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}
