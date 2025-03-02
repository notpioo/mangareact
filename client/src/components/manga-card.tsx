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
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
