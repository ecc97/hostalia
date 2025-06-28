import AccommodationTemplate from "@/components/shared/AccomodationTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodation Detail",
  description: "Accommodation Detail",
};

export default function AccommodationDetailPage() {
  
  return (
    <AccommodationTemplate />
  );
}