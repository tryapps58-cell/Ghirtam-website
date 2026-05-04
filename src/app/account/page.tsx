import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

export const metadata: Metadata = {
  title: "My Account — GHRITAM",
  description: "Manage your GHRITAM account — orders, profile, and addresses.",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware handles redirect, but belt-and-suspenders:
  if (!user) redirect("/account/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, avatar_url, is_admin")
    .eq("id", user.id)
    .single();

  // Fetch recent orders
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, status, total, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "Customer";

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="bg-surface-container py-12 border-b border-outline-variant/30">
        <div className="container-brand">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-body text-label-sm tracking-[0.25em] uppercase text-sacred-gold mb-1">My Account</p>
              <h1 className="font-display text-headline-xl text-on-background">
                Welcome, {displayName}
              </h1>
              <p className="font-body text-body-md text-on-surface-variant mt-1">{user.email}</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Sidebar nav ──────────────────────────────────────────────── */}
            <nav className="lg:col-span-1">
              <ul className="space-y-1">
                {[
                  { label: "Overview", href: "/account", icon: "🏠" },
                  { label: "My Orders", href: "/account/orders", icon: "📦" },
                  { label: "Addresses", href: "/account/addresses", icon: "📍" },
                  { label: "Profile Settings", href: "/account/profile", icon: "👤" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 border border-transparent hover:border-sacred-gold/30 hover:bg-sacred-gold/5 hover:text-sacred-gold text-on-surface font-body text-body-md transition-all duration-200"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
                {profile?.is_admin && (
                  <li>
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-3 border border-transparent hover:border-sacred-gold/30 hover:bg-sacred-gold/5 text-sacred-gold font-body text-body-md transition-all duration-200 mt-4 bg-sacred-gold/10 font-semibold"
                    >
                      <span>🛡️</span>
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* ── Main content ─────────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Orders", value: orders?.length ?? 0 },
                  { label: "Pending Orders", value: orders?.filter((o) => o.status === "pending" || o.status === "confirmed" || o.status === "shipped").length ?? 0 },
                  { label: "Delivered", value: orders?.filter((o) => o.status === "delivered").length ?? 0 },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white border border-outline-variant/40 p-6 text-center">
                    <p className="font-display text-headline-xl text-sacred-gold">{stat.value}</p>
                    <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-white border border-outline-variant/40">
                <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
                  <h2 className="font-display text-headline-md text-on-background">Recent Orders</h2>
                  <Link href="/account/orders" className="font-body text-label-sm tracking-widest uppercase text-sacred-gold hover:underline">
                    View All
                  </Link>
                </div>

                {!orders || orders.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-4xl mb-4">🫙</p>
                    <p className="font-display text-headline-md text-on-background mb-2">No orders yet</p>
                    <p className="font-body text-body-md text-on-surface-variant mb-6">
                      Your order history will appear here.
                    </p>
                    <Link href="/shop" className="btn-primary">Shop Now</Link>
                  </div>
                ) : (
                  <div className="divide-y divide-outline-variant/30">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-5 gap-4 flex-wrap">
                        <div>
                          <p className="font-body font-bold text-body-md text-on-background">{order.order_number}</p>
                          <p className="font-body text-label-sm text-on-surface-variant">
                            {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-body text-label-sm tracking-widest uppercase px-3 py-1 ${
                            order.status === "delivered" ? "bg-forest-sage/10 text-forest-sage" :
                            order.status === "shipped" ? "bg-sacred-gold/10 text-sacred-gold" :
                            order.status === "cancelled" ? "bg-error/10 text-error" :
                            "bg-outline-variant/40 text-on-surface-variant"
                          }`}>
                            {order.status}
                          </span>
                          <span className="font-display text-headline-md text-on-background">₹{order.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/shop" className="bg-earth-brown text-ivory-cream p-6 flex items-center gap-4 group hover:bg-[#1a0f08] transition-colors">
                  <span className="text-2xl">🛒</span>
                  <div>
                    <p className="font-display text-headline-md">Shop Ghee</p>
                    <p className="font-body text-label-sm text-ivory-cream/60">Browse our collection</p>
                  </div>
                </Link>
                <Link href="/faq" className="bg-surface-container border border-outline-variant/40 p-6 flex items-center gap-4 group hover:border-sacred-gold/40 transition-colors">
                  <span className="text-2xl">❓</span>
                  <div>
                    <p className="font-display text-headline-md text-on-background">Help & FAQ</p>
                    <p className="font-body text-label-sm text-on-surface-variant">Answers to common questions</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
