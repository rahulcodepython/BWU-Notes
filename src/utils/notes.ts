import { Note, NoteFormData } from "@/types/note";
import { toast } from "sonner";
import { uploadFileToFirebase } from "./uploadeFile";

export const createNote = async (formData: NoteFormData, setNote: React.Dispatch<React.SetStateAction<Note[]>>) => {
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

export const editNote = async (formData: NoteFormData, setNote: React.Dispatch<React.SetStateAction<Note[]>>) => {
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

export const deleteNote = async (id: number, setNote: React.Dispatch<React.SetStateAction<Note[]>>) => {
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