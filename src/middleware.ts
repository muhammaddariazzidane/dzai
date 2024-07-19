import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (request.nextUrl.pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
