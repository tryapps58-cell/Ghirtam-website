'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/account/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user.id)
      .single();

    setForm({
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      email: user.email || "",
    });
    
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: form.full_name, phone: form.phone })
      .eq("id", user.id);

    setIsSaving(false);
    if (error) {
      setMessage("❌ Failed to update profile.");
    } else {
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-surface-container py-12 border-b border-outline-variant/30">
        <div className="container-brand flex items-center justify-between">
          <div>
            <p className="font-body text-label-sm tracking-[0.25em] uppercase text-sacred-gold mb-1">My Account</p>
            <h1 className="font-display text-headline-xl text-on-background">Profile Settings</h1>
          </div>
          <Link href="/account" className="font-body text-label-sm text-on-surface-variant hover:text-sacred-gold transition-colors">
            ← Back to Account
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-2xl mx-auto">
          {isLoading ? (
            <div className="text-center py-20">Loading profile...</div>
          ) : (
            <div className="bg-white border border-outline-variant/40 p-8 md:p-12">
              {message && (
                <div className={`mb-8 p-4 font-body text-sm border ${message.includes("❌") ? "border-error/40 bg-error-container/30 text-on-error-container" : "border-forest-sage/40 bg-forest-sage/10 text-forest-sage"}`}>
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Email Address</label>
                  <input type="email" value={form.email} disabled className="input-brand w-full bg-surface-container/50 cursor-not-allowed opacity-70" />
                  <p className="text-xs text-on-surface-variant mt-2 font-body">Email address cannot be changed.</p>
                </div>
                
                <div>
                  <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Full Name</label>
                  <input name="full_name" value={form.full_name} onChange={handleChange} required className="input-brand w-full" />
                </div>
                
                <div>
                  <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="input-brand w-full" />
                </div>

                <div className="pt-6 border-t border-outline-variant/30">
                  <button type="submit" disabled={isSaving} className="btn-primary w-full py-4 disabled:opacity-70">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-outline-variant/30">
                <button
                  onClick={handleSignOut}
                  className="w-full py-4 border border-error/50 text-error font-body tracking-widest uppercase text-label-sm hover:bg-error/5 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
