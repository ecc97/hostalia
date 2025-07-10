"use client";
import { IBooking } from "@/interfaces/IBookings";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useBookingsStore } from "@/store/bookinsStore";


type BookingsListProps = {
    bookings: IBooking[];
};

export default function BookingsList({ bookings }: BookingsListProps) {
    const { user } = useAuthStore();
    const { bookings: currentBookings, loading, error, setInitialBookings, updatedStatusBooking } = useBookingsStore();
    const otherBookings = bookings.filter((booking) => booking.userId !== user?.userId);

    useEffect(() => {
        setInitialBookings(bookings);
    }, [bookings, setInitialBookings]);


    const handleUpdateStatusBooking = async (bookingId: string, newStatus: string) => {
        try {
            const updatedBooking = await updatedStatusBooking(bookingId, newStatus);
            return updatedBooking;
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
        }
    }

    return (
        <main className='container mx-auto p-4 mt-16'>
            <h1 className='text-2xl font-bold mb-4'>Reservas</h1>
            {error && <p className='text-gray-600'>{error}</p>}
            <div className='card-bookings'>
                {currentBookings.length > 0 ? (
                    currentBookings.map((booking) => (
                        <div key={booking.id} className='border border-gray-300 p-4 rounded shadow-md'>
                            <h2 className='text-lg font-semibold'>{booking.accommodationName}</h2>
                            <p className='text-gray-800'>{booking.accommodationLocation}</p>
                            <p className='text-gray-800'>${booking.accommodationPrice}</p>
                            <p className='text-gray-600'>Fecha de Reserva: {new Date(booking.startDate).toLocaleDateString()}</p>
                            <p className='text-gray-600'>Fecha de Salida: {new Date(booking.endDate).toLocaleDateString()}</p>
                            <p className='text-gray-600'>Número de Personas: {booking.guests}</p>
                            <p className='text-gray-600'>Estado: {booking.status === 'pending' ? 'Pendiente' : booking.status === 'cancelled' ? 'Cancelada' : 'Confirmada'}</p>
                            {otherBookings.length > 0 ? (
                                <div className='mt-4'>
                                    <button
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${booking.status === 'confirmed' || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => handleUpdateStatusBooking(booking.id, 'confirmed')}
                                        disabled={booking.status === 'confirmed' || loading}
                                    >
                                        {loading ? 'Cargando...' : 'Confirmar'}
                                    </button>
                                    <button
                                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${booking.status === 'cancelled' || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => handleUpdateStatusBooking(booking.id, 'cancelled')}
                                        disabled={booking.status === 'cancelled' || loading}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <p className='text-gray-600'>No se encontraron reservas.</p>
                )}
            </div>
        </main>
    );
}