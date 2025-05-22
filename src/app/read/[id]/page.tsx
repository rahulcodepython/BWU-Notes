'use client';

import React, { useEffect, useState } from 'react';
import MarkdownRender from "@/components/MarkdownRender";
import matter from 'gray-matter';
import { useParams } from 'next/navigation';

const Reading = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [content, setContent] = useState<string>('');
    const [data, setData] = useState<{ title: string; description: string }>({ title: '', description: '' });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/read?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store'
                });
                const responseData = await response.json();
                if (!response.ok) {
                    setError(responseData.message || 'Failed to fetch data');
                } else {
                    const { content, data } = matter(responseData);
                    setContent(content);
                    setData({
                        title: typeof data.title === 'string' ? data.title : '',
                        description: typeof data.description === 'string' ? data.description : ''
                    });
                }
            } catch {
                setError('Unknown error');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto my-20 px-6 py-4 rounded-lg w-full flex flex-col items-center gap-4 bg-darkgreen-100/30 flex-1">
                <h1 className="text-3xl md:text-5xl font-bold w-full text-center text-darkgreen-800">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto my-20 px-6 py-4 rounded-lg w-full flex flex-col items-center gap-4 bg-darkgreen-100/30 flex-1">
                <h1 className="text-3xl md:text-5xl font-bold w-full text-center text-darkgreen-800">Error</h1>
                <p className="text-gray-500 text-sm">
                    {error}
                </p>
            </div>
        );
    }

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