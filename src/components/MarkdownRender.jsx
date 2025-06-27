"use client"
import { CopyIcon } from "@radix-ui/react-icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRender = ({ children }) => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
    };
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
                table: ({ children }) => (
                    <table className="w-full border-collapse border border-gray-300">{children}</table>
                ),
                th: ({ children }) => (
                    <th className="border border-gray-300 bg-gray-200 px-4 py-2 text-left">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="border border-gray-300 px-4 py-2">{children}</td>
                ),
                pre: ({ children, className }) => {
                    const codeText = children?.props.children;

                    return <pre className="relative p-4 m-0 rounded-md">
                        {children}
                        <div className='absolute right-4 top-4'>
                            <CopyIcon className='w-4 h-4 cursor-pointer' onClick={() => handleCopy(codeText)} />
                        </div>
                    </pre>
                },
                strong: ({ children }) => (
                    <strong className="font-bold text-darkgreen-800">{children}</strong>
                ),
            }}>
            {children}
        </Markdown>
    )
}

export default MarkdownRender