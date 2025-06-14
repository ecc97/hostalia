import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const protetedRoutes = ['/dashboard', '/profile', '/settings'];
    const publicRoutes = ['/login', '/register', '/'];
    const { pathname } = request.nextUrl;

    const isProtectedRoute = protetedRoutes.some(route => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    const sessionCookie = request.cookies.get('a_session_console')
    const isAuthenticated = sessionCookie ? true : false;

    if(isProtectedRoute && !isAuthenticated){
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(isPublicRoute && isAuthenticated){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/login', '/register', '/'],
}