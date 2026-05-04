import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ghee in Ayurveda — The Golden Elixir",
  description: "Learn about the Ayurvedic significance of A2 Bilona Ghee, its benefits for Ojas, Agni, and balancing doshas.",
};

export default function AyurvedaPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <section className="bg-earth-brown py-20 border-b border-outline-variant/30 text-center">
        <div className="container-brand">
          <p className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold mb-4">
            The Golden Elixir
          </p>
          <h1 className="font-display text-[48px] md:text-[64px] text-ivory-cream mb-6">
            Ghee in Ayurveda
          </h1>
          <div className="w-16 h-px bg-sacred-gold mx-auto mb-8" />
          <p className="font-body text-body-lg text-ivory-cream/80 max-w-2xl mx-auto leading-relaxed">
            For over 5,000 years, Ayurveda has revered ghee not just as food, but as medicine. Discover why it is considered the ultimate healer.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-brand max-w-4xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-4">
              <h2 className="font-display text-[32px] text-on-background">Building Ojas (Vitality)</h2>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                In Ayurveda, <em>Ojas</em> is the subtle essence of all bodily tissues, responsible for immunity, strength, and vitality. Pure A2 cow ghee is considered one of the most potent substances for building and preserving Ojas.
              </p>
            </div>
            <div className="flex-1 w-full aspect-square bg-surface-container relative">
              <Image src="/images/banners/using ghee image.png" alt="Ojas" fill className="object-cover" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-4">
              <h2 className="font-display text-[32px] text-on-background">Kindling Agni (Digestive Fire)</h2>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                Unlike other fats that can sluggish digestion, ghee actually stimulates <em>Agni</em> (the digestive fire). It improves the absorption and assimilation of nutrients, making the food you eat more effective.
              </p>
            </div>
            <div className="flex-1 w-full aspect-[4/3] bg-surface-container relative">
               <Image src="/images/banners/cow ghee spoon image.png" alt="Agni" fill className="object-cover" />
            </div>
          </div>

        </div>
      </section>

      <section className="py-20 text-center bg-surface-container/50">
        <div className="container-brand">
          <h2 className="font-display text-[40px] text-on-background mb-6">Experience True Healing</h2>
          <Link href="/shop" className="btn-primary">Shop Ayurvedic Ghee</Link>
        </div>
      </section>
    </div>
  );
}
