"use client"
import { AccommodationResponse } from '@/interfaces/IAccomodations'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    dataAccommodations?: AccommodationResponse
}

export default function Pagination({ dataAccommodations }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    };

    const currentPage = dataAccommodations?.page;
    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button onClick={() => onPageChange(currentPage! - 1)} disabled={currentPage === 1} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">Anterior</button>
            <span>Página {currentPage || 1} / {dataAccommodations?.totalPages || 1}</span>
            <button onClick={() => onPageChange(currentPage! + 1)} disabled={currentPage === dataAccommodations?.totalPages} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">Siguiente</button>
        </div>
    )
}
