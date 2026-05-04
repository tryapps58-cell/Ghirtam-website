'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductVariant, Product } from "@/lib/products";
import { getDiscount } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";

interface AddToCartPanelProps {
  product: Product;
  onVariantChange?: (variantSize: string) => void;
}

export default function AddToCartPanel({ product, onVariantChange }: AddToCartPanelProps) {
  const router = useRouter();
  const { variants, id: productId } = product;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>((variants ?? [])[1] ?? (variants ?? [])[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const discount = getDiscount(selectedVariant.price, selectedVariant.mrp);

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    if (onVariantChange) onVariantChange(v.size);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[40px] leading-none text-sacred-gold">
          ₹{selectedVariant.price}
        </span>
        <span className="font-body text-body-lg text-on-surface-variant line-through">
          ₹{selectedVariant.mrp}
        </span>
        <span className="badge-sale">{discount}% OFF</span>
      </div>
      <p className="font-body text-label-sm text-forest-sage tracking-widest">
        ✓ Inclusive of all taxes · Free shipping above ₹999
      </p>

      {/* Size selector */}
      <div>
        <p className="font-body text-label-md tracking-widest uppercase text-on-surface mb-3">
          Size: <span className="text-sacred-gold">{selectedVariant.size}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {(variants ?? []).map((v) => (
            <button
              key={v.sku}
              id={`size-${productId}-${v.size.replace(/\s/g, "-")}`}
              onClick={() => handleVariantSelect(v)}
              aria-pressed={selectedVariant.sku === v.sku}
              disabled={!v.in_stock}
              className={`flex flex-col items-center justify-center p-3 border rounded transition-all duration-300
                ${
                  selectedVariant.sku === v.sku
                    ? "border-sacred-gold bg-sacred-gold/5 text-earth-brown shadow-sm"
                    : "border-outline-variant/50 text-on-surface-variant hover:border-earth-brown/30"
                }
                ${!v.in_stock ? "opacity-40 cursor-not-allowed line-through" : ""}
              `}
            >
              <span className="font-body text-sm font-bold uppercase tracking-wider">{v.size}</span>
              {!v.in_stock && <span className="block text-[10px]">Out of stock</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Qty selector */}
      <div>
        <p className="font-body text-label-md tracking-widest uppercase text-on-surface mb-3">Quantity</p>
        <div className="inline-flex items-center border border-outline-variant">
          <button
            id={`qty-dec-${productId}`}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-12 h-12 flex items-center justify-center text-on-surface hover:text-sacred-gold transition-colors border-r border-outline-variant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <span className="w-14 text-center font-body font-bold text-body-lg text-on-surface">{qty}</span>
          <button
            id={`qty-inc-${productId}`}
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-12 h-12 flex items-center justify-center text-on-surface hover:text-sacred-gold transition-colors border-l border-outline-variant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        <p className="font-body text-label-sm text-on-surface-variant mt-2">
          Total: <span className="font-bold text-on-surface">₹{selectedVariant.price * qty}</span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          id={`add-to-cart-${productId}`}
          onClick={handleAddToCart}
          className={`btn-primary flex-1 py-5 text-base justify-center transition-all duration-300 ${added ? "bg-forest-sage border-forest-sage" : ""}`}
        >
          {added ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Added to Cart!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
        <button
          id={`buy-now-${productId}`}
          onClick={() => {
            addToCart(product, selectedVariant, qty);
            router.push('/checkout');
          }}
          className="btn-dark flex-1 py-5 text-base justify-center"
        >
          Buy Now
        </button>
      </div>

      {/* Trust micro-signals */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-outline-variant/30">
        {[
          { icon: "🏛", label: "NABL Certified" },
          { icon: "🌿", label: "No Additives" },
          { icon: "↩", label: "7-Day Return" },
        ].map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl">{t.icon}</span>
            <span className="font-body text-label-sm text-on-surface-variant">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
