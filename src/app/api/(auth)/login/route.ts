import { NextResponse } from "next/server";
import { account, client, databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const DATABASE_ID = '683a05ed00135a25f39e'; // ID de tu base de datos
const USERS_COLLECTION_ID = '683a06870000dfe9dcce'; // ID de tu colección de usuarios

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Crear una sesión de email/contraseña en Appwrite
    const session = await account.createEmailPasswordSession(email, password);

    // Opcional: Obtener detalles del usuario autenticado si es necesario
    // const user = await account.get();
    const user = await databases.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      session.userId
    );

    return NextResponse.json({
      message: "Login successful",
      sessionId: session.$id,
      userId: user.$id,
      email: user.email,
      name: user.name,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error during login:", error);
    // AppwriteException tiene una propiedad 'message' y 'code'
    return NextResponse.json({
      error: error.message || "Failed to login",
      code: error.code || 500,
      type: error.type || "unknown_error",
    }, { status: error.code || 500 });
  }
}
