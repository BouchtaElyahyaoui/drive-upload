"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Progress } from "~/components/ui/progress"
import { Upload } from "lucide-react"

export function FileUploader() {
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate file upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        // Implement actual file upload logic here
        console.log("Files uploaded:", acceptedFiles)
      }
    }, 500)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
        isDragActive ? "border-primary" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2">Drag &amp; drop files here, or click to select files</p>
      {uploadProgress > 0 && uploadProgress < 100 && <Progress value={uploadProgress} className="mt-4" />}
    </div>
  )
}

