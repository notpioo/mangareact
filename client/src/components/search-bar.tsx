import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Mobile View */}
      <div className="md:hidden flex items-center w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="z-10"
        >
          <Search className="h-5 w-5" />
        </Button>
        <div
          className={cn(
            "absolute left-0 right-0 transition-all duration-200 ease-in-out",
            isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          )}
        >
          <div className="flex items-center bg-background border rounded-md">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search manga..."
              className="border-0"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsExpanded(false);
                onChange("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search manga..."
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}