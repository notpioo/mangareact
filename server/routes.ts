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
          includes: ["cover_art"],
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