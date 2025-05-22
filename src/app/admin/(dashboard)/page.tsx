"use client";
import AdminNoteGrid from '@/components/admin-note-grid'
import { Note } from '@/types/note'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [notes, setNotes] = useState<Note[]>([])
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
            } finally {
                setLoading(false)
            }
        }
        fetchNotes()
    }, [])

    return (
        <section className="flex flex-col gap-8 mt-2 sm:mt-4 md:mt-8 flex-1 w-full h-full p-4 container mx-auto">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <AdminNoteGrid responseData={notes} />
            )}
        </section>
    )
}

export default Dashboard