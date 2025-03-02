import { MangaGrid } from "@/components/manga-grid";
import { Header } from "@/components/header";

interface HomeProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function Home({ searchQuery, onSearchChange }: HomeProps) {
  return (
    <div className="space-y-6">
      <Header searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <div className="p-6">
        <MangaGrid searchQuery={searchQuery} />
      </div>
    </div>
  );
}
