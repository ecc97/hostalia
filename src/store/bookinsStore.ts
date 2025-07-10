import { IBooking } from "@/interfaces/IBookings";
import {create} from "zustand";

interface BookingsStore {
    bookings: IBooking[]
    currentBooking: IBooking | null
    loading: boolean
    error: string | null
    setInitialBookings: (bookings: IBooking[]) => void
    fetchBookings?: () => Promise<void>
    fetchBooking?: (id: string) => Promise<void>
    updatedStatusBooking: (bookingId: string, status: string) => Promise<IBooking>
}

export const useBookingsStore = create<BookingsStore>((set, get) => ({
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
    setInitialBookings: (initialBookings: IBooking[]) => {
        set({ bookings: initialBookings });
    },
    fetchBookings: async () => {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        set({ bookings: data });
    },
    fetchBooking: async (id: string) => {
        const response = await fetch(`/api/bookings/${id}`);
        const data = await response.json();
        set({ currentBooking: data });
    },
    updatedStatusBooking: async (bookingId: string, status: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            const updatedBooking = await response.json();
            set((state) => ({
                bookings: state.bookings.map((booking) => {
                    if (booking.id === updatedBooking.id) {
                        return updatedBooking;
                    }
                    return booking;
                }),
                currentBooking: updatedBooking,
                loading: false,
                error: null,
            }))
            return updatedBooking;
        } catch (error) {
            set({
                error: (error as Error).message,
                loading: false,
            });
        }
    },
    setBooking: (booking: IBooking) => {
        set({ currentBooking: booking })
    },
    clearBooking: () => {
        set({ currentBooking: null })
    },
}))
