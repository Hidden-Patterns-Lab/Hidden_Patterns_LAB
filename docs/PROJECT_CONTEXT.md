# Hidden Patterns Lab — 작업 인수인계

최종 정리: 2026-09-17 · 기준 브랜치: `codex/sprint-4-data-explorer`

## 제품과 작업 원칙

- 한국어 데이터 인텔리전스 미디어. 슬로건은 **Data • Patterns • Insights**.
- 프로덕션 도메인은 `https://www.hiddenpatternslab.com`, 배포 대상은 Vercel.
- 숫자 자체보다 현상·원인·구조적 메커니즘·장기적 의미·다음 관찰 지표를 설명한다.
- Next.js 16.2.12 App Router, React 19, TypeScript strict, Tailwind CSS 4, Lucide React, Recharts.
- Server Component가 기본이다. 필터와 차트처럼 상호작용이 필요한 곳만 Client Component를 쓴다.
- 새 Sprint는 사용자가 명시적으로 요청할 때만 시작한다. 수정 전 `AGENTS.md`와 관련 Next.js 문서를 확인한다.
- 커밋·푸시·운영 배포는 요청된 경우에만 한다. 비밀값·환경 파일·빌드 결과·로그를 커밋하지 않는다.

## Sprint 1–4 완료 상태

| Sprint | 구현 범위 | 주요 위치 |
| --- | --- | --- |
| 1 Foundation | 공용 레이아웃, 반응형 홈, 내비게이션, 준비 중 경로, 기본 SEO | `app/page.tsx`, `components/layout/`, `data/mock/home.ts` |
| 2 Articles | 분석 목록, 상세 4개, 로컬 콘텐츠 모델, 글별 SEO | `app/articles/`, `content/articles/`, `types/article.ts` |
| 3 Dashboard | 4개 주제, 6·12개월 필터, 지표 카드·차트·표·해석 | `app/dashboard/`, `components/dashboard/`, `data/mock/dashboard.ts` |
| 4 Data Explorer | 데이터셋 6개, 검색·주제·주기 필터, 상세 메타데이터·공식 출처 | `app/data/`, `components/data-explorer/`, `content/datasets/` |

`app/sitemap.ts`는 Article과 데이터셋 상세 URL을 포함한다. 존재하지 않는 상세 slug는 404로 처리된다. `robots.txt`, favicon, not-found 페이지가 있다.

## 콘텐츠와 데이터 경계

- Article 본문은 구조 검증용 프로토타입이다. 발행 전 원자료와 최신 내용을 재검증해야 한다.
- Dashboard의 모든 숫자는 **가상 목업**이다. 화면에 보이는 기관명은 향후 확인할 공식 출처이지 목업 수치의 생산자가 아니다.
- Data Explorer는 원천의 위치·정의·주기·단위·주의사항을 안내하는 **로컬 카탈로그**다. 실제 통계 값을 수집, 저장, 다운로드, 자동 갱신하지 않는다.
- 백엔드, DB, CMS, 인증, 결제, 관리자, 분석 스크립트, 외부 데이터 fetch는 아직 없다.
- Sprint 1에서 보존한 루트 `index.html`과 `HPL coming soon.png`는 기존 배포 용도 확인 없이 삭제하지 않는다.

## 새 환경에서 이어가기

```bash
git clone https://github.com/Hidden-Patterns-Lab/Hidden_Patterns_LAB.git
cd Hidden_Patterns_LAB
git switch codex/sprint-4-data-explorer
npm ci
npm run dev
```

Windows에서는 `start-dev.cmd`를 실행할 수도 있다. 로컬 주소는 `http://localhost:3000`이며 핵심 경로는 `/articles`, `/dashboard`, `/data`다.

변경 전후 확인:

```bash
git status -sb
npm run lint
npm run build
```

`npm test`는 아직 구성되지 않았다. 의존성 설치 시 보고된 취약점은 별도 검토가 필요하며, 자동 `audit fix --force`는 적용하지 않았다.

## 배포 메모

- 운영 도메인 변경 요청이 없는 배포는 Vercel **Preview**로 먼저 수행한다.
- 로컬 `.vercel/` 연결 정보는 `.gitignore` 대상이며 다른 환경에서 별도로 프로젝트를 연결해야 한다.
- Vercel의 연결된 프로젝트와 GitHub 브랜치 설정을 확인하고, 빌드 및 핵심 경로 응답을 검증한다.
- Preview URL과 실제 배포 상태는 해당 작업의 완료 보고 또는 Vercel 대시보드에서 확인한다.

## 다음 권장 Sprint

**Sprint 5 — Premium**: 랜딩, 가격, 비교, 인증 자리표시자까지만. 사용자 승인 전에는 착수하지 않는다.
