import React from 'react'
import { Button } from './ui/button'
import { Note, NoteFormData } from '@/types/note'
import { FileTextIcon } from 'lucide-react';
import ModalNoteForm from './modal-note-form';

const AdminNoteCard = ({
    value,
    deleteNote,
    editNote
}: {
    value: Note
    deleteNote: (id: number) => void
    editNote: (formData: NoteFormData) => Promise<void>
}) => {
    const icon = value.format === "PDF" ? <FileTextIcon className="inline mr-0.5 -mt-1 w-4 h-4" /> : null;

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 flex flex-col gap-4 justify-between p-4">
            <div className="flex justify-between items-start">
                <span className={`px-2 py-1.5 text-xs rounded-full bg-darkgreen-200 text-black font-semibold`}>
                    {value.subject}
                </span>
                <span className="text-xs text-gray-500">{value.author}</span>
            </div>
            <h3 className="font-semibold text-lg">{value.title}</h3>
            <p className="text-gray-600 text-sm">
                {value.description}
            </p>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center">
                    {icon}
                    {value.format}
                </span>
            </div>
            <div className='grid grid-cols-2 text-sm gap-4'>
                <ModalNoteForm submitFn={editNote} edit note={value}>
                    <Button className="w-full bg-darkgreen-900 hover:bg-darkgreen-800 cursor-pointer">
                        Edit Note
                    </Button>
                </ModalNoteForm>
                <Button variant='destructive' className='w-full cursor-pointer' onClick={() => deleteNote(value._id)}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default AdminNoteCard