import ShopProductCard from "@/components/shop/ShopProductCard";
import { getAllProducts } from "@/lib/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products | GHRITAM",
  description: "Browse our complete collection of authentic A2 Bilona Ghee.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-surface-container py-16 border-b border-outline-variant/30 text-center">
        <div className="container-brand">
          <h1 className="font-display text-headline-xl text-on-background mb-4">Shop All Products</h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover our collection of 100% pure, traditional A2 Bilona Ghee. Crafted with care, delivered to your door.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-6xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20 font-body text-on-surface-variant">
              No products available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product, index) => (
                <ShopProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
