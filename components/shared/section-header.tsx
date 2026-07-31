import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: { label: string; href: string };
  inverse?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className={`text-xs font-bold tracking-[0.16em] uppercase ${inverse ? "text-orange" : "text-accent"}`}>
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{title}</h2>
        <p className={`mt-3 max-w-2xl leading-7 ${inverse ? "text-white/65" : "text-muted"}`}>
          {description}
        </p>
      </div>
      {action ? (
        <Link href={action.href} className="inline-flex shrink-0 items-center gap-2 font-semibold text-accent hover:underline">
          {action.label} <ArrowRight aria-hidden="true" size={18} />
        </Link>
      ) : null}
    </div>
  );
}
