import { NextResponse } from 'next/server';

export async function POST(request) {
    // Clear the cookies
    const response = NextResponse.json({ msg: 'Logged out successfully' });
    response.cookies.set('accessToken', '', { maxAge: -1, path: '/' });
    response.cookies.set('refreshToken', '', { maxAge: -1, path: '/' });

    return response;
}


