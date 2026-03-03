import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import StickerButton from "./StickerButton";

export default function HeroSection({ article }: { article: Article }) {
  return (
    <section className="border-b-2 border-black bg-yellow-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Text side */}
          <div className="p-8 md:p-12 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-black min-h-[420px]">
            <div>
              <div className="mb-6">
                <StickerButton variant="black" rotate="2">
                  Featured Story
                </StickerButton>
              </div>

              {/* Categories */}
              {article.categories && article.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.categories.map((cat) => (
                    <StickerButton key={cat.id} href={`/${cat.slug}`} variant="coral" rotate="-1">
                      {cat.name}
                    </StickerButton>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="font-serif font-black text-4xl md:text-5xl xl:text-6xl text-black leading-tight mb-6">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="font-mono text-base text-black/80 mb-8 max-w-lg">
                  {article.excerpt}
                </p>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/article/${article.slug}`}
              className={[
                "inline-block self-start bg-black text-white font-mono font-bold py-3 px-6",
                "border-2 border-black",
                "shadow-[4px_4px_0px_0px_rgba(255,127,80,1)]",
                "hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
                "transition-all duration-150",
              ].join(" ")}
            >
              Read Full Story →
            </Link>
          </div>

          {/* Image side */}
          <div className="relative min-h-[320px] lg:min-h-[500px]">
            {article.cover_image ? (
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-coral flex items-center justify-center">
                <span className="font-serif font-black text-9xl text-black/10">
                  SOC
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
