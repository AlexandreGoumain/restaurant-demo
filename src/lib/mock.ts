type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
};
type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  images?: string[];
  categoryId: string;
};
type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  published: boolean;
};
type Lead = {
  id: string;
  company: string;
  email: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
};
type Reservation = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  date: string;
  partySize: number;
  note?: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
};

const uid = () => Math.random().toString(36).slice(2, 10);

const categories: Category[] = [
  {
    id: uid(),
    name: "Pates",
    slug: "pates",
    description:
      "Nos pâtes fraîches artisanales préparées selon la tradition italienne",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
  },
  {
    id: uid(),
    name: "Pizzas",
    slug: "pizzas",
    description:
      "Pizzas napolitaines au feu de bois avec des ingrédients d'exception",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  },
  {
    id: uid(),
    name: "Specialites",
    slug: "specialites",
    description: "Les créations du chef et nos spécialités maison",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  },
];

const products: Product[] = [
  {
    id: uid(),
    name: "Tagliatelle cacio e pepe",
    description: "Pecorino romano, poivre",
    price: 18,
    images: [
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
    ],
    categoryId: categories[0].id,
  },
  {
    id: uid(),
    name: "Paccheri all'Astice",
    description: "Homard, datterino",
    price: 32,
    images: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    ],
    categoryId: categories[0].id,
  },
  {
    id: uid(),
    name: "Margherita",
    description: "Tomate, mozzarella, basilic",
    price: 14,
    images: [
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
    ],
    categoryId: categories[1].id,
  },
  {
    id: uid(),
    name: "Diavola",
    description: "Nduja, scamorza fumee",
    price: 17,
    images: [
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    ],
    categoryId: categories[1].id,
  },
  {
    id: uid(),
    name: "Burrata des Pouilles",
    description: "Huile nouvelle, poivre",
    price: 14,
    images: [
      "https://images.unsplash.com/photo-1700483540089-63307e6dbca1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1622",
    ],
    categoryId: categories[2].id,
  },
];

const testimonials: Testimonial[] = [
  {
    id: uid(),
    quote: '"Un ecrin italien en plein Paris. Service impeccable."',
    author: "Camille D.",
    role: "Directrice commerciale",
    published: true,
  },
  {
    id: uid(),
    quote: '"Privatisation produit — experience memorable."',
    author: "Hugo L.",
    role: "Responsable evenementiel",
    published: true,
  },
  {
    id: uid(),
    quote: '"Brunch dominical devenu rituel familial."',
    author: "Lucie P.",
    role: "Cliente",
    published: true,
  },
];

const leads: Lead[] = [];
const reservations: Reservation[] = [];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function getBody(init: RequestInit): Record<string, unknown> {
  const raw = (init as { body?: unknown }).body;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return {};
}

