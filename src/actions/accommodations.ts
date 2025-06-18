import { Accommodation, AccommodationInput } from "@/interfaces/IAccomodations";
import { storage } from "@/lib/appwrite";
import { ID } from "appwrite";


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

export async function createAccommodation(accommodationData: AccommodationInput): Promise<Accommodation> {
  try {
    let images: string[] = [];

    if (accommodationData.imageFiles && accommodationData.imageFiles.length > 0) {
      const uploadFiles = accommodationData.imageFiles.map(async(imageFile) => {
        const file = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          imageFile
        );
        
        return storage.getFileView(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          file.$id
        );
        
      }) 
      images = await Promise.all(uploadFiles);
    }

    const { imageFiles, ...doc } = accommodationData;
    const dataToSend = { ...doc, images };

    const response = await fetch('/api/accommodations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), 
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

