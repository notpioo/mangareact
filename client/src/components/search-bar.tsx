
import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  onClose?: () => void;
  expanded?: boolean;
}

export function SearchBar({ onClose, expanded = false }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  // Handle click outside to close
  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) && onClose) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded, onClose]);

  return (
    <div className={`relative flex items-center ${expanded ? 'w-64' : 'w-full'}`}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search manga..."
          className="pl-10 pr-10 h-10 bg-background focus-visible:ring-orange-300"
        />
        {expanded && onClose && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>
  );
}
