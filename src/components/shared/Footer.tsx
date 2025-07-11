'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">🏠 Hostalia</h3>
            <p className="text-gray-400 mb-6">
              Descubra lugares únicos para alojarse en todo el mundo con confianza y facilidad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">📘</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">📷</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">🐦</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Carreras</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Confianza y Seguridad</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terminos y Condiciones</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Suscribete para recibir actualizaciones y ofertas exclusivas.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                Suscribirse
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Hostalia. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}