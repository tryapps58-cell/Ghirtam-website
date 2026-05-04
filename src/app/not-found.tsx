import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — GHRITAM",
  description: "The page you're looking for doesn't exist. Explore our pure A2 Bilona Ghee collection.",
};

export default function NotFound() {
  return (
    <div className="bg-surface min-h-screen flex items-center justify-center py-20">
      <div className="container-brand text-center max-w-xl mx-auto">

        {/* Large gold "404" */}
        <p className="font-display font-bold text-[120px] leading-none text-sacred-gold/20 select-none mb-0 -mb-4">
          404
        </p>

        {/* Icon */}
        <div className="text-5xl mb-6">🫙</div>

        <h1 className="font-display text-headline-xl text-on-background mb-4">
          This jar is empty.
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to the good stuff.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" id="404-home-btn" className="btn-primary">
            Go Home
          </Link>
          <Link href="/shop" id="404-shop-btn" className="btn-outline">
            Shop Our Ghee
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-16 pt-8 border-t border-outline-variant/30">
          <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-6">
            Popular Pages
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "Desi Cow Ghee", href: "/products/desi-cow-ghee" },
              { label: "Buffalo Ghee", href: "/products/buffalo-ghee" },
              { label: "About Us", href: "/about" },
              { label: "Bilona Process", href: "/bilona-process" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 border border-outline-variant font-body text-label-sm tracking-widest uppercase text-on-surface hover:border-sacred-gold hover:text-sacred-gold transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
