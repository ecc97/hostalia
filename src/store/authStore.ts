import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, registerUser, checkAuthStatus, logoutUser } from "@/actions/auth";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/interfaces/IAuth";

interface AuthState {
    user: { userId: string; fullName: string; email: string; phone?: string; status?: string } | null;
    sessionId: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (user: ILoginRequest) => Promise<void>;
    register: (user: IRegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            sessionId: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            login: async (credentials) => {
                set({ loading: true, error: null });
                try {
                    const response: ILoginResponse = await loginUser(credentials);
                    set({
                        sessionId: response.sessionId,
                        user: {
                            userId: response.userId,
                            fullName: response.name,
                            email: response.email,
                            phone: response.phone || '',
                            status: response.status,
                        },
                        isAuthenticated: true,
                        loading: false
                    });
                } catch (error) {
                    set({
                        error: (error as Error).message,
                        loading: false,
                        isAuthenticated: false
                    });
                    throw error;
                }
            },

            register: async (user) => {
                set({ loading: true, error: null });
                try {
                    const response: IRegisterResponse = await registerUser(user);
                    set({
                        user: {
                            userId: response.userId,
                            fullName: response.fullName,
                            email: response.email,
                            phone: response.phone || '',
                        },
                    });
                    await get().login({ email: user.email, password: user.password });
                } catch (error) {
                    set({
                        error: (error as Error).message,
                        loading: false
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await logoutUser();
                    set({
                        user: null,
                        sessionId: null,
                        isAuthenticated: false,
                        error: null
                    });
                } catch (error) {
                    console.error("Error during logout:", error);
                    set({
                        user: null,
                        sessionId: null,
                        isAuthenticated: false,
                        error: null
                    });
                }
            },

            checkAuth: async () => {
                set({ loading: true });
                try {
                    const authStatus = await checkAuthStatus();
                    if (authStatus.isAuthenticated && authStatus.user) {
                        set({
                            user: authStatus.user,
                            sessionId: authStatus.sessionId,
                            isAuthenticated: true,
                            loading: false
                        });
                    } else {
                        set({
                            user: null,
                            sessionId: null,
                            isAuthenticated: false,
                            loading: false
                        });
                    }
                } catch (error) {
                    set({
                        user: null,
                        sessionId: null,
                        isAuthenticated: false,
                        loading: false,
                        error: (error as Error).message
                    });
                }
            },

            clearError: () => set({ error: null })
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                sessionId: state.sessionId,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);