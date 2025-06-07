"use client"
import Hero from "@/app/(home)/hero";
import NotesGrid from "@/app/(home)/notes-grid";
import SearchBar from "@/components/search-bar";
import { Note } from '@/types/note';
import React from "react";

const HomeLayout = ({ notes }: { notes: Note[] }) => {
    const [filteredNotes, setFilteredNotes] = React.useState<Note[]>([]);

    return (
        <section className="flex flex-col flex-1">
            <Hero />
            <SearchBar setNotes={setFilteredNotes} notesData={notes} />
            <div className="container mx-auto px-4 py-16 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between px-4 md:px-0 w-full">
                    <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 text-left w-full md:w-auto">
                        You will find all your notes here
                    </h2>
                    <h2 className="text-gray-800 text-right text-sm w-full md:w-auto">
                        Total {notes.length} Notes &#x2022; Filtered {filteredNotes.length} Notes
                    </h2>
                </div>
                <NotesGrid notes={filteredNotes} />
            </div>
        </section>
    );
};

export default HomeLayout;
