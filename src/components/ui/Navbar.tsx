'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useModalStore } from '@/store/modalStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { LuArrowRightFromLine } from 'react-icons/lu';
import { useAsideStore } from '@/store/asideStore';
import { usePathname } from 'next/navigation';
import { ListPath } from '@/utils/ListPath';
import { CiDark, CiLight, CiLogin } from 'react-icons/ci';
import { FaUserPlus } from "react-icons/fa";
import { useDarkModeStore } from '@/store/DarkModeStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();
  const { openLoginModal, openRegisterModal } = useModalStore();
  const { isOpen, openAside } = useAsideStore();
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const router = useRouter();
  const pathname = usePathname();
  const pathnameList = ListPath();

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

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }


  return (
    <motion.nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled || isAuthenticated || pathname !== '/' ? `${darkMode ? 'bg-blue-950 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-lg'}` : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <div className="flex items-center">
            {!isOpen && (
              <button className={`${!isAuthenticated || pathnameList.includes(pathname) ? 'hidden' : 'rounded-full p-1 hover:bg-gray-400 duration-300 cursor-pointer'}`} onClick={openAside} title="Abrir menú">
                <LuArrowRightFromLine size={22} />
              </button>
            )}
            <Link href="/" className={`text-2xl font-bold hover:text-blue-200 transition-colors ${isScrolled || isAuthenticated || pathname !== '/' ? `${darkMode ? 'text-white' : 'text-black'}` : 'text-white'}`}>
              🏠 Hostalia
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {pathname === '/' && (
              <Link href="#accommodations-section" className={`hover:text-blue-200 transition-colors ${isScrolled || isAuthenticated || pathname !== '/' ? `${darkMode ? 'text-white' : 'text-black'}` : 'text-white'}`}>
                Explorar
              </Link>
            )}
            {isAuthenticated && (
              <Link href='/dashboard' className={`hover:text-blue-200 transition-colors ${isScrolled || isAuthenticated ? `${darkMode ? 'text-white' : 'text-black'}` : 'text-white'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center ml-auto space-x-4">
              <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>{user?.fullName || user?.email}</span>
              <button onClick={handleLogout} className={`text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700`}>
                Cerrar sesión
              </button>
            </div>
          ) : null}

          {/* Login/Register Buttons */}
          {!isAuthenticated && (
            <div className="flex items-center ml-auto space-x-4">
              <button onClick={openLoginModal} className={`text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg hover:bg-white/10 ${isScrolled || pathname !== '/' ? 'bg-blue-500 hover:bg-blue-700' : ''}`}>
                <CiLogin size={22} className='md:hidden' />
                <span className="hidden md:block">Iniciar sesión</span>
              </button>
              <button onClick={openRegisterModal} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                <FaUserPlus size={22} className='md:hidden' />
                <span className="hidden md:block">Registrarme</span>
              </button>
            </div>
          )}
          <button onClick={toggleDarkMode} className="text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700">
            {darkMode ? <CiLight size={22} /> : <CiDark size={22} />}
          </button>
          {/* <div className="flex items-center ml-auto space-x-4">
            <button onClick={openLoginModal} className={`text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg hover:bg-white/10 ${isScrolled ? 'bg-blue-500 hover:bg-blue-700' : ''}`}>
              Login
            </button>
            <button onClick={openRegisterModal} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Register
            </button>
          </div> */}
        </div>
      </div>
    </motion.nav>
  );
}
