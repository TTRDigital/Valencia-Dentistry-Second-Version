import { NextResponse, type NextRequest } from "next/server";
import { routes } from "./lib/routes";

/**
 * Unknown URLs under the dynamic segments (/<slug>/ for blog posts and
 * /services/<…>/) are rewritten to a path no route matches, so they get the
 * branded global 404 with a real 404 status instead of Next's bare error shell.
 */
const known = new Set(routes);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const segments = path.split("/").filter(Boolean);
  const dynamic = segments.length === 1 || segments[0] === "services";
  if (dynamic && !known.has(path)) return NextResponse.rewrite(new URL("/_/not-found/", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|og|images|fonts|video|cms|icon|apple-icon|favicon|manifest|robots|sitemap|_).*)"],
};
