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

export function getCoverImage(mangaId: string, filename: string, size?: '256' | '512') {
  if (!filename) return '';
  
  // Menurut dokumentasi MangaDex:
  // Format dasar: https://uploads.mangadex.org/covers/:manga-id/:cover-filename
  // Format thumbnail: https://uploads.mangadex.org/covers/:manga-id/:cover-filename.{256, 512}.jpg
  
  // Coba beberapa format URL untuk meningkatkan kemungkinan berhasil
  try {
    // Jika format URL dengan thumbnail diminta
    if (size) {
      return `https://uploads.mangadex.org/covers/${mangaId}/${filename}.${size}.jpg`;
    }
    
    // Format URL dasar tanpa thumbnail
    return `https://uploads.mangadex.org/covers/${mangaId}/${filename}`;
  } catch (error) {
    console.error("Error membuat URL cover:", error);
    return '/placeholder-cover.png';
  }
}