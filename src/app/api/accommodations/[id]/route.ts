import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";

const DATABASE_ID = '683a05ed00135a25f39e'; // ID de tu base de datos
const ACCOMMODATIONS_COLLECTION_ID = '683a0e8500034105f2b2'; // ID de tu colección de alojamientos

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const accommodationId = (await params).id;
      const response = await databases.getDocument(DATABASE_ID, ACCOMMODATIONS_COLLECTION_ID, accommodationId);
      const accommodation = {
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
      return NextResponse.json(accommodation);
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      return NextResponse.json({ error: "Failed to fetch accommodation" }, { status: 500 });
    }
}