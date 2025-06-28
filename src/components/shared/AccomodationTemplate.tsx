"use client";
import React, { useEffect, useState } from 'react'
import { Accommodation } from '@/interfaces/IAccomodations';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useAccommodationsStore } from '@/store/accommodationsStore';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import { useParams } from 'next/navigation';
import Modal from './Modal';
import ImageCarousel from './ImageCarousel';

export default function AccommodationTemplate() {
    const params = useParams();
    const accommodationId = params.id as string;

    const { currentAccommodation, loading, error, fetchAccommodation} = useAccommodationsStore();
    const { isAuthenticated } = useAuthStore();
    const data = currentAccommodation as Accommodation;
    
    // Estado para controlar la apertura/cierre del modal
    // const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const { showImagesModal, openImagesModal, closeImagesModal } = useModalStore();

    useEffect(() => {
        if (accommodationId) {
            fetchAccommodation(accommodationId);
        }

    }, [accommodationId, fetchAccommodation]);

    // Función para abrir el modal de imágenes
    // const openImageModal = () => {
    //     if (data?.images && data.images.length > 0) {
    //         openImagesModal();
    //     }
    // };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 mt-16">
                <div className="text-red-500 text-center">
                    <p>Error: {error}</p>
                    <Link
                        href="/dashboard/accommodations"
                        className="text-indigo-600 hover:text-indigo-800 underline mt-2 inline-block"
                    >
                        Volver a la lista
                    </Link>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="p-8 mt-16">
                <div className="text-center">
                    <p>Alojamiento no encontrado</p>
                    <Link
                        href="/dashboard/accommodations"
                        className="text-indigo-600 hover:text-indigo-800 underline mt-2 inline-block"
                    >
                        Volver a la lista
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col justify-center h-screen p-8 md:px-0 md:py-8 mt-16 max-w-4xl mx-auto">
            {/* Header con botón de regreso */}
            <div className="mb-6">
                {isAuthenticated ? (
                    <Link
                        href="/dashboard/accommodations"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
                    >
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Volver a alojamientos
                    </Link>
                ) : (
                    <Link
                        href="/"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
                    >
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Volver a inicio
                    </Link>
                )}
                <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sección de imágenes */}
                <div>
                    {data.images && data.images.length > 0 ? (
                        <div className="space-y-4">
                            {/* Imagen principal - ahora con evento de clic */}
                            <div className="relative cursor-pointer" onClick={() => openImagesModal()}>
                                <Image
                                    src={data.images[0]}
                                    alt={`Imagen principal de ${data.name}`}
                                    width={600}
                                    height={400}
                                    className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
                                />
                                <div className="absolute inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                    <span className="text-white font-semibold text-sm py-2 px-4 rounded-md">
                                        Ver todas las imágenes
                                    </span>
                                </div>
                            </div>

                            {/* Imágenes adicionales - ahora con evento de clic */}
                            {data.images.length > 1 && (
                                <div className="grid grid-cols-2 gap-2">
                                    {data.images.slice(1).map((image, index) => (
                                        <div 
                                            key={index + 1} 
                                            className="relative cursor-pointer" 
                                            onClick={openImagesModal}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Imagen ${index + 2} de ${data.name}`}
                                                width={300}
                                                height={200}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <div className="absolute inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                <span className="text-white font-semibold text-xs  py-1 px-2 rounded-md">
                                                    Ver todas
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-gray-200 h-64 sm:h-80 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Sin imágenes disponibles</span>
                        </div>
                    )}
                </div>

                {/* Información del alojamiento */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Información</h2>
                        <div className="space-y-3">
                            <div>
                                <span className="font-medium text-gray-700">Precio:</span>
                                <span className="ml-2 text-2xl font-bold text-green-600">${data.price}</span>
                            </div>

                            <div>
                                <span className="font-medium text-gray-700">Ubicación:</span>
                                <span className="ml-2 text-gray-600">{data.location}</span>
                            </div>

                            {data.capacity && (
                                <div>
                                    <span className="font-medium text-gray-700">Capacidad:</span>
                                    <span className="ml-2 text-gray-600">{data.capacity} personas</span>
                                </div>
                            )}

                            {data.rating !== undefined && data.rating > 0 && (
                                <div>
                                    <span className="font-medium text-gray-700">Calificación:</span>
                                    <span className="ml-2 text-gray-600">{data.rating}/5</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Descripción</h2>
                        <p className="text-gray-600 leading-relaxed">{data.description}</p>
                    </div>

                    {/* Información adicional */}
                    <div className="pt-4 border-t border-gray-200">
                        {isAuthenticated && (
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>Creado el: {new Date(data.createdAt || '').toLocaleDateString()}</p>
                                {data.updatedAt && (
                                    <p>Actualizado el: {new Date(data.updatedAt || '').toLocaleDateString()}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-3 pt-4">
                        <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
                            Reservar
                        </button>
                        {isAuthenticated && (
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                                Editar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal para el carrusel de imágenes */}
            <Modal 
                isOpen={showImagesModal!} 
                onClose={closeImagesModal}
                isLg={true}
            >
                <div className="p-2">
                    <h3 className="text-xl font-bold mb-4">Galería de imágenes</h3>
                    <ImageCarousel 
                        images={data.images || []} 
                        alt={data.name}
                    />
                </div>
            </Modal>
        </div>
    )
}
