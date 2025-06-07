import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { username, password } = body;

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const cookieStore = await cookies()
    cookieStore.set('APIKEY', process.env.APIKEY!, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        sameSite: 'lax',
    })

    return NextResponse.json({ message: 'Login successful' });
}
