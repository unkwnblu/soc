import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";
import StickerButton from "./StickerButton";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({
  article,
  featured = false,
}: ArticleCardProps) {
  return (
    <div className="group">
      <article
        className={[
          "relative border-2 border-black bg-white",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
          "group-hover:translate-x-[2px] group-hover:translate-y-[2px]",
          "transition-all duration-150",
          featured ? "h-full" : "",
        ].join(" ")}
      >
        {/* Cover image */}
        {article.cover_image && (
          <div className="relative w-full aspect-video border-b-2 border-black overflow-hidden">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="p-4">
          {/* Category stickers — z-10 to sit above the stretched link */}
          {article.categories && article.categories.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-2 mb-3">
              {article.categories.map((cat) => (
                <StickerButton key={cat.id} href={`/${cat.slug}`} small>
                  {cat.name}
                </StickerButton>
              ))}
            </div>
          )}

          {/* Title — stretched link covers the whole card */}
          <h3
            className={[
              "font-serif font-bold text-black leading-tight mb-2",
              featured ? "text-2xl" : "text-xl",
            ].join(" ")}
          >
            <Link
              href={`/article/${article.slug}`}
              className="after:absolute after:inset-0"
            >
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="font-mono text-sm text-black/70 mb-3 line-clamp-3">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between font-mono text-xs text-black/50 border-t border-black/10 pt-2 mt-auto">
            <span>
              {article.author?.email?.split("@")[0] ?? "Staff Writer"}
            </span>
            <span>{formatDateShort(article.created_at)}</span>
          </div>
        </div>
      </article>
    </div>
  );
}
