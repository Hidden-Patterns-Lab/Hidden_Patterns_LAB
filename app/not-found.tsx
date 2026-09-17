import Link from "next/link";
import { Container } from "@/components/shared/container";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <Container>
        <p className="text-sm font-bold tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em]">페이지를 찾을 수 없습니다</h1>
        <p className="mt-4 text-muted">주소가 바뀌었거나 아직 준비되지 않은 페이지입니다.</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center bg-navy px-6 font-semibold text-white">
          Home으로 돌아가기
        </Link>
      </Container>
    </section>
  );
}
