"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

interface Props {
  items: NavItem[];
  userRole?: string;
}

export default function AdminNav({ items, userRole }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {items.map((item) => {
        if (item.adminOnly && userRole !== "admin") return null;
        const Icon = item.icon;
        // Active if exact match for dashboard, or starts-with for sub-pages
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-3 font-mono text-sm px-3 py-2 rounded transition-colors",
              isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50",
            ].join(" ")}
          >
            <Icon size={15} className={isActive ? "text-white" : "text-zinc-600"} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
