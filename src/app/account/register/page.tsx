'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "loading" | "success" | "error";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setStatus("loading");

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Account created! Please check your email to confirm your address, then sign in.");
    }
  }

  const isLoading = status === "loading";

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-20 px-5">
      <div className="w-full max-w-md">

        {/* Logo */}
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

          {status === "success" ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">📬</div>
              <h1 className="font-display text-headline-lg text-on-background mb-3">Check Your Inbox</h1>
              <p className="font-body text-body-md text-on-surface-variant mb-6">{message}</p>
              <Link href="/account/login" className="btn-primary">Sign In</Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-headline-lg text-on-background mb-1">Create Account</h1>
              <p className="font-body text-body-md text-on-surface-variant mb-8">
                Join GHRITAM — track orders, manage your profile, and more.
              </p>

              {/* Error message */}
              {status === "error" && message && (
                <div className="mb-6 p-4 border border-error/40 bg-error-container/30 text-on-error-container text-sm font-body">
                  {message}
                </div>
              )}

              <form onSubmit={handleSignUp} noValidate className="space-y-5">
                {/* Full name */}
                <div>
                  <label htmlFor="reg-name" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">
                    Full Name *
                  </label>
                  <input
                    id="reg-name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Priya Sharma"
                    suppressHydrationWarning
                    className="input-brand" disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="reg-email" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">
                    Email Address *
                  </label>
                  <input
                    id="reg-email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="priya@email.com"
                    suppressHydrationWarning
                    className="input-brand" disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="reg-password" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">
                    Password * <span className="normal-case tracking-normal">(min. 8 characters)</span>
                  </label>
                  <input
                    id="reg-password" name="password" type="password" required
                    value={form.password} onChange={handleChange}
                    placeholder="••••••••"
                    suppressHydrationWarning
                    className="input-brand" disabled={isLoading}
                  />
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="reg-confirm" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">
                    Confirm Password *
                  </label>
                  <input
                    id="reg-confirm" name="confirm" type="password" required
                    value={form.confirm} onChange={handleChange}
                    placeholder="••••••••"
                    suppressHydrationWarning
                    className="input-brand" disabled={isLoading}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit" id="register-submit-btn"
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
                      Creating Account…
                    </>
                  ) : "Create Account"}
                </button>

                <p className="text-center font-body text-label-sm text-on-surface-variant">
                  Already have an account?{" "}
                  <Link href="/account/login" className="text-sacred-gold hover:underline font-semibold">
                    Sign in
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>

        <p className="text-center font-body text-label-sm text-on-surface-variant mt-6">
          By creating an account you agree to our{" "}
          <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
