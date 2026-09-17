import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  isVisitorAnalyticsConfigured,
  isVisitorStatsAdmin,
  readVisitorStats,
} from "@/lib/analytics/visitor-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIVATE_HEADERS = { "Cache-Control": "private, no-store" };

export async function GET(request: NextRequest) {
  if (!isVisitorStatsAdmin(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Not found" }, { status: 404, headers: PRIVATE_HEADERS });
  }
  if (!isVisitorAnalyticsConfigured()) {
    return NextResponse.json({ error: "Unavailable" }, { status: 503, headers: PRIVATE_HEADERS });
  }

  const rawDays = request.nextUrl.searchParams.get("days") ?? "30";
  if (!/^\d{1,2}$/.test(rawDays) || Number(rawDays) < 1 || Number(rawDays) > 90) {
    return NextResponse.json(
      { error: "days must be between 1 and 90" },
      { status: 400, headers: PRIVATE_HEADERS },
    );
  }

  try {
    const stats = await readVisitorStats(Number(rawDays));
    return NextResponse.json(stats, { headers: PRIVATE_HEADERS });
  } catch {
    return NextResponse.json({ error: "Unavailable" }, { status: 503, headers: PRIVATE_HEADERS });
  }
}
