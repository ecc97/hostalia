import { account, databases } from "@/lib/appwrite";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/interfaces/IAuth";

const DATABASE_ID = String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
const USERS_COLLECTION_ID = String(process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID);

export async function registerUser(userData: IRegisterRequest): Promise<IRegisterResponse> {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to register user');
        }

        const data: IRegisterResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function loginUser(credentials: ILoginRequest): Promise<ILoginResponse> {
    try {
        const session = await account.createEmailPasswordSession(credentials.email, credentials.password);
        // console.log("Session created:", session);
        // console.log("Account:", (await account.get()).$id)
        // console.log("Account Name:", (await account.get()).name)
        const user = await account.get();
        const userDocument = await databases.getDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            session.userId
        );
        
        const res: ILoginResponse = {
            message: "Login successful",
            sessionId: session.$id,
            userId: session.userId,
            name: user.name || '',
            email: user.email || '',
            phone: userDocument.phone || '',
            status: user.status ? 'active' : 'inactive',
        };
        return res;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function checkAuthStatus() {
    try {
        const user = await account.get();
        const sessions = await account.listSessions();
        const currentSession = sessions.sessions.find(session => session.current);
        const userDocument = await databases.getDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            user.$id
        );

        return {
            isAuthenticated: true,
            user: {
                userId: user.$id,
                fullName: user.name || '',
                email: user.email || '',
                phone: userDocument.phone || '',
                status: user.status ? 'active' : 'inactive',
            },
            sessionId: currentSession?.$id || null,
        }
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : 'Unknown error');
        return {
            isAuthenticated: false,
            user: null,
            sessionId: null,
        }
    }
}

export async function logoutUser() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
}