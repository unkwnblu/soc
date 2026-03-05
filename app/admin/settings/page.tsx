"use client";

import { useState, useEffect } from "react";
import { Settings, Mail, Lock, User, Shield, PenLine, CheckCircle, XCircle } from "lucide-react";

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

interface CurrentUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

const DEV_USER: CurrentUser = {
  id: "dev",
  email: "soulsofcreatives7@gmail.com",
  role: "admin",
  created_at: new Date().toISOString(),
};

type Message = { text: string; type: "ok" | "err" };

export default function SettingsPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Email form
  const [newEmail, setNewEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState<Message | null>(null);
  const [emailBusy, setEmailBusy] = useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<Message | null>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      setUser(DEV_USER);
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) { setLoading(false); return; }
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, email, role, created_at")
          .eq("id", authUser.id)
          .single();
        setUser(profile ?? { id: authUser.id, email: authUser.email ?? "", role: "editor", created_at: authUser.created_at });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleEmailUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setEmailMsg(null);
    setEmailBusy(true);

    if (!SUPABASE_CONFIGURED) {
      setEmailMsg({ text: "Email updated (dev mode — not persisted).", type: "ok" });
      setUser((u) => u ? { ...u, email: newEmail.trim() } : u);
      setNewEmail("");
      setEmailBusy(false);
      return;
    }

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ email: newEmail.trim() });
      if (error) {
        setEmailMsg({ text: error.message, type: "err" });
      } else {
        setEmailMsg({ text: "Confirmation sent to your new email address.", type: "ok" });
        setNewEmail("");
      }
    } catch (err) {
      setEmailMsg({ text: String(err), type: "err" });
    } finally {
      setEmailBusy(false);
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: "Passwords do not match.", type: "err" });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ text: "Password must be at least 8 characters.", type: "err" });
      return;
    }
    setPasswordMsg(null);
    setPasswordBusy(true);

    if (!SUPABASE_CONFIGURED) {
      setPasswordMsg({ text: "Password updated (dev mode — not persisted).", type: "ok" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordBusy(false);
      return;
    }

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordMsg({ text: error.message, type: "err" });
      } else {
        setPasswordMsg({ text: "Password updated successfully.", type: "ok" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setPasswordMsg({ text: String(err), type: "err" });
    } finally {
      setPasswordBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg space-y-6">
        <div className="h-8 w-32 bg-zinc-100 rounded animate-pulse" />
        <div className="h-40 bg-zinc-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings size={20} className="text-zinc-400" />
        <div>
          <h1 className="font-sans font-bold text-2xl text-zinc-900">Settings</h1>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">Manage your account</p>
        </div>
      </div>

      {!SUPABASE_CONFIGURED && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="font-mono text-xs text-amber-700">
            Dev mode — changes are not persisted.
          </p>
        </div>
      )}

      {/* Profile card */}
      <section className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4">
        <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <User size={12} />
          Profile
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center font-mono font-bold text-lg text-white shrink-0">
            {user?.email?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="font-mono text-sm text-zinc-800">{user?.email}</p>
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded-full mt-1 ${
                user?.role === "admin"
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {user?.role === "admin" ? <Shield size={10} /> : <PenLine size={10} />}
              {user?.role}
            </span>
          </div>
        </div>
        <div className="border-t border-zinc-100 pt-3">
          <p className="font-mono text-xs text-zinc-400">
            Member since{" "}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "—"}
          </p>
        </div>
      </section>

      {/* Change email */}
      <section className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4">
        <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Mail size={12} />
          Change Email
        </h2>
        <form onSubmit={handleEmailUpdate} className="space-y-3">
          <div>
            <label className="block font-mono text-xs text-zinc-500 mb-1">
              Current email
            </label>
            <p className="font-mono text-sm text-zinc-700 bg-zinc-50 border border-zinc-200 rounded px-3 py-2">
              {user?.email}
            </p>
          </div>
          <div>
            <label
              htmlFor="new-email"
              className="block font-mono text-xs text-zinc-500 mb-1"
            >
              New email
            </label>
            <input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="new@example.com"
              required
              className="w-full font-mono text-sm border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white text-zinc-800 placeholder:text-zinc-300"
            />
          </div>
          {emailMsg && <StatusMessage msg={emailMsg} />}
          <button
            type="submit"
            disabled={emailBusy || !newEmail.trim()}
            className="font-mono text-sm bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {emailBusy ? "Updating…" : "Update Email"}
          </button>
        </form>
      </section>

      {/* Change password */}
      <section className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4">
        <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Lock size={12} />
          Change Password
        </h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-3">
          <div>
            <label
              htmlFor="new-password"
              className="block font-mono text-xs text-zinc-500 mb-1"
            >
              New password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              className="w-full font-mono text-sm border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white text-zinc-800 placeholder:text-zinc-300"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block font-mono text-xs text-zinc-500 mb-1"
            >
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              required
              className="w-full font-mono text-sm border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white text-zinc-800 placeholder:text-zinc-300"
            />
          </div>
          {passwordMsg && <StatusMessage msg={passwordMsg} />}
          <button
            type="submit"
            disabled={passwordBusy || !newPassword || !confirmPassword}
            className="font-mono text-sm bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {passwordBusy ? "Updating…" : "Update Password"}
          </button>
        </form>
      </section>
    </div>
  );
}

function StatusMessage({ msg }: { msg: Message }) {
  return (
    <div
      className={`flex items-start gap-2 font-mono text-xs p-3 rounded border ${
        msg.type === "ok"
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-red-50 border-red-200 text-red-700"
      }`}
    >
      {msg.type === "ok" ? (
        <CheckCircle size={13} className="mt-0.5 shrink-0" />
      ) : (
        <XCircle size={13} className="mt-0.5 shrink-0" />
      )}
      {msg.text}
    </div>
  );
}
