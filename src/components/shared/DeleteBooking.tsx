"use client"
import { deleteBooking } from "@/actions/bookings"
import { useRouter } from "next/navigation"


export const DeleteBooking = ({ bookingId }: { bookingId: string }) => {
    const router = useRouter();

    const handleDeleteBooking = async () => {
        if (!confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
            return;
        }
        await deleteBooking(bookingId);
        router.refresh();
    };

    return (
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleDeleteBooking}>Eliminar Reserva</button>
    );
}
