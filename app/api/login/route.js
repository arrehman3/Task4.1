import { NextResponse } from "next/server";
import User from '@/models/userModel';
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '@/db/config';


export async function POST(request){
    try {
        await connectDB();
        const body = await request.json();
        const {email,password} = body;

        if(!email || !password){
            return NextResponse.json({msg:"Invalid fields"},{status:400})
        }

        const accessSecret = process.env.MY_ACCESS_TOKEN;
        const refreshSecret = process.env.MY_REFRESH_TOKEN;
        if (!accessSecret || !refreshSecret) {
            return NextResponse.json({ msg: 'Server misconfigured: missing token secrets' }, { status: 500 });
        }

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({msg:"User not found"},{status:400});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return NextResponse.json({msg:"Invalid credentials"},{status:400});
        }

        const accessToken = jwt.sign(
            {id:user._id,email:user.email,name:user.name},
            accessSecret,
            {expiresIn: "15m"}
        );

        const refreshToken = jwt.sign(
            {id:user._id,email:user.email,name:user.name},
            refreshSecret,
            {expiresIn:'7d'}
        );

        const response = NextResponse.json({msg:'Login successful'});

        response.cookies.set('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'lax',
            path:'/',
            maxAge:7*24*60*60
        })

        response.cookies.set('accessToken',accessToken,{
            httpOnly:true,
            sameSite:'lax',
            path:'/',
            maxAge:15*60
        })

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
    }
}
