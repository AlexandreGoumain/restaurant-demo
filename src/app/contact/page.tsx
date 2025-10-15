import ContactClient from "./ContactClient";
import { restaurantInfo } from "@/lib/restaurantInfo";

export const metadata = {
  title: `Contact - ${restaurantInfo.name}`,
  description: `Contactez-nous et trouvez notre restaurant ${restaurantInfo.fullName} à ${restaurantInfo.address.city}`,
};

export default function ContactPage() {
  return <ContactClient />;
}
