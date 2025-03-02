import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  Home,
  Library,
  History,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function NavigationSidebar() {
  const [location] = useLocation();
  const [expanded, setExpanded] = useState(false);

  const items = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/library", icon: Library, label: "Library" },
    { href: "/history", icon: History, label: "History" },
  ];

  return (
    <div
      className={cn(
        "h-screen border-r flex flex-col transition-all",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {expanded && <h1 className="font-bold text-xl text-orange-500">MangaTZ</h1>}
        <div className="flex gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={location === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  !expanded && "justify-center"
                )}
              >
                <item.icon className="h-4 w-4" />
                {expanded && <span className="ml-2">{item.label}</span>}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}