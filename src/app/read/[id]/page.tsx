import React from 'react'
import MarkdownRender from "@/components/MarkdownRender";
import matter from 'gray-matter';

const Reading = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const response = await fetch(`${process.env.API_URL}/api/read?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })

    const responseData = await response.json();

    if (!response.ok) {
        return (
            <div className="container mx-auto my-20 px-6 py-4 rounded-lg w-full flex flex-col items-center gap-4 bg-darkgreen-100/30 flex-1">
                <h1 className="text-3xl md:text-5xl font-bold w-full text-center text-darkgreen-800">Error</h1>
                <p className="text-gray-500 text-sm">
                    {responseData.message}
                </p>
            </div>
        )
    }


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
    )
}

export default Reading