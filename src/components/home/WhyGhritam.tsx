import Image from "next/image";
import Link from "next/link";

// Using the "using ghee image" as a rich visual backdrop
export default function WhyGhritam() {
  const benefits = [
    { title: "Vitamin A, D, E & K", desc: "Fat-soluble vitamins only found in authentic bilona ghee." },
    { title: "Butyric Acid", desc: "Gut-healing short-chain fatty acid — supports healthy digestion." },
    { title: "Higher Smoke Point", desc: "Stable up to 250°C — the healthiest cooking fat for Indian cuisine." },
    { title: "Conjugated Linoleic Acid", desc: "Anti-inflammatory omega fatty acids from A2 milk." },
    { title: "No Additives", desc: "Zero preservatives, zero artificial colour, zero compromise." },
    { title: "Ayurveda Approved", desc: "Recognised in Charaka Samhita as Rasayana — a rejuvenating superfood." },
  ];

  return (
    <section id="why-ghritam" className="section-padding bg-earth-brown text-ivory-cream overflow-hidden">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/banners/using ghee image.png"
                alt="Ghritam A2 ghee being used in authentic Indian cooking"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              {/* Gold border accent */}
              <div className="absolute inset-0 border border-sacred-gold/20 pointer-events-none" />
            </div>

            {/* Stats badge */}
            <div className="absolute -right-4 -bottom-4 bg-sacred-gold p-6 text-earth-brown hidden lg:block">
              <p className="font-display text-[48px] font-semibold leading-none">5000</p>
              <p className="font-body text-label-sm tracking-widest uppercase font-bold">Years of Tradition</p>
            </div>
          </div>

          {/* Right — content */}
          <div className="order-1 lg:order-2">
            <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">Why Choose Ghritam</p>
            <h2 className="font-display text-headline-xl text-ivory-cream mb-4 leading-tight">
              Not All Ghee Is<br />
              <em className="not-italic text-gold-gradient">Created Equal</em>
            </h2>
            <div className="w-16 h-px bg-sacred-gold mb-8" />
            <p className="font-body text-body-lg text-ivory-cream/70 mb-10 leading-relaxed">
              Commercial ghee is centrifuge-made. Bilona ghee is soul-made. The difference is in every spoon — the colour, the aroma, the effect.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full border border-sacred-gold/50 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-sacred-gold" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-label-md text-primary-fixed-dim tracking-wide">{b.title}</p>
                    <p className="font-body text-body-md text-ivory-cream/60 mt-0.5 leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/bilona-process" id="why-learn-more-btn" className="btn-primary mt-10 inline-flex">
              See Lab Reports
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
