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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore(); 
  const { openLoginModal, openRegisterModal } = useModalStore(); 
  const { isOpen, openAside } = useAsideStore();
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
        ${isScrolled || isAuthenticated || pathname !== '/' ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <div className="flex items-center">
            {!isOpen &&  (
              <button className={`${!isAuthenticated || !pathnameList.includes(pathname) ? 'hidden' : 'rounded-full p-1 hover:bg-gray-400 duration-300 cursor-pointer' }`} onClick={openAside} title="Abrir menú">
                <LuArrowRightFromLine size={22} />
              </button>
            )}
            <Link href="/" className={`text-2xl font-bold hover:text-blue-200 transition-colors ${isScrolled || isAuthenticated || pathname !== '/' ? 'text-black' : 'text-white'}`}>
              🏠 Hostalia
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className={`hover:text-blue-200 transition-colors ${isScrolled || isAuthenticated || pathname !== '/' ? 'text-black' : 'text-white'}`}>
              Explore
            </Link>
            {isAuthenticated && (
              <Link href='/dashboard' className={`hover:text-blue-200 transition-colors ${isScrolled || isAuthenticated ? 'text-black' : 'text-white'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          { isAuthenticated ? (
            <div className="flex items-center ml-auto space-x-4">
              <span className={`text-lg font-semibold`}>{user?.fullName || user?.email}</span>
              <button onClick={handleLogout} className={`text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700`}>
                Logout
              </button>
            </div>
          ) : null}

          {/* Login/Register Buttons */}
          {!isAuthenticated && (
            <div className="flex items-center ml-auto space-x-4">
              <button onClick={openLoginModal} className={`text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg hover:bg-white/10 ${isScrolled || pathname !== '/' ? 'bg-blue-500 hover:bg-blue-700' : ''}`}>
                Login
              </button>
              <button onClick={openRegisterModal} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Register
              </button>
            </div>
          )}
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
