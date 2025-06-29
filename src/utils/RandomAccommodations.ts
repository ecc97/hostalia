import { Accommodation } from "@/interfaces/IAccomodations";
import { useMemo } from "react";

export function RandomAccommodations(data: Accommodation[]) {
    const accommodations = data;
    const randomAccommodations = useMemo(() => {
        const shuffledAccommodations = [...accommodations].sort(() => Math.random() - 0.5);
        return shuffledAccommodations.slice(0, 4);
    }, [accommodations])

    return randomAccommodations
}

