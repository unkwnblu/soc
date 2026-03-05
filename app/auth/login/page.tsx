"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail } from "lucide-react";
import StickerButton from "@/components/StickerButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="font-serif font-black text-5xl text-black leading-tight">
            Souls of
            <br />
            Creative
          </h1>
          <p className="font-mono text-sm text-black/60 mt-2">CMS Access</p>
        </div>

        {/* Form card */}
        <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
          <h2 className="font-serif font-bold text-2xl text-black mb-6 border-b-2 border-black pb-4">
            Sign In
          </h2>

          {error && (
            <div className="border-2 border-black bg-coral text-black font-mono text-sm p-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail size={12} />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="soulsofcreatives7@gmail.com"
                className="w-full border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:bg-yellow-50 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Lock size={12} />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:bg-yellow-50 transition-colors"
              />
            </div>

            <div className="pt-2">
              <StickerButton
                type="submit"
                variant="black"
                rotate="0"
                className={`w-full justify-center py-3 ${loading ? "opacity-60 pointer-events-none" : ""}`}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </StickerButton>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-yellow-300" />}>
      <LoginForm />
    </Suspense>
  );
}
