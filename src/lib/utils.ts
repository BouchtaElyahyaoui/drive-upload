import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface File {
  id: string;
  name: string;
  type: "file";
  url: string;
  parent: string;
  size: string;
}

export type Folder = {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
};

export const mockFolders: Folder[] = [
  { id: "root", name: "Root", type: "folder", parent: null },
  { id: "1", name: "Documents", type: "folder", parent: "root" },
  { id: "2", name: "Images", type: "folder", parent: "root" },
  { id: "3", name: "Work", type: "folder", parent: "root" },
  { id: "4", name: "Personal", type: "folder", parent: "3" },
];

export const mockFiles: File[] = [
  {
    id: "1",
    name: "Resume.pdf",
    type: "file",
    url: "https://example.com/files/resume.pdf",
    parent: "root",
    size: "500KB",
  },
  {
    id: "2",
    name: "CoverLetter.docx",
    type: "file",
    url: "https://example.com/files/coverletter.docx",
    parent: "root",
    size: "300KB",
  },
  {
    id: "3",
    name: "Photo1.jpg",
    type: "file",
    url: "https://example.com/files/photo1.jpg",
    parent: "2",
    size: "2MB",
  },
  {
    id: "4",
    name: "Photo2.png",
    type: "file",
    url: "https://example.com/files/photo2.png",
    parent: "2",
    size: "1.5MB",
  },
  {
    id: "5",
    name: "Presentation.pptx",
    type: "file",
    url: "https://example.com/files/presentation.pptx",
    parent: "3",
    size: "3MB",
  },
  {
    id: "6",
    name: "Report.pdf",
    type: "file",
    url: "https://example.com/files/report.pdf",
    parent: "3",
    size: "1.2MB",
  },
];
