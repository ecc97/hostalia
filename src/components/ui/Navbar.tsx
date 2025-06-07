'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useModalStore } from '@/store/modalStore'; // Importar el store de Zustand

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openLoginModal, openRegisterModal } = useModalStore(); // Usar el store de Zustand

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className={`text-2xl font-bold hover:text-blue-200 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
              🏠 Hostalia
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className={`hover:text-blue-200 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
              Explore
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center ml-auto space-x-4">
            <button onClick={openLoginModal} className={`text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg hover:bg-white/10 ${isScrolled ? 'bg-blue-500 hover:bg-blue-700' : ''}`}>
              Login
            </button>
            <button onClick={openRegisterModal} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Register
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
