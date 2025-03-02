import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// This component is specifically for the navigation sidebar

export function NavigationSidebar({ isOpen, setIsOpen }: NavigationSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="bg-background border-r border-border w-[250px] p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold text-header-foreground">Menu</h2>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <a href="/" className="flex items-center p-2 rounded-md hover:bg-accent text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="/latest" className="flex items-center p-2 rounded-md hover:bg-accent text-foreground">
                  Latest Updates
                </a>
              </li>
              <li>
                <a href="/popular" className="flex items-center p-2 rounded-md hover:bg-accent text-foreground">
                  Popular Manga
                </a>
              </li>
              <li>
                <a href="/genres" className="flex items-center p-2 rounded-md hover:bg-accent text-foreground">
                  Genres
                </a>
              </li>
              <li>
                <a href="/bookmarks" className="flex items-center p-2 rounded-md hover:bg-accent text-foreground">
                  Bookmarks
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">MangaTZ v1.0</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// New Header component incorporating the sidebar trigger
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="bg-orange-500 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">MangaTZ</h1>
        <SheetTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
      </header>
      <NavigationSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;