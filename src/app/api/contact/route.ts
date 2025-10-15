import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        // Here you can plug email/SaaS or persist to DB. For now, just echo.
        return NextResponse.json({ ok: true, received: data }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false }, { status: 400 });
    }
}
