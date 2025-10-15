import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await backendFetch(`/api/cms/reservations/public`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({ success: false }));
  return NextResponse.json(data, { status: res.status });
}

