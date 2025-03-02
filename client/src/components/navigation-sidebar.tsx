
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home,
  Library,
  History,
  Menu,
  X,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import {
  Sidebar,
  SidebarSection,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger
} from "./ui/sidebar";

export function NavigationSidebar() {
  const [location] = useLocation();

  return (
    <aside className="h-full">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">MangaVerse</h2>
          <SidebarTrigger className="md:hidden text-white hover:bg-white/20 hover:text-white" />
        </div>
      </SidebarHeader>

      <SidebarSection>
        <SidebarMenu>
          <Link href="/">
            <SidebarMenuItem 
              active={location === "/"} 
              className="text-white hover:bg-white/20 hover:text-white data-[active=true]:bg-white/20"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </SidebarMenuItem>
          </Link>
          <Link href="/library">
            <SidebarMenuItem 
              active={location === "/library"} 
              className="text-white hover:bg-white/20 hover:text-white data-[active=true]:bg-white/20"
            >
              <Library className="w-4 h-4" />
              <span>Library</span>
            </SidebarMenuItem>
          </Link>
          <Link href="/history">
            <SidebarMenuItem 
              active={location === "/history"} 
              className="text-white hover:bg-white/20 hover:text-white data-[active=true]:bg-white/20"
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarSection>
      
      <div className="mt-auto p-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}
