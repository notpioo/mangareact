
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/home";
import { MangaDetails } from "./pages/manga/[id]";
import { Header } from "./components/header";
import { NavigationSidebar } from "./components/navigation-sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="mangatx-ui-theme">
        <div className="min-h-screen bg-background">
          <Header onMenuToggle={toggleSidebar} />
          <NavigationSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          <main className="container mx-auto px-4 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manga/:id" element={<MangaDetails />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
