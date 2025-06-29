import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { account, databases } from "@/lib/appwrite";

const DATABASE_ID = '683a05ed00135a25f39e';
const USERS_COLLECTION_ID = '683a06870000dfe9dcce';

export async function POST(request: Request) {
  try {
    const { fullName, email, password, phone } = await request.json();

    if (!fullName || !email || !password || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Crear la cuenta de usuario en Appwrite Authentication
    const userAccount = await account.create(
      ID.unique(), // Genera un ID único para la cuenta de usuario
      email,
      password,
      fullName // El nombre completo se puede pasar como nombre de la cuenta
    );

    // 2. Crear un documento en la colección de usuarios de la base de datos
    // Usamos el ID de la cuenta de usuario como ID del documento para vincularlos
    const userDocument = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userAccount.$id, // Usar el ID de la cuenta como ID del documento
      {
        fullName,
        email,
        phone,
        // Asegúrate de que estos atributos existan en tu colección de Appwrite.
        // La contraseña NO debe guardarse aquí.
      }
    );

    return NextResponse.json({
      message: "User registered successfully",
      userId: userAccount.$id,
      userDocumentId: userDocument.$id,
      email: userAccount.email,
      fullName: userAccount.name,
      phone: userDocument.phone,
    }, { status: 201 });

  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error registering user:", error);
    // AppwriteException tiene una propiedad 'message' y 'code'
    return NextResponse.json({
      error: error || "Failed to register user",
      message: error.message || "Failed to register user",
    }, { status: 500 });
  }
}

// AppwriteException tiene una propiedad 'message' y 'code'
    // return NextResponse.json({
    //   error: error.message || "Failed to register user",
    //   code: error.code || 500,
    //   type: error.type || "unknown_error",
    // }, { status: error.code || 500 });