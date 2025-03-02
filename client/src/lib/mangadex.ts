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
  
  // Gunakan proxy server untuk mengatasi masalah CORS
  try {
    // Base URL untuk proxy
    const baseUrl = `/api/proxy/cover/${mangaId}/${filename}`;
    
    // Tambahkan parameter size jika ada
    if (size) {
      return `${baseUrl}?size=${size}`;
    }
    
    return baseUrl;
  } catch (error) {
    console.error("Error membuat URL cover:", error);
    return '/placeholder-cover.png';
  }
}