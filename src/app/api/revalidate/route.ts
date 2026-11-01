import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Sanity publish webhook: POST /api/revalidate/ with the shared secret
 * (SANITY_REVALIDATE_SECRET) as `?secret=` or the `sanity-webhook-secret`
 * header. Refreshes every cached content query within seconds of a publish.
 */
export async function POST(req: NextRequest) {
  const secret = (process.env.SANITY_REVALIDATE_SECRET ?? "").trim();
  const given = req.nextUrl.searchParams.get("secret") ?? req.headers.get("sanity-webhook-secret") ?? "";
  if (!secret || given !== secret) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { _type?: string };
  revalidateTag("content", "max");
  return NextResponse.json({ ok: true, revalidated: body._type ?? "content", at: new Date().toISOString() });
}
