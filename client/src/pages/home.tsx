import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { MangaGrid } from "@/components/manga-grid";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-xl mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <MangaGrid searchQuery={searchQuery} />
    </div>
  );
}
