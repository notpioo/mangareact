
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { SearchBar } from "./search-bar";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      onSearchChange("");
    }
  };

  return (
    <div className="sticky top-0 z-10 w-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">MangaVerse</h1>
        <div className="flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center w-full max-w-sm animate-in slide-in-from-right">
              <SearchBar value={searchQuery} onChange={onSearchChange} />
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 text-white hover:bg-orange-600" 
                onClick={toggleSearch}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-orange-600" 
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
