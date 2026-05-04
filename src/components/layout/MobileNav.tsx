'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

interface NavLink { label: string; href: string; }
interface MobileNavProps { isOpen: boolean; onClose: () => void; links: NavLink[]; }

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-earth-brown/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-ivory-cream flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/logo/logo-transparent.png" alt="GHRITAM" fill className="object-contain" sizes="40px" />
            </div>
            <span className="font-display text-xl font-semibold tracking-widest text-earth-brown">GHRITAM</span>
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="p-2 text-on-surface-variant hover:text-earth-brown transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between w-full py-4 border-b border-outline-variant/20 font-display text-headline-md text-on-background hover:text-sacred-gold transition-colors duration-200 group"
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-on-surface-variant group-hover:text-sacred-gold group-hover:translate-x-1 transition-all duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          {/* Quick links */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30">
            <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-4">Quick Links</p>
            <ul className="space-y-3">
              {[{ label: "My Account", href: "/account" }, { label: "Track Order", href: "/account/orders" }, { label: "Contact Us", href: "/contact" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={onClose} className="font-body text-body-md text-on-surface-variant hover:text-sacred-gold transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-outline-variant/30 bg-surface-low">
          <Link href="/shop" onClick={onClose} className="btn-primary w-full justify-center" id="mobile-nav-shop-btn">Shop Now</Link>
          <p className="font-body text-label-sm text-on-surface-variant text-center mt-3">🚚 Free shipping above ₹999</p>
        </div>
      </nav>
    </>
  );
}
