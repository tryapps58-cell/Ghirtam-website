'use client'

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "A2 Milk Collection",
    duration: "Early morning",
    detail: "We begin at dawn. Fresh milk is collected from our Gir cows after their morning graze. We use only A2 milk — which contains only the A2 beta-casein protein, proven easier on digestion.",
    icon: "🐄",
  },
  {
    number: "02",
    title: "Boiling & Cooling",
    duration: "~1 hour",
    detail: "The milk is gently boiled to sanitise and then cooled to a specific temperature — warm enough to support culture growth, not hot enough to kill it.",
    icon: "🌡",
  },
  {
    number: "03",
    title: "Curd Setting",
    duration: "8–10 hours overnight",
    detail: "A spoonful of the previous batch's curd is added as a natural culture starter. The pot is covered and left overnight. By morning, it has set into thick, creamy curd.",
    icon: "🌙",
  },
  {
    number: "04",
    title: "Hand Churning — Bilona",
    duration: "45–60 minutes",
    detail: "This is the heart of the method. A wooden churner (bilona) is inserted into the curd and rotated rhythmically by hand. The churning separates fat from the liquid — white butter rises to the surface. This is the only method that preserves CLA, butyric acid, and fat-soluble vitamins.",
    icon: "🌀",
  },
  {
    number: "05",
    title: "Butter Separation",
    duration: "~15 minutes",
    detail: "The white butter is skimmed off by hand. What remains — the buttermilk — is a probiotic-rich drink treasured in Ayurveda. Nothing is wasted.",
    icon: "🧈",
  },
  {
    number: "06",
    title: "Slow Clarification",
    duration: "1–2 hours on low flame",
    detail: "The white butter is placed in a heavy-bottomed pan and simmered on a very low flame. Moisture evaporates. Milk solids settle to the bottom. What remains, shimmering golden, is pure bilona ghee.",
    icon: "✨",
  },
];

const whyMatters = [
  { label: "Vitamins A, D, E, K", desc: "Only preserved when butter is separated by churning, not centrifuge." },
  { label: "CLA (Omega Fatty Acids)", desc: "Anti-inflammatory conjugated linoleic acid — present only in grass-fed bilona ghee." },
  { label: "Butyric Acid", desc: "Gut-healing short-chain fatty acid. Bilona ghee has 3–4% butyric acid." },
  { label: "No Oxidation", desc: "Slow clarification at low heat prevents the oxidation that ruins commercial ghee." },
  { label: "Natural Grain Structure", desc: "The grainy texture of real ghee is proof of proper crystallisation — a sign of purity." },
];

export default function BilonaProcessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-surface min-h-screen">

      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0 origin-center">
          <Image
            src="/images/banners/bilona-churner.png"
            alt="Traditional wooden bilona churning butter"
            fill
            className="object-cover object-center"
            quality={95}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-brown/80 via-earth-brown/50 to-earth-brown/90" />
        </motion.div>
        
        <motion.div style={{ opacity }} className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-sacred-gold/80" />
            <span className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold">5,000-Year-Old Method</span>
            <div className="w-12 h-px bg-sacred-gold/80" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-display text-[56px] md:text-[80px] text-white drop-shadow-2xl leading-none mb-6"
          >
            The <em className="text-gold-gradient not-italic">Bilona</em> Method
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-body text-body-lg text-white/80 max-w-2xl mx-auto text-xl"
          >
            Why hand-churning creates golden, aromatic ghee that no modern machine ever can.
          </motion.p>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-surface">
        <div className="container-brand max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-16 h-px bg-sacred-gold mx-auto mb-12" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-display text-[28px] md:text-[36px] text-on-background leading-relaxed"
          >
            The word <em className="not-italic text-sacred-gold font-medium">&ldquo;bilona&rdquo;</em> refers to the traditional wooden churner used for thousands of years in Indian homes.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-body-lg text-on-surface-variant leading-relaxed mt-8 opacity-90"
          >
            It is the only tool capable of separating butter from curd in a way that preserves every delicate nutrient. Modern centrifuge machines extract fat efficiently — but they destroy what makes ghee truly nourishing.
          </motion.p>
        </div>
      </section>

      {/* Steps - Interactive Vertical Timeline */}
      <section className="py-24 bg-surface-container/30 relative">
        <div className="container-brand max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-display text-[48px] text-on-background mb-6">From Cow to Jar</h2>
            <p className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold">The 6 Sacred Steps</p>
          </div>

          <div className="relative">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sacred-gold/30 to-transparent -translate-x-1/2" />

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Node on the line */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-surface border-2 border-sacred-gold/40 items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                      <span className="text-2xl">{step.icon}</span>
                    </div>

                    {/* Content Box */}
                    <div className={`w-full md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                      <div className="bg-white p-8 md:p-10 hover:shadow-gold-xl transition-shadow duration-500 rounded-sm border border-outline-variant/20 relative group">
                        
                        <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-sacred-gold/50 to-transparent left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        <span className="font-display text-[64px] leading-none text-sacred-gold/10 absolute top-4 right-8 select-none font-bold">
                          {step.number}
                        </span>
                        
                        <div className={`flex flex-col ${isEven ? "items-start" : "items-start md:items-end"}`}>
                          <h3 className="font-display text-[28px] text-on-background mb-2 relative z-10">{step.title}</h3>
                          <span className="font-body text-[11px] uppercase tracking-widest text-sacred-gold bg-sacred-gold/5 px-3 py-1 rounded-sm mb-6 inline-block">
                            ⏱ {step.duration}
                          </span>
                          <p className="font-body text-body-md text-on-surface-variant leading-relaxed opacity-90 relative z-10">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section-padding bg-earth-brown text-ivory-cream">
        <div className="container-brand max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold mb-4">The Science</p>
              <h2 className="font-display text-[40px] md:text-[56px] text-ivory-cream mb-6 leading-tight">Why Bilona Makes a Measurable Difference</h2>
              <div className="w-16 h-px bg-sacred-gold mb-12" />
              <div className="space-y-8">
                {whyMatters.map((w, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-5 group"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full border border-sacred-gold/30 flex items-center justify-center mt-0.5 group-hover:border-sacred-gold transition-colors duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-sacred-gold/50 group-hover:bg-sacred-gold transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-body font-bold text-[16px] text-primary-fixed-dim tracking-wide">{w.label}</p>
                      <p className="font-body text-body-md text-ivory-cream/60 mt-1.5 leading-relaxed">{w.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/lab-reports" className="btn-primary mt-12 inline-flex px-10 py-4 shadow-gold-sm hover:shadow-gold-md transition-shadow">
                View NABL Lab Reports
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square overflow-hidden hidden lg:block bg-earth-brown-light/20 rounded-full"
            >
              <Image
                src="/images/cow/cow product img 1.png"
                alt="Ghritam A2 Cow Ghee jar"
                fill
                className="object-contain p-12 hover:scale-105 transition-transform duration-700 ease-out"
                quality={90}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/texture-pattern.png')] opacity-5 mix-blend-multiply" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container-brand relative z-10"
        >
          <h2 className="font-display text-[48px] md:text-[64px] text-on-background mb-6">Taste the 5,000-Year-Old Difference</h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto opacity-80 leading-relaxed">
            Every spoon of Ghritam carries the patience, tradition, and care of the authentic bilona method.
          </p>
          <Link href="/shop" className="btn-primary px-12 py-5 text-label-md tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-gold-md">
            Shop Ghritam Ghee
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
