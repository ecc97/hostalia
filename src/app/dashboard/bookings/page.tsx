import { IBookingsResponse, IBooking } from '@/interfaces/IBookings'
import BookingsList from '@/components/shared/BookingsList';


export default async function BookingsPages() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/bookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data: IBookingsResponse = await response.json();
        const bookings: IBooking[] = data.bookings;
        return (
            <BookingsList bookings={bookings} />
        )
    } catch (error) {
        console.error(error);
        return (
            <main className='container mx-auto p-4 mt-16'>
                <h1 className='text-2xl font-bold mb-4'>Error fetching bookings</h1>
                <p className='text-gray-600'>Please try again later.</p>
            </main>
        )
    }
}