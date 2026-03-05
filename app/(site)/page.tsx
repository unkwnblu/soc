import {
  getFeaturedArticle,
  getPublishedArticles,
  getCategories,
} from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import StickerButton from "@/components/StickerButton";

export default async function HomePage() {
  const [featured, articles, categories] = await Promise.all([
    getFeaturedArticle(),
    getPublishedArticles(),
    getCategories(),
  ]);

  const discover = articles.slice(1);
  const fashionArticles = articles.filter((a) =>
    a.categories?.some((c) => c.slug === "fashion")
  );

  return (
    <>
      {/* Hero */}
      {featured && <HeroSection article={featured} />}

      {/* Discover Section */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-baseline justify-between mb-8 border-b-2 border-black pb-4">
          <h2 className="font-serif font-black text-5xl text-black">
            Discover
          </h2>
          <StickerButton href="/search" variant="coral" rotate="2">
            View All →
          </StickerButton>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {discover.map((article) => (
            <div key={article.id} className="break-inside-avoid mb-4">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>

      {/* Fashion horizontal scroll section */}
      <section className="border-y-2 border-black bg-yellow-300 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-baseline gap-4 mb-8 border-b-2 border-black pb-4">
            <h2 className="font-serif font-black text-5xl text-black">
              Fashion &amp; Style
            </h2>
            <StickerButton href="/fashion" variant="black" rotate="-1">
              See All
            </StickerButton>
          </div>

          {fashionArticles.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {fashionArticles.map((article) => (
                <div key={article.id} className="flex-none w-72">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-black/60">No fashion articles yet.</p>
          )}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-serif font-black text-3xl text-black mb-6">
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => {
            const rotates = ["-2", "1", "-1", "2", "3", "0"] as const;
            const variants = [
              "yellow",
              "coral",
              "black",
              "white",
              "yellow",
              "coral",
            ] as const;
            return (
              <StickerButton
                key={cat.id}
                href={`/${cat.slug}`}
                variant={variants[i % variants.length]}
                rotate={rotates[i % rotates.length]}
              >
                {cat.name}
              </StickerButton>
            );
          })}
        </div>
      </section>
    </>
  );
}
