
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { getManga, getChapters, getCoverImage } from "@/lib/mangadex";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, Loader2 } from "lucide-react";
import { Header } from "@/components/header";

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

export function MangaDetails() {
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
  const coverFilename = coverArt?.attributes?.fileName;

  // Construct proper cover URL and add logging for debugging
  console.log("Manga detail cover art:", coverArt);

  // Gunakan proxy untuk gambar
  let coverUrl = '/placeholder-cover.png';
  
  if (coverFilename) {
    // Gunakan ukuran 512px untuk detail page
    coverUrl = getCoverImage(manga.id, coverFilename, '512');
    console.log("Using proxy cover URL:", coverUrl);
  }

  console.log("Final cover URL:", coverUrl);

  return (
    <div>
      <Header searchQuery="" onSearchChange={() => {}} />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          <div>
            <Card className="overflow-hidden">
              <img 
                src={coverUrl} 
                alt={title} 
                className="w-full" 
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load detail image for ${title}:`, coverUrl);

                  // Coba format dengan thumbnail jika format asli gagal
                  if (!coverUrl.includes('.jpg') && !coverUrl.includes('.png')) {
                    const withExtension = `${coverUrl}.jpg`;
                    console.log("Trying with .jpg extension:", withExtension);
                    e.currentTarget.src = withExtension;

                    e.currentTarget.onerror = () => {
                      // Coba dengan format .512.jpg
                      const largeThumb = `${coverUrl}.512.jpg`;
                      console.log("Trying 512px format:", largeThumb);
                      e.currentTarget.src = largeThumb;
                    };
                  }
                }}
              />
            </Card>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground mt-2">{description}</p>
            </div>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">Chapters</h2>
                {isLoadingChapters ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : chapters && chapters.length > 0 ? (
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-2">
                      {chapters.map((chapter) => (
                        <Button
                          key={chapter.id}
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Book className="mr-2 h-4 w-4" />
                          {chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-center py-10 text-muted-foreground">No chapters available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaDetails;
