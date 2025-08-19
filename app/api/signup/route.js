import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from "bcrypt";
import connectDB from '@/db/config';

export async function POST(request){
    await connectDB();
    const body = await request.json();
    const {name,email,password} = body;
    if(!name || !email || !password){
        return NextResponse.json({msg:"Invalid fields"},{status:400})
    }
    const isUserPresent = await User.findOne({email});
    if(isUserPresent){
        return NextResponse.json({msg:"user is already present"},{status:400})
    }

    const hashPassword = await bcrypt.hash(password,10)

    try {
        const user = new User({email,name,password:hashPassword})
        await user.save();
    } catch (error) {
        return NextResponse.json({msg:'Could not create user'},{status:500});
    }

    return NextResponse.json({
        message: 'Signup successful!'
    });
}
