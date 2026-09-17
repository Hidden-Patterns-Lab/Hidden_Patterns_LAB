import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

const TIME_ZONE = "Asia/Seoul";
const DAILY_KEY_TTL_SECONDS = 3 * 24 * 60 * 60;
const KEY_PREFIX = "hpl:visitors";

const RECORD_VISIT_SCRIPT = `
if redis.call('SADD', KEYS[1], ARGV[1]) == 0 then
  return 0
end
redis.call('EXPIRE', KEYS[1], tonumber(ARGV[3]))
redis.call('HINCRBY', KEYS[2], ARGV[2], 1)
redis.call('INCR', KEYS[3])
return 1
`;

type RedisResponse = { result?: unknown; error?: string };

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || !url.startsWith("https://")) {
    throw new Error("Visitor analytics storage is not configured");
  }

  return { url: url.replace(/\/+$/, ""), token };
}

export function isVisitorAnalyticsConfigured() {
  const adminToken = process.env.VISITOR_STATS_ADMIN_TOKEN;
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.startsWith("https://") &&
      process.env.UPSTASH_REDIS_REST_TOKEN &&
      adminToken &&
      /^[a-f0-9]{64}$/i.test(adminToken),
  );
}

export function isVisitorStatsAdmin(authorization: string | null) {
  const expected = process.env.VISITOR_STATS_ADMIN_TOKEN;
  if (!expected || !/^[a-f0-9]{64}$/i.test(expected)) return false;

  const supplied = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
  const expectedHash = createHash("sha256").update(expected).digest();
  const suppliedHash = createHash("sha256").update(supplied).digest();
  return timingSafeEqual(expectedHash, suppliedHash);
}

export function seoulDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: "year" | "month" | "day") =>
    parts.find((part) => part.type === type)?.value;

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function visitorCookieId(cookieValue: string | undefined, date: string) {
  const match = cookieValue?.match(
    /^(\d{4}-\d{2}-\d{2})\.([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i,
  );

  if (match?.[1] === date) {
    return { id: match[2], isNew: false };
  }

  return { id: randomUUID(), isNew: true };
}

function keySuffix() {
  switch (process.env.VERCEL_ENV) {
    case "production":
      return "production";
    case "preview":
      return "preview";
    default:
      return "development";
  }
}

async function redisRequest(path: string, command: unknown): Promise<unknown> {
  const { url, token } = redisConfig();
  const response = await fetch(`${url}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) throw new Error("Visitor analytics storage request failed");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object") {
    throw new Error("Invalid visitor analytics storage response");
  }
  return result;
}

export async function recordVisitor(date: string, visitorId: string) {
  const prefix = `${KEY_PREFIX}:${keySuffix()}`;
  const hashedId = createHash("sha256")
    .update(`${date}:${visitorId}`)
    .digest("hex");
  const response = (await redisRequest("", [
    "EVAL",
    RECORD_VISIT_SCRIPT,
    3,
    `${prefix}:seen:${date}`,
    `${prefix}:daily`,
    `${prefix}:total`,
    hashedId,
    date,
    DAILY_KEY_TTL_SECONDS,
  ])) as RedisResponse;

  if (response.error || (response.result !== 0 && response.result !== 1)) {
    throw new Error("Visitor analytics storage rejected the visit");
  }
}

export async function readVisitorStats(days: number) {
  const today = seoulDate();
  const dayStart = Date.parse(`${today}T00:00:00.000Z`);
  const dates = Array.from({ length: days }, (_, index) =>
    new Date(dayStart - index * 86_400_000).toISOString().slice(0, 10),
  );
  const prefix = `${KEY_PREFIX}:${keySuffix()}`;
  const response = (await redisRequest("/multi-exec", [
    ["GET", `${prefix}:total`],
    ["HMGET", `${prefix}:daily`, ...dates],
  ])) as RedisResponse[];

  if (!Array.isArray(response) || response.length !== 2) {
    throw new Error("Invalid visitor analytics storage response");
  }
  if (response[0].error || response[1].error) {
    throw new Error("Visitor analytics storage rejected the query");
  }
  const dailyResults = response[1].result;
  if (!Array.isArray(dailyResults) || dailyResults.length !== dates.length) {
    throw new Error("Invalid visitor analytics daily counts");
  }

  const numberOrZero = (value: unknown) => {
    if (value === null) return 0;
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < 0) {
      throw new Error("Invalid visitor analytics count");
    }
    return number;
  };
  const daily = dates.map((date, index) => ({
    date,
    visitors: numberOrZero(dailyResults[index]),
  }));

  return {
    timezone: TIME_ZONE,
    metric: "daily_unique_browser",
    today,
    todayVisitors: daily[0].visitors,
    totalVisitors: numberOrZero(response[0].result),
    daily,
  };
}
