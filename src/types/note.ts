export type Subject = "Design and Analysis of Algorithm (P)" | "Design and Analysis of Algorithm (T)" | "PHP and MySQL Lab" | "Full - Stack Development - I (P)" | "Full - Stack Development - I (T)" | "Sustainability in Indian Knowledge System" | "Computer Network" | "Alternative English"

export type Format = "PDF" | "Image" | "Markdown"

export interface Note {
    id: number;
    subject: Subject;
    title: string;
    description: string;
    format: Format;
    pages?: number;
    author: string;
    link?: string;
}