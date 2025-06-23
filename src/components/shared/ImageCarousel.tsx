"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para navegar a la siguiente imagen con navegación circular
  const nextImage = useCallback(() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length), [images.length]);

  // Función para navegar a la imagen anterior con navegación circular
  const prevImage = useCallback(() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length), [images.length]);

  // Gestionar las teclas de navegación
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextImage();
      else if (event.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [nextImage, prevImage]);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Imagen actual */}
      <div className="relative w-full h-[60vh] mx-auto">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Imagen ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>

      {/* Contador de imágenes */}
      <div className="absolute bottom-4 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-1 px-2 rounded-md mx-auto w-fit">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Imagen anterior"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Siguiente imagen"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}
