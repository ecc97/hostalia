import AccommodationsSection from "@/components/shared/AccommodationsSection";
import BenefitsSection from "@/components/shared/Benefits";
import PopularDestinations from "@/components/shared/Destinations";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import { Accommodation } from "@/interfaces/IAccomodations";


export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/accommodations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data: Accommodation[] = await response.json();
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PopularDestinations />
      <AccommodationsSection accommodations={data} />
      <BenefitsSection />
      <p className="bg-red-500">Hola a todos</p>
      <Footer />
    </main>
  );
}
