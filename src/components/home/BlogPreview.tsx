import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: "bilona-vs-centrifuge",
    slug: "/blog/bilona-vs-centrifuge-ghee",
    category: "Education",
    title: "Bilona vs. Centrifuge Ghee: The Complete Truth",
    excerpt: "Most ghee on shelves is made by machine in minutes. Learn why the ancient bilona method produces ghee that's nutritionally superior in every measurable way.",
    readTime: "5 min read",
    image: "/images/banners/cow ghee spoon image.png",
  },
  {
    id: "a2-a1-protein",
    slug: "/blog/a2-vs-a1-protein-ghee",
    category: "Nutrition",
    title: "A2 vs A1 Protein: Why It Matters for Your Gut",
    excerpt: "The difference between A1 and A2 beta-casein is a single amino acid — but the impact on digestion is enormous. Here's what the research says.",
    readTime: "7 min read",
    image: "/images/cow/cow product img 2.png",
  },
  {
    id: "ghee-in-ayurveda",
    slug: "/blog/ghee-in-ayurveda",
    category: "Ayurveda",
    title: "Ghee in Ayurveda: The Original Superfood",
    excerpt: "Charaka Samhita describes ghee as a Rasayana — a substance that promotes longevity. Here is the full Ayurvedic case for daily ghee consumption.",
    readTime: "6 min read",
    image: "/images/banners/using ghee image.png",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="section-padding bg-surface">
      <div className="container-brand">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">From the Journal</p>
            <h2 className="font-display text-headline-xl text-on-background">Learn & Discover</h2>
          </div>
          <Link href="/blog" id="view-all-posts-btn" className="btn-link shrink-0">
            All Articles
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              {/* Image */}
              <Link href={post.slug} className="block relative aspect-[3/2] overflow-hidden bg-surface-container mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                />
                {/* Category chip */}
                <div className="absolute top-4 left-4">
                  <span className="font-body text-label-sm tracking-widest uppercase px-3 py-1.5 bg-earth-brown/90 text-primary-fixed-dim">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <p className="font-body text-label-sm text-on-surface-variant mb-2">{post.readTime}</p>
                <Link href={post.slug}>
                  <h3 className="font-display text-headline-md text-on-background mb-3 group-hover:text-sacred-gold transition-colors duration-200 leading-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed flex-1">{post.excerpt}</p>
                <Link href={post.slug} className="btn-link mt-5 text-xs">
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
