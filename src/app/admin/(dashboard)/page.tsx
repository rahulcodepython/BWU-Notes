import { Note } from '@/types/note';
import { getBaseUrl } from '@/utils/getBaseUrl';
import AdminNoteLayout from './admin-note-layout';

const Dashboard = async () => {
    const baseUrl = await getBaseUrl()

    const response = await fetch(`${baseUrl}/api/notes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: { revalidate: 120 },
    });

    const notes: Note[] = await response.json();

    return <AdminNoteLayout data={notes} />
}

export default Dashboard