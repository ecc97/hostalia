"use client";

import React, { useEffect, useState } from "react";
import { getAccommodations, createAccommodation } from "@/lib/accommodations";
import { Accommodation } from "@/interfaces/IAccomodations";

export default function AccomodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAccommodation, setNewAccommodation] = useState({
    name: "",
    description: "",
    price: 0,
    location: "",
  });

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getAccommodations();
        setAccommodations(data);
        console.log("Alojamientos cargados:", data.map(acc => acc.id)); // Para depuración
      } catch (err: any) {
        setError(err.message || "Failed to fetch accommodations");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAccommodation((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createAccommodation(newAccommodation);
      setAccommodations((prev) => {
        const updatedAccommodations = [...prev, created];
        console.log("Nuevo alojamiento creado y lista actualizada:", updatedAccommodations.map(acc => acc.id)); // Para depuración
        return updatedAccommodations;
      });
      setNewAccommodation({ name: "", description: "", price: 0, location: "" });
    } catch (err: any) {
      setError(err.message || "Failed to create accommodation");
    }
  };

  if (loading) {
    return <div className="p-8">Cargando alojamientos...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Alojamientos</h1>

      <div className="mb-8">
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
      </div>

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
