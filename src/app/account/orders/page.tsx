import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My Orders — GHRITAM",
  description: "View your order history.",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id, 
      order_number, 
      status, 
      total, 
      created_at,
      order_items (
        id,
        product_name,
        variant_size,
        quantity,
        unit_price,
        image_url
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-surface-container py-12 border-b border-outline-variant/30">
        <div className="container-brand flex items-center justify-between">
          <div>
            <p className="font-body text-label-sm tracking-[0.25em] uppercase text-sacred-gold mb-1">My Account</p>
            <h1 className="font-display text-headline-xl text-on-background">Order History</h1>
          </div>
          <Link href="/account" className="font-body text-label-sm text-on-surface-variant hover:text-sacred-gold transition-colors">
            ← Back to Account
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-4xl mx-auto">
          {!orders || orders.length === 0 ? (
            <div className="text-center py-20 bg-white border border-outline-variant/40">
              <p className="text-4xl mb-4">🫙</p>
              <p className="font-display text-headline-md text-on-background mb-2">No orders found</p>
              <p className="font-body text-body-md text-on-surface-variant mb-6">Looks like you haven't placed any orders yet.</p>
              <Link href="/shop" className="btn-primary px-8 py-4">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-outline-variant/40">
                  <div className="flex items-center justify-between p-6 border-b border-outline-variant/30 bg-surface-container/30 flex-wrap gap-4">
                    <div>
                      <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-1">
                        Order Placed
                      </p>
                      <p className="font-body font-bold text-on-background">
                        {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-1">
                        Total
                      </p>
                      <p className="font-body font-bold text-on-background">₹{order.total}</p>
                    </div>
                    <div>
                      <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-1">
                        Order #
                      </p>
                      <p className="font-body font-bold text-on-background">{order.order_number}</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`font-body text-label-sm tracking-widest uppercase px-4 py-2 ${
                        order.status === "delivered" ? "bg-forest-sage/10 text-forest-sage" :
                        order.status === "shipped" ? "bg-sacred-gold/10 text-sacred-gold" :
                        order.status === "cancelled" ? "bg-error/10 text-error" :
                        "bg-outline-variant/40 text-on-surface-variant"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      {order.order_items?.map((item: any) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="w-20 h-20 bg-surface-container relative shrink-0 border border-outline-variant/20">
                            {item.image_url ? (
                              <Image src={item.image_url} alt={item.product_name} fill className="object-contain p-2" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-on-surface-variant">?</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-display text-[20px] text-on-background">{item.product_name}</p>
                            <p className="font-body text-body-md text-on-surface-variant">Size: {item.variant_size}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-body font-bold text-on-background">₹{item.unit_price}</p>
                            <p className="font-body text-sm text-on-surface-variant">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
