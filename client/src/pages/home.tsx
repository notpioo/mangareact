
import { useState } from "react";
import { MangaGrid } from "@/components/manga-grid";
import { Header } from "@/components/header";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-6">
        <MangaGrid searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Home;
