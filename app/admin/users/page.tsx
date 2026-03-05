"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Profile, UserRole } from "@/lib/types";
import { Users, Shield, PenLine } from "lucide-react";

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

const mockProfiles: Profile[] = [
  {
    id: "1",
    email: "soulsofcreatives7@gmail.com",
    role: "admin",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    email: "soulsofcreatives7@gmail.com",
    role: "editor",
    created_at: new Date().toISOString(),
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>(mockProfiles);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "ok" | "err" } | null>(null);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setUsers(data);
      });
  }, []);

  async function changeRole(userId: string, newRole: UserRole) {
    setUpdating(userId);
    setMessage(null);

    if (!SUPABASE_CONFIGURED) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      setMessage({ text: "Role updated (dev mode — not persisted).", type: "ok" });
      setUpdating(null);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      setMessage({ text: `Error: ${error.message}`, type: "err" });
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      setMessage({
        text: `Role updated for ${users.find((u) => u.id === userId)?.email}.`,
        type: "ok",
      });
    }
    setUpdating(null);
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users size={20} className="text-zinc-400" />
        <div>
          <h1 className="font-sans font-bold text-2xl text-zinc-900">
            Users
          </h1>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            Manage CMS access and roles
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
        <p className="font-mono text-sm text-zinc-600">
          <span className="font-bold text-zinc-800">Admin only.</span>{" "}
          Editors can create and manage content. Admins have full access
          including user management and announcements.
        </p>
      </div>

      {message && (
        <div
          className={`font-mono text-sm p-3 rounded border ${
            message.type === "ok"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                User
              </th>
              <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                Role
              </th>
              <th className="text-left font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">
                Joined
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-zinc-50/40"
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-mono font-bold text-sm text-zinc-600 shrink-0">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-mono text-sm text-zinc-800">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded-full ${
                      user.role === "admin"
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <Shield size={10} />
                    ) : (
                      <PenLine size={10} />
                    )}
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value as UserRole)}
                    disabled={updating === user.id}
                    className="font-mono text-xs border border-zinc-200 rounded px-2 py-1 bg-white text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300 cursor-pointer disabled:opacity-50"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="font-mono text-sm text-zinc-400">No users yet.</p>
          </div>
        )}
      </div>

      <p className="font-mono text-xs text-zinc-400">
        New users are created automatically on signup with the &apos;editor&apos; role.
        Promote to &apos;admin&apos; using the dropdown above.
      </p>
    </div>
  );
}
