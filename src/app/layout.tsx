import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { SidebarProvider } from "~/components/ui/sidebar";
import { TopNav } from "~/components/top-nav";
import { Sidebar } from "~/components/sidebar";
import type React from "react"; // Added import for React
import { FolderProvider } from "~/contexts/folder-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Drive Clone",
  description:
    "A web application that mimics the core functionality of Google Drive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <FolderProvider>
              <div className="flex h-screen w-screen">
                <Sidebar />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <TopNav />
                  <main className="flex-1 overflow-auto px-10 py-4">
                    {children}
                  </main>
                </div>
              </div>
            </FolderProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
