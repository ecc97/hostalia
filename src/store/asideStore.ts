import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AsideState {
  isOpen: boolean;
  openAside: () => void;
  closeAside: () => void;
  toggleAside: () => void;
}

export const useAsideStore = create<AsideState>()(
  persist(
    (set, get) => ({
      isOpen: true,
      openAside: () => set({ isOpen: true }),
      closeAside: () => set({ isOpen: false }),
      toggleAside: () => set({ isOpen: !get().isOpen }),
    }),
    { name: 'aside-store' }
  )
);
