'use client';
import { Accommodation } from '@/interfaces/IAccomodations';
import React from 'react'
import HeroSection from './HeroSection';
import PopularDestinations from './Destinations';
import AccommodationsSection from './AccommodationsSection';
import BenefitsSection from './Benefits';
import Footer from './Footer';
import Modal from './Modal';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import { useModalStore } from '@/store/modalStore';
import { useAccommodationsStore } from '@/store/accommodationsStore';
import { useDarkModeStore } from '@/store/DarkModeStore';


export default function HomeTemplate() {
    const { accommodations, error, fetchAccommodations, loading } = useAccommodationsStore();
    const { showLoginModal, closeLoginModal, showRegisterModal, closeRegisterModal } = useModalStore();
    const { darkMode } = useDarkModeStore();

    React.useEffect(() => {
        fetchAccommodations();
    }, [fetchAccommodations]);
    
    const data = accommodations as Accommodation[];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 ${darkMode ? 'border-white' : 'border-gray-900'}`}></div>
            </div>
        );
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
    }
    return (
        <main className="min-h-screen">
            <HeroSection />
            <PopularDestinations />
            <AccommodationsSection accommodations={data} />
            <BenefitsSection />
            <Footer />

            <Modal isOpen={showLoginModal} onClose={closeLoginModal}>
                <FormLogin />
            </Modal>
            <Modal isOpen={showRegisterModal} onClose={closeRegisterModal}>
                <FormRegister />
            </Modal>
        </main>
    )
}
