"use client"
import { useAccommodationsStore } from '@/store/accommodationsStore';
import { useModalStore } from '@/store/modalStore';
import React, { useEffect } from 'react'
import Modal from './Modal';
import FormAccommodation from './FormAccommodation';
import Image from 'next/image';
import Link from 'next/link';
import { AccommodationResponse } from '@/interfaces/IAccomodations';
import Pagination from '../ui/Pagination';

interface AccommodationsTemplateProps {
    data: AccommodationResponse;
}

export default function AccommodationsTemplate({ data }: AccommodationsTemplateProps) {
    const {
        accommodations,
        loading,
        error,
        fetchAccommodations,
        createAccommodation,
    } = useAccommodationsStore();
    const { showBookingModal, openBookingModal, closeBookingModal } = useModalStore();

    useEffect(() => {
        fetchAccommodations();
        // eslint-disable-next-line
    }, []);


    if (loading) {
        return <div className="p-8">Cargando alojamientos...</div>;
    }
    if (error) {
        return <div className="p-8 text-red-500">Error: {error}</div>;
    }
    return (
        <div className="p-8 mt-16">
            <h1 className="text-3xl font-bold mb-6">Alojamientos</h1>
            <div className="mb-8 flex justify-end">
                <button
                    onClick={openBookingModal}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Crear Nuevo Alojamiento
                </button>
            </div>
            <Modal isOpen={showBookingModal!} onClose={closeBookingModal} isLg={true}>
                <FormAccommodation createAccommodation={createAccommodation} closeBookingModal={closeBookingModal} />
            </Modal>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Lista de Alojamientos</h2>
                {accommodations.length === 0 ? (
                    <p>No hay alojamientos disponibles.</p>
                ) : (
                    <ul className="card-accommodation ">
                        {data.accommodations.map((accommodation) => (
                            <li key={accommodation.id} className="p-4 border border-gray-200 rounded-md shadow-sm">
                                <Link href={`/dashboard/accommodations/${accommodation.id}`} >
                                    <div className="mb-4">
                                        <Image
                                            src={accommodation.images && accommodation.images.length > 0 ? accommodation.images[0] : "https://via.placeholder.com/150"}
                                            alt={`Imagen de ${accommodation.name}`}
                                            width={150}
                                            height={150}
                                            className="rounded-md object-cover w-full h-48"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold">{accommodation.name}</h3>
                                    <p className="text-gray-600">{accommodation.description}</p>
                                    <p className="text-lg font-semibold mt-2">${accommodation.price}</p>
                                    <p className="text-sm text-gray-500">Ubicación: {accommodation.location}</p>
                                    {accommodation.rating !== undefined && accommodation.rating > 0 && (
                                        <p className="text-sm text-gray-500">Calificación: {accommodation.rating}</p>
                                    )}
                                    {accommodation.capacity && (
                                        <p className="text-sm text-gray-500">Capacidad: {accommodation.capacity} personas</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-2">Creado el: {new Date(accommodation.createdAt || '').toLocaleDateString()}</p>
                                    {accommodation.updatedAt && (
                                        <p className="text-xs text-gray-400">Actualizado el: {new Date(accommodation.updatedAt || '').toLocaleDateString()}</p>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {/* botones de paginacion */}
                <Pagination dataAccommodations={data}/>
            </div>
        </div>
    )
}
