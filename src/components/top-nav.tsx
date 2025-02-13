"use client"

import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { ModeToggle } from "~/components/mode-toggle"
import { Menu, Search, Settings } from "lucide-react"
import { useSidebar } from "~/components/ui/sidebar"

export function TopNav() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toggleSidebar } = useSidebar()

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <Input
          type="text"
          placeholder="Search in Drive"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 mr-2"
        />
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}

