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
          includes: ["cover_art"],
          'order[followedCount]': 'desc',
          'contentRating[]': ['safe', 'suggestive'],
          'hasAvailableChapters': true,
          'availableTranslatedLanguage[]': ['en']
        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch manga" });
    }
  });

  app.get("/api/proxy/manga/:id", async (req, res) => {
    try {
      const response = await axios.get(`${MANGADEX_API}/manga/${req.params.id}`, {
        params: {
          includes: ["cover_art", "author", "artist"],
        },
      });
      res.json(response.data);
    } catch (error) {
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
          translatedLanguage: ["en"],
          order: { chapter: "desc" },
        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chapters" });
    }
  });

  // Cover proxy route
  app.get("/api/proxy/cover/:mangaId/:fileName", async (req, res) => {
    try {
      const { mangaId, fileName } = req.params;
      const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;

      const response = await axios.get(coverUrl, {
        responseType: 'stream',
        timeout: 5000
      });

      // Set cache headers
      res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.set('Content-Type', response.headers['content-type']);

      response.data.pipe(res);
    } catch (error) {
      console.error('Error fetching cover:', error.message);
      res.status(500).json({ error: "Failed to fetch cover" });
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