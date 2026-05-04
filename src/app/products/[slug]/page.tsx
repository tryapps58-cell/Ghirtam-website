import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getAllSlugs,
  getAllProducts,
} from "@/lib/products";
import ImageGallery from "@/components/product/ImageGallery";
import AddToCartPanel from "@/components/product/AddToCartPanel";
import ProductTabs from "@/components/product/ProductTabs";
import ProductDisplay from "@/components/product/ProductDisplay";

// ─── Static Params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs();
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seo_title,
    description: product.seo_description,
    openGraph: {
      title: product.seo_title,
      description: product.seo_description,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getAllProducts();

  // Related products (same category, excluding current)
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 2);
  // Pad with cross-category if needed
  if (related.length < 2) {
    const others = allProducts
      .filter((p) => p.id !== product.id && !related.includes(p))
      .slice(0, 2 - related.length);
    related.push(...others);
  }

  // Tabs content
  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="prose prose-stone max-w-none">
          {product.description.split("\n\n").map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed">{para}</p>
          ))}
        </div>
      ),
    },
    {
      id: "how-to-use",
      label: "How to Use",
      content: (
        <ul className="space-y-3">
          {product.how_to_use?.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-sacred-gold/10 border border-sacred-gold/30 flex items-center justify-center font-body text-label-sm text-sacred-gold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "nutrition",
      label: "Nutrition",
      content: (
        <div className="border border-outline-variant/40 overflow-hidden">
          {product.nutrition.map((row, i) => (
            <div
              key={i}
              className={`flex justify-between px-5 py-3 text-body-md ${
                i % 2 === 0 ? "bg-surface" : "bg-surface-container"
              }`}
            >
              <span className="font-body text-on-surface">{row.label}</span>
              <span className="font-body font-semibold text-on-surface">{row.value}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

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
            <li className="text-on-surface truncate">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Main PDP layout */}
      <div className="container-brand pb-20">
        <ProductDisplay product={product}>
            {/* Badge */}
            {product.badge && (
              <div className="mb-4">
                {product.badge === "bestseller" && <span className="badge-bestseller">{product.badge_label}</span>}
                {product.badge === "new" && <span className="badge-new">{product.badge_label}</span>}
                {product.badge === "sale" && <span className="badge-sale">{product.badge_label}</span>}
              </div>
            )}

            {/* Name & subtitle */}
            <p className="font-body text-label-sm tracking-[0.25em] uppercase text-on-surface-variant mb-2">
              {product.subtitle}
            </p>
            <h1 className="font-display text-headline-xl text-on-background mb-3">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-sacred-gold">
                    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                  </svg>
                ))}
              </div>
              <span className="font-body text-body-md text-on-surface-variant">4.9 (127 reviews)</span>
            </div>

            {/* Short description */}
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed mb-8 border-l-2 border-sacred-gold/40 pl-4">
              {product.tagline}
            </p>

            {/* Add to cart panel is handled inside ProductDisplay */}

            {/* Share */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-outline-variant/30">
              <span className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant">Share:</span>
              <a href={`https://wa.me/?text=Check%20out%20${product.name}%20by%20GHRITAM%20https://ghritam.com/products/${product.slug}`}
                target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"
                className="p-2 text-on-surface-variant hover:text-sacred-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
        </ProductDisplay>

        {/* Tabs section */}
        <div className="mt-20 border-t border-outline-variant/30 pt-10">
          <ProductTabs tabs={tabs} />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-headline-lg text-on-background mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  id={`related-${rp.id}`}
                  className="card-product group flex gap-6 p-5 bg-white hover:shadow-gold-md transition-shadow"
                >
                  <div className="relative w-24 h-24 shrink-0 bg-surface-container overflow-hidden">
                    <Image
                      src={rp.images[0]}
                      alt={rp.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      sizes="96px"
                      quality={75}
                    />
                  </div>
                  <div>
                    <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-1">{rp.subtitle}</p>
                    <h3 className="font-display text-headline-md text-on-background mb-1">{rp.name}</h3>
                    <span className="font-display text-headline-md text-sacred-gold">
                      ₹{rp.variants?.[0]?.price}
                    </span>
                    <span className="font-body text-body-md text-on-surface-variant ml-2 line-through">
                      ₹{rp.variants?.[0]?.mrp}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
