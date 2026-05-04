'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    slug: "", name: "", subtitle: "", tagline: "", description: "",
    category: "cow-ghee", badge: "", badge_label: "", featured: false,
    seo_title: "", seo_description: "",
  });

  const [howToUse, setHowToUse] = useState<string[]>([""]);
  const [nutrition, setNutrition] = useState<{label: string, value: string}[]>([{label: "", value: ""}]);
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<{id?: string, size: string, price: number, mrp: number, sku: string, in_stock: boolean}[]>([]);
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    } else {
      setIsLoading(false);
    }
  }, [productId]);

  async function fetchProduct() {
    const { data: product } = await supabase.from("products").select("*").eq("id", productId).single();
    if (product) {
      setForm({
        slug: product.slug, name: product.name, subtitle: product.subtitle || "",
        tagline: product.tagline || "", description: product.description || "",
        category: product.category, badge: product.badge || "", badge_label: product.badge_label || "",
        featured: product.featured, seo_title: product.seo_title || "", seo_description: product.seo_description || ""
      });
      setHowToUse(product.how_to_use?.length ? product.how_to_use : [""]);
      setNutrition(product.nutrition?.length ? product.nutrition : [{label: "", value: ""}]);
      setImages(product.images || []);
    }

    const { data: variantData } = await supabase.from("product_variants").select("*").eq("product_id", productId);
    if (variantData && variantData.length > 0) {
      setVariants(variantData);
    } else {
      setVariants([{ size: "", price: 0, mrp: 0, sku: "", in_stock: true }]);
    }
    
    setIsLoading(false);
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('products').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('products').getPublicUrl(filePath);
      setImages([...images, data.publicUrl]);
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    try {
      const productData = {
        ...form,
        how_to_use: howToUse.filter(h => h.trim() !== ""),
        nutrition: nutrition.filter(n => n.label.trim() !== "" || n.value.trim() !== ""),
        images
      };

      let currentProductId = productId;

      if (productId) {
        // Update product
        const { error } = await supabase.from("products").update(productData).eq("id", productId);
        if (error) throw error;
      } else {
        // Insert product
        const { data, error } = await supabase.from("products").insert(productData).select("id").single();
        if (error) throw error;
        currentProductId = data.id;
      }

      // Handle Variants (delete existing and insert new for simplicity, or upsert)
      // For simplicity, we delete all variants for this product and re-insert
      if (currentProductId) {
        await supabase.from("product_variants").delete().eq("product_id", currentProductId);
        
        const validVariants = variants.filter(v => v.size.trim() !== "" && v.sku.trim() !== "").map(v => ({
          product_id: currentProductId,
          size: v.size,
          price: v.price,
          mrp: v.mrp,
          sku: v.sku,
          in_stock: v.in_stock
        }));

        if (validVariants.length > 0) {
          const { error: varError } = await supabase.from("product_variants").insert(validVariants);
          if (varError) throw varError;
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save product");
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="py-20 text-center">Loading product data...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-headline-lg text-on-background">{productId ? "Edit Product" : "New Product"}</h1>
        </div>
        <button type="submit" disabled={isSaving} className="btn-primary px-8 py-3 disabled:opacity-70">
          {isSaving ? "Saving..." : "Save Product"}
        </button>
      </div>

      {errorMsg && (
        <div className="bg-error-container/30 border border-error/40 text-on-error-container p-4 font-body text-sm">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm space-y-6">
            <h2 className="font-display text-xl text-on-background border-b border-outline-variant/30 pb-4">Basic Details</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">Product Name *</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-brand w-full" />
              </div>
              <div>
                <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">URL Slug *</label>
                <input required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="input-brand w-full" placeholder="e.g. cow-ghee" />
              </div>
            </div>

            <div>
              <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">Subtitle</label>
              <input value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} className="input-brand w-full" placeholder="e.g. A2 Bilona · Grass-Fed" />
            </div>

            <div>
              <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">Tagline</label>
              <input value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} className="input-brand w-full" />
            </div>

            <div>
              <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">Description</label>
              <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-brand w-full min-h-[150px]" />
            </div>
          </div>

          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
              <h2 className="font-display text-xl text-on-background">Pricing & Variants</h2>
              <button type="button" onClick={() => setVariants([...variants, {size: "", price: 0, mrp: 0, sku: "", in_stock: true}])} className="text-sacred-gold font-body text-sm hover:underline">+ Add Variant</button>
            </div>
            
            <div className="space-y-4">
              {variants.map((v, i) => (
                <div key={i} className="flex gap-4 items-end bg-surface-container/30 p-4 border border-outline-variant/20 rounded">
                  <div className="flex-1">
                    <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Size (e.g. 500ml)</label>
                    <input required value={v.size} onChange={e => { const nv = [...variants]; nv[i].size = e.target.value; setVariants(nv); }} className="input-brand w-full py-2" />
                  </div>
                  <div className="flex-1">
                    <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Price (₹)</label>
                    <input type="number" required value={v.price} onChange={e => { const nv = [...variants]; nv[i].price = Number(e.target.value); setVariants(nv); }} className="input-brand w-full py-2" />
                  </div>
                  <div className="flex-1">
                    <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">MRP (₹)</label>
                    <input type="number" required value={v.mrp} onChange={e => { const nv = [...variants]; nv[i].mrp = Number(e.target.value); setVariants(nv); }} className="input-brand w-full py-2" />
                  </div>
                  <div className="flex-1">
                    <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">SKU</label>
                    <input required value={v.sku} onChange={e => { const nv = [...variants]; nv[i].sku = e.target.value; setVariants(nv); }} className="input-brand w-full py-2" />
                  </div>
                  <div>
                    <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1 text-center">In Stock</label>
                    <input type="checkbox" checked={v.in_stock} onChange={e => { const nv = [...variants]; nv[i].in_stock = e.target.checked; setVariants(nv); }} className="w-5 h-5 mx-auto block accent-sacred-gold" />
                  </div>
                  <button type="button" onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="text-error font-bold pb-2 px-2 hover:bg-error/10 rounded">✕</button>
                </div>
              ))}
            </div>
            <p className="text-xs text-on-surface-variant font-body">If Price is less than MRP, it will automatically show a discount badge on the shop.</p>
          </div>

          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm space-y-6">
            <h2 className="font-display text-xl text-on-background border-b border-outline-variant/30 pb-4">Images</h2>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square border border-outline-variant/30 bg-surface-container rounded group">
                  <Image src={img} alt="Product" fill className="object-contain p-2" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-error text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">✕</button>
                </div>
              ))}
              <div className="relative aspect-square border-2 border-dashed border-outline-variant/50 rounded flex flex-col items-center justify-center hover:bg-surface-container/50 transition-colors">
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                <span className="text-3xl text-outline-variant">{uploading ? "..." : "+"}</span>
                <span className="font-body text-xs text-on-surface-variant mt-2">{uploading ? "Uploading..." : "Add Image"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm space-y-6">
            <h2 className="font-display text-xl text-on-background border-b border-outline-variant/30 pb-4">Organization</h2>
            
            <div>
              <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-brand w-full bg-white">
                <option value="cow-ghee">Cow Ghee</option>
                <option value="buffalo-ghee">Buffalo Ghee</option>
                <option value="combo">Combo Packs</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-5 h-5 accent-sacred-gold" />
              <label htmlFor="featured" className="font-body text-sm font-bold text-on-background">Featured Product</label>
            </div>
            
            <div>
              <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">Badge (Optional)</label>
              <select value={form.badge} onChange={e => setForm({...form, badge: e.target.value})} className="input-brand w-full bg-white mb-2">
                <option value="">None</option>
                <option value="bestseller">Best Seller</option>
                <option value="new">New</option>
                <option value="sale">Sale</option>
              </select>
              <input value={form.badge_label} onChange={e => setForm({...form, badge_label: e.target.value})} className="input-brand w-full" placeholder="Badge Label (e.g. Best Seller)" />
            </div>
          </div>

          <div className="bg-white border border-outline-variant/40 p-6 rounded shadow-sm space-y-6">
            <h2 className="font-display text-xl text-on-background border-b border-outline-variant/30 pb-4">SEO</h2>
            <div>
              <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">SEO Title</label>
              <input value={form.seo_title} onChange={e => setForm({...form, seo_title: e.target.value})} className="input-brand w-full" />
            </div>
            <div>
              <label className="font-body text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">SEO Description</label>
              <textarea value={form.seo_description} onChange={e => setForm({...form, seo_description: e.target.value})} className="input-brand w-full min-h-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
