"use client"
import { Note } from "@/types/note";
import NoteCard from "./note-card";
import React from "react";


interface NotesGridProps {
    notes: Note[];
}


const NotesGrid: React.FC<NotesGridProps> = ({ notes }) => {

    return (

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {
                notes.map((note: Note) => (
                    <NoteCard
                        key={note._id}
                        {...note}
                    />
                ))
            }
            {
                notes.length === 0 && (
                    <div className="col-span-1 text-center text-gray-500">
                        No notes found.
                    </div>
                )
            }
        </div>

    );
};

export default NotesGrid;