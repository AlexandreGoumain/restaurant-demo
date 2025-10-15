import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET() {
  const catRes = await backendFetch(`/api/shop/categories?limit=100`);
  const cats = await catRes.json();
  const categories = (cats?.data || []) as Array<{ id: string; name: string; slug?: string }>;

  const itemsByCategory = await Promise.all(
    categories.map(async (c) => {
      const pRes = await backendFetch(`/api/shop/products?limit=200&categoryId=${c.id}`);
      const pJson = await pRes.json().catch(() => ({ data: [] }));
      const items = (pJson?.data || []).map((p: { name: string; description?: string; price?: number; images?: string[] }) => ({
        title: p.name,
        desc: p.description || undefined,
        price: typeof p.price === "number" ? `${p.price.toFixed(2)} €` : undefined,
        image: Array.isArray(p.images) && p.images[0] ? p.images[0] : undefined,
      }));
      return { id: c.slug || c.id, title: c.name, items };
    })
  );

  return NextResponse.json({ success: true, data: itemsByCategory });
}
