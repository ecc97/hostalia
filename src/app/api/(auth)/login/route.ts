import { NextResponse } from "next/server";
import { account, databases } from "@/lib/appwrite";

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

    console.log("User details:", user);
    console.log('Session ID User:', session.userId)
    console.log('Session ID:', session.$id)

    return NextResponse.json({
      message: "Login successful",
      sessionId: session.$id,
      userId: session.userId,
      email: user.email,
      name: user.name,
      status: user.status,
    }, { status: 200 });

  } catch (err: unknown) {
    const error = (err instanceof Error) ? err : new Error("Unknown error");
    console.error('Login error:', error.message);
    return NextResponse.json({
      error: error,
      message: error.message || "Failed to login",
    }, { status: 500 });
  }
}

// return NextResponse.json({
//       error: error.message || "Failed to login",
//       code: error.code || 500,
//       type: error.type || "unknown_error",
//     }, { status: error.code || 500 });
//   }