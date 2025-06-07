import { Note } from '@/types/note';
import { getBaseUrl } from "@/utils/getBaseUrl";
import HomeLayout from "./home-layout";

const App = async () => {
    const baseUrl = await getBaseUrl();

    const res = await fetch(`${baseUrl}/api/notes`, {
        cache: 'force-cache',
        next: { revalidate: 120 },
    });

    const notes: Note[] = await res.json();

    return (
        <HomeLayout notes={notes} />
    );
};

export default App;
