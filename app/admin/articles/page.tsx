import { getAllArticlesForAdmin } from "@/lib/data";
import Link from "next/link";
import { Plus, Dot } from "lucide-react";

export default async function AdminArticlesPage() {
  const articles = await getAllArticlesForAdmin();

  const published = articles.filter((a) => a.is_published).length;
  const drafts = articles.length - published;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans font-bold text-2xl text-zinc-900">Articles</h1>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            {articles.length} total · {published} published · {drafts} drafts
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

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-lg overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                Title
              </th>
              <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                Categories
              </th>
              <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                Status
              </th>
              <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                Created
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {articles.map((article, i) => (
              <tr
                key={article.id}
                className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-zinc-50/40"
                }`}
              >
                <td className="px-4 py-3">
                  <p className="font-mono text-sm text-zinc-800 line-clamp-1">
                    {article.title}
                  </p>
                  <p className="font-mono text-xs text-zinc-400 mt-0.5">
                    /article/{article.slug}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {article.categories?.map((cat) => (
                      <span
                        key={cat.id}
                        className="font-mono text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
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
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  {new Date(article.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center gap-3 justify-end">
                    <Link
                      href={`/article/${article.slug}`}
                      target="_blank"
                      className="font-mono text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="font-mono text-xs text-zinc-700 font-semibold hover:text-zinc-900 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <p className="font-mono text-sm text-zinc-400 mb-3">
              No articles yet.
            </p>
            <Link
              href="/admin/articles/new"
              className="font-mono text-sm text-zinc-700 hover:text-zinc-900 underline"
            >
              Write your first article →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
