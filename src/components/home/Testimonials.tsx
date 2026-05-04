const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "PS",
    rating: 5,
    title: "Best ghee I've ever tasted",
    body: "I've been using Ghritam's A2 Cow Ghee for 3 months now. The aroma is incredible — it fills the whole kitchen when it hits the pan. My family can taste the difference immediately. Never going back to store-bought ghee.",
    product: "Desi Cow Ghee · 1L",
    verified: true,
  },
  {
    id: 2,
    name: "Rajesh Nair",
    location: "Bengaluru",
    avatar: "RN",
    rating: 5,
    title: "Ayurveda approved, family approved",
    body: "Our family Ayurvedic doctor specifically recommended Bilona ghee. Ghritam was the first I tried and the quality is exactly what was described — pure, grainy texture, deep golden colour. My digestion has improved noticeably.",
    product: "Desi Cow Ghee · 2L",
    verified: true,
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Ahmedabad",
    avatar: "AP",
    rating: 5,
    title: "The Duo Combo is great value",
    body: "Ordered the Duo Combo to compare both. The cow ghee is perfect for everyday cooking while the buffalo ghee adds a richness to sweets that is unmatched. Fast delivery, beautiful packaging. Will definitely reorder.",
    product: "The Duo Combo",
    verified: true,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < count ? 0 : 1.5}
          className={`w-4 h-4 ${i < count ? "text-sacred-gold" : "text-outline-variant"}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="section-padding bg-ivory-cream">
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">Reviews</p>
          <h2 className="section-heading mb-4">What Our Customers Say</h2>
          <div className="section-divider" />

          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-surface border border-outline-variant/40">
            <StarRating count={5} />
            <span className="font-display text-headline-md text-on-background">4.9</span>
            <span className="font-body text-body-md text-on-surface-variant">from 500+ reviews</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <article key={t.id} className="bg-surface border border-outline-variant/30 p-8 flex flex-col gap-4 hover:shadow-gold-sm transition-shadow duration-300">
              {/* Stars + verified */}
              <div className="flex items-center justify-between">
                <StarRating count={t.rating} />
                {t.verified && (
                  <span className="font-body text-label-sm text-forest-sage tracking-widest">✓ Verified</span>
                )}
              </div>

              {/* Review text */}
              <h3 className="font-display text-headline-md text-on-background">{t.title}</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed flex-1">&ldquo;{t.body}&rdquo;</p>

              {/* Product tag */}
              <p className="font-body text-label-sm tracking-widest uppercase text-sacred-gold border-t border-outline-variant/30 pt-4">
                {t.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center font-display font-semibold text-earth-brown text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-body font-bold text-body-md text-on-surface">{t.name}</p>
                  <p className="font-body text-label-sm text-on-surface-variant">{t.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://g.page/ghritam"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-reviews-btn"
            className="btn-outline"
          >
            View All Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
