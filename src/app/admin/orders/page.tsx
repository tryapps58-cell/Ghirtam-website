import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, total, status, created_at, shipping_address")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-headline-lg text-on-background">Order Management</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">View and manage all customer orders.</p>
      </div>

      <div className="bg-white border border-outline-variant/40 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-surface-container/50 text-on-surface-variant border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Order #</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Date</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Customer</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Total</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {orders?.length ? orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-on-background">
                    <Link href={`/admin/orders/${order.id}`} className="text-sacred-gold hover:underline">
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{(order.shipping_address as any)?.full_name || "Guest"}</td>
                  <td className="px-6 py-4 font-bold text-on-background">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs tracking-wider uppercase ${
                      order.status === 'delivered' ? 'bg-forest-sage/10 text-forest-sage' :
                      order.status === 'shipped' ? 'bg-sacred-gold/10 text-sacred-gold' :
                      order.status === 'cancelled' ? 'bg-error/10 text-error' :
                      order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-outline-variant/30 text-on-surface-variant'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
