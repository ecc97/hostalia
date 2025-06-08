import { create } from "zustand";
import { loginUser, registerUser } from "@/actions/auth";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/interfaces/IAuth";

interface AuthState {
    user: { userId: string; fullName: string; email: string; phone?: string } | null;
    sessionId: string | null;
    loading: boolean;
    error: string | null;
    // setUser: (user: ILogin | IRegister | null) => void;
    login: (user: ILoginRequest) => Promise<void>;
    register: (user: IRegisterRequest) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    sessionId: null,
    loading: false,
    error: null,
    login: async (user) => {
        set({ loading: true, error: null });
        try {
            const response: ILoginResponse = await loginUser(user);
            set({sessionId: response.sessionId, user: { userId: response.userId, fullName: response.name, email: response.email }});
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },
    register: async (user) => {
        set({ loading: true, error: null });
        try {
            const response: IRegisterResponse = await registerUser(user);
            set({ sessionId: response.userId, user: { userId: response.userId, fullName: response.fullName, email: response.email, phone: user.phone } });
            await useAuthStore.getState().login({ email: user.email, password: user.password });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },
}));