
import { Link, useLocation } from "wouter";
import { Home, Library, History } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full h-16 bg-gradient-to-r from-orange-500 to-amber-500 md:hidden">
      <div className="grid h-full grid-cols-3">
        <Link href="/">
          <a className={cn(
            "flex flex-col items-center justify-center text-white",
            location === "/" ? "bg-white/20" : "hover:bg-white/10"
          )}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        <Link href="/library">
          <a className={cn(
            "flex flex-col items-center justify-center text-white",
            location === "/library" ? "bg-white/20" : "hover:bg-white/10"
          )}>
            <Library className="h-6 w-6" />
            <span className="text-xs mt-1">Library</span>
          </a>
        </Link>
        <Link href="/history">
          <a className={cn(
            "flex flex-col items-center justify-center text-white",
            location === "/history" ? "bg-white/20" : "hover:bg-white/10"
          )}>
            <History className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
