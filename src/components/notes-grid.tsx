"use client"
import { Note } from "@/types/note";
import NoteCard from "./note-card";
import Hero from "./hero";
import SearchBar from "./search-bar";
import React from "react";


interface NotesGridProps {
    notes: Note[];
}


const NotesGrid: React.FC<NotesGridProps> = ({ notes }) => {
    const [filteredNotes, setFilteredNotes] = React.useState<Note[]>(notes);

    return (
        <section className="flex flex-col flex-1">
            <Hero />
            <SearchBar setNotes={setFilteredNotes} notesData={notes} />
            <div className="container mx-auto px-4 py-16 flex flex-col gap-8">
                <div className="flex items-center justify-between px-4 md:px-8">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        You will find all your notes here
                    </h2>
                    <h2 className="text-gray-800">
                        Total {notes.length} Notes &#x2022; Filtered {filteredNotes.length} Notes
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {
                        filteredNotes.map((note: Note) => (
                            <NoteCard
                                key={note._id}
                                {...note}
                            />
                        ))
                    }
                </div>
                {
                    filteredNotes.length === 0 && (
                        <div className="col-span-1 text-center text-gray-500">
                            No notes found.
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default NotesGrid;