import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET() {
  const res = await backendFetch(`/api/cms/testimonials/public`);
  const data = await res.json().catch(() => ({ success: false, data: [] }));
  return NextResponse.json(data);
}
