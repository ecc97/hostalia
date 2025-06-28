"use client"
import { Accommodation } from '@/interfaces/IAccomodations'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = { accommodations: Accommodation[] }

export default function AccommodationListSearch({ accommodations }: Props) {
    return (
        <section className='flex flex-col gap-4 min-h-screen'>
            <div className="grid gap-8 grid-cols-1 w-full">
                {accommodations.map((accommodation) => (
                    <Link href={`/accommodations/${accommodation.id}`} key={accommodation.id}>
                        <div key={accommodation.id} className="bg-white rounded-lg shadow-md p-6 flex">
                            <article className='mr-4 flex-1/2'>
                                <Image
                                    src={accommodation.images && accommodation.images[0] ? accommodation.images[0] : ''}
                                    alt={accommodation.name}
                                    width={150}
                                    height={150}
                                    className="w-full object-contain rounded-lg h-48"
                                />
                            </article>
                            <article className='flex-1/2'>
                                <h3 className="font-semibold text-lg mb-2">{accommodation.name}</h3>
                                <p className="text-gray-600 mb-2">{accommodation.location}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-blue-600">
                                        ${accommodation.price}
                                    </span>
                                    {/* <span className="text-sm text-gray-500">
                                    ⭐ {accommodation.rating}
                                </span> */}
                                </div>
                            </article>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
