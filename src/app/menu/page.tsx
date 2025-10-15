import MenuClient from "./MenuClient";
import type { MenuCategory } from "@/types/menu";
import { mockFetch } from "@/lib/mock";

export const metadata = { title: "Carte" };

export const dynamic = "force-dynamic";

async function getMenu(): Promise<MenuCategory[]> {
  const catRes = await mockFetch(`/api/shop/categories?limit=100`);
  const catsJson = await catRes.json();
  const categories = (catsJson?.data || []) as Array<{ id: string; name: string; slug?: string }>;
  const itemsByCategory = await Promise.all(
    categories.map(async (c) => {
      const pRes = await mockFetch(`/api/shop/products?limit=200&categoryId=${c.id}`);
      const pJson = await pRes.json().catch(() => ({ data: [] }));
      const items = (pJson?.data || []).map((p: { name: string; description?: string; price?: number; images?: string[] }) => ({
        title: p.name,
        desc: p.description || undefined,
        price: typeof p.price === "number" ? `${p.price.toFixed(2)} €` : undefined,
        image: Array.isArray(p.images) && p.images[0] ? p.images[0] : undefined,
      }));
      return { id: c.slug || c.id, title: c.name, items } as MenuCategory;
    })
  );
  return itemsByCategory;
}

export default async function MenuPage() {
  const categories = await getMenu();
  return <MenuClient categories={categories} />;
}
