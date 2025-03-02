import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { getManga, getChapters, getCoverImage } from "@/lib/mangadex";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, Loader2 } from "lucide-react";

export default function MangaDetails() {
  const { id } = useParams();

  const { data: manga, isLoading: isLoadingManga } = useQuery({
    queryKey: ["manga", id],
    queryFn: () => getManga(id),
  });

  const { data: chapters, isLoading: isLoadingChapters } = useQuery({
    queryKey: ["chapters", id],
    queryFn: () => getChapters(id),
  });

  if (isLoadingManga || !manga) {
    return <MangaDetailsSkeleton />;
  }

  const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0];
  const description = manga.attributes.description.en || Object.values(manga.attributes.description)[0];
  const coverArt = manga.relationships.find((r) => r.type === "cover_art");
  const coverFilename = coverArt ? `${coverArt.id}` : "";
  const coverUrl = getCoverImage(manga.id, coverFilename);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
        <div>
          <Card className="overflow-hidden">
            <img src={coverUrl} alt={title} className="w-full" />
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Chapters</h2>
              {isLoadingChapters ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {chapters?.map((chapter) => (
                      <Button
                        key={chapter.id}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <Book className="w-4 h-4 mr-2" />
                        Chapter {chapter.attributes.chapter}: {chapter.attributes.title}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MangaDetailsSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
        <Skeleton className="h-[400px]" />
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-2/3 mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    </div>
  );
}