export type SubjectType = "Design and Analysis of Algorithm (P)" | "Design and Analysis of Algorithm (T)" | "PHP and MySQL Lab" | "Full Stack Development - I (P)" | "Full Stack Development - I (T)" | "Sustainability in Indian Knowledge System" | "Computer Network" | "Alternative English" | "Aptitude"

export type FileFormatType = "PDF" | "Markdown"

export type FileCategoryType = "Lab Assignment Question" | "Lab Assignment Answer" | "Class Assignment Question" | "Class Assignment Answer" | "Suggestion" | "Study Material" | "Notes" | "Question Paper" | "Answer Key" | "Syllabus" | "Question Paper CT-1 Set-1" | "Question Paper CT-1 Set-2" | "Question Paper CT-2 Set-1" | "Question Paper CT-2 Set-2" | "Answer Paper CT-1 Set-1" | "Answer Paper CT-1 Set-2" | "Answer Paper CT-2 Set-1" | "Answer Paper CT-2 Set-2" | "Lab Assignment Front & Index Page" | "Theory Assignment Front & Index Page" | "Others"


export interface Note {
    _id: number;
    subject: SubjectType;
    title: string;
    description: string;
    fileCategory: FileCategoryType;
    format: FileFormatType;
    author: string;
    link: string;
}

export interface NoteFormData {
    _id?: number
    uploader: string
    subject: SubjectType | ''
    fileCategory: FileCategoryType | ''
    fileFormat: FileFormatType | ''
    title: string
    description: string
    link: string
}