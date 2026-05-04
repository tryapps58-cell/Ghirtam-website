import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Create a static client for public data fetching that does not rely on cookies().
// This allows Next.js to statically generate pages at build time.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const getStaticClient = () => createSupabaseClient(supabaseUrl, supabaseKey);

export interface ProductVariant {
  id?: string;
  size: string;
  price: number;
  mrp: number;
  sku: string;
  in_stock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  how_to_use: string[];
  nutrition: { label: string; value: string }[];
  images: string[];
  badge?: "bestseller" | "new" | "sale" | string;
  badge_label?: string;
  category: "cow-ghee" | "buffalo-ghee" | "combo" | string;
  variants?: ProductVariant[]; // From joined table product_variants
  featured: boolean;
  seo_title: string;
  seo_description: string;
  created_at?: string;
  updated_at?: string;
}

// ─── Data Fetching Functions ─────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const supabase = getStaticClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = getStaticClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return undefined;
  }
  return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = getStaticClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("category", category);

  if (error) {
    console.error(`Error fetching products by category ${category}:`, error);
    return [];
  }
  return data || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = getStaticClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("featured", true);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
  return data || [];
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  const supabase = getStaticClient();
  const { data, error } = await supabase.from("products").select("slug");
  if (error) {
    console.error("Error fetching all slugs:", error);
    return [];
  }
  return data || [];
}


