import { create } from "zustand";
import { getAccommodations, createAccommodation } from "@/actions/accommodations";
import { Accommodation } from "@/interfaces/IAccomodations";

interface AccommodationsState {
  accommodations: Accommodation[];
  loading: boolean;
  error?: string;
  fetchAccommodations: () => Promise<void>;
  createAccommodation: (data: Omit<Accommodation, 'id'>) => Promise<void>;
}

export const useAccommodationsStore = create<AccommodationsState>((set, get) => ({
  accommodations: [],
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