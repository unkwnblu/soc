"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { Save, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    is_published: false,
    selectedCategories: [] as string[],
  });

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("categories")
      .select("*")
      .then(({ data }) => {
        if (data) setCategories(data);
      });
  }, []);

  useEffect(() => {
    if (!slugManuallyEdited && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugManuallyEdited]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlugManuallyEdited(true);
    setForm((f) => ({ ...f, slug: e.target.value }));
  }

  function toggleCategory(id: string) {
    setForm((f) => ({
      ...f,
      selectedCategories: f.selectedCategories.includes(id)
        ? f.selectedCategories.filter((c) => c !== id)
        : [...f.selectedCategories, id],
    }));
  }

  async function handleSave(publish = false) {
    setError(null);
    setSaving(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: article, error: articleError } = await supabase
        .from("articles")
        .insert({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt || null,
          content: form.content || null,
          cover_image: form.cover_image || null,
          is_published: publish ? true : form.is_published,
          author_id: user?.id ?? null,
        })
        .select()
        .single();

      if (articleError) {
        setError(articleError.message ?? "Failed to save article.");
        setSaving(false);
        return;
      }

      if (form.selectedCategories.length > 0) {
        await supabase.from("article_categories").insert(
          form.selectedCategories.map((cat_id) => ({
            article_id: article.id,
            category_id: cat_id,
          }))
        );
      }

      setSaved(true);
      setTimeout(() => router.push("/admin/articles"), 800);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : (err as { message?: string })?.message ?? "Failed to save article.";
      setError(msg);
      setSaving(false);
    }
  }

  const inputClass =
    "w-full border border-zinc-200 rounded px-3 py-2 font-mono text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white transition-shadow";
  const labelClass =
    "font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block";
  const cardClass = "bg-white border border-zinc-200 rounded-lg p-5";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-sans font-bold text-2xl text-zinc-900">
              New Article
            </h1>
            <p className="font-mono text-xs text-zinc-400 mt-0.5">
              Fill in the details below
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 border border-zinc-200 bg-white text-zinc-700 font-mono text-sm px-4 py-2 rounded hover:bg-zinc-50 disabled:opacity-50 transition-colors"
          >
            <Save size={14} />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 bg-zinc-900 text-white font-mono text-sm px-4 py-2 rounded hover:bg-zinc-700 disabled:opacity-50 transition-colors"
          >
            <Eye size={14} />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 font-mono text-sm p-3 rounded">
          {error}
        </div>
      )}
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-sm p-3 rounded">
          Saved! Redirecting...
        </div>
      )}

      {/* Form layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          <div className={cardClass}>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Article title..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Slug</label>
                <div className="flex rounded border border-zinc-200 overflow-hidden focus-within:ring-2 focus-within:ring-zinc-300">
                  <span className="bg-zinc-50 px-3 py-2 font-mono text-xs text-zinc-400 shrink-0 flex items-center border-r border-zinc-200">
                    /article/
                  </span>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleSlugChange}
                    placeholder="url-slug"
                    className="flex-1 px-3 py-2 font-mono text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Excerpt</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={3}
                  placeholder="A short description for cards and SEO..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Content{" "}
                  <span className="normal-case text-zinc-400 font-normal">
                    (HTML)
                  </span>
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={20}
                  placeholder="<p>Start writing...</p>"
                  className={`${inputClass} font-mono text-xs leading-relaxed`}
                />
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  Accepts HTML — &lt;h2&gt;, &lt;p&gt;, &lt;blockquote&gt;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className={cardClass}>
            <h3 className={`${labelClass} border-b border-zinc-100 pb-2 mb-3`}>
              Publish
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                className="w-4 h-4 rounded border-zinc-300"
              />
              <span className="font-mono text-sm text-zinc-700">
                Mark as published
              </span>
            </label>
          </div>

          {/* Cover image */}
          <div className={cardClass}>
            <h3 className={`${labelClass} border-b border-zinc-100 pb-2 mb-3`}>
              Cover Image
            </h3>
            <label className={labelClass}>URL</label>
            <input
              name="cover_image"
              value={form.cover_image}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
            {form.cover_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.cover_image}
                alt="Preview"
                className="mt-3 w-full aspect-video object-cover rounded border border-zinc-200"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>

          {/* Categories */}
          <div className={cardClass}>
            <h3 className={`${labelClass} border-b border-zinc-100 pb-2 mb-3`}>
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-4 h-4 rounded border-zinc-300"
                  />
                  <span className="font-mono text-sm text-zinc-700">
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
