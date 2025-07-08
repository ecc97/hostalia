import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { IBookingRequest, IBookingsResponse, IBooking } from "@/interfaces/IBookings";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const BOOKINGS_COLLECTION_ID = '683a07a4000028be0f13';

export const getBookings = async (): Promise<IBookingsResponse> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BOOKINGS_COLLECTION_ID,
        );
        const bookings = response.documents.map((booking) => ({
            id: booking.$id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            guests: booking.guests || 1,
            accommodationId: booking.accommodationId,
            userId: booking.userId,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
            status: booking.status || 'pending',
            accommodationName: booking.accommodationName,
            accommodationPrice: booking.accommodationPrice,
            accommodationLocation: booking.accommodationLocation
        }))
        return { bookings };
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
}

export const createBooking = async (bookingData: IBookingRequest): Promise<IBooking> => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            BOOKINGS_COLLECTION_ID,
            ID.unique(),
            bookingData,
        );
        // const createBooking = response.data as IBooking;
        // return createBooking;
        const createBooking = {
            id: response.$id,
            startDate: response.startDate,
            endDate: response.endDate,
            guests: response.guests || 1,
            accommodationId: response.accommodationId,
            userId: response.userId,
            createdAt: response.$createdAt,
            updatedAt: response.$updatedAt,
            status: response.status || 'pending',
            accommodationName: response.accommodationName,
            accommodationPrice: response.accommodationPrice,
            accommodationLocation: response.accommodationLocation,
        };
        return createBooking;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};