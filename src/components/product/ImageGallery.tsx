'use client'

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  externalSelectedIndex?: number;
  onImageSelect?: (index: number) => void;
}

export default function ImageGallery({ images, productName, externalSelectedIndex, onImageSelect }: ImageGalleryProps) {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(0);

  // Use external state if provided, otherwise fallback to internal state
  const selectedIndex = externalSelectedIndex !== undefined ? externalSelectedIndex : internalSelectedIndex;

  const handleSelect = (idx: number) => {
    if (onImageSelect) {
      onImageSelect(idx);
    } else {
      setInternalSelectedIndex(idx);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square bg-surface-container overflow-hidden border border-outline-variant/20">
        <Image
          src={images[selectedIndex]}
          alt={`${productName} — view ${selectedIndex + 1}`}
          fill
          className="object-contain p-8 transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={90}
          loading="eager"
        />
        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 bg-earth-brown/60 text-ivory-cream/80 text-[10px] tracking-widest uppercase px-2 py-1 font-body pointer-events-none">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              id={`gallery-thumb-${i}`}
              onClick={() => handleSelect(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={selectedIndex === i}
              className={`relative w-20 h-20 bg-surface-container shrink-0 overflow-hidden transition-all duration-300 ${
                selectedIndex === i
                  ? "border-2 border-sacred-gold shadow-md scale-105"
                  : "border border-outline-variant opacity-70 hover:opacity-100 hover:border-sacred-gold"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-contain p-2"
                sizes="80px"
                quality={50}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
