import { NextResponse } from "next/server";

export function middleware() {
  // Full mock data mode: no route protection
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
