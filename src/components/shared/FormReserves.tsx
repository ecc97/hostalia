'use client'
import React from 'react'
import { createBooking } from '@/actions/bookings';
import { useAuthStore } from '@/store/authStore';


interface IFormReservesProps {
    accommodationId: string;
    acccommodationName: string;
    accommodationPrice: string;
    accommodationLocation: string;
}
type IReserveRequest = {
    guests: number;
    startDate: string;
    endDate: string;
}


export default function FormReserves({ accommodationId, acccommodationName, accommodationPrice, accommodationLocation }: IFormReservesProps) {
    const { user } = useAuthStore();
    const [formData, setFormData] = React.useState<IReserveRequest>({
        guests: 0,
        startDate: '',
        endDate: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "guests" ? parseInt(value) || 0 : value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            alert('Debes iniciar sesión para reservar');
            return;
        }
        try {
            const bookingData = {
                ...formData,
                guests: parseInt(formData.guests.toString()),
                accommodationId,
                userId: user.userId,
                status: "pending",
                accommodationName: acccommodationName,
                accommodationPrice: parseInt(accommodationPrice),
                accommodationLocation: accommodationLocation,
            };
            const response = await fetch(`/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Error al crear la reserva');
            }              
            setFormData({
                guests: 0,
                startDate: '',
                endDate: '',
            });
            
            alert("Reserva creada con éxito");
        } catch (error) {
            console.error('Error al reservar la reserva:', error);
        }
    }

    return (
        <>
            <h2 className='text-2xl text-center font-bold mb-4'>Reservar</h2>
            <div className='w-full flex flex-col gap-4'>
                {/* <p>Alojamiento: nombre del alojamiento el cual dio click en reservar Debe aparecer los valores accediendo a sus propiedad .name</p> */}
                {/* <p>Precio del alojamiento: precio del alojamiento el cual dio click en reservar Debe aparecer los valores accediendo a sus propiedad .price</p> */}
                {/* <p>Ubicación: Ubicación del alojamiento el cual dio click en reservar Debe aparecer los valores accediendo a sus propiedad .location</p> */}
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='w-full mt-1'>
                    <label htmlFor="guests" className='block text-sm font-medium text-gray-700'>Número de huéspedes</label>
                    <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='w-full mt-1'>
                    <label htmlFor="startDate" className='block text-sm font-medium text-gray-700'>Data de início</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='w-full mt-1'>
                    <label htmlFor="endDate" className='block text-sm font-medium text-gray-700'>Data de final</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Reservar</button>
            </form>
        </>
    )
}
