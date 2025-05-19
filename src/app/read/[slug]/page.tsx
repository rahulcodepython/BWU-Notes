import React from 'react'
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import MarkdownRender from "@/components/MarkdownRender";
import matter from 'gray-matter';

export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), "content");
    const files = fs.readdirSync(contentDir);

    return files.map((file) => ({
        slug: file.replace(".md", ""),
    }));
}

const Reading = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "content", `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);

    return (
        <article className="container mx-auto my-20 px-6 py-4 rounded-lg w-full flex flex-col items-center gap-4 bg-darkgreen-100/30">
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