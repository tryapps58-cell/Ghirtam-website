import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "A2 Milk Collection",
    desc: "Ethically sourced from grass-fed Desi Gir cows — no hormones, no antibiotics, just pure A2 milk at dawn.",
  },
  {
    number: "02",
    title: "Curd Setting",
    desc: "The milk is gently boiled and allowed to cool before a spoonful of natural culture is added. Left overnight to set.",
  },
  {
    number: "03",
    title: "Hand Churning",
    desc: "The set curd is hand-churned using the traditional bilona (wooden churner) — the only method that preserves all nutrients.",
  },
  {
    number: "04",
    title: "Butter Separation",
    desc: "White butter naturally rises and separates. The buttermilk left behind is a probiotic treasure.",
  },
  {
    number: "05",
    title: "Slow Clarification",
    desc: "Butter is simmered on a low flame until golden. The milk solids settle — leaving behind liquid gold: pure bilona ghee.",
  },
];

export default function BilonaStory() {
  return (
    <section id="bilona-process" className="section-padding bg-surface-low">
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">
            Ancient Wisdom
          </p>
          <h2 className="section-heading mb-4">The Bilona Method</h2>
          <div className="section-divider" />
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto">
            A 5,000-year-old process that cannot be rushed. Each step is sacred.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — steps */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                {/* Step number */}
                <div className="shrink-0 flex flex-col items-center">
                  <span className="font-display text-headline-xl font-semibold text-sacred-gold/30 group-hover:text-sacred-gold transition-colors duration-300 leading-none">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-outline-variant/40 mt-2 min-h-[32px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-2">
                  <h3 className="font-display text-headline-md text-on-background mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

            <Link href="/bilona-process" id="bilona-learn-more-btn" className="btn-link inline-flex mt-4">
              Learn the Full Story
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Right — image + quote */}
          <div className="relative">
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-gold-lg">
              <Image
                src="/images/banners/cow ghee spoon image.png"
                alt="Golden ghee being scooped with a wooden spoon"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              {/* Gold frame accent */}
              <div className="absolute inset-0 border border-sacred-gold/20 pointer-events-none" />
            </div>

            {/* Floating quote card */}
            <div className="absolute -bottom-8 -left-6 bg-earth-brown px-6 py-5 max-w-xs shadow-gold-md hidden lg:block">
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sacred-gold mb-2">
                <path d="M0 20V12.5C0 8.833 1.167 5.833 3.5 3.5C5.833 1.167 8.917 0 12.75 0V3.5C10.25 3.5 8.25 4.25 6.75 5.75C5.25 7.25 4.5 9.25 4.5 11.75H9V20H0ZM15 20V12.5C15 8.833 16.167 5.833 18.5 3.5C20.833 1.167 23.917 0 27.75 0V3.5C25.25 3.5 23.25 4.25 21.75 5.75C20.25 7.25 19.5 9.25 19.5 11.75H24V20H15Z" fill="currentColor" fillOpacity="0.4" />
              </svg>
              <p className="font-quote italic text-body-lg text-ivory-cream/90 leading-relaxed">
                &ldquo;True nourishment cannot be rushed. It is born of patience and reverence.&rdquo;
              </p>
              <p className="font-body text-label-sm tracking-widest uppercase text-sacred-gold mt-3">
                — Vedic Tradition
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
