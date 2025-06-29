import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";

export async function GET() {
  try {
    const response = await databases.listDocuments(
      '683a05ed00135a25f39e',
      '683a0e8500034105f2b2',
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
    }));
    return NextResponse.json(accommodations);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json({ error: "Failed to fetch accommodations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Datos recibidos en la API para crear alojamiento:", data); // Añadido para depuración
    const response = await databases.createDocument(
      '683a05ed00135a25f39e',
      '683a0e8500034105f2b2',
      ID.unique(),
      data
    );
    // Mapear el $id de Appwrite a 'id' para consistencia con el frontend
    const createdAccommodation = {
      id: response.$id,
      name: response.name,
      description: response.description,
      price: response.price,
      location: response.location,
      images: response.images || [],
      capacity: response.capacity || 1,
      rating: response.rating || 0,
      createdAt: response.$createdAt, 
      updatedAt: response.$updatedAt, 
    };
    return NextResponse.json(createdAccommodation);
  } catch (error) {
    console.error("Error creating accommodation:", error);
    return NextResponse.json({ error: "Failed to create accommodation" }, { status: 500 });
  }
}
