'use client'
import React from 'react'
import { useAuthStore } from '@/store/authStore';
import { useAccommodationsStore } from '@/store/accommodationsStore';
import { useEffect } from 'react';
import Link from 'next/link';

interface DashboardTemplateProps {
    bookingsLength: number
}

export default function DashboardTemplate({ bookingsLength }: DashboardTemplateProps) {
    const { user } = useAuthStore();
    const { accommodations, fetchAccommodations } = useAccommodationsStore();

    useEffect(() => {
        fetchAccommodations();
    }, [fetchAccommodations]);

    if (!user) return null;


    return (
        <main className='container mx-auto p-8 mt-16'>
            <h1 className='text-2xl font-bold mb-4'>Bienvenido, {user?.fullName || user?.email}</h1>
            <section className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-semibold mb-2'>Dashboard</h2>
                <p className='text-gray-600 mb-2'>Aquí podrás ver tus datos y realizar acciones específicas.</p>
                <article className='bg-gray-100 p-5 rounded-lg shadow-md w-full'>
                    <h3 className='text-lg font-semibold mt-4'>Información Personal</h3>
                    <p className='text-gray-600'>Nombre: {user?.fullName}</p>
                    <p className='text-gray-600'>Correo electr&oacute;nico: {user?.email}</p>
                </article>
                <Link href="/dashboard/accommodations" className='block'>
                    <article className='bg-gray-100 p-5 flex justify-between items-center rounded-lg shadow-md w-full mt-4 hover:translate-y-[-3px] duration-300 transition-all'>
                        <div className='flex flex-col'>
                            <h2 className='text-lg font-semibold mt-4'>Alojamientos</h2>
                            <p className='text-gray-600'>Gestiona tus alojamientos publicados.</p>
                        </div>
                        <div className='flex items-center'>
                            {accommodations.length > 0 && <p className='text-gray-600 font-bold text-2xl'>{accommodations.length}</p>}
                        </div>
                    </article>
                </Link>
                <Link href="/dashboard/bookings" className='block'>
                    <article className='bg-gray-100 p-5 flex justify-between items-center rounded-lg shadow-md w-full mt-4 hover:translate-y-[-3px] duration-300 transition-all'>
                        <div className='flex flex-col'>
                            <h2 className='text-lg font-semibold mt-4'>Reservas</h2>
                            <p className='text-gray-600'>Consulta y administra tus reservas.</p>
                        </div>
                        <div className='flex items-center'>
                            {bookingsLength > 0 && <p className='text-gray-600 font-bold text-2xl'>{bookingsLength}</p>}
                        </div>
                    </article>
                </Link>
            </section>
            <p className='text-gray-600 mt-4'>Usa el menú lateral para navegar entre las secciones del dashboard.</p>
        </main>
    )
}
