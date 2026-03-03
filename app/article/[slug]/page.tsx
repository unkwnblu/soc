import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleBySlug, getPublishedArticles } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import StickerButton from "@/components/StickerButton";
import ArticleCard from "@/components/ArticleCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.cover_image ? [article.cover_image] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getPublishedArticles(),
  ]);

  if (!article) notFound();

  const related = allArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        a.categories?.some((c) =>
          article.categories?.some((ac) => ac.id === c.id)
        )
    )
    .slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <div className="border-b-2 border-black">
        {article.cover_image && (
          <div className="relative w-full h-[400px] md:h-[560px]">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        )}
      </div>

      {/* Article header */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Categories */}
        {article.categories && article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.categories.map((cat) => (
              <StickerButton key={cat.id} href={`/${cat.slug}`} variant="coral" small>
                {cat.name}
              </StickerButton>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif font-black text-4xl md:text-5xl text-black leading-tight mb-6">
          {article.title}
        </h1>

        {/* Meta bar */}
        <div className="flex items-center justify-between font-mono text-sm text-black/60 border-y-2 border-black py-3 mb-10">
          <span>
            By{" "}
            <span className="font-bold text-black">
              {article.author?.email?.split("@")[0] ?? "Staff Writer"}
            </span>
          </span>
          <span>{formatDate(article.created_at)}</span>
        </div>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="font-serif text-xl text-black/80 leading-relaxed mb-8 italic border-l-4 border-yellow-300 pl-4">
            {article.excerpt}
          </p>
        )}

        {/* Content */}
        {article.content && (
          <div
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Tags / share */}
        <div className="border-t-2 border-black mt-12 pt-8 flex flex-wrap gap-2">
          <span className="font-mono text-xs text-black/50 mr-2 self-center">
            Filed under:
          </span>
          {article.categories?.map((cat) => (
            <StickerButton key={cat.id} href={`/${cat.slug}`} small rotate="1">
              {cat.name}
            </StickerButton>
          ))}
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t-2 border-black bg-yellow-300 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif font-black text-4xl text-black mb-8 border-b-2 border-black pb-4">
              Related Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
