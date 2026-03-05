"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { mockPlaylists } from "@/lib/mock-data";
import { Playlist } from "@/lib/types";
import { Plus, ListMusic, Trash2, ExternalLink } from "lucide-react";

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

const PLATFORMS = [
  { value: "spotify", label: "Spotify" },
  { value: "apple_music", label: "Apple Music" },
  { value: "soundcloud", label: "SoundCloud" },
  { value: "youtube", label: "YouTube" },
] as const;

const platformColors: Record<Playlist["platform"], string> = {
  spotify: "bg-emerald-50 text-emerald-700",
  apple_music: "bg-red-50 text-red-600",
  soundcloud: "bg-orange-50 text-orange-600",
  youtube: "bg-red-50 text-red-700",
};

/** Extract the src URL from an iframe string, or return the input as-is if it's already a URL */
function parseEmbedInput(input: string): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("<iframe")) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : trimmed;
  }
  return trimmed;
}

const emptyForm = {
  title: "",
  embed_code: "", // raw input — iframe HTML or bare URL
  platform: "spotify" as Playlist["platform"],
  description: "",
};

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "ok" | "err" } | null>(null);
  const [form, setForm] = useState(emptyForm);

  const parsedEmbedUrl = parseEmbedInput(form.embed_code);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;
    const supabase = createClient();
    supabase
      .from("playlists")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPlaylists(data);
      });
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (!SUPABASE_CONFIGURED) {
      const mock: Playlist = {
        id: Date.now().toString(),
        title: form.title,
        embed_url: parsedEmbedUrl,
        platform: form.platform,
        description: form.description || undefined,
        created_at: new Date().toISOString(),
      };
      setPlaylists((prev) => [mock, ...prev]);
      setForm(emptyForm);
      setMessage({ text: "Saved (dev mode — not persisted).", type: "ok" });
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("playlists")
      .insert({
        title: form.title,
        embed_url: parsedEmbedUrl,
        platform: form.platform,
        description: form.description || null,
      })
      .select()
      .single();

    if (error) {
      setMessage({ text: `Error: ${error.message}`, type: "err" });
    } else {
      setPlaylists((prev) => [data, ...prev]);
      setForm(emptyForm);
      setMessage({ text: "Playlist added.", type: "ok" });
    }
    setSaving(false);
  }

  async function deletePlaylist(id: string) {
    if (!SUPABASE_CONFIGURED) {
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("playlists").delete().eq("id", id);
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
  }

  const inputClass =
    "w-full border border-zinc-200 rounded px-3 py-2 font-mono text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white";
  const labelClass =
    "font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ListMusic size={20} className="text-zinc-400" />
        <div>
          <h1 className="font-sans font-bold text-2xl text-zinc-900">Playlists</h1>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            Manage the playlist library
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Add form */}
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 mb-5 flex items-center gap-2 border-b border-zinc-100 pb-3">
            <Plus size={13} />
            Add Playlist
          </h2>

          {message && (
            <div
              className={`font-mono text-sm p-3 rounded mb-4 border ${
                message.type === "ok"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                placeholder="Creative Hours Vol. 4"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Platform *</label>
              <select
                value={form.platform}
                onChange={(e) =>
                  setForm((f) => ({ ...f, platform: e.target.value as Playlist["platform"] }))
                }
                className={inputClass}
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Embed Code or URL *</label>
              <textarea
                value={form.embed_code}
                onChange={(e) => setForm((f) => ({ ...f, embed_code: e.target.value }))}
                required
                rows={4}
                placeholder={`Paste the <iframe ...> embed code or just the src URL`}
                className={`${inputClass} font-mono text-xs leading-relaxed`}
              />
              {form.embed_code && (
                <p className="font-mono text-[11px] text-zinc-400 mt-1">
                  {form.embed_code.trim().startsWith("<iframe")
                    ? `Extracted URL: ${parsedEmbedUrl}`
                    : "Using as URL directly."}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Description (optional)</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                placeholder="A short description shown on the playlist card..."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-zinc-900 text-white font-mono text-sm px-4 py-2 rounded hover:bg-zinc-700 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving..." : "Add Playlist"}
            </button>
          </form>
        </div>

        {/* Playlist list */}
        <div className="space-y-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
            All Playlists ({playlists.length})
          </h2>
          {playlists.length === 0 && (
            <p className="font-mono text-sm text-zinc-400">No playlists yet.</p>
          )}
          {playlists.map((pl) => (
            <div
              key={pl.id}
              className="bg-white border border-zinc-200 rounded-lg p-4 flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${platformColors[pl.platform]}`}
                  >
                    {pl.platform.replace("_", " ")}
                  </span>
                </div>
                <p className="font-mono text-sm font-bold text-zinc-800 truncate">
                  {pl.title}
                </p>
                {pl.description && (
                  <p className="font-mono text-xs text-zinc-400 mt-0.5 line-clamp-2">
                    {pl.description}
                  </p>
                )}
                <a
                  href={pl.embed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-zinc-600 mt-1 transition-colors"
                >
                  <ExternalLink size={10} />
                  View embed
                </a>
              </div>
              <button
                onClick={() => deletePlaylist(pl.id)}
                className="text-zinc-300 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                aria-label="Delete playlist"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
