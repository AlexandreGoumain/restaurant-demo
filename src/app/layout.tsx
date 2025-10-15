import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { restaurantInfo } from "@/lib/restaurantInfo";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
    variable: "--font-source-sans",
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL(restaurantInfo.contact.website || "https://www.trattoria-aurora.fr"),
    title: {
        default: restaurantInfo.seo.title,
        template: `%s · ${restaurantInfo.fullName}`,
    },
    description: restaurantInfo.seo.description,
    keywords: restaurantInfo.seo.keywords,
    openGraph: {
        type: "website",
        url: restaurantInfo.contact.website || "https://www.trattoria-aurora.fr/",
        title: restaurantInfo.seo.title,
        description: restaurantInfo.seo.description,
        images: [
            {
                url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                width: 1200,
                height: 630,
                alt: `Salle de restaurant italien élégante - ${restaurantInfo.fullName}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: restaurantInfo.seo.title,
        description: restaurantInfo.seo.description,
        images: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        ],
    },
    alternates: {
        canonical: restaurantInfo.contact.website || "https://www.trattoria-aurora.fr/",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${playfair.variable} ${sourceSans.variable}`}>
                <Providers>
                    <div
                        style={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Header />
                        <main style={{ flex: 1 }}>{children}</main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
