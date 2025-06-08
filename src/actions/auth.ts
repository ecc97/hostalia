import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/interfaces/IAuth";

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
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to log in');
        }

        const data: ILoginResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}