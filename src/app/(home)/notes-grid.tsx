"use client"
import { Note } from "@/types/note";
import NoteCard from "../../components/note-card";

const NotesGrid = ({ notes }: { notes: Note[] }) => {
    return (
        notes.length === 0 ? (
            <div className="text-center text-gray-500 w-full">
                No notes found.
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    notes.map((note: Note) => (
                        <NoteCard
                            key={note._id}
                            {...note}
                        />
                    ))
                }
            </div>

        )
    )
};

export default NotesGrid;