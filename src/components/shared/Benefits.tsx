'use client'
import { motion } from 'framer-motion'
import { useDarkModeStore } from '@/store/DarkModeStore'

const benefits = [
  {
    icon: '🛡️',
    title: 'Alojamiento Seguro',
    description: 'Tu alojamiento estará protegido con medidas de seguridad avanzadas'
  },
  {
    icon: '🌍',
    title: 'Red Global',
    description: 'Acceso a propiedades en todo el mundo'
  },
  {
    icon: '📞',
    title: 'Soporte 24/7',
    description: 'Nuestro equipo estará disponible las 24 horas del día'
  },
  {
    icon: '⭐',
    title: 'Calidad Garantizada',
    description: 'Todas las propiedades son examinadas y revisadas por nuestro equipo'
  }
]

export default function BenefitsSection() {
  const { darkMode } = useDarkModeStore();
  return (
    <section className={`py-20 bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-800' : 'from-blue-50 to-indigo-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900' }`}>¿Por qu&eacute; elegirnos?</h2>
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Conoce las ventajas que ofrecemos para que puedas encontrar el alojamiento perfecto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}