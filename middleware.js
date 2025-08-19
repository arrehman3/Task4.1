import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = new URL(request.url);

    if (pathname.startsWith('/dashboard')) {
        const accessToken = request.cookies.get('accessToken')?.value;
        if (!accessToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
};


