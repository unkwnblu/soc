/**
 * Data layer — falls back to mock data when Supabase is not configured.
 * Replace mock fallbacks with real queries once NEXT_PUBLIC_SUPABASE_URL is set.
 */
import { Article, Announcement, Category, Playlist } from "./types";
import {
  mockArticles,
  mockAnnouncement,
  mockCategories,
  mockPlaylists,
} from "./mock-data";

const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function transformArticle(data: Record<string, unknown>): Article {
  const articleCategories = data.article_categories as
    | { categories: Category }[]
    | undefined;
  return {
    ...(data as unknown as Article),
    categories: articleCategories?.map((ac) => ac.categories) ?? [],
  };
}

export async function getPublishedArticles(
  categorySlug?: string
): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    const articles = mockArticles.filter((a) => a.is_published);
    return categorySlug
      ? articles.filter((a) =>
          a.categories?.some((c) => c.slug === categorySlug)
        )
      : articles;
  }

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();

    let query = supabase
      .from("articles")
      .select(
        "*, author:profiles(*), article_categories(categories(*))"
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (categorySlug) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();

      if (cat) {
        const { data: articleIds } = await supabase
          .from("article_categories")
          .select("article_id")
          .eq("category_id", cat.id);

        const ids = articleIds?.map((r: { article_id: string }) => r.article_id) ?? [];
        query = query.in("id", ids);
      }
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(transformArticle);
  } catch {
    const articles = mockArticles.filter((a) => a.is_published);
    return categorySlug
      ? articles.filter((a) =>
          a.categories?.some((c) => c.slug === categorySlug)
        )
      : articles;
  }
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const articles = await getPublishedArticles();
  return articles[0] ?? null;
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  if (!isSupabaseConfigured) {
    return mockArticles.find((a) => a.slug === slug) ?? null;
  }

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("articles")
      .select(
        "*, author:profiles(*), article_categories(categories(*))"
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) throw error;
    return transformArticle(data);
  } catch {
    return mockArticles.find((a) => a.slug === slug) ?? null;
  }
}

export async function getActiveAnnouncement(): Promise<Announcement | null> {
  if (!isSupabaseConfigured) return mockAnnouncement;

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
      .limit(1)
      .single();

    if (error) return null;
    return data;
  } catch {
    return mockAnnouncement;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return mockCategories;

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return data ?? [];
  } catch {
    return mockCategories;
  }
}

export async function getPlaylists(): Promise<Playlist[]> {
  if (!isSupabaseConfigured) return mockPlaylists;

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("playlists")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch {
    return mockPlaylists;
  }
}

export async function getAllArticlesForAdmin(): Promise<Article[]> {
  if (!isSupabaseConfigured) return mockArticles;

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*, author:profiles(*), article_categories(categories(*))")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(transformArticle);
  } catch {
    return mockArticles;
  }
}
