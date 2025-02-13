"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { File, Folder, MoreVertical, Pencil, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"

type Item = {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  modifiedAt: string
}

export function FileExplorer() {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Documents", type: "folder", modifiedAt: "2023-05-01" },
    { id: "2", name: "Images", type: "folder", modifiedAt: "2023-05-02" },
    { id: "3", name: "report.pdf", type: "file", size: "2.5 MB", modifiedAt: "2023-05-03" },
    { id: "4", name: "presentation.pptx", type: "file", size: "5.1 MB", modifiedAt: "2023-05-04" },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const handleRename = (id: string) => {
    setEditingId(id)
    setEditingName(items.find((item) => item.id === id)?.name || "")
  }

  const handleSaveRename = () => {
    setItems((prevItems) => prevItems.map((item) => (item.id === editingId ? { ...item, name: editingName } : item)))
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {editingId === item.id ? (
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleSaveRename}
                  onKeyPress={(e) => e.key === "Enter" && handleSaveRename()}
                  className="w-full"
                />
              ) : (
                <div className="flex items-center">
                  {item.type === "folder" ? <Folder className="mr-2 h-4 w-4" /> : <File className="mr-2 h-4 w-4" />}
                  {item.name}
                </div>
              )}
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.size || "-"}</TableCell>
            <TableCell>{item.modifiedAt}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleRename(item.id)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

