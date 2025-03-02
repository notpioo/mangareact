import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import Home from "@/pages/home";
import MangaDetails from "@/pages/manga/[id]";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex">
      <NavigationSidebar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/manga/:id" component={MangaDetails} />
          <Route component={NotFound} />
        </Switch>
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