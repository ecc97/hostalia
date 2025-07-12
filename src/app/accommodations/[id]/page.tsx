import AccommodationTemplate from "@/components/shared/AccomodationTemplate";
import { Metadata } from "next";
import { getAccommodation } from "@/actions/accommodations";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
  const id = (await params).id;
  const accommodation = await getAccommodation(id);

  if(!accommodation){
    return {
      title: 'Alojamiento no encontrado',
    }
  }

  return {
    title: `${accommodation.name} | Hostalia`,
    description: `${accommodation.description.substring(0, 175)}...`,
  }
}

export default function AccommodationDetailPage() {
  
  return (
    <AccommodationTemplate />
  );
}