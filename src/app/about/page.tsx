'use client'

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    title: "Rooted in Tradition",
    desc: "We follow the 5,000-year-old bilona method — no shortcuts, no machines. Each jar takes 24 hours of care from curd to ghee.",
  },
  {
    title: "Ethically Raised Cows",
    desc: "Our Gir cows graze freely on open pastures. They are never given hormones or antibiotics. Happy cows make better milk.",
  },
  {
    title: "Transparent by Default",
    desc: "Every batch is NABL lab-tested. We share the reports openly. If we wouldn't feed it to our own family, we won't sell it to yours.",
  },
  {
    title: "Small-Batch Always",
    desc: "We never scale at the cost of quality. Each batch is small, slow, and supervised — so the ghee you receive is as pure as day one.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-surface min-h-screen">

      {/* Hero */}
      <section ref={containerRef} className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0 origin-center">
          <Image
            src="/images/banners/farm-heritage.png"
            alt="Pristine Indian dairy farm at dawn — GHRITAM"
            fill
            className="object-cover object-center"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-brown/70 via-earth-brown/40 to-earth-brown/90" />
        </motion.div>
        
        <motion.div style={{ opacity }} className="relative z-10 text-center px-5 max-w-3xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-px bg-sacred-gold/80" />
            <span className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold">Our Story</span>
            <div className="w-10 h-px bg-sacred-gold/80" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-display text-[48px] md:text-[72px] text-white drop-shadow-2xl leading-tight"
          >
            The People Behind<br />
            <em className="font-light text-gold-gradient not-italic">the Purity</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* Origin story - Editorial Layout */}
      <section className="section-padding bg-surface">
        <div className="container-brand max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <p className="font-display text-[32px] md:text-[40px] text-on-background leading-tight">
                GHRITAM was born from a simple realisation: <em className="text-earth-brown font-medium">the ghee most Indians buy is not real ghee.</em>
              </p>
              <div className="w-16 h-px bg-sacred-gold" />
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed opacity-90">
                Walk into any supermarket and you will find tins of pale, odourless fat labelled "pure ghee." But the ancient texts — and your grandmother — will tell you that real ghee is golden, grainy, aromatic, and deeply nourishing. What you find in supermarkets is centrifuge-made in minutes. What we make takes 24 hours per batch.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden bg-surface-container"
            >
              <Image
                src="/images/banners/using ghee image.png"
                alt="Traditional Ghee making"
                fill
                className="object-cover p-4"
                quality={85}
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-24 max-w-3xl mx-auto text-center space-y-8"
          >
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed opacity-90">
              Our founders grew up watching their mothers make ghee the bilona way — setting curd overnight, churning by hand at dawn, slow-simmering on a wood fire. When they saw that tradition disappearing, they decided to revive it — not as a hobby, but as a full commitment to every Indian kitchen that deserves better.
            </p>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed opacity-90">
              Today, GHRITAM is made in small batches from A2 milk of ethically raised Gir cows. Every jar is NABL lab-tested, FSSAI approved, and shipped directly to your door — no middlemen, no compromises.
            </p>
          </motion.div>

          {/* Pull quote */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative mt-32 max-w-4xl mx-auto text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sacred-gold/10 text-[120px] font-display leading-none select-none">"</div>
            <p className="font-display text-[28px] md:text-[36px] text-on-background leading-relaxed relative z-10 px-4 md:px-12">
              We didn&apos;t start GHRITAM to compete with commercial ghee brands. We started it to remind people what ghee is supposed to taste like.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-sacred-gold" />
              <p className="font-body text-label-sm tracking-widest uppercase text-sacred-gold">Founders, GHRITAM</p>
              <div className="w-8 h-px bg-sacred-gold" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface-container/50">
        <div className="container-brand max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold mb-4">What We Stand For</p>
            <h2 className="font-display text-[48px] text-on-background mb-6">Our Core Values</h2>
            <div className="w-16 h-px bg-sacred-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {values.map((v, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-10 md:p-12 hover:shadow-gold-xl transition-shadow duration-500 rounded-sm"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center">
                    <span className="font-body text-label-sm tracking-widest text-sacred-gold">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-[28px] text-on-background">{v.title}</h3>
                </div>
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed opacity-90 pl-[72px]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="/images/banners/cow ghee spoon image.png"
          alt="Pure golden Ghritam ghee"
          fill
          className="object-cover object-center"
          quality={80}
        />
        <div className="absolute inset-0 bg-earth-brown/80 backdrop-blur-sm flex items-center justify-center" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center px-5 max-w-2xl mx-auto"
        >
          <p className="font-display text-[40px] md:text-[56px] text-white mb-8 leading-tight">Ready to Taste the Difference?</p>
          <Link href="/shop" className="btn-primary px-12 py-5 text-label-md tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-gold-md">
            Explore Collection
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
