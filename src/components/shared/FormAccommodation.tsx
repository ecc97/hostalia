"use client"
import { Accommodation } from '@/interfaces/IAccomodations';
import React, { useState } from 'react'

type FormAccommodationProps = {
    createAccommodation: (data: Omit<Accommodation, "id">) => Promise<void>;
    closeBookingModal: () => void
};

export default function FormAccommodation({ createAccommodation, closeBookingModal }: FormAccommodationProps) {
    const [newAccommodation, setNewAccommodation] = useState<Omit<Accommodation, "id">>({
        name: "",
        description: "",
        price: 0,
        location: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewAccommodation((prev) => ({
            ...prev,
            [name]: name === "price" ? (value as unknown as number) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createAccommodation(newAccommodation);
        setNewAccommodation({ name: "", description: "", price: 0, location: "" });
        closeBookingModal();
        alert("Alojamiento creado exitosamente");
    };
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Alojamiento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newAccommodation.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newAccommodation.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newAccommodation.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={newAccommodation.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Crear Alojamiento
                </button>
            </form>
        </>
    )
}
