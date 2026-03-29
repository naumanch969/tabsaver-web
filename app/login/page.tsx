"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Check your email for the confirmation link.");
      }
    } catch (error: any) {
      setMessage(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="popup-container glass !h-auto !w-[400px] p-8 rounded-[16px]">
        <div className="text-center mb-8">
          <div className="logo justify-center mb-4">
            <h1 className="logo-name text-3xl">
              <span className="wm-tab">3tab</span>
              <span className="wm-dot"></span>
              <span className="wm-saver">saver</span>
            </h1>
          </div>
          <h2 className="detail-title !text-xl">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="detail-subtitle !text-[13px] mt-2">
            Sync your workspaces across all your devices
          </p>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="styled-input !font-sans !text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="styled-input !font-sans !text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className="text-center text-sm text-[var(--accent)] mt-2">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-4 w-full"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[12px] text-[var(--t3)] hover:text-[var(--t1)] transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
