import { getAllArticlesForAdmin, getCategories } from "@/lib/data";
import { mockAnnouncement } from "@/lib/mock-data";
import Link from "next/link";
import { FileText, Tag, Megaphone, Plus, Dot } from "lucide-react";

export default async function AdminDashboard() {
  const [articles, categories] = await Promise.all([
    getAllArticlesForAdmin(),
    getCategories(),
  ]);

  const published = articles.filter((a) => a.is_published).length;
  const drafts = articles.length - published;

  const stats = [
    { label: "Total Articles", value: articles.length, icon: FileText },
    { label: "Published", value: published, icon: FileText },
    { label: "Drafts", value: drafts, icon: FileText },
    { label: "Categories", value: categories.length, icon: Tag },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans font-bold text-2xl text-zinc-900">Dashboard</h1>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            Content overview
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-zinc-900 text-white font-mono text-sm px-4 py-2 rounded hover:bg-zinc-700 transition-colors"
        >
          <Plus size={15} />
          New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-zinc-200 rounded-lg p-4"
            >
              <Icon size={16} className="text-zinc-400 mb-3" />
              <div className="font-sans font-bold text-3xl text-zinc-900">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-zinc-400 mt-1">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active announcement */}
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <Megaphone size={14} className="text-zinc-400" />
          <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Active Announcement
          </span>
        </div>
        {mockAnnouncement.is_active ? (
          <div>
            <p className="font-mono text-sm text-zinc-700 mb-2">
              {mockAnnouncement.message}
            </p>
            <Link
              href="/admin/announcements"
              className="font-mono text-xs text-zinc-500 hover:text-zinc-900 underline transition-colors"
            >
              Manage announcements →
            </Link>
          </div>
        ) : (
          <p className="font-mono text-sm text-zinc-400">
            No active announcement.{" "}
            <Link
              href="/admin/announcements"
              className="underline text-zinc-600 hover:text-zinc-900"
            >
              Add one
            </Link>
          </p>
        )}
      </div>

      {/* Recent articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-semibold text-lg text-zinc-900">
            Recent Articles
          </h2>
          <Link
            href="/admin/articles"
            className="font-mono text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                  Title
                </th>
                <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {articles.slice(0, 8).map((article, i) => (
                <tr
                  key={article.id}
                  className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-zinc-800 line-clamp-1">
                      {article.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full ${
                        article.is_published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      <Dot size={12} />
                      {article.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-400 hidden md:table-cell">
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="font-mono text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
