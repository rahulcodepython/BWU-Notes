'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileCategoryType, FileFormatType, Note, NoteFormData, SubjectType } from '@/types/note';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import Link from 'next/link';
import { SUBJECT_LIST, FILE_CATEGORIES_LIST } from '@/constants';

const ModalNoteForm = ({
    children,
    submitFn,
    edit = false,
    note = null
}: {
    children: React.ReactNode
    submitFn: (formData: NoteFormData) => Promise<void>
    edit?: boolean
    note?: Note | null
}) => {

    const DEFAULT_UPLOADER = 'BWU/BCA/23/406';

    const [formData, setFormData] = useState<NoteFormData>({
        uploader: DEFAULT_UPLOADER,
        subject: '',
        fileCategory: '',
        fileFormat: 'PDF',
        title: '',
        description: '',
        document: null,
    });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    React.useEffect(() => {
        if (formData.subject && formData.fileCategory) {
            const shortSubject = formData.subject.split('(')[0].trim();
            const title = `${shortSubject} - ${formData.fileCategory}`;
            setFormData(prev => ({
                ...prev,
                title: title
            }));
        }
    }, [formData.subject, formData.fileCategory]);

    React.useEffect(() => {
        if (edit && note) {
            setFormData({
                _id: note._id,
                uploader: note.author,
                subject: note.subject as SubjectType,
                fileCategory: note.fileCategory as FileCategoryType,
                fileFormat: note.format as FileFormatType,
                title: note.title,
                description: note.description,
                link: note.link,
                document: null,
            });
        }
    }, [edit, note]);

    const handleInputChange = (name: string, value: string | File) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (!file) return;

        setFormData(prev => ({
            ...prev,
            document: file
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        submitFn(formData)
            .finally(() => {
                setFormData({
                    uploader: DEFAULT_UPLOADER,
                    subject: '',
                    fileCategory: '',
                    fileFormat: 'PDF',
                    title: '',
                    document: null,
                    description: '',
                });
                setLoading(false);
                setIsOpen(false);
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="md:max-w-2xl xl:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>
                        {edit ? 'Edit Note' : 'Create Note'}
                    </DialogTitle>
                    <DialogDescription asChild>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                            {/* Uploader Field */}
                            {
                                edit && <div className='flex flex-col gap-2'>
                                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                                        Id
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData._id}
                                        disabled
                                    />
                                </div>
                            }

                            {/* Uploader Field */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="uploader" className="block text-sm font-medium text-gray-700">
                                    Uploader
                                </label>
                                <Input
                                    type="text"
                                    id="uploader"
                                    value={formData.uploader}
                                    onChange={(e) => handleInputChange('uploader', e.target.value)}
                                />
                            </div>

                            {/* Subject Selection */}
                            <div className='flex flex-col gap-2'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <Select
                                    value={formData.subject}
                                    onValueChange={(value) => handleInputChange('subject', value)}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SUBJECT_LIST.map((subject) => (
                                            <SelectItem key={subject} value={subject}>
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* File Category Selection */}
                            <div className='flex flex-col gap-2'>
                                <label className="block text-sm font-medium text-gray-700">
                                    File Category
                                </label>
                                <Select
                                    value={formData.fileCategory}
                                    onValueChange={(value) => handleInputChange('fileCategory', value)}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select file category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FILE_CATEGORIES_LIST.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Title Field */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <Input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                />
                            </div>

                            {/* Description Field */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="border border-gray-300 rounded-md p-2"
                                />
                            </div>

                            {/* File Format Selection */}
                            <div className='flex flex-col gap-2'>
                                <label className="block text-sm font-medium text-gray-700">
                                    File Format
                                </label>
                                <RadioGroup
                                    value={formData.fileFormat}
                                    onValueChange={(value) => handleInputChange('fileFormat', value)}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="PDF" id="pdf" />
                                        <Label htmlFor="pdf">PDF</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Markdown" id="markdown" />
                                        <Label htmlFor="markdown">Markdown</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                                    File
                                </label>
                                <p className="text-sm text-gray-500">
                                    Upload a PDF document or a Markdown file.
                                </p>
                                {
                                    edit && <p className="text-sm text-gray-500">
                                        Previous Data: <Link href={note?.link ?? "#"} target="_blank" rel="noopener noreferrer">{note?.link}</Link>
                                    </p>
                                }
                                <Input
                                    type="file"
                                    id="document"
                                    accept=".pdf, .md"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-darkgreen-900 hover:bg-darkgreen-800 cursor-pointer transition-colors duration-200">
                                {loading ? 'Loading...' : edit ? 'Update Note' : 'Create Note'}
                            </Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ModalNoteForm;