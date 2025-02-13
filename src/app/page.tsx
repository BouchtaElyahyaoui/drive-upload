"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { FileUploader } from "~/components/file-uploader"
import { FileExplorer } from "~/components/file-explorer"

export default function Home() {
  const [newFolderName, setNewFolderName] = useState("")

  const handleCreateFolder = () => {
    // Implement folder creation logic here
    console.log("Creating folder:", newFolderName)
    setNewFolderName("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="New folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="w-64"
        />
        <Button onClick={handleCreateFolder}>Create Folder</Button>
      </div>
      <FileUploader />
      <FileExplorer />
    </div>
  )
}

