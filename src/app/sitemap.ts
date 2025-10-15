import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://www.trattoria-aurora.fr";
    const lastModified = new Date();
    return [
        { url: `${base}/`, lastModified },
        { url: `${base}/menu`, lastModified },
        { url: `${base}/entreprises`, lastModified },
        { url: `${base}/reservation`, lastModified },
        { url: `${base}/mentions-legales`, lastModified },
        { url: `${base}/politique-de-confidentialite`, lastModified },
    ];
}
