import axios from "axios";
import type { Manga, Chapter } from "@shared/schema";

const api = axios.create({
  baseURL: "/api/proxy",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function searchManga(query: string, limit = 20, offset = 0) {
  const response = await api.get("/manga", {
    params: {
      title: query,
      limit,
      offset,
    },
  });
  return response.data.data as Manga[];
}

export async function getManga(id: string) {
  const response = await api.get(`/manga/${id}`);
  return response.data.data as Manga;
}

export async function getChapters(mangaId: string, limit = 100, offset = 0) {
  const response = await api.get(`/manga/${mangaId}/feed`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data.data as Chapter[];
}

export function getCoverImage(mangaId: string, coverId: string) {
  if (!coverId) return '';
  // We need to fetch the cover art entity to get the filename
  return `https://uploads.mangadex.org/covers/${mangaId}/${coverId}.256.jpg`;
}