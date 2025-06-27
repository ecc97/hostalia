import { NextResponse } from "next/server";
import { getAccommodationBySearch } from "@/actions/accommodations";


export async function GET(request: Request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const search = searchParams.get('q') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (page < 1) {
            return NextResponse.json({ error: "Page must be greater than 0" }, { status: 400 });
        }

        if (limit < 1 || limit > 50) {
            return NextResponse.json({ error: "Limit must be between 1 and 50" }, { status: 400 });
        }
        const accommodations = await getAccommodationBySearch(search, page, limit);
        return NextResponse.json(accommodations, { status: 200 });
    } catch (error) {
        console.error("Error fetching accommodations:", error);
        return NextResponse.json({ error: "Failed to fetch accommodations" }, { status: 500 });
    }
}