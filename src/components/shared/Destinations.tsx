'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const destinations = [
  { name: 'Barcelona', image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg', color: 'from-orange-400 to-red-500' },
  { name: 'Paris', image: 'https://images.pexels.com/photos/32394257/pexels-photo-32394257.jpeg', color: 'from-purple-400 to-pink-500' },
  { name: 'Rome', image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg', color: 'from-yellow-400 to-orange-500' },
  { name: 'London', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg', color: 'from-blue-400 to-indigo-500' },
]

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Popular destinations</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
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
                {/* <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} /> */}
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