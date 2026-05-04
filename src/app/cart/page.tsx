'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 || items.length === 0 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-surface-container py-16 border-b border-outline-variant/30 text-center">
        <div className="container-brand">
          <h1 className="font-display text-[48px] text-on-background">Your Cart</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-6xl mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-on-surface-variant">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <p className="font-display text-[32px] text-on-surface-variant mb-8">Your cart is currently empty.</p>
              <Link href="/shop" className="btn-primary px-8 py-4">Continue Shopping</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Items List */}
              <div className="lg:col-span-2 space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 bg-white p-6 border border-outline-variant/30 relative group">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 text-on-surface-variant hover:text-earth-brown transition-colors"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-surface-container relative shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex flex-col flex-1 justify-center">
                      <p className="font-body text-label-sm tracking-widest uppercase text-sacred-gold mb-1">{item.product.subtitle}</p>
                      <Link href={`/products/${item.product.slug}`} className="font-display text-[24px] text-on-background hover:text-sacred-gold transition-colors mb-2">
                        {item.product.name}
                      </Link>
                      <p className="font-body text-body-md text-on-surface-variant mb-4">Size: {item.variant.size}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-outline-variant/50 w-fit">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-body text-on-surface">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-display text-[24px] text-earth-brown">₹{item.variant.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-surface-container p-8 sticky top-32">
                  <h2 className="font-display text-[28px] text-on-background mb-6 border-b border-outline-variant/30 pb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6 font-body text-body-lg text-on-surface">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-sacred-gold tracking-wider uppercase text-sm font-bold mt-1">Free</span>
                      ) : (
                        <span>₹{shipping}</span>
                      )}
                    </div>
                    {subtotal <= 999 && (
                      <p className="text-sm text-on-surface-variant italic mt-2">
                        Add ₹{999 - subtotal} more for free shipping!
                      </p>
                    )}
                  </div>
                  
                  <div className="border-t border-outline-variant/30 pt-6 mb-8">
                    <div className="flex justify-between items-end">
                      <span className="font-body text-body-lg text-on-background font-bold">Total</span>
                      <span className="font-display text-[36px] text-earth-brown leading-none">₹{total}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant text-right mt-1">Inclusive of all taxes</p>
                  </div>

                  <button className="btn-primary w-full py-4 text-label-md" onClick={() => router.push('/checkout')}>Proceed to Checkout</button>
                  
                  <div className="mt-6 space-y-3">
                    <p className="flex items-center gap-2 text-sm text-on-surface-variant justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-sacred-gold">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>
                      Secure SSL Checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
