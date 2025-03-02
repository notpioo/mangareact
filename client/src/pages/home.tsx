
import { useState } from "react";
import { MangaGrid } from "@/components/manga-grid";

interface HomeProps {
  searchQuery: string;
}

export function Home({ searchQuery }: HomeProps) {
  return (
    <div className="space-y-6">
      <div className="p-6">
        <MangaGrid searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Home;
