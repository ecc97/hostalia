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


export default function HomeTemplate() {
    const { accommodations, error, fetchAccommodations, loading } = useAccommodationsStore();
    const { showLoginModal, closeLoginModal, showRegisterModal, closeRegisterModal } = useModalStore();

    React.useEffect(() => {
        fetchAccommodations();
    }, [fetchAccommodations]);
    
    const data = accommodations as Accommodation[];

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    }
    return (
        <main className="min-h-screen">
            <HeroSection />
            <PopularDestinations />
            <AccommodationsSection accommodations={data} />
            <BenefitsSection />
            <p className="bg-red-500">Hola a todos</p>
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
