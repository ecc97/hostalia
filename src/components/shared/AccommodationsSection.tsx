'use client'
import { Accommodation } from '@/interfaces/IAccomodations'
import { RandomAccommodations } from '@/utils/RandomAccommodations'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useDarkModeStore } from '@/store/DarkModeStore'

type AccommodationsProps = {
  accommodations: Accommodation[]
}

export default function AccommodationsSection({ accommodations }: AccommodationsProps) {
  const { darkMode } = useDarkModeStore();
  if (!accommodations || accommodations.length === 0) {
    return null;
  }
  const randomAccommodations = RandomAccommodations(accommodations)
  return (
    <section className={`py-20 ${darkMode ? 'dark:bg-black/95 text-gray-100' : 'bg-white'}`} id='accommodations-section'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Elija su estancia perfecta</h2>
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Desde villas de lujo a acogedores apartamentos, encuentre el alojamiento que mejor se adapte a su estilo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {randomAccommodations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={`/accommodations/${item.id}`}>
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/400'}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  {/* <div className="absolute top-6 left-6 text-4xl">{item.icon}</div> */}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.location}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}