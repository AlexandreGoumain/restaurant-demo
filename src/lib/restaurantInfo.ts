// Informations centralisées du restaurant Aurora
// Toutes les données du restaurant sont regroupées ici pour garantir la cohérence

export interface RestaurantInfo {
  // Informations de base
  name: string;
  fullName: string;
  tagline: string;
  description: string;

  // Coordonnées
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    fullAddress: string;
  };

  // Contact
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    website?: string;
  };

  // Horaires d'ouverture
  openingHours: {
    lundi: { isOpen: boolean; periods?: string[] };
    mardi: { isOpen: boolean; periods?: string[] };
    mercredi: { isOpen: boolean; periods?: string[] };
    jeudi: { isOpen: boolean; periods?: string[] };
    vendredi: { isOpen: boolean; periods?: string[] };
    samedi: { isOpen: boolean; periods?: string[] };
    dimanche: { isOpen: boolean; periods?: string[] };
  };

  // Horaires résumés pour affichage rapide
  quickHours: {
    weekdays: string;
    weekend: string;
    closedDays: string[];
  };

  // Transport et accès
  transport: {
    metro: string[];
    bus: string[];
    parking: string[];
  };

  // Réseaux sociaux
  social: {
    instagram: string;
    facebook: string;
    twitter?: string;
    linkedin?: string;
  };

  // Localisation pour la carte
  location: {
    latitude: number;
    longitude: number;
    mapsEmbedUrl: string;
    mapsUrl: string;
  };

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Événements et groupes
  events: {
    hasPrivateEvents: boolean;
    capacity: number;
    description: string;
  };
}

// Configuration du restaurant Bella Vista
export const restaurantInfo: RestaurantInfo = {
  // Informations de base
  name: "Bella Vista",
  fullName: "Ristorante Bella Vista",
  tagline: "Restaurant italien authentique",
  description:
    "Une escapade italienne au cœur de Paris, où tradition et créativité se rencontrent dans une atmosphère chaleureuse.",

  // Coordonnées
  address: {
    street: "15 Rue du Test",
    postalCode: "75006",
    city: "Paris",
    country: "France",
    fullAddress: "15 Rue du Test, 75006 Paris, France",
  },

  // Contact
  contact: {
    phone: "+33153987532",
    phoneDisplay: "+33 1 02 03 04 05 06",
    email: "contact@bella-vista-paris.fr",
    website: "https://www.bella-vista-paris.fr",
  },

  // Horaires d'ouverture détaillés
  openingHours: {
    lundi: { isOpen: false },
    mardi: { isOpen: true, periods: ["12h-14h30", "19h-22h30"] },
    mercredi: { isOpen: true, periods: ["12h-14h30", "19h-22h30"] },
    jeudi: { isOpen: true, periods: ["12h-14h30", "19h-22h30"] },
    vendredi: { isOpen: true, periods: ["12h-14h30", "19h-22h30"] },
    samedi: { isOpen: true, periods: ["12h-14h30", "19h-23h00"] },
    dimanche: { isOpen: false },
  },

  // Horaires résumés
  quickHours: {
    weekdays: "Mar-Ven: 12h-14h30, 19h-22h30",
    weekend: "Sam: 12h-14h30, 19h-23h00",
    closedDays: ["Lundi", "Dimanche"],
  },

  // Transport et accès
  transport: {
    metro: ["Saint-Germain-des-Prés (lignes 4)"],
    bus: ["Lignes 38, 63, 70, 86, 87, 95"],
    parking: ["Parking Saint-Germain (à 150m)"],
  },

  // Réseaux sociaux
  social: {
    instagram: "https://instagram.com/bella-vista-paris",
    facebook: "https://facebook.com/bella-vista-paris",
    twitter: "https://twitter.com/bella-vista-paris",
  },

  // Localisation pour la carte
  location: {
    latitude: 48.853,
    longitude: 2.3325,
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2914352437283!2d2.3325!3d48.8530!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fcd024a47c1%3A0xb1c8b8c8b8c8b8c8!2sSaint-Germain-des-Pr%C3%A9s%2C%2075006%20Paris!5e0!3m2!1sfr!2sfr!4v1234567890",
    mapsUrl: "https://maps.google.com/?q=15+Rue+du+Test+75006+Paris",
  },

  // SEO
  seo: {
    title: "Ristorante Bella Vista — Restaurant italien à Paris",
    description:
      "Ristorante Bella Vista, restaurant italien authentique situé dans le 6ème arrondissement de Paris. Découvrez nos pâtes fraîches, pizzas napolitaines et spécialités italiennes.",
    keywords: [
      "restaurant italien",
      "pâtes fraîches",
      "pizza napolitaine",
      "Paris 6ème",
      "restaurant authentique",
      "Saint-Germain-des-Prés",
      "cuisine italienne traditionnelle",
    ],
  },

  // Événements et groupes
  events: {
    hasPrivateEvents: true,
    capacity: 60,
    description:
      "Notre restaurant peut accueillir vos événements privés, anniversaires, réunions d'entreprise et célébrations spéciales. Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.",
  },
};

// Fonctions utilitaires pour formater les informations
export const formatOpeningHours = (hours: RestaurantInfo["openingHours"]) => {
  const days = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];
  return days.map((day) => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    ...hours[day as keyof typeof hours],
  }));
};

export const formatPhoneForTel = (phone: string) => {
  return phone.replace(/[^\d+]/g, "");
};

export const isOpenAtCurrentTime = (hours: RestaurantInfo["openingHours"]) => {
  const now = new Date();
  const currentDay = now
    .toLocaleDateString("fr-FR", { weekday: "long" })
    .toLowerCase();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const dayHours = hours[currentDay as keyof typeof hours];
  if (!dayHours?.isOpen || !dayHours.periods) return false;

  return dayHours.periods.some((period) => {
    const [start, end] = period.split("-");
    const [startHour, startMin] = start
      .replace("h", ":")
      .split(":")
      .map(Number);
    const [endHour, endMin] = end.replace("h", ":").split(":").map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    return currentTime >= startMinutes && currentTime <= endMinutes;
  });
};

export default restaurantInfo;
