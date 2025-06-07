import { create } from 'zustand';

interface ModalState {
  showLoginModal: boolean;
  showRegisterModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showLoginModal: false,
  showRegisterModal: false,
  openLoginModal: () => set({ showLoginModal: true, showRegisterModal: false }),
  closeLoginModal: () => set({ showLoginModal: false }),
  openRegisterModal: () => set({ showRegisterModal: true, showLoginModal: false }),
  closeRegisterModal: () => set({ showRegisterModal: false }),
}));
