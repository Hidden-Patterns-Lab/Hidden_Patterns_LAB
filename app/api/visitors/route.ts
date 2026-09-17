import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  isVisitorAnalyticsConfigured,
  recordVisitor,
  seoulDate,
  visitorCookieId,
} from "@/lib/analytics/visitor-stats";

export const runtime = "nodejs";

const COOKIE_NAME = "hpl_visit_day";
const PRIVATE_HEADERS = { "Cache-Control": "private, no-store" };

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403, headers: PRIVATE_HEADERS });
  }
  if (!isVisitorAnalyticsConfigured()) {
    return NextResponse.json({ error: "Unavailable" }, { status: 503, headers: PRIVATE_HEADERS });
  }

  const date = seoulDate();
  const { id, isNew } = visitorCookieId(request.cookies.get(COOKIE_NAME)?.value, date);

  try {
    await recordVisitor(date, id);
  } catch {
    return NextResponse.json({ error: "Unavailable" }, { status: 503, headers: PRIVATE_HEADERS });
  }

  const response = new NextResponse(null, { status: 204, headers: PRIVATE_HEADERS });
  if (isNew) {
    response.cookies.set(COOKIE_NAME, `${date}.${id}`, {
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: 2 * 24 * 60 * 60,
    });
  }
  return response;
}
