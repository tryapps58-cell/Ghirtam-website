'use client'

import { useState } from "react";

const faqs = [
  {
    category: "About the Product",
    items: [
      {
        q: "What is A2 Bilona Ghee?",
        a: "A2 Bilona Ghee is made from the milk of Desi cows (like Gir) that produce only A2 beta-casein protein — as opposed to commercial cows that produce A1 protein. The milk is set into curd overnight and hand-churned using a traditional wooden bilona churner. The resulting white butter is slow-simmered to produce pure, golden ghee.",
      },
      {
        q: "How is Bilona Ghee different from regular ghee?",
        a: "Commercial ghee is centrifuge-made from cream in minutes. Bilona ghee takes 24+ hours — from curd setting to hand-churning to slow clarification. The bilona process preserves fat-soluble vitamins A, D, E & K, CLA (conjugated linoleic acid), and butyric acid. Centrifuge ghee loses most of these in the process.",
      },
      {
        q: "Is Ghritam Ghee NABL certified?",
        a: "Yes. Every batch of Ghritam Ghee is independently tested at NABL-accredited laboratories. We test for purity, fatty acid profile, moisture content, and adulteration. Lab reports are available on our website.",
      },
      {
        q: "Does your ghee contain any additives or preservatives?",
        a: "Absolutely not. Ghritam Ghee contains one ingredient: pure A2 bilona ghee. No additives, no preservatives, no artificial colour, no flavour enhancers. Just ghee.",
      },
      {
        q: "What is the shelf life of Ghritam Ghee?",
        a: "Unopened, our ghee has a shelf life of 12 months from the date of manufacturing. Once opened, it should be consumed within 3 months and kept in a cool, dry place away from direct sunlight. Refrigeration is not required.",
      },
    ],
  },
  {
    category: "Ordering & Delivery",
    items: [
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free shipping on all orders above ₹999. Orders below ₹999 attract a flat shipping fee of ₹60.",
      },
      {
        q: "How long does delivery take?",
        a: "Orders are typically dispatched within 1–2 business days. Delivery takes 3–5 business days for most metro cities, and 5–7 business days for remote areas.",
      },
      {
        q: "Do you ship pan-India?",
        a: "Yes, we ship across India. We use trusted courier partners (Delhivery, Bluedart, and DTDC) to ensure your ghee arrives safely.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Once your order is dispatched, you will receive a tracking number via SMS and email. You can track your order on our website under 'My Account → Orders'.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 7-day return policy from the date of delivery. If you receive a damaged or incorrect product, please contact us within 7 days with a photo and we will replace it or issue a full refund.",
      },
      {
        q: "What if I am not satisfied with the product?",
        a: "We stand behind our ghee completely. If you are not happy with the quality for any reason, contact us at hello@ghritam.com and we will make it right — refund or replacement, your choice.",
      },
      {
        q: "How do I initiate a return?",
        a: "Email us at hello@ghritam.com with your order number and reason for return. Our team will respond within 24 hours with instructions. Please do not send back products without contacting us first.",
      },
    ],
  },
  {
    category: "Health & Usage",
    items: [
      {
        q: "How much ghee should I consume daily?",
        a: "Ayurveda recommends 1–2 teaspoons (5–10ml) per day for adults. This can be added to dal, rice, chapati, or consumed with warm milk. For specific health conditions, please consult your Ayurvedic practitioner.",
      },
      {
        q: "Is Ghritam Ghee safe for people with lactose intolerance?",
        a: "Yes! During the clarification process, all milk solids (including lactose and casein) are removed. Pure ghee contains negligible lactose and is generally well-tolerated by people with lactose intolerance. However, if you have a severe dairy allergy, please consult your doctor first.",
      },
      {
        q: "Can I use Ghritam Ghee for deep frying?",
        a: "Yes. Ghritam Ghee has a smoke point of approximately 250°C — one of the highest of any cooking fat. This makes it ideal for deep frying, sautéing, and high-heat cooking. It is significantly more stable than refined vegetable oils at high temperatures.",
      },
      {
        q: "Is your ghee suitable for children?",
        a: "Ghee has been a staple in Indian infant nutrition for thousands of years. It is rich in vitamin K2, which supports bone development, and DHA, which supports brain development. For infants under 6 months, please follow your paediatrician's guidance.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-outline-variant/40 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        suppressHydrationWarning
        aria-expanded={open}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="font-display text-headline-md text-on-background">{q}</span>
        <span className={`shrink-0 w-8 h-8 rounded-full border border-sacred-gold/30 flex items-center justify-center text-sacred-gold transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="bg-surface-container py-16 border-b border-outline-variant/30">
        <div className="container-brand text-center">
          <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">Got Questions?</p>
          <h1 className="font-display text-headline-xl text-on-background mb-4">Frequently Asked Questions</h1>
          <div className="section-divider mx-auto" />
          <p className="font-body text-body-lg text-on-surface-variant max-w-lg mx-auto mt-6">
            Everything you need to know about our ghee, process, and policies.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section-padding">
        <div className="container-brand max-w-3xl mx-auto space-y-16">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-8 pb-3 border-b border-sacred-gold/20">
                {section.category}
              </h2>
              <div>
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions? */}
      <section className="py-16 bg-surface-container">
        <div className="container-brand text-center">
          <h2 className="font-display text-headline-lg text-on-background mb-4">Still Have Questions?</h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-8">
            Our team is happy to help — reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@ghritam.com" id="faq-email-btn" className="btn-primary">
              Email Us
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" id="faq-whatsapp-btn" className="btn-outline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
