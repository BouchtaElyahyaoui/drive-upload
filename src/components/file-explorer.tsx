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
import { type Folder, mockFiles } from "~/lib/utils";
import { useFolder } from "~/contexts/folder-context";

export function FileExplorer() {
  const {
    folders,
    currentPath,
    navigateToFolder,
    handleSaveRename,
    handleDelete,
  } = useFolder();
  const currentFolderId = currentPath[currentPath.length - 1]?.id ?? "root";

  const items: Folder[] = folders.filter(
    (folder) => folder.parent === currentFolderId,
  );

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolderId);
  };

  const files = getCurrentFiles().filter(
    (file) => file.type === "file" && file.parent === currentFolderId,
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleRename = (id: string) => {
    setEditingId(id);
    setEditingName(folders.find((item) => item.id === id)?.name ?? "");
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
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {editingId === item.id ? (
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => {
                    handleSaveRename(item.id, editingName);
                    setEditingId(null);
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleSaveRename(item.id, editingName) &&
                    setEditingId(null)
                  }
                  className="w-full"
                />
              ) : (
                <div
                  className="flex items-center"
                  onClick={() =>
                    item.type === "folder" && navigateToFolder(item.id)
                  }
                >
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
              <div className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                {item.name}
              </div>
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
