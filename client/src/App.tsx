import React, { useState } from "react";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/home";
import { MangaDetails } from "./pages/manga/[id]";
import { Header } from "./components/header";
import { NavigationSidebar } from "./components/navigation-sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="mangatx-ui-theme">
      <div className="min-h-screen bg-background">
        <Header 
          onMenuToggle={toggleSidebar} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <NavigationSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main className="container mx-auto px-4 py-4">
          <Switch>
            <Route path="/">
              <Home searchQuery={searchQuery} />
            </Route>
            <Route path="/manga/:id" component={MangaDetails} />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;