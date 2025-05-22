"use client"
import Hero from "@/components/hero";
import NotesGrid from "@/components/notes-grid";
import SearchBar from "@/components/search-bar";
import { Note } from '@/types/note';
import React from "react";

const App = () => {
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = React.useState<Note[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const response = await fetch(`/api/notes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });
            const notesData: Note[] = await response.json();
            setNotes(notesData);
            setFilteredNotes(notesData);
            setLoading(false);
        };

        fetchNotes();
    }, []);

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
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <span className="text-lg text-gray-500">Loading...</span>
                    </div>
                ) : (
                    <NotesGrid notes={filteredNotes} />
                )}
            </div>
        </section>
    );
};

export default App;
