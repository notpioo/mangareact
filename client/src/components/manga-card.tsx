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
              
              // Sequence of fallbacks to try different formats
              if (coverUrl.includes('.256.jpg')) {
                // Try without size suffix first
                const originalUrl = coverUrl.replace('.256.jpg', '');
                console.log("Trying original format:", originalUrl);
                e.currentTarget.src = originalUrl;
                
                // If that fails, try .512 version
                e.currentTarget.onerror = () => {
                  const largerUrl = coverUrl.replace('.256.jpg', '.512.jpg');
                  console.log("Trying 512px format:", largerUrl);
                  e.currentTarget.src = largerUrl;
                  
                  // If that also fails, use placeholder
                  e.currentTarget.onerror = () => {
                    console.error(`All formats failed for ${title}`);
                    e.currentTarget.src = '/placeholder-cover.png';
                  };
                };
              } else if (!coverUrl.includes('.jpg') && !coverUrl.includes('.png')) {
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
