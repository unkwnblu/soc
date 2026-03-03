import type { Metadata } from "next";
import { getPlaylists } from "@/lib/data";
import StickerButton from "@/components/StickerButton";
import { Music } from "lucide-react";

export const metadata: Metadata = {
  title: "Playlist Library",
  description:
    "Curated playlists from Souls of Creative — the sounds of fashion, culture, and the creative life.",
};

const platformColors: Record<string, string> = {
  spotify: "bg-[#1DB954] text-black",
  apple_music: "bg-[#fc3c44] text-white",
  soundcloud: "bg-[#FF5500] text-white",
  youtube: "bg-[#FF0000] text-white",
};

const platformLabels: Record<string, string> = {
  spotify: "Spotify",
  apple_music: "Apple Music",
  soundcloud: "SoundCloud",
  youtube: "YouTube",
};

export default async function PlaylistLibraryPage() {
  const playlists = await getPlaylists();

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-12">
        <div className="flex items-center gap-3 mb-2">
          <StickerButton variant="black" rotate="2" small>
            Audio
          </StickerButton>
        </div>
        <h1 className="font-serif font-black text-6xl md:text-7xl text-black leading-none">
          Playlist
          <br />
          Library
        </h1>
        <p className="font-mono text-sm text-black/60 mt-4 max-w-xl">
          The sounds behind the stories. Curated playlists for creative sessions,
          runway mornings, and everything in between.
        </p>
      </div>

      {/* Grid */}
      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white"
            >
              {/* Platform badge + title */}
              <div className="border-b-2 border-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 border border-black ${
                      platformColors[playlist.platform] ?? "bg-black text-white"
                    }`}
                  >
                    {platformLabels[playlist.platform] ?? playlist.platform}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-black leading-tight">
                    {playlist.title}
                  </h3>
                </div>
                <Music size={18} className="text-black/40 shrink-0" />
              </div>

              {/* Embed */}
              <div className="aspect-[4/3] bg-black/5">
                <iframe
                  src={playlist.embed_url}
                  width="100%"
                  height="100%"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="border-0"
                  title={playlist.title}
                />
              </div>

              {/* Description */}
              {playlist.description && (
                <div className="border-t-2 border-black p-4">
                  <p className="font-mono text-sm text-black/70">
                    {playlist.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-black border-dashed">
          <p className="font-mono text-black/50 text-lg">
            No playlists yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
