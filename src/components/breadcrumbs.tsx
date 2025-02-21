"use client";

import { ChevronRight, Home } from "lucide-react";
import { useFolder } from "~/contexts/folder-context";
import { Button } from "./ui/button";

export function Breadcrumbs() {
  const { currentPath, navigateToFolder } = useFolder();

  return (
    <nav className="flex items-center space-x-1 text-sm">
      <Button
        variant="ghost"
        size="sm"
        className="h-8"
        onClick={() => navigateToFolder("root")}
      >
        <Home className="h-4 w-4" />
      </Button>
      {currentPath.slice(1).map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 ${index === currentPath.length - 2 ? "font-semibold" : ""}`}
            onClick={() => navigateToFolder(folder.id)}
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </nav>
  );
}
