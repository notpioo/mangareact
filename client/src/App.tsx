import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import Home from "@/pages/home";
import MangaDetails from "@/pages/manga/[id]";
import NotFound from "@/pages/not-found";
import { useState } from "react";
import { BottomNavigation } from "@/components/bottom-navigation";

function Router() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex">
      <NavigationSidebar />
      <main className="flex-1">
        <Switch>
          <Route path="/">
            <Home searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </Route>
          <Route path="/manga/:id" component={MangaDetails} />
          <Route component={NotFound} />
        </Switch>
        <BottomNavigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;