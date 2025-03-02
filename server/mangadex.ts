import axios from "axios";

const MANGADEX_API = "https://api.mangadex.org";

let accessToken: string | null = null;

async function getAccessToken() {
  if (!process.env.MANGADEX_CLIENT_ID || !process.env.MANGADEX_CLIENT_SECRET) {
    throw new Error("MangaDex credentials not configured");
  }

  try {
    const response = await axios.post(`${MANGADEX_API}/auth/login`, {
      username: process.env.MANGADEX_USERNAME,
      password: process.env.MANGADEX_PASSWORD,
    });

    accessToken = response.data.token.session;
    return accessToken;
  } catch (error) {
    console.error("Failed to get MangaDex access token:", error);
    throw error;
  }
}

export async function getMangaDexClient() {
  if (!accessToken) {
    await getAccessToken();
  }

  return axios.create({
    baseURL: MANGADEX_API,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
