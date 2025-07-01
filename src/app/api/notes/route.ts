import { connectDB } from '@/lib/db.connect';
import { Note } from '@/models/note';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const notes = await Note.find();
        return NextResponse.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ message: 'Error fetching notes' }, { status: 500 });
    }
}