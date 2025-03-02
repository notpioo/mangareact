
import React, { useState } from "react";
import { Search, Menu, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { SearchBar } from "./search-bar";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-header">
      <div className="container flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-header-foreground hover:bg-header-accent hover:text-header-foreground"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
        
        <div className="flex items-center justify-between flex-1">
          <h1 className="text-xl font-bold tracking-tight text-orange-300">
            MangaTZ
          </h1>

          <div className="flex items-center gap-2">
            {isSearchExpanded ? (
              <div className="relative flex items-center">
                <SearchBar 
                  onClose={() => setIsSearchExpanded(false)} 
                  expanded={true}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-header-foreground hover:bg-header-accent hover:text-header-foreground"
                onClick={() => setIsSearchExpanded(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            <Avatar className="h-8 w-8 bg-orange-300">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
