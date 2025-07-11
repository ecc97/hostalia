'use client'
import React from 'react'
import { useAuthStore } from '@/store/authStore';
import { useDarkModeStore } from '@/store/DarkModeStore';


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
    const { darkMode } = useDarkModeStore();
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
                <article className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} w-full rounded-lg shadow-lg flex flex-col gap-3 justify-center items-center mb-4 lg:w-1/4`}>
                    <h3 className='text-lg font-bold'>{acccommodationName}</h3>
                    <p className='text-gray-600'>{accommodationLocation}</p>
                    <p className='text-blue-400 font-medium'>${accommodationPrice}</p>
                </article>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='w-full mt-1'>
                    <label htmlFor="guests" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Número de huéspedes</label>
                    <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='w-full mt-1'>
                    <label htmlFor="startDate" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Data de início</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='w-full mt-1'>
                    <label htmlFor="endDate" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Data de final</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>Reservar</button>
            </form>
        </>
    )
}
