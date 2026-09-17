# 비공개 방문 통계

일일 방문자 수와 누적 방문자 수를 서버에서만 기록·조회하는 선택적 기능입니다. 공개 페이지에는 숫자나 관리자 링크를 표시하지 않습니다.

## 집계 기준

- 날짜 기준은 `Asia/Seoul`입니다.
- 일일 방문자 수는 같은 날짜에 같은 브라우저 쿠키로 접속한 방문을 1회로 셉니다.
- 누적 방문자 수는 **날짜별 고유 브라우저 방문 수의 합계**입니다. 같은 사람이 다른 날 방문하면 누적에는 다시 포함되며, 실명 사용자 수를 뜻하지 않습니다.
- 무작위 식별자 쿠키는 날짜가 바뀌면 교체되고 48시간 이내에 만료됩니다. 서버에는 식별자의 SHA-256 해시만 중복 집계용으로 보관하며, 해당 날짜의 마지막 신규 방문으로부터 3일 뒤 중복 확인용 집합이 만료됩니다. 이후에는 날짜별·누적 숫자만 남깁니다.
- 이 기능의 코드에서는 IP 주소, User-Agent, 방문 경로 또는 Google 계정 정보를 통계 저장소에 기록하지 않습니다. 쿠키 차단, 여러 기기, 봇, 자바스크립트 비활성화 때문에 수치는 실제 사람 수와 다를 수 있습니다.

## 활성화

기존 Vercel 프로젝트에 Upstash Redis 데이터베이스를 연결하거나, 별도 Upstash Redis의 REST 자격 증명을 준비합니다. [Upstash REST API 안내](https://upstash.com/docs/redis/features/restapi)를 참고하세요. 새 Vercel 프로젝트는 필요하지 않습니다.

아래 값을 **Vercel Production Environment Variables**에만 설정하고 재배포합니다. 값은 Git, `.env` 파일, 클라이언트 코드 또는 채팅에 넣지 않습니다.

| 이름 | 용도 |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | `https://`로 시작하는 Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Redis 쓰기 가능 토큰 |
| `VISITOR_STATS_ADMIN_TOKEN` | 통계 조회 전용 32바이트 무작위 토큰의 64자리 16진수 문자열 |

세 값 중 하나라도 없으면 방문 기록 코드를 페이지에 넣지 않습니다. Preview와 Production의 키 공간은 분리되어 있습니다. 이 환경변수를 Preview에도 등록한다면 Preview 방문도 별도 키 공간에 집계됩니다.

관리자 토큰은 본인의 안전한 로컬 환경에서 `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`로 생성할 수 있습니다. 출력값은 Vercel 환경변수에 직접 입력하고 채팅이나 Git에 공유하지 마세요.

## 조회

관리자 API는 `GET /api/internal/visitors?days=30`입니다. `days`는 1~90이며 기본값은 30입니다. `Authorization: Bearer <VISITOR_STATS_ADMIN_TOKEN>` 헤더가 없거나 틀리면 404를 반환합니다. 모든 응답은 `no-store`이며 공개 화면·내비게이션·사이트맵에 연결되지 않습니다.

응답에는 `todayVisitors`, `totalVisitors`, 날짜별 `daily`, `timezone`, `metric`이 포함됩니다. 인증 토큰은 URL 쿼리나 브라우저 주소창에 넣지 마세요. 본인만 사용하는 HTTP 클라이언트에서 헤더로 전달하세요.

운영 전 개인정보처리방침의 쿠키·집계·보관 설명을 검토하고 실제 서비스 설정에 맞게 확정해야 합니다. 현재 `/privacy`는 완성된 법적 고지 문서가 아닙니다.
