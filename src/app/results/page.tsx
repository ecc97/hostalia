import AccommodationListSearch from '@/components/shared/AccommodationListSearch';
import Pagination from '@/components/ui/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import { Accommodation, AccommodationResponse } from '@/interfaces/IAccomodations';
import React from 'react'

type Props = {
    searchParams: Promise<{
        q?: string
        page?: string
        limit?: string
    }>
}

export default async function ResultsPage({ searchParams }: Props) {
    const params = await searchParams;
    const searchQuery = params.q;
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 10;


    if (!searchQuery) {
        return (
            <div className="container mx-auto px-4 py-8 mt-16">
                <h1 className="text-2xl font-bold text-gray-800">
                    No se proporciona ninguna consulta de búsqueda.
                </h1>
            </div>
        );
    }

    try {
        // const result = await getAccommodationBySearch(searchQuery, page, limit);
        // const accommodations = result.accommodations;
        // console.log(accommodations);
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/accommodations/search?q=${searchQuery}&page=${page}&limit=${limit}`);
        const result: AccommodationResponse = await response.json();
        const accommodations: Accommodation[] = result.accommodations;

        return (
            <main className="container mx-auto px-4 py-8 mt-16">
                <SearchBar />
                <h1 className="text-2xl font-bold my-6">
                    Resultados para: &quot;{searchQuery}&quot;
                </h1>

                {accommodations.length > 0 ? (
                    <AccommodationListSearch accommodations={accommodations} />
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-xl">
                            No se encontraron alojamientos para &quot;{searchQuery}&quot;
                        </h2>
                    </div>
                )}
                {accommodations.length > 0 && (
                    <Pagination dataAccommodations={result} />
                )}
            </main>
        );
    } catch (error) {
        console.error("Error loading results:", error);
        return (
            <div className="container mx-auto px-4 py-8 mt-16">
                <h1 className="text-2xl font-bold text-red-600">
                    Error al cargar los resultados
                </h1>
                <p className="text-gray-600 mt-2">
                    Por favor, inténtelo más tarde.
                </p>
            </div>
        );
    }
}