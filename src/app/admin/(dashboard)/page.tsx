import AdminNoteGrid from '@/components/admin-note-grid'
import { Note } from '@/types/note'
import React from 'react'

const Dashboard = async () => {
    const response = await fetch(`${process.env.API_URL}/api/notes`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const notes: Note[] = await response.json()

    return (
        <section className="flex flex-col gap-8 mt-2 sm:mt-4 md:mt-8 flex-1 w-full h-full p-4 container mx-auto">
            <AdminNoteGrid responseData={notes} />
        </section>
    )
}

export default Dashboard