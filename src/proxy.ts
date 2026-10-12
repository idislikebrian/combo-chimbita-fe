import { NextResponse, type NextRequest } from "next/server";

// Host-based routing. One project, two faces:
//   combochimbita.net, www.combochimbita.net  -> the holding page; every other path redirects to /
//   anything else (disco.combochimbita.net, *.vercel.app, localhost) -> the campaign, unchanged
// The holding page lives at /espera and is only reachable through the root domain.
// (Vercel redirects the apex to www, so in practice requests arrive on www.)

const ROOT_HOSTS = new Set(["combochimbita.net", "www.combochimbita.net"]);
const HOLDING = "/espera";

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (ROOT_HOSTS.has(host)) {
    if (pathname === "/") return NextResponse.rewrite(new URL(HOLDING, request.url));
    // Campaign paths, /gracias, /cancelado and the API all stay off the root domain.
    return NextResponse.redirect(new URL("/", request.url), 307);
  }

  if (pathname === HOLDING) return NextResponse.redirect(new URL("/", request.url), 307);
  return NextResponse.next();
}

export const config = {
  // Static assets pass straight through so the holding page keeps its fonts, logo and flowers.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|media/).*)"],
};
