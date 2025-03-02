import { useInfiniteQuery } from "@tanstack/react-query";
import { MangaCard } from "./manga-card";
import { searchManga, getCoverImage } from "@/lib/mangadex";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
          page.map((manga) => {
            const cover = manga.relationships.find((r) => r.type === "cover_art");
            return (
              <MangaCard
                key={manga.id}
                manga={manga}
                coverUrl={getCoverImage(manga.id, cover?.id || "")}
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
