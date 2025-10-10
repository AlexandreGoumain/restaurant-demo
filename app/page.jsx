import Script from 'next/script';

import LandingPage from '../components/LandingPage';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Trattoria Aurora',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  servesCuisine: 'Italian',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '18 Rue des Carmes',
    addressLocality: 'Paris',
    postalCode: '75005',
    addressCountry: 'FR'
  },
  telephone: '+33 1 23 45 67 89',
  priceRange: '€€',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '12:00',
      closes: '23:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '12:00',
      closes: '00:00'
    }
  ],
  sameAs: [
    'https://www.instagram.com/trattoriaaurora',
    'https://www.facebook.com/trattoriaaurora'
  ],
  acceptsReservations: true,
  menu: 'https://www.trattoria-aurora.fr/menu',
  makesOffer: {
    '@type': 'Offer',
    name: 'Menu affaires déjeuner',
    price: '32.00',
    priceCurrency: 'EUR',
    description: 'Entrée + plat + café gourmand, disponible du lundi au vendredi'
  }
};

export default function Page() {
  return (
    <>
      <LandingPage />
      <Script id="restaurant-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  );
}
