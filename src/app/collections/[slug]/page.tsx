import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory, type Product } from "@/lib/products";
import { getDiscount } from "@/lib/utils";

const collectionMeta: Record<
  string,
  { title: string; heading: string; subtitle: string; category: Product["category"] }
> = {
  "cow-ghee": {
    title: "A2 Desi Cow Ghee — Shop Online | GHRITAM",
    heading: "Desi Cow Ghee",
    subtitle: "Pure A2 Bilona · Grass-Fed · NABL Certified",
    category: "cow-ghee",
  },
  "buffalo-ghee": {
    title: "Pure Buffalo Bilona Ghee — Shop Online | GHRITAM",
    heading: "Buffalo Ghee",
    subtitle: "Pure Bilona · Rich & Creamy",
    category: "buffalo-ghee",
  },
  "combo-packs": {
    title: "Ghee Combo Packs — Best Value | GHRITAM",
    heading: "Combo Packs",
    subtitle: "Best Value · Mix & Match",
    category: "combo",
  },
};

export function generateStaticParams() {
  return Object.keys(collectionMeta).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const meta = collectionMeta[slug];
  if (!meta) return { title: "Collection Not Found" };
  return { title: meta.title };
}

export default async function CollectionPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const meta = collectionMeta[slug];
  if (!meta) notFound();

  const products = await getProductsByCategory(meta.category);

  return (
    <div className="bg-surface min-h-screen">
      {/* Breadcrumb */}
      <div className="container-brand py-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-body text-label-sm text-on-surface-variant">
            <li><Link href="/" className="hover:text-sacred-gold transition-colors">Home</Link></li>
            <li className="text-outline-variant">/</li>
            <li><Link href="/shop" className="hover:text-sacred-gold transition-colors">Shop</Link></li>
            <li className="text-outline-variant">/</li>
            <li className="text-on-surface">{meta.heading}</li>
          </ol>
        </nav>
      </div>

      {/* Collection header */}
      <section className="bg-surface-container py-14 border-b border-outline-variant/30 mb-16">
        <div className="container-brand text-center">
          <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">
            {meta.subtitle}
          </p>
          <h1 className="font-display text-headline-xl text-on-background mb-4">{meta.heading}</h1>
          <div className="section-divider mx-auto" />
          <p className="font-body text-body-md text-on-surface-variant mt-4">
            {products.length} product{products.length !== 1 ? "s" : ""} in this collection
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="container-brand pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const base = product.variants?.[1] ?? product.variants?.[0] ?? { price: 0, mrp: 0 };
            const discount = getDiscount(base.price, base.mrp);

            return (
              <article key={product.id} className="card-product group flex flex-col bg-white overflow-hidden">
                {/* Image */}
                <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] block overflow-hidden bg-surface-container">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      {product.badge === "bestseller" && <span className="badge-bestseller">{product.badge_label}</span>}
                      {product.badge === "new" && <span className="badge-new">{product.badge_label}</span>}
                      {product.badge === "sale" && <span className="badge-sale">{product.badge_label}</span>}
                    </div>
                  )}
                  <Image
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                  />
                </Link>
                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-1">{product.subtitle}</p>
                  <Link href={`/products/${product.slug}`}>
                    <h2 className="font-display text-headline-lg text-on-background mb-2 hover:text-sacred-gold transition-colors">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="font-body text-body-md text-on-surface-variant mb-5 flex-1 line-clamp-2">{product.tagline}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.variants?.map((v) => (
                      <span key={v.sku} className="px-3 py-1 border border-outline-variant text-label-sm font-body text-on-surface-variant">
                        {v.size}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-headline-lg text-sacred-gold">₹{base.price}</span>
                      <span className="font-body text-body-md text-on-surface-variant line-through ml-2">₹{base.mrp}</span>
                      <span className="font-body text-label-sm text-forest-sage ml-1">({discount}% off)</span>
                    </div>
                    <Link href={`/products/${product.slug}`} id={`col-${product.id}-btn`} className="btn-primary py-3 px-6 text-sm">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-headline-lg text-on-surface-variant">No products in this collection yet.</p>
            <Link href="/shop" className="btn-primary mt-6">View All Products</Link>
          </div>
        )}
      </section>
    </div>
  );
}
