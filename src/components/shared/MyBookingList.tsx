"use client";
import { IBooking } from "@/interfaces/IBookings";
import { useAuthStore } from "@/store/authStore";
import { DeleteBooking } from "./DeleteBooking";


type MyBookingListProps = {
    bookings: IBooking[];
};

export default function MyBookingList({ bookings }: MyBookingListProps) {
    const { user } = useAuthStore();
    const myBookings = bookings.filter((booking) => booking.userId === user?.userId);

    if (!user) {
        return null;
    }

    return (
        <main className='container mx-auto p-4 mt-16'>
            <h1 className='text-2xl font-bold mb-4'>Mi Reservas</h1>

            <div className='card-bookings'>
                {myBookings.length > 0 ? (
                    myBookings.map((booking) => (
                        <div key={booking.id} className='border border-gray-300 p-4 rounded shadow-md'>
                            <h2 className='text-lg font-semibold'>{booking.accommodationName}</h2>
                            <p className='text-md'>{booking.accommodationLocation}</p>
                            <p className='text-md'>${booking.accommodationPrice}</p>
                            <p className='text-md'>Fecha de Reserva: {new Date(booking.startDate).toLocaleDateString()}</p>
                            <p className='text-md'>Fecha de Salida: {new Date(booking.endDate).toLocaleDateString()}</p>
                            <p className='text-md'>Número de Personas: {booking.guests}</p>
                            <p className='text-md'>Estado: {booking.status === 'pending' ? 'Pendiente' : booking.status === 'cancelled' ? 'Cancelada' : 'Confirmada'}</p>
                            <div className='mt-4'>
                                <DeleteBooking bookingId={booking.id} />
                            </div>
                        </div>
                ))) : (
                    <div className='border border-gray-300 p-4 rounded shadow-md'>
                        <p className='text-lg'>No haz realizado ninguna reserva.</p>
                    </div>
                )}
            </div>
            {bookings.length === 0 && (
                <p className='text-lg'>No se encontraron reservas.</p>
            )}
        </main>
    );
}