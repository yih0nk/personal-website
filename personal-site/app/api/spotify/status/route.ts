import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=5";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

async function getAccessToken() {
  if (!SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Missing refresh token. Log in at /api/spotify/login first.");
  }

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.error("Error fetching access token:", json);
    throw new Error("Failed to refresh Spotify access token.");
  }

  return json.access_token as string;
}

async function fetchSpotifyData(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [profileRes, recentRes] = await Promise.all([
    fetch(PROFILE_ENDPOINT, { headers }),
    fetch(RECENTLY_PLAYED_ENDPOINT, { headers }),
  ]);

  const profile = await profileRes.json();
  const recent = await recentRes.json();

  return {
    profile,
    recentTracks: Array.isArray(recent.items) ? recent.items : [],
  };
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const data = await fetchSpotifyData(accessToken);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("STATUS ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load Spotify data", recentTracks: [] },
      { status: 500 }
    );
  }
}
