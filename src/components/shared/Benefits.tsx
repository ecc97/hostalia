'use client'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: '🛡️',
    title: 'Secure Booking',
    description: 'Your payments and personal information are always protected'
  },
  {
    icon: '🌍',
    title: 'Global Network',
    description: 'Access to thousands of verified properties worldwide'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Round-the-clock customer service in multiple languages'
  },
  {
    icon: '⭐',
    title: 'Quality Guarantee',
    description: 'All properties are vetted and reviewed by our team'
  }
]

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why choose Hostalia?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make travel planning simple, secure, and unforgettable
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