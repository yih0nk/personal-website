import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: [
      "user-read-recently-played",
      "user-read-private",
      "user-read-email",
      "playlist-read-private",
      "playlist-read-collaborative"
    ].join(" ")
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(url);
}


