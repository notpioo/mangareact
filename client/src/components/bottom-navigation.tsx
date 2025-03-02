import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SearchBar } from "./search-bar";

interface FloatingSearchButtonProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function BottomNavigation({ searchQuery, onSearchChange }: FloatingSearchButtonProps) {
  const [showSearch, setShowSearch] = useState(false);

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

      <button
        onClick={() => setShowSearch(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-orange-500 text-white shadow-lg md:hidden z-40 flex items-center justify-center"
      >
        <Search className="h-6 w-6" />
      </button>
    </>
  );
}