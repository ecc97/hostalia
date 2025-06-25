import AccommodationsTemplate from "@/components/shared/AccommodationsTemplate";
import { getAccommodationsByPage } from "@/actions/accommodations";

interface IParamsProps {
  searchParams: Promise<{
    page: string;
    limit: string;
  }>
}

export default async function AccomodationsPage( { searchParams }: IParamsProps ) {
  
  const page = (await searchParams).page ? parseInt((await searchParams).page) : 1;
  const limit = (await searchParams).limit ? parseInt((await searchParams).limit) : 10;

  const accommodations = await getAccommodationsByPage(page, limit);
  console.log(accommodations);

  return (
    <AccommodationsTemplate data={accommodations} />  
  );
}
