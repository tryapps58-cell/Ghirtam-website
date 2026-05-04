import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="font-body text-sm text-on-surface-variant hover:text-sacred-gold">
        ← Back to Products
      </Link>
      <ProductForm />
    </div>
  );
}
