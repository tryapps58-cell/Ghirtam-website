import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NABL Lab Reports — Transparent Purity",
  description: "View our NABL lab reports ensuring 100% pure A2 Bilona Ghee with zero adulteration.",
};

export default function LabReportsPage() {
  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-earth-brown py-24 border-b border-outline-variant/30 text-center">
        <div className="container-brand">
          <p className="font-body text-label-sm tracking-[0.4em] uppercase text-sacred-gold mb-4">
            Total Transparency
          </p>
          <h1 className="font-display text-[48px] md:text-[64px] text-ivory-cream mb-6">
            NABL Lab Reports
          </h1>
          <div className="w-16 h-px bg-sacred-gold mx-auto mb-8" />
          <p className="font-body text-body-lg text-ivory-cream/80 max-w-2xl mx-auto leading-relaxed">
            We don't just claim purity, we prove it. Every batch of Ghritam is strictly tested for adulteration, heavy metals, and nutritional profiles.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-4xl mx-auto">
          <div className="bg-surface-container p-12 text-center rounded-sm border border-outline-variant/30">
             <div className="w-16 h-16 bg-sacred-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-sacred-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
             </div>
             <h2 className="font-display text-[32px] text-on-background mb-4">Latest Batch Report: May 2026</h2>
             <p className="font-body text-body-lg text-on-surface-variant mb-8 max-w-lg mx-auto">
                Tested by NABL Accredited Laboratory. Zero traces of vegetable oil, animal fat, or synthetic coloring.
             </p>
             <button className="btn-primary">Download PDF Report</button>
          </div>
        </div>
      </section>
    </div>
  );
}
