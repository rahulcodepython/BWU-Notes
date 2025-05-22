import { connectDB } from '@/lib/db.connect';
import { Note } from '@/models/note';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const note = await Note.findById(id);

    if (!note) {
        return NextResponse.json({ message: 'Such note not found' }, { status: 404 });
    }

    const noteObject = note.toObject({ getters: true });

    if (noteObject.format === 'PDF') {
        return NextResponse.json({ message: 'PDF format not supported' }, { status: 400 });
    }

    const response = await fetch(noteObject.link);

    if (!response.ok) {
        return NextResponse.json({ message: 'Error fetching file' }, { status: 400 });
    }

    const fileContent = await response.text();

    return NextResponse.json({ "content": fileContent }, { status: 200 });
}
