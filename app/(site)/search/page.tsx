"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { mockArticles, mockCategories } from "@/lib/mock-data";
import ArticleCard from "@/components/ArticleCard";
import StickerButton from "@/components/StickerButton";
import { Article } from "@/lib/types";

// Note: This page uses mock data on the client. When Supabase is connected,
// replace mockArticles with a server action or API route for real search.

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = useMemo<Article[]>(() => {
    let filtered = mockArticles.filter((a) => a.is_published);

    if (activeCategory) {
      filtered = filtered.filter((a) =>
        a.categories?.some((c) => c.slug === activeCategory)
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [query, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8">
        <h1 className="font-serif font-black text-6xl md:text-7xl text-black leading-none mb-6">
          Search &amp;
          <br />
          Archive
        </h1>

        {/* Search input */}
        <div className="relative max-w-2xl">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, people..."
            className={[
              "w-full border-2 border-black pl-10 pr-4 py-3",
              "font-mono text-sm text-black placeholder:text-black/40",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              "focus:outline-none focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px]",
              "transition-all duration-150 bg-white",
            ].join(" ")}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <StickerButton
          onClick={() => setActiveCategory(null)}
          variant={activeCategory === null ? "black" : "white"}
          rotate="0"
          small
        >
          All
        </StickerButton>
        {mockCategories.map((cat, i) => {
          const rotates = ["-2", "1", "-1", "2", "3"] as const;
          return (
            <StickerButton
              key={cat.id}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.slug ? null : cat.slug
                )
              }
              active={activeCategory === cat.slug}
              rotate={rotates[i % rotates.length]}
              small
            >
              {cat.name}
            </StickerButton>
          );
        })}
      </div>

      {/* Results count */}
      <p className="font-mono text-sm text-black/50 mb-6">
        {results.length} article{results.length !== 1 ? "s" : ""} found
        {query && ` for "${query}"`}
        {activeCategory && ` in ${activeCategory}`}
      </p>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-black border-dashed">
          <p className="font-mono text-black/50 text-lg mb-4">
            No articles match your search.
          </p>
          <StickerButton onClick={() => { setQuery(""); setActiveCategory(null); }} variant="coral">
            Clear Filters
          </StickerButton>
        </div>
      )}
    </div>
  );
}
