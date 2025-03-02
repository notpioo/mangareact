
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      onChange("");
    }
  };

  return (
    <div className="relative flex items-center">
      {isOpen ? (
        <div className="flex w-full items-center">
          <Input
            type="text"
            placeholder="Search manga..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-l-md border-r-0"
            autoFocus
          />
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none border-l-0"
            onClick={toggleSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="ml-auto"
          onClick={toggleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
