'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <motion.div
      className="bg-white rounded-full p-2 shadow-2xl max-w-2xl mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center">
        <div className="flex-1 px-6 py-4">
          <input
            type="text"
            placeholder="Where to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-lg text-gray-700 placeholder-gray-500 bg-transparent outline-none"
          />
        </div>
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>
    </motion.div>
  )
}