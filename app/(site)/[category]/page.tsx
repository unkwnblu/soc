import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPublishedArticles } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import StickerButton from "@/components/StickerButton";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Not Found" };
  return {
    title: cat.name,
    description: `Browse ${cat.name} articles from Souls of Creatives.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);

  if (!cat) notFound();

  const articles = await getPublishedArticles(cat.slug);

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
          {cat.name}
        </h1>
        <p className="font-mono text-sm text-black/60 mt-4">
          {articles.length} article{articles.length !== 1 ? "s" : ""} in {cat.name}
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
          <p className="font-mono text-black/50 text-lg mb-4">
            No {cat.name} articles yet.
          </p>
          <StickerButton href="/" variant="black">
            Back to Home
          </StickerButton>
        </div>
      )}
    </div>
  );
}
