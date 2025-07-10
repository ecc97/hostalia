import { NextResponse } from "next/server";
import { updatedStatusBooking } from "@/actions/bookings";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const body = await request.json();
  const { status } = body;

  try {
    const updatedBooking = await updatedStatusBooking(id, status);

    return NextResponse.json(updatedBooking);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el estado de la reserva" }, { status: 500 });
  }
}