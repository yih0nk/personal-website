import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.json(
            { error: "No code returned from Spotify" },
            { status: 400 }
        );
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
        }),
    });

    const data = await tokenResponse.json();
    console.log("SPOTIFY CALLBACK TOKEN RESPONSE:", data);

    if (!tokenResponse.ok) {
        return NextResponse.json(
            { error: "Failed to exchange code for token", details: data },
            { status: 500 }
        );
    }

    if (!data.refresh_token) {
        return NextResponse.json(
            {
                error:
                    "Spotify did not return a refresh token. Did you approve the scopes?",
                details: data,
            },
            { status: 500 }
        );
    }

    // 👇 This is what you need to copy into .env.local
    console.log(
        `YOUR NEW SPOTIFY_REFRESH_TOKEN:\n\n${data.refresh_token}\n`
    );

    return NextResponse.json(
        {
            message:
                "Success! Copy SPOTIFY_REFRESH_TOKEN from this response or terminal into your .env.local",
            refresh_token: data.refresh_token,
        },
        { status: 200 }
    );
}

