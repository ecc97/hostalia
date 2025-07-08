"use client"
import React from 'react'
import FormReserves from '@/components/shared/FormReserves'
import { useSearchParams } from 'next/navigation'

export default function CreateBookingPage() {
    const searchParams = useSearchParams();
    const accommodationId = searchParams.get('accommodationId') || '';
    const name = searchParams.get('name') || '';
    const price = searchParams.get('price') || '';
    const location = searchParams.get('location') || '';


    return (
        <main className='container flex flex-col justify-center mx-auto p-4 mt-16 min-h-screen'>
            <FormReserves accommodationId={accommodationId!} acccommodationName={name} accommodationPrice={price} accommodationLocation={location} />
        </main>
    )
}
