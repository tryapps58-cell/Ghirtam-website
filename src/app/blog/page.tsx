import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal — Ghritam Blog",
  description: "Read about A2 ghee, Ayurveda, traditional Indian recipes, and our farm life.",
};

export default function BlogPage() {
  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-surface-container py-24 border-b border-outline-variant/30 text-center">
        <div className="container-brand">
          <p className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold mb-4">
            The Journal
          </p>
          <h1 className="font-display text-[48px] md:text-[64px] text-on-background mb-6">
            Stories & Wisdom
          </h1>
          <div className="w-16 h-px bg-sacred-gold mx-auto mb-8" />
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Thoughts on Ayurveda, traditional living, and recipes from the heart of India.
          </p>
        </div>
      </section>

      <section className="section-padding min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-[32px] text-on-surface-variant mb-4">Coming Soon</p>
          <p className="font-body text-body-lg text-on-surface-variant opacity-80 mb-8">We are brewing some beautiful stories. Check back later!</p>
          <Link href="/shop" className="btn-primary">Return to Shop</Link>
        </div>
      </section>
    </div>
  );
}
