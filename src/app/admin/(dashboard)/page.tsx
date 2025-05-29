"use client";
import AdminNoteGrid from '@/components/admin-note-grid'
import SearchBar from '@/components/search-bar';
import { Note } from '@/types/note'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = React.useState<Note[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`/api/notes`, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data: Note[] = await response.json()
                setNotes(data)
                setFilteredNotes(data)
            } finally {
                setLoading(false)
            }
        }
        fetchNotes()
    }, [])

    return (
        <section className="flex flex-col gap-8 mt-1 sm:mt-2 md:mt-4 flex-1 w-full h-full p-4 container mx-auto">
            <SearchBar setNotes={setFilteredNotes} notesData={notes} className="mt-0 md:mt-0" />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <AdminNoteGrid responseData={filteredNotes} />
            )}
        </section>
    )
}

export default Dashboard