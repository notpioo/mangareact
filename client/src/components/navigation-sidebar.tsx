import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Home, Clock, TrendingUp, Tag, Bookmark, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// This component is specifically for the navigation sidebar
export function NavigationSidebar({ isOpen, setIsOpen }: NavigationSidebarProps) {
  const menuItems = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/latest", label: "Latest Updates", icon: <Clock size={18} /> },
    { path: "/popular", label: "Popular Manga", icon: <TrendingUp size={18} /> },
    { path: "/genres", label: "Genres", icon: <Tag size={18} /> },
    { path: "/bookmarks", label: "Bookmarks", icon: <Bookmark size={18} /> },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="p-0">
        <div className="p-6 border-b border-border/40">
          <h2 className="text-2xl font-bold">Menu</h2>
        </div>
        <div className="flex flex-col space-y-3 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30 shadow-sm
                         transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:translate-x-1
                         hover:shadow-md active:scale-95"
            >
              <span className="text-primary">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-auto p-6 border-t border-border/40 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">MangaTZ v1.0</p>
          <Info size={16} className="text-muted-foreground" />
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