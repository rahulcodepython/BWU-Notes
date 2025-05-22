import { connectDB } from '@/lib/db.connect';
import { Note } from '@/models/note';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    const notes = await Note.find();
    return NextResponse.json(notes);
}