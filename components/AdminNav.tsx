"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Megaphone, Users } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
];

export default function AdminNav({ userRole }: { userRole?: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {navItems.map((item) => {
        if (item.adminOnly && userRole !== "admin") return null;
        const Icon = item.icon;
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
