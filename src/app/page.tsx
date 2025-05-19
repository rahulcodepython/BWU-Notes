"use client"
import { useState } from 'react';
import Hero from "@/components/hero";
import SearchBar from "@/components/search-bar";
import NotesGrid from "@/components/notes-grid";
import { Note } from '@/types/note';


const notesData: Note[] = [
    {
        id: 1,
        subject: 'Computer Network',
        title: 'Computer Network Suggestions',
        description: 'This file contains the suggestions for computer network question 3 and 5.',
        format: 'PDF',
        author: '@BWU/BCA/23/406',
        link: '/Computer Network Suggestions.pdf'
    },
    {
        id: 2,
        subject: 'Design and Analysis of Algorithm (P)',
        title: 'DAA Lab Assignment Questions',
        description: 'This file contains the lab assignment questions for DAA.',
        format: 'PDF',
        author: '@BWU/BCA/23/406',
        link: '/DAA Lab Assignment Questions.pdf'
    },
    {
        id: 3,
        subject: 'PHP and MySQL Lab',
        title: 'PHP Lab Assignment Questions',
        description: 'This file contains the lab assignment questions for PHP and MySQL.',
        format: 'PDF',
        author: '@BWU/BCA/23/406',
        link: '/PHP Lab Assignment Questions.pdf'
    },
    {
        id: 4,
        subject: 'Design and Analysis of Algorithm (P)',
        title: 'DAA - Lab Assignment Answer',
        description: 'This is lab assignment answer of DAA.',
        format: 'Markdown',
        author: '@BWU/BCA/23/406',
        link: 'daa-lab-assignment-answer'
    },
    {
        id: 5,
        subject: 'Full - Stack Development - I (P)',
        title: 'Full - Stack Development - I (P) Lab Assignment Questions',
        description: 'This is lab assignment question of Full - Stack Development - I (P).',
        format: 'PDF',
        author: '@BWU/BCA/23/406',
        link: '/Full Stack - I - Lab Assignment Question.pdf'
    },
    {
        id: 6,
        subject: 'Full - Stack Development - I (P)',
        title: 'Full Stack - I - Lab Assignment Answer',
        description: 'This is lab assignment answer of Full Stack - I.',
        format: 'Markdown',
        author: '@BWU/BCA/23/406',
        link: 'full-stack-I-lab-assignment-answer'
    },
    {
        id: 7,
        subject: 'PHP and MySQL Lab',
        title: 'PHP - Lab Assignment Answer',
        description: 'This is lab assignment answer of php.',
        format: 'Markdown',
        author: '@BWU/BCA/23/406',
        link: 'php-lab-assignment-answer'
    },
    {
        id: 7,
        subject: 'Design and Analysis of Algorithm (T)',
        title: 'DAA MCQ Suggestions',
        description: 'This file contains the suggestions for DAA MCQ.',
        format: 'PDF',
        author: '@BWU/BCA/23/406',
        link: '/DAA MCQ Suggestions.pdf'
    },
    {
        id: 7,
        subject: 'Full - Stack Development - I (T)',
        title: 'Full Stack Semester Suggestions',
        description: 'This file contains the suggestions for Full Stack Semester.',
        format: 'PDF',
        author: '@BWU/BCA/23/406',
        link: '/Full Stack Semester Suggestions.pdf'
    },
];

const App = () => {
    const [filteredNotes, setFilteredNotes] = useState<Note[]>(notesData);

    return (
        <section className="flex flex-col flex-1">
            <Hero />
            <SearchBar setNotes={setFilteredNotes} notesData={notesData} />
            <NotesGrid notes={filteredNotes} />
        </section>
    );
};

export default App;