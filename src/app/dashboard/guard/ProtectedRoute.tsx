'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import dynamic from 'next/dynamic';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

function ProtectedRouteComponent({
    children,
    redirectTo = '/'
}: ProtectedRouteProps) {
    const { isAuthenticated, loading, checkAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, loading, router, redirectTo]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; 
    }

    return <>{children}</>;
}

const ProtectedRoute = dynamic(() => Promise.resolve(ProtectedRouteComponent), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
    )
});

export default ProtectedRoute;