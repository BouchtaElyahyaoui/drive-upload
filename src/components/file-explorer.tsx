"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  File as FileIcon,
  Folder as FolderIcon,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type Folder, type File, mockFiles, mockFolders } from "~/lib/utils";

export function FileExplorer() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  };

  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder);
  };

  const [folders, setFolders] = useState<Folder[]>(getCurrentFolders());
  const [files, setCurrentFiles] = useState<File[]>(getCurrentFiles());

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleRename = (id: string) => {
    setEditingId(id);
    setEditingName(folders.find((item) => item.id === id)?.name ?? "");
  };

  const handleSaveRename = () => {
    setFolders((prevItems) =>
      prevItems.map((item) =>
        item.id === editingId ? { ...item, name: editingName } : item,
      ),
    );
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setFolders((prevItems) => prevItems.filter((item) => item.id !== id));
  };

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
        {folders.map((item) => (
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
                  {item.type === "folder" ? (
                    <FolderIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <FileIcon className="mr-2 h-4 w-4" />
                  )}
                  {item.name}
                </div>
              )}
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
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
        {files.map((item) => (
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
                  <FileIcon className="mr-2 h-4 w-4" />
                  {item.name}
                </div>
              )}
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
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
  );
}
