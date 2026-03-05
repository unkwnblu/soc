"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { mockAnnouncement } from "@/lib/mock-data";
import { Announcement } from "@/lib/types";
import { Plus, Megaphone, Trash2, Dot } from "lucide-react";

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    mockAnnouncement,
  ]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "ok" | "err" } | null>(null);

  const [newForm, setNewForm] = useState({
    message: "",
    cta_url: "",
    expires_at: "",
    is_active: true,
  });

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;
    const supabase = createClient();
    supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setAnnouncements(data);
      });
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (!SUPABASE_CONFIGURED) {
      const mock: Announcement = {
        id: Date.now().toString(),
        ...newForm,
        cta_url: newForm.cta_url || undefined,
        expires_at: newForm.expires_at || undefined,
        created_at: new Date().toISOString(),
      };
      setAnnouncements((prev) => [mock, ...prev]);
      setNewForm({ message: "", cta_url: "", expires_at: "", is_active: true });
      setMessage({ text: "Saved (dev mode — not persisted).", type: "ok" });
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("announcements")
      .insert({
        message: newForm.message,
        cta_url: newForm.cta_url || null,
        expires_at: newForm.expires_at || null,
        is_active: newForm.is_active,
      })
      .select()
      .single();

    if (error) {
      setMessage({ text: `Error: ${error.message}`, type: "err" });
    } else {
      setAnnouncements((prev) => [data, ...prev]);
      setNewForm({ message: "", cta_url: "", expires_at: "", is_active: true });
      setMessage({ text: "Announcement created.", type: "ok" });
    }
    setSaving(false);
  }

  async function toggleActive(id: string, current: boolean) {
    if (!SUPABASE_CONFIGURED) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, is_active: !current } : a))
      );
      return;
    }
    const supabase = createClient();
    await supabase.from("announcements").update({ is_active: !current }).eq("id", id);
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_active: !current } : a))
    );
  }

  async function deleteAnnouncement(id: string) {
    if (!SUPABASE_CONFIGURED) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("announcements").delete().eq("id", id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }

  const inputClass =
    "w-full border border-zinc-200 rounded px-3 py-2 font-mono text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white";
  const labelClass =
    "font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Megaphone size={20} className="text-zinc-400" />
        <div>
          <h1 className="font-sans font-bold text-2xl text-zinc-900">
            Announcements
          </h1>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            Manage the site-wide banner
          </p>
        </div>
      </div>

      {/* New form */}
      <div className="bg-white border border-zinc-200 rounded-lg p-6">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 mb-5 flex items-center gap-2 border-b border-zinc-100 pb-3">
          <Plus size={13} />
          New Announcement
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
            <label className={labelClass}>Message *</label>
            <textarea
              value={newForm.message}
              onChange={(e) => setNewForm((f) => ({ ...f, message: e.target.value }))}
              rows={3}
              required
              placeholder="Issue 05 is live — check it out now!"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>CTA URL (optional)</label>
              <input
                type="url"
                value={newForm.cta_url}
                onChange={(e) => setNewForm((f) => ({ ...f, cta_url: e.target.value }))}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Expires At (optional)</label>
              <input
                type="datetime-local"
                value={newForm.expires_at}
                onChange={(e) => setNewForm((f) => ({ ...f, expires_at: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              checked={newForm.is_active}
              onChange={(e) => setNewForm((f) => ({ ...f, is_active: e.target.checked }))}
              className="w-4 h-4 rounded border-zinc-300"
            />
            <label htmlFor="is_active" className="font-mono text-sm text-zinc-700 cursor-pointer">
              Active immediately
            </label>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-zinc-900 text-white font-mono text-sm px-4 py-2 rounded hover:bg-zinc-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Create Announcement"}
          </button>
        </form>
      </div>

      {/* List */}
      <div>
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
          All Announcements
        </h2>
        <div className="space-y-2">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white border rounded-lg p-4 transition-opacity ${
                ann.is_active ? "border-zinc-200" : "border-zinc-100 opacity-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full ${
                        ann.is_active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      <Dot size={12} />
                      {ann.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-zinc-800">{ann.message}</p>
                  {ann.cta_url && (
                    <p className="font-mono text-xs text-zinc-400 mt-1 truncate">
                      → {ann.cta_url}
                    </p>
                  )}
                  {ann.expires_at && (
                    <p className="font-mono text-xs text-zinc-400 mt-0.5">
                      Expires {new Date(ann.expires_at).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(ann.id, ann.is_active)}
                    className="font-mono text-xs border border-zinc-200 px-2 py-1 rounded hover:bg-zinc-50 text-zinc-600 transition-colors"
                  >
                    {ann.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="text-zinc-300 hover:text-red-400 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
