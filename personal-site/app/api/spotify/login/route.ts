import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    // Scopes we need:
    // - profile info
    // - playlists
    // - recently played tracks
    const scope = [
        "user-read-email",
        "user-read-private",
        "user-read-recently-played",
        "playlist-read-private",
        "playlist-read-collaborative",
    ].join(" ");

    const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!, // http://127.0.0.1:3000/api/spotify/callback
    });

    const url = "https://accounts.spotify.com/authorize?" + params.toString();

    return NextResponse.redirect(url);
}

