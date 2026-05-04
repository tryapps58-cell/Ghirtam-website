import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, product_variants(id)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-headline-lg text-on-background">Product Management</h1>
          <p className="font-body text-body-md text-on-surface-variant mt-2">Add, edit, or remove products and variants.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary px-6 py-3">
          + Add New Product
        </Link>
      </div>

      <div className="bg-white border border-outline-variant/40 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-surface-container/50 text-on-surface-variant border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Product</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Category</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Variants</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Featured</th>
                <th className="px-6 py-4 font-normal uppercase tracking-widest text-[11px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products?.length ? products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-surface-container border border-outline-variant/20 relative rounded shrink-0">
                        {product.images && product.images[0] ? (
                          <Image src={product.images[0]} alt={product.name} fill className="object-contain p-1" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">?</div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-on-background">{product.name}</p>
                        <p className="text-xs text-on-surface-variant">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant uppercase tracking-widest text-[10px]">{product.category}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{product.product_variants?.length || 0}</td>
                  <td className="px-6 py-4">
                    {product.featured ? (
                      <span className="text-sacred-gold">★ Yes</span>
                    ) : (
                      <span className="text-on-surface-variant">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/products/${product.id}`} className="text-sacred-gold hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    No products found. Start by adding a new product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
