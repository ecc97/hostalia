import { create } from "zustand";
import { getAccommodations } from "@/actions/accommodations";
import { Accommodation } from "@/interfaces/IAccomodations";

interface AccommodationsState {
  accommodations: Accommodation[];
  loading: boolean;
  error?: string;
  fetchAccommodations: () => Promise<void>;
}

export const useAccommodationsStore = create<AccommodationsState>((set) => ({
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
}));