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

interface HomeProps {
    data: Accommodation[]
}

export default function HomeTemplate({ data }: HomeProps) {
    const { showLoginModal, closeLoginModal, showRegisterModal, closeRegisterModal } = useModalStore();
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
