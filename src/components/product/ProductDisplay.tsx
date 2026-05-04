'use client'

import { useState } from "react"
import ImageGallery from "./ImageGallery"
import AddToCartPanel from "./AddToCartPanel"
import type { Product } from "@/lib/products"

interface ProductDisplayProps {
  product: Product
  children: React.ReactNode
}

export default function ProductDisplay({ product, children }: ProductDisplayProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleVariantChange = (variantSize: string) => {
    if (variantSize === "5L") {
      // 5L dolchi is the last image
      setSelectedImageIndex(product.images.length - 1)
    } else if (selectedImageIndex === product.images.length - 1) {
      // Revert if switched away from 5L
      setSelectedImageIndex(0)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left — Image Gallery */}
      <ImageGallery 
        images={product.images} 
        productName={product.name} 
        externalSelectedIndex={selectedImageIndex}
        onImageSelect={setSelectedImageIndex}
      />

      {/* Right — Product info */}
      <div>
        {children}
        
        {/* Add to cart panel */}
        <AddToCartPanel
          product={product}
          onVariantChange={handleVariantChange}
        />

        {/* Share buttons, etc can be placed here or passed via children */}
      </div>
    </div>
  )
}
