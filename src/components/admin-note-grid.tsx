"use client"
import React from 'react'
import AdminNoteCard from './admin-note-card'
import ModalNoteForm from './modal-note-form'
import { Note, NoteFormData } from '@/types/note'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { uploadFileToFirebase } from '@/utils/uploadeFile'
import { PlusCircleIcon } from 'lucide-react'

const AdminNoteGrid = ({ responseData }: { responseData: Note[] }) => {
    const [note, setNote] = React.useState(responseData)

    const createNote = async (formData: NoteFormData) => {
        if (!formData.document) {
            toast('No document selected');
            return;
        }

        const link = await uploadFileToFirebase(formData.document);

        if (!link) {
            toast('Error uploading file');
            return;
        }

        const noteData = {
            subject: formData.subject,
            title: formData.title,
            description: formData.description,
            format: formData.fileFormat,
            author: formData.uploader,
            fileCategory: formData.fileCategory,
            link: link,
        }

        await fetch('/api/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        })
            .then((res) => res.json())
            .then(data => {
                setNote(prev => [...prev, data])
                toast('Note created successfully');
            })
            .catch(() => {
                toast('Error creaating note');
            });
    }

    const editNote = async (formData: NoteFormData) => {
        let newLink;

        if (formData.document) {
            newLink = await uploadFileToFirebase(formData.document);

            if (!newLink) {
                toast('Error uploading file');
                return;
            }
        }

        if (!formData._id) {
            toast('No ID provided');
            return;
        }

        const noteData = {
            _id: formData._id,
            subject: formData.subject,
            title: formData.title,
            description: formData.description,
            fileCategory: formData.fileCategory,
            format: formData.fileFormat,
            author: formData.uploader,
            link: newLink ?? formData.link,
        }

        await fetch('/api/note', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        })
            .then((res) => res.json())
            .then(data => {
                setNote(prev => prev.map(noteItem =>
                    noteItem._id === data._id ? { ...noteItem, ...data } : noteItem
                ));

                toast('Note updated successfully');
            })
            .catch(() => {
                toast('Error updating note');
            });
    }

    const deleteNote = async (id: number) => {
        await fetch(`/api/note/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then(() => {
                toast('Note deleted successfully')
                setNote(prev => prev.filter(noteItem => noteItem._id !== id))
            })
            .catch(() => toast('Error deleting note'));
    }

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col md:flex-row items-center justify-between w-full gap-8'>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600">
                    Total Notes: {note.length}
                </p>
                <ModalNoteForm submitFn={createNote}>
                    <Button className="bg-darkgreen-900 hover:bg-darkgreen-800 cursor-pointer">
                        <PlusCircleIcon className='' />
                        Create New Note
                    </Button>
                </ModalNoteForm>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full'>
                {
                    note.map((noteItem) => (
                        <AdminNoteCard key={noteItem._id} value={noteItem} deleteNote={deleteNote} editNote={editNote} />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminNoteGrid