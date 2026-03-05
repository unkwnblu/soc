import Link from "next/link";
import StickerButton from "@/components/StickerButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center px-4 text-center">
      {/* Big 404 */}
      <p className="font-mono font-bold text-[10rem] md:text-[16rem] leading-none text-black/10 select-none">
        404
      </p>

      {/* Content — overlaps the number */}
      <div className="-mt-16 md:-mt-24 relative z-10">
        <div className="inline-block mb-6">
          <StickerButton variant="black" rotate="-2" small>
            Lost?
          </StickerButton>
        </div>

        <h1 className="font-serif font-black text-5xl md:text-7xl text-black leading-none mb-6">
          Page not
          <br />
          found.
        </h1>

        <p className="font-mono text-sm text-black/70 max-w-sm mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Head back and keep exploring.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <StickerButton href="/" variant="black" rotate="1">
            Back to Home →
          </StickerButton>
          <Link
            href="/about"
            className="font-mono text-sm text-black/60 hover:text-black underline underline-offset-4 transition-colors"
          >
            About us
          </Link>
        </div>
      </div>
    </div>
  );
}
