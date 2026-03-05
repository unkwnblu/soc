import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import AdminNav from "@/components/AdminNav";

async function getCurrentUser() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, email")
      .eq("id", user.id)
      .single();

    return profile ?? { email: user.email, role: "editor" as const };
  } catch {
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Sidebar — sticky, never scrolls */}
      <aside className="w-56 shrink-0 bg-[#111] flex flex-col overflow-y-auto">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/5">
          <a
            href="/"
            className="font-serif font-black text-lg text-white leading-tight hover:text-zinc-300 transition-colors"
          >
            Souls of<br />Creative
          </a>
          <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase tracking-widest">
            CMS
          </p>
        </div>

        {/* Nav — client component for active state */}
        <AdminNav userRole={user?.role} />

        {/* Footer */}
        <div className="mt-auto border-t border-white/5 px-5 py-4 space-y-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <ExternalLink size={12} />
            View Site
          </a>

          <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="flex items-center gap-2 font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors w-full text-left"
              >
                <LogOut size={12} />
                Sign Out
              </button>
            </form>

          <div className="pt-1 border-t border-white/5">
            <p className="font-mono text-[10px] text-zinc-700 truncate">
              {user?.email}
            </p>
            <span className="inline-block font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">
              {user?.role}
            </span>
          </div>
        </div>
      </aside>

      {/* Main content — scrolls independently */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
