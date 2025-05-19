"use client";
import { Note } from '@/types/note';
import { useState, useEffect } from 'react';
import React from "react";

type SearchBarProps = {
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    notesData: Note[];
};

const Subjects = [
    "Design and Analysis of Algorithm (P)",
    "Design and Analysis of Algorithm (T)",
    "PHP and MySQL Lab",
    "Full - Stack Development - I (P)",
    "Full - Stack Development - I (T)",
    "Sustainability in Indian Knowledge System",
    "Computer Network",
    "Alternative English",
    "All Subjects"
]

const SearchBar: React.FC<SearchBarProps> = ({ setNotes, notesData }) => {
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setNotes(
            notesData.filter(note => {
                const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    note.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesSubject = selectedSubject === 'All Subjects' || note.subject === selectedSubject;
                return matchesSearch && matchesSubject;
            })
        );
    }, [selectedSubject, searchTerm, setNotes, notesData]);

    return (
        <div className="container mx-auto px-4 -mt-8 z-10 relative">
            <div className="max-w-4xl mx-auto">
                <div className="search-bar bg-white rounded-lg p-4 shadow-lg">
                    <form>
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for notes, subjects, or topics..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-darkgreen-500 focus:border-transparent text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className='flex flex-col lg:flex-row items-center gap-2 w-full'>
                                <span className="text-gray-600 text-left w-full lg:w-auto">Filter by:</span>
                                <select
                                    className="flex-1 w-full border border-gray-200 text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-darkgreen-500"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                >
                                    {
                                        Subjects.map((subject) => (
                                            <option key={subject} value={subject}>{subject}</option>
                                        ))
                                    }
                                </select>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;