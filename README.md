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