export async function mockFetch(path: string, init: RequestInit = {}) {
  const url = new URL(path, "http://mock.local");
  const { pathname, searchParams } = url;
  const method = (init.method || "GET").toUpperCase();

  // Shop categories
  if (pathname === "/api/shop/categories") {
    if (method === "GET") {
      const search = (searchParams.get("search") || "").toLowerCase();
      const data = categories
        .filter((c) => !search || c.name.toLowerCase().includes(search))
        .map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          image: c.image,
          productCount: products.filter((p) => p.categoryId === c.id).length,
        }));
      return json({ success: true, data });
    }
    if (method === "POST") {
      const body = getBody(init) as {
        name?: string;
        description?: string;
        image?: string;
      };
      const name: string =
        typeof body.name === "string" ? body.name : "Nouvelle categorie";
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      const c: Category = {
        id: uid(),
        name,
        slug,
        description: body.description,
        image: body.image,
      };
      categories.push(c);
      return json({ success: true, data: c }, 201);
    }
  }
  const catIdMatch = pathname.match(/^\/api\/shop\/categories\/(.+)$/);
  if (catIdMatch) {
    const id = catIdMatch[1];
    if (method === "PUT") {
      const body = getBody(init) as {
        name?: string;
        description?: string;
        image?: string;
      };
      const c = categories.find((x) => x.id === id);
      if (!c) return json({ success: false, error: "Not found" }, 404);
      if (typeof body.name === "string") {
        c.name = body.name;
        c.slug = body.name.toLowerCase().replace(/\s+/g, "-");
      }
      if (body.description !== undefined) c.description = body.description;
      if (body.image !== undefined) c.image = body.image;
      return json({ success: true, data: c });
    }
    if (method === "DELETE") {
      const idx = categories.findIndex((x) => x.id === id);
      if (idx === -1) return json({ success: false, error: "Not found" }, 404);
      categories.splice(idx, 1);
      return json({ success: true, message: "Categorie supprimee" });
    }
  }

  // Shop products
  if (pathname === "/api/shop/products") {
    if (method === "GET") {
      const categoryId = searchParams.get("categoryId") || undefined;
      const data = products.filter(
        (p) => !categoryId || p.categoryId === categoryId,
      );
      return json({ success: true, data });
    }
    if (method === "POST") {
      const body = getBody(init) as {
        name: string;
        description?: string;
        price?: number;
        images?: string[];
        categoryId: string;
      };
      const p: Product = {
        id: uid(),
        name: body.name,
        description: body.description,
        price: body.price ?? 0,
        images: body.images || [],
        categoryId: body.categoryId,
      };
      products.push(p);
      return json({ success: true, data: p }, 201);
    }
  }
  const prodIdMatch = pathname.match(/^\/api\/shop\/products\/(.+)$/);
  if (prodIdMatch) {
    const id = prodIdMatch[1];
    const p = products.find((x) => x.id === id);
    if (!p) return json({ success: false, error: "Not found" }, 404);
    if (method === "PUT") {
      const body = getBody(init) as {
        name?: string;
        description?: string;
        price?: number;
        images?: string[];
      };
      Object.assign(p, {
        name: body.name ?? p.name,
        description: body.description ?? p.description,
        price: typeof body.price === "number" ? body.price : p.price,
        images: body.images ?? p.images,
      });
      return json({ success: true, data: p });
    }
    if (method === "DELETE") {
      const i = products.findIndex((x) => x.id === id);
      products.splice(i, 1);
      return json({ success: true, message: "Supprime" });
    }
  }

  // CMS Testimonials
  if (pathname === "/api/cms/testimonials/public" && method === "GET") {
    const data = testimonials
      .filter((t) => t.published)
      .map(({ id, quote, author, role }) => ({ id, quote, author, role }));
    return json({ success: true, data });
  }
  if (pathname === "/api/cms/testimonials") {
    if (method === "GET") return json({ success: true, data: testimonials });
    if (method === "POST") {
      const body = getBody(init) as {
        quote: string;
        author: string;
        role?: string;
        published?: boolean;
      };
      const t: Testimonial = {
        id: uid(),
        quote: body.quote,
        author: body.author,
        role: body.role,
        published: !!body.published,
      };
      testimonials.push(t);
      return json({ success: true, data: t }, 201);
    }
  }
  const testiIdMatch = pathname.match(/^\/api\/cms\/testimonials\/(.+)$/);
  if (testiIdMatch) {
    const id = testiIdMatch[1];
    const t = testimonials.find((x) => x.id === id);
    if (!t) return json({ success: false, error: "Not found" }, 404);
    if (method === "PUT") {
      const body = getBody(init) as {
        quote?: string;
        author?: string;
        role?: string;
        published?: boolean;
      };
      Object.assign(t, {
        quote: body.quote ?? t.quote,
        author: body.author ?? t.author,
        role: body.role ?? t.role,
        published: body.published ?? t.published,
      });
      return json({ success: true, data: t });
    }
    if (method === "DELETE") {
      const i = testimonials.findIndex((x) => x.id === id);
      testimonials.splice(i, 1);
      return json({ success: true, message: "Temoignage supprime" });
    }
  }

  // CMS Leads
  if (pathname === "/api/cms/leads/public" && method === "POST") {
    const body = getBody(init) as {
      company: string;
      email: string;
      message: string;
    };
    const l: Lead = {
      id: uid(),
      company: body.company,
      email: body.email,
      message: body.message,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    leads.push(l);
    return json({ success: true, data: l }, 201);
  }
  if (pathname === "/api/cms/leads" && method === "GET")
    return json({ success: true, data: leads });
  const leadIdMatch = pathname.match(/^\/api\/cms\/leads\/(.+)$/);
  if (leadIdMatch) {
    const id = leadIdMatch[1];
    if (method === "DELETE") {
      const i = leads.findIndex((x) => x.id === id);
      if (i === -1) return json({ success: false, error: "Not found" }, 404);
      leads.splice(i, 1);
      return json({ success: true, message: "Lead supprime" });
    }
  }
  const leadStatusMatch = pathname.match(/^\/api\/cms\/leads\/(.+)\/status$/);
  if (leadStatusMatch && method === "PUT") {
    const id = leadStatusMatch[1];
    const body = getBody(init) as { status?: Lead["status"] };
    const l = leads.find((x) => x.id === id);
    if (!l) return json({ success: false, error: "Not found" }, 404);
    if (body.status) l.status = body.status;
    return json({ success: true, data: l });
  }

  // CMS Reservations
  if (pathname === "/api/cms/reservations/public" && method === "POST") {
    const body = getBody(init) as {
      name: string;
      email?: string;
      phone?: string;
      date?: string;
      partySize?: number;
      note?: string;
    };
    const r: Reservation = {
      id: uid(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      date: (body.date ? new Date(body.date) : new Date()).toISOString(),
      partySize: body.partySize ?? 2,
      note: body.note,
      status: "PENDING",
    };
    reservations.push(r);
    return json({ success: true, data: r }, 201);
  }
  if (pathname === "/api/cms/reservations" && method === "GET")
    return json({ success: true, data: reservations });
  const resvIdMatch = pathname.match(/^\/api\/cms\/reservations\/(.+)$/);
  if (resvIdMatch) {
    const id = resvIdMatch[1];
    if (method === "DELETE") {
      const i = reservations.findIndex((x) => x.id === id);
      if (i === -1) return json({ success: false, error: "Not found" }, 404);
      reservations.splice(i, 1);
      return json({ success: true, message: "Reservation supprimee" });
    }
  }
  const resvStatusMatch = pathname.match(
    /^\/api\/cms\/reservations\/(.+)\/status$/,
  );
  if (resvStatusMatch && method === "PUT") {
    const id = resvStatusMatch[1];
    const body = getBody(init) as { status?: Reservation["status"] };
    const r = reservations.find((x) => x.id === id);
    if (!r) return json({ success: false, error: "Not found" }, 404);
    if (body.status) r.status = body.status;
    return json({ success: true, data: r });
  }

  return json(
    { success: false, error: `No mock for ${method} ${pathname}` },
    404,
  );
}
