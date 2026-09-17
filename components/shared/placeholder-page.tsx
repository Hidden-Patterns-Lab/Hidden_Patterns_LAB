import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { Container } from "@/components/shared/container";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-3xl border bg-surface p-8 sm:p-12">
          <div className="flex size-12 items-center justify-center bg-accent-soft text-accent">
            <FlaskConical aria-hidden="true" />
          </div>
          <p className="mt-8 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{description}</p>
          <p className="mt-8 inline-block bg-surface-muted px-4 py-2 text-sm font-semibold">
            준비 중
          </p>
          <div className="mt-10 border-t pt-6">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">
              <ArrowLeft aria-hidden="true" size={18} /> Home으로 돌아가기
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
