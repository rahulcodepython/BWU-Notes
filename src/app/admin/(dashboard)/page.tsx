"use client";
import AdminNoteGrid from '@/components/admin-note-grid';
import ModalNoteForm from '@/components/modal-note-form';
import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/note';
import { createNote } from '@/utils/notes';
import { PlusCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col md:flex-row items-center justify-between w-full gap-8'>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-600">
                        Total Notes: {notes.length}
                    </p>
                    <ModalNoteForm submitFn={createNote} setNote={setNotes}>
                        <Button className="bg-darkgreen-900 hover:bg-darkgreen-800 cursor-pointer">
                            <PlusCircleIcon className='' />
                            Create New Note
                        </Button>
                    </ModalNoteForm>
                </div>
                {
                    loading ? (
                        <div className='w-full text-center'>Loading...</div>
                    ) : (
                        <AdminNoteGrid responseData={filteredNotes} />
                    )
                }
            </div>
        </section>
    )
}

export default Dashboard