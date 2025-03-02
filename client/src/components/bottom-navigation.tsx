
import { Link, useLocation } from "wouter";
import { Home, Library, History, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SearchBar } from "./search-bar";

interface BottomNavigationProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function BottomNavigation({ searchQuery, onSearchChange }: BottomNavigationProps) {
  const [location] = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const items = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/library", icon: Library, label: "Library" },
    { href: "/history", icon: History, label: "History" },
  ];

  return (
    <>
      {showSearch && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Search Manga</h3>
              <button 
                onClick={() => setShowSearch(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md md:hidden z-40">
        <div className="flex items-center justify-around">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-4",
                location === item.href ? "text-orange-500" : "text-gray-500"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center py-2 px-4 text-gray-500"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </button>
        </div>
      </div>
    </>
  );
}
