"use client"
import { Accommodation, AccommodationInput } from '@/interfaces/IAccomodations';
import React, { useState } from 'react'
import ImageUploadBox from '../ui/ImageUpload';

type FormAccommodationProps = {
    createAccommodation: (data: Omit<AccommodationInput, "id">) => Promise<void>;
    closeBookingModal: () => void
};

export default function FormAccommodation({ createAccommodation, closeBookingModal }: FormAccommodationProps) {
    const [newAccommodation, setNewAccommodation] = useState<Omit<Accommodation, "id">>({
        name: "",
        description: "",
        price: 0,
        location: "",
        capacity: 1
    });
    const [images, setImages] = useState<{ file: File | null, preview: string | null }[]>([
        { file: null, preview: null },
        { file: null, preview: null },
        { file: null, preview: null }
    ]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setNewAccommodation((prev) => ({
            ...prev,
            [name]: name === "price" ? (isNaN(Number(value)) ? 0 : Number(value)) : value,
            [name]: name === "capacity" ? parseInt(value) : value
        }));
    };

    const handleImageChange = (index: number, file: File | null) => {
        const newImages = [...images];
        newImages[index].file = file;

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                newImages[index].preview = e.target?.result as string;
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        } else {
            newImages[index].preview = null;
            setImages(newImages);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validImageFiles = images.filter((image) => image.file).map((image) => image.file!);
        await createAccommodation({ ...newAccommodation, price: Number(newAccommodation.price), imageFiles: validImageFiles });
        setNewAccommodation({ name: "", description: "", price: 0, location: "", capacity: 1 });
        setImages([{ file: null, preview: null }, { file: null, preview: null }, { file: null, preview: null }]);
        closeBookingModal();
        alert("Alojamiento creado exitosamente");
    };

    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Alojamiento</h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-2/4'>
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
                        <div>
                            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacidad</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={newAccommodation.capacity}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Imagen de portada *
                            </label>
                            <ImageUploadBox
                                index={0}
                                isMain={true}
                                preview={images[0].preview}
                                onImageChange={(file) => handleImageChange(0, file)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Agregar más imágenes (opcional)
                            </label>
                            <div className="flex gap-4">
                                <ImageUploadBox
                                    index={1}
                                    preview={images[1].preview}
                                    onImageChange={(file) => handleImageChange(1, file)}
                                />
                                <ImageUploadBox
                                    index={2}
                                    preview={images[2].preview}
                                    onImageChange={(file) => handleImageChange(2, file)}
                                />
                            </div>
                        </div>
                    </div>
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
