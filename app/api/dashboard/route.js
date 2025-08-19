import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.MY_ACCESS_TOKEN);
        const { name, email } = decoded;

        // Return user information (name and email)
        return NextResponse.json({
            name,
            email
        });
    } catch (error) {
        // If the token is expired or invalid, return Unauthorized
        return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
    }
}
