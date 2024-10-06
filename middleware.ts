import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the user accesses the root path, redirect to the default locale (e.g., /en)
  if (pathname === "/my-app" || pathname === "/my-app/") {
    return NextResponse.redirect(new URL("/my-app/en", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-app", "/my-app/:locale*"], // Match the base path and locale paths
};
