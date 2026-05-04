import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  // Fetch some quick stats
  const { count: orderCount } = await supabase.from("orders").select("*", { count: "exact", head: true });
  const { count: productCount } = await supabase.from("products").select("*", { count: "exact", head: true });
  
  // Recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, order_number, total, status, created_at, shipping_address")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-headline-lg text-on-background">Dashboard Overview</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">Welcome to your store control center.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-outline-variant/40 rounded shadow-sm">
          <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-2">Total Orders</p>
          <p className="font-display text-4xl text-earth-brown">{orderCount || 0}</p>
        </div>
        <div className="bg-white p-6 border border-outline-variant/40 rounded shadow-sm">
          <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-2">Products</p>
          <p className="font-display text-4xl text-earth-brown">{productCount || 0}</p>
        </div>
        <div className="bg-white p-6 border border-outline-variant/40 rounded shadow-sm flex flex-col justify-center items-start">
          <Link href="/admin/settings" className="font-body text-sm text-sacred-gold hover:underline">
            Manage Announcement Bar →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-outline-variant/40 rounded shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <h2 className="font-display text-xl text-on-background">Recent Orders</h2>
          <Link href="/admin/orders" className="font-body text-sm text-sacred-gold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-surface-container/50 text-on-surface-variant border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Order #</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Customer</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Date</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Status</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {recentOrders?.length ? recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-on-background">
                    <Link href={`/admin/orders/${order.id}`} className="hover:text-sacred-gold">{order.order_number}</Link>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{(order.shipping_address as any)?.full_name || "Guest"}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs tracking-wider uppercase ${
                      order.status === 'delivered' ? 'bg-forest-sage/10 text-forest-sage' :
                      order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-outline-variant/30 text-on-surface-variant'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-on-background">₹{order.total}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
