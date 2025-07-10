import DashboardTemplate from "@/components/shared/DashboardTemplate";
import { getBookings } from '@/actions/bookings';

export default async function DashboardPage() {

  const bookings = await getBookings();

  return (
    <DashboardTemplate bookingsLength={bookings.bookings.length}/>
  );
}
