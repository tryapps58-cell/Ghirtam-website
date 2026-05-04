import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductGrid from "@/components/home/ProductGrid";
import BilonaStory from "@/components/home/BilonaStory";
import WhyGhritam from "@/components/home/WhyGhritam";
import Testimonials from "@/components/home/Testimonials";
import CertificationsRow from "@/components/home/CertificationsRow";
import BlogPreview from "@/components/home/BlogPreview";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "GHRITAM — Pure A2 Bilona Ghee | Essence of Purity",
  description:
    "Shop Ghritam's NABL-certified A2 Bilona Ghee — hand-churned from grass-fed Desi cows using the ancient 5000-year-old process. Desi Cow Ghee, Buffalo Ghee, Combo Packs. Free shipping above ₹999.",
};

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      {/* 1. Hero — full-viewport cinematic */}
      <HeroSection />

      {/* 2. Trust Bar — 5 credibility signals */}
      <TrustBar />

      {/* 3. Product Grid — 3 core products */}
      <ProductGrid products={products} />

      {/* 4. Bilona Story — 5-step process */}
      <BilonaStory />

      {/* 5. Why Ghritam — 6 benefits + dark section */}
      <WhyGhritam />

      {/* 6. Testimonials — 3 reviews + aggregate rating */}
      <Testimonials />

      {/* 7. Certifications + Stats */}
      <CertificationsRow />

      {/* 8. Blog Preview — 3 articles */}
      <BlogPreview />

      {/* 9. Newsletter Signup */}
      <NewsletterSignup />
    </>
  );
}
