'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState('')

  const onSearch = () => {
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      router.push(`/results?q=${encodedQuery}`);
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <motion.div
      className={`bg-white rounded-full shadow-lg max-w-2xl mx-auto ${pathname !== '/' ? 'border border-gray-300 p-1' : 'p-2'}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center">
        <div className="flex-1 px-6 py-4">
          <input
            type="text"
            placeholder="Buscar por nombre, ciudad o pais..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-lg text-gray-700 placeholder-gray-500 bg-transparent outline-none"
            onKeyDown={onKeyDown}
          />
        </div>
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSearch}
        >
          Buscar
        </motion.button>
      </div>
    </motion.div>
  )
}