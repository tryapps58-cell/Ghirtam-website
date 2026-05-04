'use client';

import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="font-body text-sm text-on-surface-variant hover:text-sacred-gold">
        ← Back to Products
      </Link>
      <ProductForm productId={id as string} />
    </div>
  );
}
