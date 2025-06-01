"use client"
import { Note } from '@/types/note'
import React from 'react'
import AdminNoteCard from './admin-note-card'

const AdminNoteGrid = ({ responseData }: { responseData: Note[] }) => {
    const [note, setNote] = React.useState(responseData)

    React.useEffect(() => {
        setNote(responseData);
    }, [responseData]);

    return (

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full'>
            {
                note.map((noteItem) => (
                    <AdminNoteCard key={noteItem._id} value={noteItem} setNote={setNote} />
                ))
            }
        </div>
    )
}

export default AdminNoteGrid