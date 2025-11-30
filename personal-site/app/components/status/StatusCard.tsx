"use client";

import { useState } from "react";
import NowBuilding from "./NowBuilding";
import Spotify from "./Spotify";

export default function StatusCard() {
    const [tab, setTab] = useState<"building" | "spotify">("building");
    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-lg p-4">
          
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("building")}
              className={`px-3 py-1 rounded-md text-sm ${
                tab === "building" ? "bg-sky-500 text-black" : "text-slate-400"
              }`}
            >
              Now Building
            </button>
    
            <button
              onClick={() => setTab("spotify")}
              className={`px-3 py-1 rounded-md text-sm ${
                tab === "spotify" ? "bg-sky-500 text-black" : "text-slate-400"
              }`}
            >
              Spotify
            </button>
          </div>
    
          {/* Content Section */}
          {tab === "building" ? <NowBuilding /> : <Spotify />}
        </div>
    );
}