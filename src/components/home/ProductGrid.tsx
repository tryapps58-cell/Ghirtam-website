'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { getDiscount } from "@/lib/utils";

function ProductCard({ product, index }: { product: Product, index: number }) {
  const defaultVariant = product.variants?.[0] || { price: 0, mrp: 0 };
  const discount = getDiscount(defaultVariant.price, defaultVariant.mrp);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="card-product group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-gold-xl transition-shadow duration-500 rounded-sm"
      aria-label={product.name}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
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
          <Link
            href={`/products/${product.slug}`}
            className="btn-dark w-full text-center text-sm py-4 block"
            suppressHydrationWarning
          >
            Select Size & Add
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-8 flex flex-col flex-1 border-t-0">
        <p className="font-body text-label-sm tracking-[0.2em] uppercase text-sacred-gold mb-2">{product.subtitle}</p>
        <h3 className="font-display text-headline-lg text-on-background mb-3">{product.name}</h3>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-6 flex-1 opacity-80">{product.tagline}</p>

        {/* Size pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(product.variants ?? []).map((v) => (
            <span key={v.sku} className="px-3 py-1 bg-surface-container text-[11px] font-body text-on-surface-variant uppercase tracking-wider rounded-sm">
              {v.size}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
          <div>
            <span className="font-display text-[24px] text-earth-brown">₹{defaultVariant.price}</span>
            <span className="font-body text-label-sm text-on-surface-variant line-through ml-2">₹{defaultVariant.mrp}</span>
          </div>
          <Link
            href={`/products/${product.slug}`}
            id={`view-${product.id}`}
            className="text-label-sm font-body tracking-widest uppercase text-sacred-gold hover:text-earth-brown transition-colors flex items-center gap-1"
          >
            Details
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  // Only show first 3 featured products
  const featured_products = products.filter(p => p.featured).slice(0, 3);

  return (
    <section id="products" className="section-padding bg-surface">
      <div className="container-brand">
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold mb-4">Our Products</p>
          <h2 className="font-display text-[48px] md:text-[56px] text-on-background mb-4">The Ghritam Collection</h2>
          <div className="w-16 h-px bg-sacred-gold mx-auto mb-8" />
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto opacity-80 leading-relaxed">
            Every jar is slow-crafted with the ancient bilona method — no shortcuts, no additives, just pure traditional nourishment.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {featured_products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <Link href="/shop" id="view-all-products-btn" className="px-10 py-4 border border-outline-variant text-label-md tracking-widest uppercase hover:border-sacred-gold hover:text-sacred-gold transition-colors duration-300">
            View Full Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
