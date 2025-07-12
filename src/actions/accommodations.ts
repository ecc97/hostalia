import { Accommodation, AccommodationInput, AccommodationResponse } from "@/interfaces/IAccomodations";
import { databases, storage } from "@/lib/appwrite";
import { ID, Query } from "appwrite";

const DATABASE_ID = '683a05ed00135a25f39e';
const ACCOMMODATIONS_COLLECTION_ID = '683a0e8500034105f2b2';

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

export async function getAccommodationsByPage(page: number, limit: number): Promise<AccommodationResponse> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      ACCOMMODATIONS_COLLECTION_ID,
      [Query.limit(limit), Query.offset((page - 1) * limit)]
    );

    const accommodations = response.documents.map((accommodation) => ({
      id: accommodation.$id,
      name: accommodation.name,
      description: accommodation.description,
      price: accommodation.price,
      location: accommodation.location,
      images: accommodation.images || [],
      capacity: accommodation.capacity || 1,
      rating: accommodation.rating || 0,
      createdAt: accommodation.$createdAt,
      updatedAt: accommodation.$updatedAt,
    }))

    return {
      accommodations,
      total: response.total,
      page,
      limit,
      totalPages: Math.ceil(response.total / limit),
      hasMore: response.total > page * limit,
    }
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    throw error;
  }
}

export async function getAccommodationBySearch(query: string, page: number, limit: number): Promise<AccommodationResponse> {
  try {
    if (!query || !query.trim()) {
      throw new Error('Query parameter is required');
    }

    const offset = (page - 1) * limit;

    const response = await databases.listDocuments(
      DATABASE_ID,
      ACCOMMODATIONS_COLLECTION_ID,
      [
        Query.or([
          Query.search('name', query.trim()),
          Query.search('location', query.trim()),
        ]),
        Query.limit(limit),
        Query.offset(offset),
      ]
    );

    const accommodations: Accommodation[] = response.documents.map((accommodation) => ({
      id: accommodation.$id,
      name: accommodation.name,
      description: accommodation.description,
      price: accommodation.price,
      location: accommodation.location,
      images: accommodation.images || [],
      capacity: accommodation.capacity || 1,
      rating: accommodation.rating || 0,
      createdAt: accommodation.$createdAt,
      updatedAt: accommodation.$updatedAt,
    }));

    const total = response.total;
    const totalPages = Math.ceil(total / limit);
    const hasMore = total > page * limit;

    return {
      accommodations,
      total,
      page,
      limit,
      totalPages,
      hasMore
    };
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    throw error;
  }
}

export async function getAccommodation(id: string): Promise<Accommodation> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/accommodations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch accommodation');
    }

    const data: Accommodation = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    throw error;
  }
}

export async function createAccommodation(accommodationData: AccommodationInput): Promise<Accommodation> {
  try {
    let images: string[] = [];

    if (accommodationData.imageFiles && accommodationData.imageFiles.length > 0) {
      const uploadFiles = accommodationData.imageFiles.map(async (imageFile) => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

