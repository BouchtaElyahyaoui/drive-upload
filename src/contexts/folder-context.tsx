"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { mockFolders, type Folder } from "~/lib/utils";

type FolderContextType = {
  folders: Folder[];
  currentPath: Folder[];
  addFolder: (name: string, parentId: string | null) => void;
  navigateToFolder: (folderId: string) => void;
  handleSaveRename: (id: string, editingName: string) => void;
  handleDelete: (id: string) => void;
};

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(mockFolders);

  const [currentPath, setCurrentPath] = useState<Folder[]>([
    folders.find((f) => f.id === "root")!,
  ]);

  const addFolder = (name: string, parentId: string | null) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      type: "folder",
      parent: parentId,
    };
    setFolders([...folders, newFolder]);
  };

  const navigateToFolder = (folderId: string) => {
    const newPath: Folder[] = [];
    let currentFolder: Folder | undefined = folders.find(
      (f) => f.id === folderId,
    );

    while (currentFolder) {
      newPath.unshift(currentFolder);
      currentFolder = folders.find((f) => f.id === currentFolder?.parent);
    }

    setCurrentPath(newPath);
  };

  const handleSaveRename = (id: string, editingName: string) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === id) {
        return { ...folder, name: editingName };
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  const handleDelete = (id: string) => {
    const updatedFolders = folders.filter((folder) => folder.id !== id);
    setFolders(updatedFolders);
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        currentPath,
        addFolder,
        navigateToFolder,
        handleSaveRename,
        handleDelete,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolder() {
  const context = useContext(FolderContext);
  if (context === undefined) {
    throw new Error("useFolder must be used within a FolderProvider");
  }
  return context;
}
