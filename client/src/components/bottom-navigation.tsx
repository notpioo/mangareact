
import { Search, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";

interface SearchToggleProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function BottomNavigation({ searchQuery, onSearchChange }: SearchToggleProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {showSearch && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Search Manga</h3>
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>
        </div>
      )}

      <div className="sticky bottom-4 md:hidden w-full flex justify-center z-40">
        <Button
          onClick={() => setShowSearch(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white shadow-md rounded-full px-6"
        >
          <Search className="h-4 w-4 mr-2" />
          <span>Search</span>
        </Button>
      </div>
    </>
  );
}
