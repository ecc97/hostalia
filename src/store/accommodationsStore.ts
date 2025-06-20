import { create } from "zustand";
import { getAccommodations, createAccommodation, getAccommodation } from "@/actions/accommodations";
import { Accommodation, AccommodationInput } from "@/interfaces/IAccomodations";

interface AccommodationsState {
  accommodations: Accommodation[];
  currentAccommodation: Accommodation | null;
  loading: boolean;
  error?: string;
  fetchAccommodations: () => Promise<void>;
  fetchAccommodation: (id: string) => Promise<void>;
  createAccommodation: (data: Omit<AccommodationInput, 'id'>) => Promise<void>;
}

export const useAccommodationsStore = create<AccommodationsState>((set, get) => ({
  accommodations: [],
  currentAccommodation: null,
  loading: false,
  error: undefined,
  fetchAccommodations: async () => {
    try {
      set({ loading: true });
      const accommodations = await getAccommodations();
      set({ accommodations, loading: false });
    } catch (error) {
      set({ error: "Error fetching accommodations", loading: false });
    }
  },
  fetchAccommodation: async (id: string) => {
    try {
      set({ loading: true, error: undefined });
      const accommodation = await getAccommodation(id);
      // set({ accommodations: [...get().accommodations.map((a) => a.id === id ? accommodation : a), accommodation], loading: false });
      set({currentAccommodation: accommodation, loading: false});
    } catch (error) {
      set({ error: "Error fetching accommodation", loading: false });
    }
  },
  createAccommodation: async (data) => {
    try {
      set({ loading: true });
      const created = await createAccommodation(data);
      set({ accommodations: [...get().accommodations, created], loading: false });
    } catch (error) {
      set({ error: "Error creating accommodation", loading: false });
    }
  },
}));