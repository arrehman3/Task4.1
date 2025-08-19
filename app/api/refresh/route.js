import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request){
    const refreshCookie = request.cookies.get('refreshToken');
    const refreshToken = refreshCookie?.value;

    if(!refreshToken){
        return NextResponse.json({msg:'No refresh token found'},{status:400})
    }

    try {
        const decoded = jwt.verify(refreshToken,process.env.MY_REFRESH_TOKEN);

        const accessToken = jwt.sign(
            {id:decoded.id,email:decoded.email,name:decoded.name},
            process.env.MY_ACCESS_TOKEN,
            {expiresIn : '15m'}
        );

        const response = NextResponse.json({accessToken});
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 15 * 60
        });
        return response;
    } catch (error) {
        return NextResponse.json({msg:'Invalid refresh token'},{status:400});
    }
}
