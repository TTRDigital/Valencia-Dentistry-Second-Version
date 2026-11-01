import { NextResponse, type NextRequest } from "next/server";
import { routes } from "./lib/routes";

/**
 * Unknown URLs under the dynamic segments (/<slug>/ for blog posts,
 * /services/<…>/) are rewritten to the built-in not-found route so they
 * answer with a real 404 status instead of a streamed 200.
 */
const known = new Set(routes);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (!known.has(path)) return NextResponse.rewrite(new URL("/_not-found", req.url), { status: 404 });
  return NextResponse.next();
}

export const config = {
  // Single-segment paths (posts + static pages) and everything under /services/
  matcher: ["/((?!_next|api|og|images|fonts|video|cms|icon|apple-icon|favicon|manifest|robots|sitemap).*)"],
};
