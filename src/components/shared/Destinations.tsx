'use client'
import { Destination, randomDestinations } from '@/utils/ListDestinations';
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDarkModeStore } from '@/store/DarkModeStore';


export default function PopularDestinations() {
  const [popularDestinations, setPopularDestinations] = useState<Destination[]>([]);
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    setPopularDestinations(randomDestinations());
  }, []);

  return (
    <section className={`py-20 ${darkMode ? 'dark:bg-black/95 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Destinos populares</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}