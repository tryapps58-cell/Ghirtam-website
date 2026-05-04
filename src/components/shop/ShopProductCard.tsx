'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { getDiscount } from "@/lib/utils";

export default function ShopProductCard({ product, index }: { product: Product, index: number }) {
  const defaultVariant = product.variants?.[0] || { price: 0, mrp: 0, size: "" };
  const discount = getDiscount(defaultVariant.price, defaultVariant.mrp);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="card-product group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-gold-xl transition-shadow duration-500 rounded-sm"
    >
      {/* Image container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-surface-container block">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          {product.badge === "bestseller" && <span className="badge-bestseller">{product.badge_label}</span>}
          {product.badge === "new" && <span className="badge-new">{product.badge_label}</span>}
          {product.badge === "sale" && <span className="badge-sale">{product.badge_label}</span>}
        </div>

        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
        />

        {/* Quick-add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out p-4">
          <div className="btn-dark w-full text-center text-sm py-4 block">
            Select Size & Add
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-8 flex flex-col flex-1 border-t-0">
        <p className="font-body text-label-sm tracking-[0.2em] uppercase text-sacred-gold mb-2">{product.subtitle}</p>
        <Link href={`/products/${product.slug}`}>
          <h2 className="font-display text-headline-lg text-on-background mb-3 hover:text-sacred-gold transition-colors">{product.name}</h2>
        </Link>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-6 flex-1 opacity-80">{product.tagline}</p>

        {/* Size pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.variants?.map((v) => (
            <span key={v.sku} className="px-3 py-1 bg-surface-container text-[11px] font-body text-on-surface-variant uppercase tracking-wider rounded-sm">
              {v.size}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-body text-xs text-on-surface-variant mb-1">Starting from</span>
            <div className="flex items-center gap-3">
              <span className="font-body text-xl font-bold text-on-background">
                ₹{defaultVariant.price}
              </span>
              {discount > 0 && (
                <span className="font-body text-sm text-on-surface-variant line-through opacity-70">
                  ₹{defaultVariant.mrp}
                </span>
              )}
            </div>
          </div>
          <Link href={`/products/${product.slug}`} className="font-body text-label-sm tracking-[0.2em] uppercase text-sacred-gold hover:text-earth-brown transition-colors">
            Shop Now →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
