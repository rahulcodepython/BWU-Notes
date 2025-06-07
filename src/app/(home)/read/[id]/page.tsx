import MarkdownRender from "@/components/MarkdownRender";
import { getBaseUrl } from '@/utils/getBaseUrl';
import matter from 'gray-matter';

const Reading = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const baseUrl = await getBaseUrl()

    const response = await fetch(`${baseUrl}/api/read?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: { revalidate: 120 },
    });

    if (!response.ok) {
        return <article className="container mx-auto my-20 px-6 py-4 rounded-lg w-full flex flex-col items-center gap-4 bg-darkgreen-100/30 flex-1">
            No note found with this ID.
            <p className="text-gray-500 text-sm">Please check the URL or try again later.</p>
        </article>
    }

    const responseData = await response.json();

    const { content, data } = matter(responseData);

    return (
        <article className="container mx-auto my-20 px-6 py-4 rounded-lg w-full flex flex-col items-center gap-4 bg-darkgreen-100/30 flex-1">
            <h1 className="text-3xl md:text-5xl font-bold w-full text-center text-darkgreen-800">{data.title}</h1>
            <div>
                <p className="text-gray-500 text-sm">{data.description}</p>
            </div>
            <div className='prose pt-10' style={{ maxWidth: '100%' }}>
                <MarkdownRender>{content}</MarkdownRender>
            </div>
        </article>
    );
};

export default Reading;