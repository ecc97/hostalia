import React from 'react'
import MyBookingList from '@/components/shared/MyBookingList';
import { getBookings } from '@/actions/bookings';

export default async function MyBookingsPage() {
    
    try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`);
        // const data: IBookingsResponse = await response.json();
        // const bookings: IBooking[] = data.bookings;
        const { bookings } = await getBookings();

        return (
            <MyBookingList bookings={bookings} />
        )
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return (
            <main className='container mx-auto p-4 mt-16'>
                <h1 className='text-2xl font-bold mb-4'>Error fetching bookings</h1>
                <p className='text-gray-600'>Please try again later.</p>
            </main>
        )
    }
}
