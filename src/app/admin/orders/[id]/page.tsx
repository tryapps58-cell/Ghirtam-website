'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    const { data } = await supabase
      .from("orders")
      .select(`
        *,
        order_items(*)
      `)
      .eq("id", id)
      .single();

    if (data) {
      setOrder(data);
      setStatus(data.status);
    } else {
      router.push("/admin/orders");
    }
    setIsLoading(false);
  }

  async function handleStatusChange(newStatus: string) {
    setIsUpdating(true);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (!error) {
      setStatus(newStatus);
      setOrder((prev: any) => ({ ...prev, status: newStatus }));
    } else {
      alert("Failed to update status");
    }
    setIsUpdating(false);
  }

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;
  if (!order) return null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/orders" className="font-body text-sm text-on-surface-variant hover:text-sacred-gold mb-2 inline-block">
            ← Back to Orders
          </Link>
          <h1 className="font-display text-headline-lg text-on-background flex items-center gap-4">
            Order {order.order_number}
            <span className={`px-3 py-1 rounded-full text-xs tracking-wider uppercase font-body ${
              status === 'delivered' ? 'bg-forest-sage/10 text-forest-sage border border-forest-sage/20' :
              status === 'shipped' ? 'bg-sacred-gold/10 text-sacred-gold border border-sacred-gold/20' :
              status === 'cancelled' ? 'bg-error/10 text-error border border-error/20' :
              status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
              'bg-outline-variant/30 text-on-surface-variant'
            }`}>
              {status}
            </span>
          </h1>
          <p className="font-body text-body-md text-on-surface-variant mt-1">
            Placed on {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="font-body text-sm uppercase tracking-widest text-on-surface-variant">Update Status:</label>
          <select 
            value={status} 
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className="input-brand py-2 bg-white"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm">
            <h2 className="font-display text-xl text-on-background mb-4 border-b border-outline-variant/30 pb-4">Order Items</h2>
            <div className="space-y-4">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 py-2">
                  <div className="w-16 h-16 bg-surface-container relative shrink-0 border border-outline-variant/20 rounded">
                    {item.image_url && <Image src={item.image_url} alt={item.product_name} fill className="object-contain p-2" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-body font-bold text-on-background">{item.product_name}</p>
                    <p className="font-body text-sm text-on-surface-variant">Size: {item.variant_size} | Qty: {item.quantity}</p>
                  </div>
                  <p className="font-body font-bold text-on-background">₹{item.unit_price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/30 space-y-2 font-body">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Shipping</span>
                <span>₹{order.shipping_fee}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-on-background pt-2 border-t border-outline-variant/30">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm">
            <h2 className="font-display text-xl text-on-background mb-4 border-b border-outline-variant/30 pb-4">Customer Details</h2>
            <div className="space-y-3 font-body text-sm text-on-surface-variant">
              <p><strong className="text-on-background">Name:</strong> {order.shipping_address?.full_name}</p>
              <p><strong className="text-on-background">Email:</strong> {order.shipping_address?.email || 'N/A'}</p>
              <p><strong className="text-on-background">Phone:</strong> {order.shipping_address?.phone || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm">
            <h2 className="font-display text-xl text-on-background mb-4 border-b border-outline-variant/30 pb-4">Delivery Address</h2>
            <div className="font-body text-sm text-on-surface-variant space-y-1">
              <p className="font-bold text-on-background">{order.shipping_address?.full_name}</p>
              <p>{order.shipping_address?.phone}</p>
              <p className="mt-2">{order.shipping_address?.line1}</p>
              {order.shipping_address?.line2 && <p>{order.shipping_address.line2}</p>}
              <p>{order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.pincode}</p>
            </div>
          </div>

          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm">
            <h2 className="font-display text-xl text-on-background mb-4 border-b border-outline-variant/30 pb-4">Payment Method</h2>
            <div className="font-body text-sm">
              <p className="uppercase tracking-widest font-bold text-on-background">
                {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}
              </p>
              <p className="text-on-surface-variant mt-1">Status: {order.payment_status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
