"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "~/components/ui/progress";
import { Upload } from "lucide-react";

export function FileUploader() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate file upload progress
    let progress = 0;
    // use files size to calculate progress
    const totalSize = acceptedFiles.reduce((acc, file) => acc + file.size, 0);

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${
        isDragActive ? "border-primary" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2">
        Drag &amp; drop files here, or click to select files
      </p>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} className="mt-4" />
      )}
    </div>
  );
}
