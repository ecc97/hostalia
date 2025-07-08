import React from 'react'
import { IBookingsResponse, IBooking } from '@/interfaces/IBookings'

export default async function MyBookingsPage() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`);
    const data: IBookingsResponse = await response.json();
    const bookings: IBooking[] = data.bookings;

    try {
        return (
            <main className='container mx-auto p-4 mt-16'>
            <h1 className='text-2xl font-bold mb-4'>My Bookings</h1>
            
            <div className='flex flex-col gap-4'>
                {bookings.map((booking) => (
                    <div key={booking.id} className='border border-gray-300 p-4 rounded'>
                        <h2 className='text-lg font-semibold'>{booking.accommodationName}</h2>
                        <p className='text-gray-800'>{booking.accommodationLocation}</p>
                        <p className='text-gray-800'>${booking.accommodationPrice}</p>
                        <p className='text-gray-600'>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                        <p className='text-gray-600'>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
                        <p className='text-gray-600'>Guests: {booking.guests}</p>
                    </div>
                ))}
            </div>
            {bookings.length === 0 && (
                <p className='text-gray-600'>No bookings found.</p>
            )}
        </main>
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
