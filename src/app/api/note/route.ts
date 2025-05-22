import { connectDB } from '@/lib/db.connect';
import { Note } from '@/models/note';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    const note = new Note(body);
    await note.save();
    return NextResponse.json(note);
}

export async function PATCH(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    const { _id, ...data } = body;
    const note = await Note.findByIdAndUpdate(_id, {
        $set: data
    }, { new: true });
    return NextResponse.json(note);
}

export async function DELETE(req: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }
    const note = await Note.findByIdAndDelete(id);
    return NextResponse.json(note);
}