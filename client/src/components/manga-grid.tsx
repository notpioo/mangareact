import { useInfiniteQuery } from "@tanstack/react-query";
import { MangaCard } from "./manga-card";
import { searchManga, getCoverImage } from "@/lib/mangadex";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Manga } from "@shared/schema";

interface MangaGridProps {
  searchQuery: string;
}

export function MangaGrid({ searchQuery }: MangaGridProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["manga", searchQuery],
    queryFn: ({ pageParam = 0 }) => searchManga(searchQuery, 20, pageParam),
    getNextPageParam: (_, pages) => pages.length * 20,
    initialPageParam: 0
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.pages.map((page) =>
          page.map((manga: Manga) => {
            const coverArt = manga.relationships.find((r) => r.type === "cover_art");
            // Log cover art data untuk debugging
            console.log("Processing manga:", manga.id, "Cover art:", coverArt);
            const coverFilename = coverArt?.attributes?.fileName;
            
            // Debugging info lebih detail
            console.log(`Manga ${manga.id} cover filename:`, coverFilename);
            
            // Gunakan fungsi getCoverImage untuk mendapatkan URL dengan proxy
            let coverUrl = '/placeholder-cover.png';
            
            if (coverFilename) {
              // Gunakan ukuran 256px untuk grid
              coverUrl = getCoverImage(manga.id, coverFilename, '256');
              console.log("Generated cover URL with proxy:", coverUrl);
            }
              
            return (
              <MangaCard
                key={manga.id}
                manga={manga}
                coverUrl={coverUrl}
              />
            );
          })
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}