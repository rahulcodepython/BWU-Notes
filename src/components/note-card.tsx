import { Note } from "@/types/note";
import React from "react";
import { DownloadIcon, ReaderIcon } from "@radix-ui/react-icons";
import { FileTextIcon } from "@radix-ui/react-icons";
import Link from "next/link";


const NoteCard: React.FC<Note> = ({ subject, title, description, format, pages, author, link }) => {
    const icon = format === "PDF" ? <FileTextIcon className="inline mr-0.5 -mt-1 w-4 h-4" /> : null;

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 flex flex-col gap-4 justify-between p-4">
            <div className="flex justify-between items-start">
                <span className={`px-2 py-1.5 text-xs rounded-full bg-darkgreen-200 text-black font-semibold`}>
                    {subject}
                </span>
                <span className="text-xs text-gray-500">{author}</span>
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center">
                    {icon}
                    {format}
                </span>
                {pages && <span className="text-gray-500">{pages} pages</span>}
            </div>
            {
                format === "PDF" ? <button className="w-full text-white bg-darkgreen-900 hover:bg-darkgreen-800 rounded-lg text-sm px-5 py-2.5 flex items-center justify-center cursor-pointer transition-colors duration-200"
                    onClick={() => window.open(link, "_blank")}>
                    <DownloadIcon className="inline mr-2 -mt-1 w-4 h-4" />
                    Download
                </button> : format === "Markdown" ? <Link href={`/read/${link}`} className="w-full text-white bg-darkgreen-900 hover:bg-darkgreen-800 rounded-lg text-sm px-5 py-2.5 flex items-center justify-center cursor-pointer transition-colors duration-200">
                    <ReaderIcon className="inline mr-2 -mt-1 w-4 h-4" />
                    View
                </Link> : null
            }
        </div>
    );
};

export default NoteCard;