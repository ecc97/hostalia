
import HomeTemplate from "@/components/shared/HomeTemplate";
import { Accommodation } from "@/interfaces/IAccomodations";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/accommodations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data: Accommodation[] = await response.json();
  console.log(data);
  
  return (
    <HomeTemplate />
  );
}
