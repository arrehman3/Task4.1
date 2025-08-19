import { NextResponse } from 'next/server';

export async function GET() {
    const hasAccessSecret = Boolean(process.env.MY_ACCESS_TOKEN);
    const hasRefreshSecret = Boolean(process.env.MY_REFRESH_TOKEN);
    return NextResponse.json({
        hasAccessSecret,
        hasRefreshSecret,
        accessLen: process.env.MY_ACCESS_TOKEN?.length || 0,
        refreshLen: process.env.MY_REFRESH_TOKEN?.length || 0,
        nodeEnv: process.env.NODE_ENV
    });
}


