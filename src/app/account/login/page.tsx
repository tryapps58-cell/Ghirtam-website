'use client'

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "forgot";
type Status = "idle" | "loading" | "success" | "error";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/account";

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  // ── Sign in ──────────────────────────────────────────────────────────────────
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setMessage(error.message === "Invalid login credentials"
        ? "Incorrect email or password. Please try again."
        : error.message
      );
    } else {
      let targetPath = redirect;
      
      // Check if user is admin
      if (authData.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", authData.user.id)
          .single();
          
        if (profile?.is_admin) {
          targetPath = "/admin";
        }
      }

      setStatus("success");
      router.push(targetPath);
      router.refresh();
    }
  }

  // ── Forgot password ───────────────────────────────────────────────────────────
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account/reset-password`,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Password reset link sent! Check your inbox.");
    }
  }

  const isLoading = status === "loading";

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-20 px-5">
      <div className="w-full max-w-md">

        {/* Logo mark */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="font-display font-semibold text-3xl tracking-[0.2em] text-earth-brown">GHRITAM</span>
          </Link>
          <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mt-1">
            Essence of Purity
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-outline-variant/40 p-8 lg:p-10">
          <h1 className="font-display text-headline-lg text-on-background mb-1">
            {mode === "signin" ? "Welcome Back" : "Reset Password"}
          </h1>
          <p className="font-body text-body-md text-on-surface-variant mb-8">
            {mode === "signin"
              ? "Sign in to your GHRITAM account."
              : "Enter your email and we'll send you a reset link."}
          </p>

          {/* Error/Success message */}
          {message && (
            <div className={`mb-6 p-4 border text-sm font-body ${
              status === "error"
                ? "border-error/40 bg-error-container/30 text-on-error-container"
                : "border-forest-sage/40 bg-forest-sage/10 text-forest-sage"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={mode === "signin" ? handleSignIn : handleForgotPassword} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">
                Email Address *
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                suppressHydrationWarning
                className="input-brand"
                disabled={isLoading}
              />
            </div>

            {/* Password (sign-in only) */}
            {mode === "signin" && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="login-password" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant">
                    Password *
                  </label>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => { setMode("forgot"); setMessage(""); setStatus("idle"); }}
                    className="font-body text-label-sm text-sacred-gold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  suppressHydrationWarning
                  className="input-brand"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="login-submit-btn"
              disabled={isLoading}
              suppressHydrationWarning
              className="btn-primary w-full py-5 justify-center text-base disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "signin" ? "Signing in…" : "Sending…"}
                </>
              ) : mode === "signin" ? "Sign In" : "Send Reset Link"}
            </button>

            {/* Back to sign in (forgot mode) */}
            {mode === "forgot" && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => { setMode("signin"); setMessage(""); setStatus("idle"); }}
                className="w-full text-center font-body text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                ← Back to sign in
              </button>
            )}
          </form>

          {/* Divider */}
          {mode === "signin" && (
            <div className="mt-8 pt-8 border-t border-outline-variant/40 text-center">
              <p className="font-body text-body-md text-on-surface-variant">
                Don&apos;t have an account?{" "}
                <Link href="/account/register" className="text-sacred-gold hover:underline font-semibold">
                  Create one free
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center font-body text-label-sm text-on-surface-variant mt-6">
          By signing in you agree to our{" "}
          <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-body text-on-surface-variant">Loading...</p></div>}>
      <LoginForm />
    </Suspense>
  );
}
