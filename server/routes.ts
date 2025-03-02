import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertReadingHistorySchema } from "@shared/schema";
import axios from "axios";

const MANGADEX_API = "https://api.mangadex.org";

export async function registerRoutes(app: Express) {
  // Proxy routes for MangaDex API
  app.get("/api/proxy/manga", async (req, res) => {
    try {
      const { title, limit, offset } = req.query;
      const response = await axios.get(`${MANGADEX_API}/manga`, {
        params: {
          title,
          limit,
          offset,
          'includes[]': ['cover_art', 'author'],
          'contentRating[]': ['safe', 'suggestive'],
          hasAvailableChapters: true,
          'availableTranslatedLanguage[]': ['en'],
          'order[followedCount]': 'desc',
        },
        headers: {
          'User-Agent': 'MangaReader/1.0 (https://yoursite.com; admin@yoursite.com)',
        },
      });

      // Log the cover art data untuk debugging
      const firstManga = response.data.data[0];
      if (firstManga) {
        const coverArt = firstManga.relationships.find((r: any) => r.type === "cover_art");
        console.log("Cover art data:", coverArt);
        
        // Make sure covers are included in the response data
        if (!coverArt || !coverArt.attributes) {
          console.warn("Cover art data missing or incomplete. Check MangaDex API response.");
        }

        // Tambahkan logs detail untuk debugging
        console.log("Cover filename:", coverArt?.attributes?.fileName);
        console.log("Manga ID:", firstManga.id);
      }

      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching manga:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch manga" });
    }
  });

  app.get("/api/proxy/manga/:id", async (req, res) => {
    try {
      const response = await axios.get(`${MANGADEX_API}/manga/${req.params.id}`, {
        params: {
          'includes[]': ['cover_art', 'author', 'artist', 'tag'],
        },
        headers: {
          'User-Agent': 'MangaReader/1.0 (https://yoursite.com; admin@yoursite.com)',
        },
      });

      // Log cover art data untuk debugging
      const manga = response.data.data;
      const coverArt = manga.relationships.find((r: any) => r.type === "cover_art");
      console.log("Single manga cover art:", coverArt);
      
      // Tambahkan logs detail untuk debugging
      if (coverArt && coverArt.attributes) {
        console.log("Cover filename:", coverArt.attributes.fileName);
        console.log("Test URL akses cover:", `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`);
      } else {
        console.warn("Cover art tidak lengkap untuk manga ID:", manga.id);
      }


  // Proxy untuk gambar cover MangaDex
  app.get("/api/proxy/cover/:mangaId/:filename", async (req, res) => {
    try {
      const { mangaId, filename } = req.params;
      const { size } = req.query;
      
      let url = `https://uploads.mangadex.org/covers/${mangaId}/${filename}`;
      
      // Tambahkan ukuran jika ada
      if (size && ['256', '512'].includes(size as string)) {
        url = `${url}.${size}.jpg`;
      }
      
      console.log(`Proxying cover image: ${url}`);
      
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
        headers: {
          'User-Agent': 'MangaReader/1.0 (https://yoursite.com; admin@yoursite.com)',
          'Referer': 'https://mangadex.org/',
          'Accept': 'image/jpeg,image/png,image/webp,image/*,*/*'
        },
        timeout: 10000, // 10 detik timeout
        validateStatus: (status) => status < 500 // Memproses respons 400 agar tidak throw error
      });
      
      // Jika status error, kirim placeholder
      if (response.status >= 400) {
        console.error(`Error status ${response.status} for image: ${url}`);
        // Redirect ke placeholder
        return res.redirect('/placeholder-cover.png');
      }
      
      // Forward semua header dari response
      Object.keys(response.headers).forEach(header => {
        res.setHeader(header, response.headers[header]);
      });
      
      // Set cache control untuk meningkatkan performa
      res.setHeader('Cache-Control', 'public, max-age=86400'); // cache 1 hari
      
      // Kirim data gambar
      response.data.pipe(res);
    } catch (error: any) {
      console.error("Error fetching cover image:", error.message);
      res.redirect('/placeholder-cover.png');
    }
  });


      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching manga details:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch manga details" });
    }
  });

  app.get("/api/proxy/manga/:id/feed", async (req, res) => {
    try {
      const { limit, offset } = req.query;
      const response = await axios.get(`${MANGADEX_API}/manga/${req.params.id}/feed`, {
        params: {
          limit,
          offset,
          'translatedLanguage[]': ['en'],
          'order[chapter]': 'desc',
          'includes[]': ['scanlation_group'],
        },
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching chapters:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch chapters" });
    }
  });

  // Reading history routes
  app.post("/api/reading-history", async (req, res) => {
    try {
      const data = insertReadingHistorySchema.parse(req.body);
      const history = await storage.createReadingHistory(data);
      res.json(history);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/reading-history/:userId", async (req, res) => {
    const history = await storage.getReadingHistory(req.params.userId);
    res.json(history);
  });

  const httpServer = createServer(app);
  return httpServer;
}