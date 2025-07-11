import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DarkModeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeStore>()(
    persist((set, get) => ({
        darkMode: false,
        toggleDarkMode: () => set({ darkMode: !get().darkMode }),
    })
    ,
    {
        name: "dark-mode-store",
    }
    )
);

