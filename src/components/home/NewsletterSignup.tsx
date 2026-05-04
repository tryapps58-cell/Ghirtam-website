'use client'

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, source: "homepage" });

    if (error) {
      if (error.code === "23505") {
        // Unique violation — already subscribed
        setStatus("success"); // treat as success to avoid leaking info
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } else {
      setStatus("success");
      setEmail("");
    }
  };


  return (
    <section
      id="newsletter"
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2C1A0E 0%, #3D2516 50%, #2C1A0E 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #D4A844 1px, transparent 0)", backgroundSize: "48px 48px" }}
      />

      <div className="container-brand relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full border border-sacred-gold/30 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sacred-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>

          <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">
            Join the Ghritam Family
          </p>
          <h2 className="font-display text-headline-xl text-ivory-cream mb-4">
            Pure Wisdom, Delivered Monthly
          </h2>
          <p className="font-body text-body-lg text-ivory-cream/60 mb-10">
            Get Ayurvedic tips, seasonal recipes, early access to new products, and an exclusive
            <span className="text-sacred-gold font-semibold"> 10% off your first order</span>.
          </p>

          {/* Form */}
          {status !== "success" ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                suppressHydrationWarning
                className="flex-1 bg-white/10 border border-ivory-cream/20 text-ivory-cream placeholder:text-ivory-cream/40 font-body text-body-md px-5 py-4 focus:outline-none focus:border-sacred-gold transition-colors duration-200"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                id="newsletter-submit-btn"
                disabled={status === "loading"}
                suppressHydrationWarning
                className="btn-primary whitespace-nowrap disabled:opacity-60"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing...
                  </span>
                ) : "Subscribe"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-14 h-14 rounded-full bg-sacred-gold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-earth-brown">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="font-display text-headline-lg text-ivory-cream">You&apos;re in!</p>
              <p className="font-body text-body-md text-ivory-cream/70">
                Check your inbox — your 10% discount code is on its way.
              </p>
            </div>
          )}

          <p className="font-body text-label-sm text-ivory-cream/30 mt-6">
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
