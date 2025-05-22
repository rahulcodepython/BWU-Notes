import { connectDB } from '@/lib/db.connect';
import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//     await connectDB();
//     const users = await User.find();
//     return NextResponse.json(users);
// }

export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    const user = await User.findOne({
        username: body.username,
        password: body.password,
    });
    return NextResponse.json({
        token: user ? user.token : null,
    });
}
