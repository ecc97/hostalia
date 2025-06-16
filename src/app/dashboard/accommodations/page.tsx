"use client";

import React, { useEffect, useState } from "react";
import { useAccommodationsStore } from "@/store/accommodationsStore";
import { useModalStore } from "@/store/modalStore";
import Modal from "@/components/shared/Modal";
import { Accommodation } from "@/interfaces/IAccomodations";
import FormAccommodation from "@/components/shared/FormAccommodation";

export default function AccomodationsPage() {
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
      <Modal isOpen={showBookingModal!} onClose={closeBookingModal}>
        <FormAccommodation createAccommodation={createAccommodation} closeBookingModal={closeBookingModal}/>
      </Modal>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de Alojamientos</h2>
        {accommodations.length === 0 ? (
          <p>No hay alojamientos disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {accommodations.map((accommodation) => (
              <li key={accommodation.id} className="p-4 border border-gray-200 rounded-md shadow-sm">
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
                {accommodation.images && accommodation.images.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Imágenes:</h4>
                    <div className="flex space-x-2 mt-1">
                      {accommodation.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Imagen ${index + 1} de ${accommodation.name}`}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">Creado el: {new Date(accommodation.createdAt || '').toLocaleDateString()}</p>
                {accommodation.updatedAt && (
                  <p className="text-xs text-gray-400">Actualizado el: {new Date(accommodation.updatedAt || '').toLocaleDateString()}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
