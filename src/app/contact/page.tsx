'use client'

import { useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "hello@ghritam.com",
    href: "mailto:hello@ghritam.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    label: "Support Hours",
    value: "Mon–Sat, 9AM – 6PM IST",
    href: null,
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Placeholder — will be wired to Supabase/email service in Phase 16
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="bg-surface-container py-16 border-b border-outline-variant/30">
        <div className="container-brand text-center">
          <p className="font-body text-label-sm tracking-[0.3em] uppercase text-sacred-gold mb-3">Get in Touch</p>
          <h1 className="font-display text-headline-xl text-on-background mb-4">Contact Us</h1>
          <div className="section-divider mx-auto" />
          <p className="font-body text-body-lg text-on-surface-variant max-w-lg mx-auto mt-6">
            A question about your order, our ghee, or just want to say hello — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact info */}
            <div>
              <h2 className="font-display text-headline-lg text-on-background mb-8">How to Reach Us</h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-sacred-gold/10 border border-sacred-gold/30 flex items-center justify-center text-sacred-gold shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-display text-headline-md text-on-background hover:text-sacred-gold transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="font-display text-headline-md text-on-background">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <h3 className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", href: "https://instagram.com/ghritam" },
                  { name: "Facebook", href: "https://facebook.com/ghritam" },
                  { name: "YouTube", href: "https://youtube.com/@ghritam" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`contact-${s.name.toLowerCase()}`}
                    className="px-5 py-2.5 border border-outline-variant font-body text-label-sm tracking-widest uppercase text-on-surface hover:border-sacred-gold hover:text-sacred-gold transition-all duration-200"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-outline-variant/40 p-8 lg:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-forest-sage/10 border border-forest-sage/30 flex items-center justify-center text-forest-sage mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-display text-headline-lg text-on-background mb-2">Message Sent!</h3>
                  <p className="font-body text-body-md text-on-surface-variant">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <h2 className="font-display text-headline-lg text-on-background mb-6">Send a Message</h2>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Your Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        suppressHydrationWarning
                        placeholder="Priya Sharma"
                        className="input-brand"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Email *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        suppressHydrationWarning
                        placeholder="priya@email.com"
                        className="input-brand"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      suppressHydrationWarning
                      className="input-brand cursor-pointer"
                    >
                      <option value="">Select a topic…</option>
                      <option value="order">Order Enquiry</option>
                      <option value="product">Product Question</option>
                      <option value="return">Return / Refund</option>
                      <option value="wholesale">Wholesale / B2B</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      suppressHydrationWarning
                      placeholder="Tell us how we can help…"
                      className="input-brand resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={status === "loading"}
                    suppressHydrationWarning
                    className="btn-primary w-full py-5 justify-center disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
