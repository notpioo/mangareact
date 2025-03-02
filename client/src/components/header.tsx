
import React from "react";
import { SearchBar } from "./search-bar";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 w-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">MangaVerse</h1>
        <div className="max-w-md w-full">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </div>
  );
}
