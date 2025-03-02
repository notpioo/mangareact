import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Manga } from "@shared/schema";

interface MangaCardProps {
  manga: Manga;
  coverUrl: string;
}

export function MangaCard({ manga, coverUrl }: MangaCardProps) {
  const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0];

  return (
    <Link href={`/manga/${manga.id}`}>
      <Card className="overflow-hidden cursor-pointer transition-transform hover:scale-105">
        <div className="aspect-[3/4] relative">
          <img
            src={coverUrl}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
            onError={(e) => {
              console.error(`Failed to load image for ${title}:`, coverUrl);

              // Coba fallback dengan format yang berbeda melalui proxy
              try {
                if (!e.currentTarget) {
                  console.error("Error: currentTarget is null");
                  return;
                }

                if (coverUrl.includes('size=256')) {
                  // Coba tanpa size (format asli)
                  const originalUrl = coverUrl.replace('?size=256', '');
                  console.log("Trying original format through proxy:", originalUrl);
                  e.currentTarget.src = originalUrl;

                  // Jika masih gagal, coba ukuran 512px
                  e.currentTarget.onerror = (event) => {
                    try {
                      const target = event.currentTarget as HTMLImageElement;
                      if (!target) {
                        console.error("Error: target is null in first fallback");
                        return;
                      }

                      const largerUrl = coverUrl.replace('size=256', 'size=512');
                      console.log("Trying 512px format through proxy:", largerUrl);
                      target.src = largerUrl;
                    } catch (err) {
                      console.error("Error in secondary fallback:", err);
                    }
                  };
                } else if (!coverUrl.includes('?size=')) {
                  // Try adding .jpg extension if missing
                  const jpgUrl = `${coverUrl}.jpg`;
                  console.log("Trying with jpg extension:", jpgUrl);
                  e.currentTarget.src = jpgUrl;

                  e.currentTarget.onerror = () => {
                    console.error(`All formats failed for ${title}`);
                    e.currentTarget.src = '/placeholder-cover.png';
                  };
                } else {
                  // Direct to placeholder
                  console.error(`Format not recognized for ${title}`);
                  e.currentTarget.src = '/placeholder-cover.png';
                }
              } catch (err) {
                console.error("Error in image error handling:", err);
              }
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}