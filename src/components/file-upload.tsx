"use client"

import uploadMedia from "@/api/upload.media.api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiHandler } from "@/hooks/useApiHandler"
import { Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface FileUploadProps {
    label: string
    onChange: (field: string, url: string) => void
    field: string
    accept: 'pdf' | 'md'
    value: string
}

export default function FileUpload({ label, onChange, field, accept, value }: FileUploadProps) {
    const [previousValue, setPreviousValue] = useState<string | null>(null)

    const { isLoading, callApi } = useApiHandler()

    const fileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (value) {
            setPreviousValue(value);
        } else {
            setPreviousValue(null);
        }
    }, [value])

    const handleFileChange = async () => {
        const selectedFile = fileRef.current?.files?.[0]
        if (selectedFile) {
            const uploadResponse = await callApi(() => uploadMedia(selectedFile, accept))

            if (uploadResponse) {
                onChange(field, uploadResponse.downloadUrl);
                setPreviousValue(uploadResponse.downloadUrl);
                fileRef.current!.value = "" // Clear the file input after upload
                toast.success("File uploaded successfully");
            }
        }
    }


    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <div className="flex items-center gap-2">
                <Input type="file" className="flex-1" accept={accept + '/*'} ref={fileRef} />
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleFileChange}
                    disabled={isLoading}
                >
                    <Upload className="h-4 w-4" />
                </Button>
            </div>
            {
                previousValue && previousValue.length > 2 && !isLoading ?
                    <div className="flex items-center gap-2 p-3 border rounded-md bg-muted">
                        <span className="flex-1 text-sm truncate">{previousValue}</span>
                    </div> : null
            }
        </div>
    )
}