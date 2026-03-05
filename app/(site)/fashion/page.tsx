import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import StickerButton from "@/components/StickerButton";

export const metadata: Metadata = {
  title: "Fashion",
  description:
    "Fashion and style coverage from Souls of Creative — the looks, the people, and the ideas shaping visual culture.",
};

export default async function FashionPage() {
  const articles = await getPublishedArticles("fashion");

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-10">
        <div className="flex items-center gap-3 mb-2">
          <StickerButton variant="coral" rotate="-2" small>
            Category
          </StickerButton>
        </div>
        <h1 className="font-serif font-black text-6xl md:text-7xl text-black leading-none">
          Fashion
          <br />
          &amp; Style
        </h1>
        <p className="font-mono text-sm text-black/60 mt-4 max-w-xl">
          The looks, the people, and the ideas shaping visual culture — from
          Lagos to London and everywhere in between.
        </p>
      </div>

      {/* Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-black border-dashed">
          <p className="font-mono text-black/50 text-lg">
            No fashion articles yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
