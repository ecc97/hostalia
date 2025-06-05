import { Accommodation } from "@/interfaces/IAccomodations";

export async function getAccommodations(): Promise<Accommodation[]> {
  try {
    const response = await fetch('/api/accommodations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch accommodations');
    }

    const data: Accommodation[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    throw error;
  }
}

export async function createAccommodation(accommodationData: Omit<Accommodation, 'id'>): Promise<Accommodation> {
  try {
    const response = await fetch('/api/accommodations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accommodationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create accommodation');
    }

    const data: Accommodation = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating accommodation:", error);
    throw error;
  }
}
