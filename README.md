# Hidden Patterns Lab

> Data • Patterns • Insights

공공데이터, 경제지표, 금융시장, 부동산 및 정책 데이터를 구조적으로 해석하는 한국어 데이터 인텔리전스 미디어 플랫폼입니다.

## Development

Node.js 20.9 이상이 필요합니다.

Windows에서는 저장소 루트의 `start-dev.cmd`를 더블클릭하면 의존성을 확인한 뒤 개발 서버가 실행됩니다.

터미널에서 직접 실행하려면:

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## Validation

```bash
npm run lint
npm run build
```

## Deployment

Next.js App Router 기반이며 Vercel에서 별도 빌드 설정 없이 배포할 수 있습니다. 프로덕션 도메인은 `https://www.hiddenpatternslab.com`입니다.

## Project Context

이 문서는 다른 작업 환경에서도 현재 상태를 빠르게 복원하기 위한 인수인계 요약입니다.

### Product

- 제품명: **Hidden Patterns Lab**
- 슬로건: **Data • Patterns • Insights**
- 주요 언어와 독자: 한국어, 데이터 기반 해설을 원하는 일반 독자
- 방향: 공공데이터·경제·금융·부동산·정책의 숫자 뒤에 있는 원인, 구조, 장기적 의미를 설명하는 데이터 인텔리전스 미디어
- 배포 대상: Vercel
- 프로덕션 도메인: `https://www.hiddenpatternslab.com`

### Working Agreement

저장소 작업 전 루트의 `AGENTS.md`를 먼저 읽습니다. 주요 원칙은 다음과 같습니다.

- Next.js 16 App Router와 TypeScript strict 모드를 유지합니다.
- Server Components를 기본으로 하고 브라우저 상태가 필요한 경우에만 Client Components를 사용합니다.
- 콘텐츠·UI·비즈니스 로직·메타데이터를 분리합니다.
- 새 기능은 승인된 Sprint 범위 안에서만 구현합니다.
- 목업 수치는 명확히 표시하고 데이터 출처와 한계를 가까이 둡니다.
- 작업 완료 전 `npm run lint`와 `npm run build`를 모두 통과시킵니다.
- 환경 파일, 키, 빌드 결과, 로그, PID 파일을 커밋하지 않습니다.

### Current Status

#### Sprint 1 — Foundation and home

- 전역 레이아웃, Header, Footer, Container와 공용 UI 구성
- 반응형 홈 화면과 인터랙티브 목업 신호 패널
- 주요·보조 경로의 준비 중 페이지
- 기본 메타데이터, favicon, `robots.txt`, `sitemap.xml`, not-found 페이지
- 홈 목업 데이터는 `data/mock/home.ts`에서 관리

#### Sprint 2 — Articles

- `/articles` 분석 아카이브 목록
- `/articles/[slug]` 정적 상세 페이지 4개
- `content/articles/index.ts`의 로컬 콘텐츠 모델
- `types/article.ts`의 Article 타입 정의
- 재사용 가능한 Article 카드
- 글별 canonical, Open Graph, Twitter 메타데이터
- 핵심 요약, 구조적 해설, 다음 관찰 지표, 공식 데이터 출처, 편집상 주의사항
- 홈의 최신 글 카드를 실제 상세 경로에 연결
- 상세 Article URL을 `sitemap.xml`에 포함
- 존재하지 않는 slug는 404 처리

현재 Article 본문과 수치는 콘텐츠 구조 검증을 위한 프로토타입입니다. 실제 발행 전 원자료와 최신 수치를 다시 검증해야 합니다.

### Important Paths

```text
app/
  articles/
    page.tsx             # Articles 목록
    [slug]/page.tsx      # Article 상세, SEO, 정적 경로 생성
components/
  articles/article-card.tsx
content/
  articles/index.ts      # 로컬 Article 콘텐츠와 조회 함수
data/
  mock/home.ts           # 홈 목업 데이터
types/
  article.ts             # Article 도메인 타입
lib/
  constants/site.ts      # 사이트 이름, URL, 내비게이션
```

### Continue in Another Environment

```bash
git clone https://github.com/Hidden-Patterns-Lab/Hidden_Patterns_LAB.git
cd Hidden_Patterns_LAB
git switch codex/sprint-2-articles
npm install
npm run dev
```

작업 전 상태 확인:

```bash
git status -sb
npm run lint
npm run build
```

### Current Limitations

- CMS, 데이터베이스, API, 인증, 결제, 분석 도구는 아직 연결하지 않았습니다.
- Article 검색, 복합 필터, 페이지네이션은 아직 없습니다.
- Dashboard와 Data Explorer는 준비 중 페이지입니다.
- `npm test` 스크립트는 아직 구성되지 않았습니다.
- 현재 잠금 파일 설치 시 npm이 의존성 취약점 6건(High 5, Critical 1)을 보고합니다. 무리한 강제 업그레이드 대신 별도 점검이 필요합니다.

### Next Recommended Sprint

다음 권장 작업은 **Sprint 3 — Dashboard**입니다. 재사용 가능한 차트·지표 카드, 필터, 표, 인사이트, 명확히 표시된 목업 데이터가 범위이며 별도 승인 후 시작합니다.
