import { create } from 'zustand';

interface ModalState {
  showLoginModal: boolean;
  showRegisterModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  showBookingModal?: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showLoginModal: false,
  showRegisterModal: false,
  openLoginModal: () => set({ showLoginModal: true, showRegisterModal: false }),
  closeLoginModal: () => set({ showLoginModal: false }),
  openRegisterModal: () => set({ showRegisterModal: true, showLoginModal: false }),
  closeRegisterModal: () => set({ showRegisterModal: false }),
  showBookingModal: false,
  openBookingModal: () => set({ showBookingModal: true }),
  closeBookingModal: () => set({ showBookingModal: false }),
}));
