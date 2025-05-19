import { Note } from "@/types/note";
import NoteCard from "./note-card";


interface NotesGridProps {
    notes: Note[];
}


const NotesGrid: React.FC<NotesGridProps> = ({ notes }) => {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    notes.map((note: Note) => (
                        <NoteCard
                            key={note.id}
                            {...note}
                        />
                    ))
                }
            </div>
            {
                notes.length === 0 && (
                    <div className="col-span-1 text-center text-gray-500">
                        No notes found.
                    </div>
                )
            }
        </section>
    );
};

export default NotesGrid;