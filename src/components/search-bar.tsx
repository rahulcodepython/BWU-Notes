"use client";
import { FILE_CATEGORIES_LIST, SUBJECT_LIST } from '@/constants';
import { FileCategoryType, Note, SubjectType } from '@/types/note';
import { useState, useEffect } from 'react';
import React from "react";

type SearchBarProps = {
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    notesData: Note[];
};

type SEARCH_SUBJECTS_TYPE = SubjectType | 'All Subjects';
type SEARCH_FILE_CATEGORIES_TYPE = FileCategoryType | 'All File Categories';

const SEARCH_SUBJECTS: SEARCH_SUBJECTS_TYPE[] = [
    'All Subjects',
    ...SUBJECT_LIST
];
const SEARCH_FILE_CATEGORIES: SEARCH_FILE_CATEGORIES_TYPE[] = [
    'All File Categories',
    ...FILE_CATEGORIES_LIST
];


const SearchBar: React.FC<SearchBarProps> = ({ setNotes, notesData }) => {
    const [selectedSubject, setSelectedSubject] = useState<SEARCH_SUBJECTS_TYPE>('All Subjects');
    const [selectedFileCategory, setSelectedFileCategory] = useState<SEARCH_FILE_CATEGORIES_TYPE>('All File Categories');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setNotes(
            notesData.filter(note => {
                const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    note.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesSubject = selectedSubject === 'All Subjects' || note.subject === selectedSubject;
                const matchesFileCategory = selectedFileCategory === 'All File Categories' || note.fileCategory === selectedFileCategory;
                return matchesSearch && matchesSubject && matchesFileCategory;
            })
        );
    }, [selectedSubject, selectedFileCategory, searchTerm, setNotes, notesData]);

    return (
        <div className="container mx-auto px-4 -mt-16 md:-mt-24 z-10 relative">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg">
                    <form>
                        <div className="flex flex-col items-center gap-4">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for notes, subjects, or topics..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:ring-darkgreen-500 focus:border-transparent text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className='flex flex-col items-center gap-2 w-full'>
                                <div className='flex flex-col items-center justify-center gap-2 flex-1 w-full'>
                                    <select
                                        className="w-full border border-gray-200 text-black rounded-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-darkgreen-500"
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value as SEARCH_SUBJECTS_TYPE)}
                                    >
                                        {
                                            SEARCH_SUBJECTS.map((subject) => (
                                                <option key={subject} value={subject}>{subject}</option>
                                            ))
                                        }
                                    </select>
                                    <select
                                        className="w-full border border-gray-200 text-black rounded-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-darkgreen-500"
                                        value={selectedFileCategory}
                                        onChange={(e) => setSelectedFileCategory(e.target.value as SEARCH_FILE_CATEGORIES_TYPE)}
                                    >
                                        {
                                            SEARCH_FILE_CATEGORIES.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="flex items-center justify-center w-full">
                        <span className="font-semibold">{selectedSubject} &#x2022; {selectedFileCategory}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;