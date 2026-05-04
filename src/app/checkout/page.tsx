'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DeliveryForm {
  full_name: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

// ─── Step indicator ────────────────────────────────────────────────────────────
const steps = ["Delivery", "Payment", "Confirmed"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < current
                  ? "bg-sacred-gold text-white"
                  : i === current
                  ? "bg-earth-brown text-ivory-cream ring-2 ring-sacred-gold ring-offset-2"
                  : "bg-surface-container text-on-surface-variant"
              }`}
            >
              {i < current ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`font-body text-[11px] tracking-widest uppercase ${i === current ? "text-earth-brown font-bold" : "text-on-surface-variant"}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 md:w-24 h-px mx-3 mb-5 transition-all duration-500 ${i < current ? "bg-sacred-gold" : "bg-outline-variant/50"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Input field helper ────────────────────────────────────────────────────────
function Field({
  label, name, value, onChange, type = "text", required = true, placeholder = "", children
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant">
        {label} {required && <span className="text-sacred-gold">*</span>}
      </label>
      {children ?? (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="border border-outline-variant/60 bg-surface px-4 py-3 font-body text-on-surface focus:outline-none focus:border-sacred-gold transition-colors duration-200 rounded-sm"
        />
      )}
    </div>
  );
}

// ─── Order Summary sidebar ────────────────────────────────────────────────────
function OrderSummary({ subtotal, shipping, total }: { subtotal: number; shipping: number; total: number }) {
  const { items } = useCartStore();
  return (
    <div className="bg-surface-container p-6 md:p-8 sticky top-32 rounded-sm border border-outline-variant/30">
      <h3 className="font-display text-[22px] text-on-background mb-6 border-b border-outline-variant/30 pb-4">
        Order Summary
      </h3>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-white relative shrink-0 border border-outline-variant/20">
              <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-on-background truncate">{item.product.name}</p>
              <p className="font-body text-xs text-on-surface-variant">{item.variant.size} × {item.quantity}</p>
            </div>
            <span className="font-body text-sm font-bold text-on-background shrink-0">
              ₹{item.variant.price * item.quantity}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant/30 pt-4 space-y-2">
        <div className="flex justify-between font-body text-sm text-on-surface-variant">
          <span>Subtotal</span><span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between font-body text-sm text-on-surface-variant">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-sacred-gold font-bold uppercase tracking-wider text-xs" : ""}>
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between font-display text-[20px] text-earth-brown pt-2 border-t border-outline-variant/30">
          <span>Total</span><span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 || items.length === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState<DeliveryForm>({
    full_name: "", phone: "", email: "",
    line1: "", line2: "", city: "", state: "", pincode: "",
  });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/account/login?redirect=/checkout");
        return;
      }
      
      setUserId(user.id);

      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single();
        
      // Fetch default address
      const { data: address } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .limit(1)
        .single();

      setForm({
        full_name: profile?.full_name ?? "",
        phone: profile?.phone ?? "",
        email: user.email ?? "",
        line1: address?.line1 ?? "",
        line2: address?.line2 ?? "",
        city: address?.city ?? "",
        state: address?.state ?? "",
        pincode: address?.pincode ?? "",
      });
    };
    
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Redirect to shop if cart is empty (and not on confirmed step)
  if (items.length === 0 && step !== 2) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <p className="font-display text-[32px] text-on-surface-variant">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary px-8 py-4">Go to Shop</Link>
        </div>
      </div>
    );
  }

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          address: form,
          payment_method: paymentMethod,
          subtotal,
          shipping_fee: shipping,
          total,
          user_id: userId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to place order.");

      setOrderNumber(data.orderNumber);
      clearCart();
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <div className="border-b border-outline-variant/30 py-6 px-6 flex items-center justify-between">
        <Link href="/" className="font-display text-[22px] tracking-[0.15em] text-earth-brown">
          GHRITAM
        </Link>
        <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant">Secure Checkout</p>
        <Link href="/cart" className="font-body text-label-sm text-sacred-gold hover:underline">← Back to Cart</Link>
      </div>

      <div className="container-brand max-w-6xl mx-auto py-12 px-4">
        <StepBar current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left: Main content ─────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* STEP 0: Delivery ──────────────────────────────────────────── */}
              {step === 0 && (
                <motion.div
                  key="step-delivery"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h2 className="font-display text-[32px] text-on-background mb-8">Delivery Details</h2>
                  <form onSubmit={handleDeliverySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Rahul Sharma" />
                      <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="9876543210" />
                    </div>
                    <Field label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" required={false} placeholder="rahul@example.com (optional)" />
                    <Field label="Address Line 1" name="line1" value={form.line1} onChange={handleChange} placeholder="House no., Street, Area" />
                    <Field label="Address Line 2" name="line2" value={form.line2} onChange={handleChange} required={false} placeholder="Landmark (optional)" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Field label="City" name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" />
                      <Field label="State" name="state" value={form.state} onChange={handleChange}>
                        <select
                          id="state"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          required
                          className="border border-outline-variant/60 bg-surface px-4 py-3 font-body text-on-surface focus:outline-none focus:border-sacred-gold transition-colors duration-200 rounded-sm"
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" />
                    </div>

                    <button type="submit" className="btn-primary w-full py-5 text-label-md tracking-widest mt-4">
                      Continue to Payment →
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 1: Payment ────────────────────────────────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step-payment"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h2 className="font-display text-[32px] text-on-background mb-2">Payment Method</h2>
                  <p className="font-body text-body-md text-on-surface-variant mb-8">
                    Delivering to: <strong className="text-on-background">{form.full_name}</strong>, {form.line1}, {form.city} – {form.pincode}
                    <button onClick={() => setStep(0)} className="text-sacred-gold ml-2 text-sm hover:underline">Edit</button>
                  </p>

                  <div className="space-y-4 mb-8">
                    {/* COD */}
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`w-full flex items-center gap-5 p-6 border-2 transition-all duration-200 rounded-sm text-left ${
                        paymentMethod === "cod"
                          ? "border-sacred-gold bg-sacred-gold/5"
                          : "border-outline-variant/50 hover:border-sacred-gold/50"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "cod" ? "border-sacred-gold" : "border-outline-variant"}`}>
                        {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-sacred-gold" />}
                      </div>
                      <div>
                        <p className="font-body font-bold text-on-background">Cash on Delivery (COD)</p>
                        <p className="font-body text-sm text-on-surface-variant mt-0.5">Pay in cash when your order arrives at your door.</p>
                      </div>
                      <span className="ml-auto text-2xl shrink-0">💵</span>
                    </button>

                    {/* Online (Razorpay – coming soon) */}
                    <div className="w-full flex items-center gap-5 p-6 border-2 border-outline-variant/30 rounded-sm opacity-60 relative overflow-hidden cursor-not-allowed">
                      <div className="absolute top-3 right-3 bg-earth-brown text-ivory-cream text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-body">
                        Coming Soon
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-outline-variant shrink-0" />
                      <div>
                        <p className="font-body font-bold text-on-background">Online Payment</p>
                        <p className="font-body text-sm text-on-surface-variant mt-0.5">UPI, Cards, Net Banking via Razorpay</p>
                      </div>
                      <span className="ml-auto text-2xl shrink-0">💳</span>
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm font-body text-sm mb-6">
                      ⚠️ {errorMsg}
                    </p>
                  )}

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="btn-primary w-full py-5 text-label-md tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Placing Order…
                      </span>
                    ) : (
                      `Place Order · ₹${total}`
                    )}
                  </button>

                  <p className="text-center font-body text-xs text-on-surface-variant mt-4">
                    🔒 Your information is secure and encrypted.
                  </p>
                </motion.div>
              )}

              {/* STEP 2: Confirmed ──────────────────────────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step-confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-sacred-gold/10 border-2 border-sacred-gold flex items-center justify-center mx-auto mb-8"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10 text-sacred-gold">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </motion.div>

                  <h2 className="font-display text-[40px] md:text-[52px] text-on-background mb-4">
                    Order Confirmed! 🎉
                  </h2>
                  <p className="font-body text-body-lg text-on-surface-variant mb-2">
                    Thank you for choosing Ghritam. Your order has been received.
                  </p>

                  {orderNumber && (
                    <div className="inline-block bg-surface-container border border-outline-variant/40 px-8 py-4 mt-6 mb-8 rounded-sm">
                      <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-1">Order Number</p>
                      <p className="font-display text-[28px] text-earth-brown tracking-wider">{orderNumber}</p>
                    </div>
                  )}

                  <p className="font-body text-body-md text-on-surface-variant mb-10 max-w-md mx-auto">
                    {paymentMethod === "cod"
                      ? "You will pay in cash when your order is delivered. We will contact you shortly to confirm the delivery schedule."
                      : "Your payment was received. We will ship your order within 1–2 business days."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/shop" className="btn-primary px-10 py-4">
                      Continue Shopping
                    </Link>
                    <Link href="/account" className="btn-dark px-10 py-4">
                      View My Orders
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Right: Order summary ──────────────────────────────────────── */}
          {step < 2 && (
            <div className="lg:col-span-1">
              <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
