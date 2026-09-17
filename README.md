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

비공개 일일·누적 방문 통계는 [방문 통계 설정 문서](docs/VISITOR_ANALYTICS.md)를 참고하세요. 저장소와 관리자 토큰을 설정하기 전에는 수집하지 않습니다.

## Project Context

이 문서는 다른 작업 환경에서도 현재 상태를 빠르게 복원하기 위한 인수인계 요약입니다.
Sprint 1–4의 구현 경계와 배포 메모는 [작업 인수인계](docs/PROJECT_CONTEXT.md)에 정리했습니다.

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

#### Sprint 3 — Dashboard

- `/dashboard`에서 부동산, 대출·금리, 금융시장, 경제지표의 가상 시계열 탐색
- 주제와 최근 6개월/12개월 필터
- 재사용 가능한 지표 카드와 Recharts 시계열 차트
- 월별 비교표, 해석 요약, 다음 관찰 신호
- 지표별 정의·단위·기간·참고 기관·목업 기준일 표기
- 데이터는 `data/mock/dashboard.ts`, 타입은 `types/dashboard.ts`에서 관리

Dashboard의 모든 수치는 실제 통계가 아닌 가상 데이터입니다. 출처로 표시된 기관은 향후 원자료를 검증할 곳이며 현재 목업 수치의 생산자가 아닙니다.

#### Sprint 4 — Data Explorer

- `/data` 데이터셋 카탈로그와 제목·기관·키워드 검색, 주제·공표 주기 필터
- `/data/[slug]` 정적 상세 페이지 6개와 개별 SEO 메타데이터
- 자료 정의, 단위, 지역 범위, 주요 항목, 활용 예, 주의사항, 공식 원천 링크
- 상세 URL을 `sitemap.xml`에 포함하고 존재하지 않는 slug는 404 처리
- `content/datasets/index.ts`의 로컬 카탈로그와 `types/dataset.ts`의 타입 정의

이 카탈로그는 원천 자료의 위치와 해석 조건을 안내합니다. 실제 통계 값은 수집·저장·자동 갱신하지 않으며, 원천의 최신 공표일과 이용 조건은 제공 기관에서 다시 확인해야 합니다.

### Important Paths

```text
app/
  articles/
    page.tsx             # Articles 목록
    [slug]/page.tsx      # Article 상세, SEO, 정적 경로 생성
  dashboard/page.tsx     # Dashboard 메타데이터와 작업 화면
  data/
    page.tsx             # 데이터셋 검색·필터 카탈로그
    [slug]/page.tsx      # 데이터셋 상세, SEO, 정적 경로 생성
components/
  articles/article-card.tsx
  dashboard/             # 필터, 지표 카드, 차트, 비교표 화면
  data-explorer/         # 데이터셋 카드와 검색·필터 화면
content/
  articles/index.ts      # 로컬 Article 콘텐츠와 조회 함수
  datasets/index.ts      # 데이터셋 메타데이터와 조회 함수
data/
  mock/home.ts           # 홈 목업 데이터
  mock/dashboard.ts      # Dashboard 가상 시계열
types/
  article.ts             # Article 도메인 타입
  dashboard.ts           # Dashboard 데이터 타입
  dataset.ts             # 데이터셋 카탈로그 타입
lib/
  constants/site.ts      # 사이트 이름, URL, 내비게이션
```

### Continue in Another Environment

```bash
git clone https://github.com/Hidden-Patterns-Lab/Hidden_Patterns_LAB.git
cd Hidden_Patterns_LAB
git switch codex/sprint-4-data-explorer
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
- Data Explorer의 원자료 다운로드·자동 갱신은 아직 없습니다.
- `npm test` 스크립트는 아직 구성되지 않았습니다.
- 현재 잠금 파일 설치 시 npm이 의존성 취약점 6건(High 5, Critical 1)을 보고합니다. 무리한 강제 업그레이드 대신 별도 점검이 필요합니다.

### Next Recommended Sprint

다음 권장 작업은 **Sprint 5 — Premium**입니다. 랜딩·가격·비교 페이지와 인증 자리표시자까지만 범위이며 별도 승인 후 시작합니다.
