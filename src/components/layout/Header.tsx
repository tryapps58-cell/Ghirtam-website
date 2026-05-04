'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Bilona Process", href: "/bilona-process" },
  { label: "Our Story", href: "/about" },
  { label: "Ayurveda", href: "/ayurveda" },
  { label: "Blog", href: "/blog" },
  { label: "Lab Reports", href: "/lab-reports" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  // Calculate total items (sum of quantities)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Sticky shadow on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`
          fixed top-10 left-0 right-0 z-40 w-full
          transition-all duration-300
          ${scrolled
            ? "bg-ivory-cream/95 backdrop-blur-md shadow-nav border-b border-outline-variant/30"
            : "bg-ivory-cream/80 backdrop-blur-sm"
          }
        `}
      >
        <div className="container-brand">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="GHRITAM Home">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/images/logo/logo-transparent.png"
                  alt="GHRITAM Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-2xl tracking-[0.15em] text-earth-brown">
                  GHRITAM
                </span>
                <span className="font-body text-[10px] tracking-[0.25em] text-on-surface-variant uppercase">
                  Essence of Purity
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ───────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    font-body text-label-md tracking-widest uppercase
                    text-on-surface hover:text-sacred-gold
                    transition-colors duration-200
                    relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-sacred-gold
                    after:transition-all after:duration-300 hover:after:w-full
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Icon Actions ─────────────────────────────────────────── */}
            <div className="flex items-center gap-1">

              {/* Search */}
              <button
                id="header-search-btn"
                aria-label="Search"
                suppressHydrationWarning
                className="p-2.5 text-on-surface hover:text-sacred-gold transition-colors duration-200 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              {/* Account */}
              <Link
                href="/account"
                id="header-account-btn"
                aria-label="My Account"
                className="p-2.5 text-on-surface hover:text-sacred-gold transition-colors duration-200 rounded hidden sm:flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                id="header-cart-btn"
                aria-label={`Cart (${cartCount} items)`}
                className="p-2 text-on-surface hover:text-sacred-gold transition-colors relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-sacred-gold text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-surface translate-x-1 -translate-y-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                id="header-menu-btn"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((o) => !o)}
                suppressHydrationWarning
                className="lg:hidden p-2.5 text-on-surface hover:text-sacred-gold transition-colors duration-200 rounded ml-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
