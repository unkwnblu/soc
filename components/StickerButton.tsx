import Link from "next/link";
import { cn } from "@/lib/utils";

type Rotate = "-2" | "-1" | "0" | "1" | "2" | "3";
type Variant = "yellow" | "coral" | "black" | "white";

interface StickerButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  rotate?: Rotate;
  small?: boolean;
  active?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const rotateMap: Record<Rotate, string> = {
  "-2": "-rotate-2 hover:rotate-0",
  "-1": "-rotate-1 hover:rotate-0",
  "0": "rotate-0",
  "1": "rotate-1 hover:rotate-0",
  "2": "rotate-2 hover:rotate-0",
  "3": "rotate-3 hover:rotate-0",
};

const variantMap: Record<Variant, string> = {
  yellow: "bg-yellow-300 text-black border-black",
  coral: "bg-coral text-black border-black",
  black: "bg-black text-white border-black",
  white: "bg-white text-black border-black",
};

export default function StickerButton({
  children,
  href,
  onClick,
  variant = "yellow",
  rotate = "-2",
  small = false,
  active = false,
  className,
  type = "button",
}: StickerButtonProps) {
  const base = cn(
    "inline-block border-2 border-black font-mono font-bold transition-all duration-150 cursor-pointer",
    "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",
    rotateMap[rotate],
    active ? variantMap.black : variantMap[variant],
    small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
}
