'use client'

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax & Slow Zoom */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0 origin-center">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/banners/hero image web.jpg"
            alt="Golden A2 Bilona Ghee being poured — GHRITAM"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={90}
          />
        </motion.div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-brown/80 via-earth-brown/40 to-earth-brown/80" />
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-5 md:px-8 max-w-4xl mx-auto mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="inline-flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-[1px] bg-sacred-gold/70" />
          <span className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold">
            Pure · Traditional · Certified
          </span>
          <div className="w-12 h-[1px] bg-sacred-gold/70" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-display font-medium text-white mb-6 drop-shadow-2xl"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
        >
          The Essence of<br />
          <em className="not-italic text-gold-gradient font-light">Pure Tradition</em>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="font-body text-body-lg md:text-[20px] text-white/80 mb-12 max-w-2xl font-light tracking-wide leading-relaxed"
        >
          A2 Bilona Ghee — Hand-churned from grass-fed Desi cows. <br className="hidden md:block" />
          NABL certified, FSSAI approved, with zero additives.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/shop" id="hero-shop-btn" className="btn-primary px-12 py-5 text-label-md tracking-widest uppercase shadow-gold-md hover:scale-105 transition-transform duration-300">
            Shop Collection
          </Link>
          <Link href="/about" id="hero-story-btn" className="px-12 py-5 text-label-md tracking-widest uppercase text-white border border-white/30 hover:border-sacred-gold hover:text-sacred-gold hover:bg-white/5 transition-all duration-300">
            Our Story
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
