import Link from "next/link";
import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, full_name")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/");

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-earth-brown text-ivory-cream shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="font-display text-xl tracking-widest text-sacred-gold block">
            GHRITAM ADMIN
          </Link>
          <p className="font-body text-xs mt-2 text-ivory-cream/70">Welcome, {profile.full_name?.split(" ")[0]}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded hover:bg-white/5 font-body text-sm tracking-wide transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/orders" className="block px-4 py-3 rounded hover:bg-white/5 font-body text-sm tracking-wide transition-colors">
            Orders
          </Link>
          <Link href="/admin/products" className="block px-4 py-3 rounded hover:bg-white/5 font-body text-sm tracking-wide transition-colors">
            Products
          </Link>
          <Link href="/admin/settings" className="block px-4 py-3 rounded hover:bg-white/5 font-body text-sm tracking-wide transition-colors">
            Store Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="block px-4 py-3 rounded hover:bg-white/5 font-body text-sm tracking-wide text-sacred-gold transition-colors">
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-surface-container">
          {children}
        </div>
      </main>
    </div>
  );
}
