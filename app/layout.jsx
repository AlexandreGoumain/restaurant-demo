import './globals.css';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

import { Providers } from './providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair'
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-source-sans'
});

export const metadata = {
  metadataBase: new URL('https://www.trattoria-aurora.fr'),
  title: 'Trattoria Aurora — Restaurant italien à Paris',
  description:
    "Trattoria Aurora, restaurant italien à Paris : cuisine authentique, menu saisonnier, réservation en ligne, privatisation d'espaces et offres entreprises.",
  keywords: [
    'restaurant italien',
    'trattoria',
    'cuisine italienne',
    'Paris',
    'privatisation',
    'livraison',
    'menu dégustation'
  ],
  authors: [{ name: 'Trattoria Aurora' }],
  openGraph: {
    title: 'Trattoria Aurora — Restaurant italien à Paris',
    description:
      "Cuisine italienne authentique, vins naturels et offres entreprises pour vos événements à Paris.",
    url: 'https://www.trattoria-aurora.fr/',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Salle de restaurant italien élégante'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trattoria Aurora — Restaurant italien à Paris',
    description:
      "Cuisine italienne authentique, vins naturels et offres entreprises pour vos événements à Paris.",
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80']
  },
  alternates: {
    canonical: 'https://www.trattoria-aurora.fr/'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${sourceSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
