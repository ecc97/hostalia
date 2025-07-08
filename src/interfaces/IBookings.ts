export interface IBooking {
    id: string;
    startDate: string;
    endDate: string;
    guests: number;
    accommodationId: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
    status?: string;
    accommodationName: string;
    accommodationPrice: number;
    accommodationLocation: string;
}

export interface IBookingsResponse {
    bookings: IBooking[];
}

export type IBookingRequest = Omit<IBooking, 'id'>;