import Link from "next/link";

const certs = [
  {
    id: "fssai",
    acronym: "FSSAI",
    title: "Food Safety",
    desc: "Approved by the Food Safety & Standards Authority of India",
    color: "text-sacred-gold",
  },
  {
    id: "nabl",
    acronym: "NABL",
    title: "Lab Certified",
    desc: "National Accreditation Board for Testing & Calibration Laboratories",
    color: "text-sacred-gold",
  },
  {
    id: "iso",
    acronym: "ISO 22000",
    title: "Food Safety Management",
    desc: "International standard for food safety management systems",
    color: "text-sacred-gold",
  },
  {
    id: "a2",
    acronym: "A2 Certified",
    title: "Verified A2 Protein",
    desc: "Independently tested for A2 beta-casein protein content",
    color: "text-sacred-gold",
  },
];

const stats = [
  { value: "5000+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Pure — No Additives" },
  { value: "₹999+", label: "Free Shipping" },
];

export default function CertificationsRow() {
  return (
    <section id="certifications" className="section-padding bg-surface-container">
      <div className="container-brand">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="font-display text-headline-xl text-sacred-gold">{s.value}</p>
              <p className="font-body text-label-md tracking-widest uppercase text-on-surface-variant mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 h-px bg-outline-variant/40" />
          <p className="font-body text-label-sm tracking-[0.3em] uppercase text-on-surface-variant whitespace-nowrap">
            Certified & Approved
          </p>
          <div className="flex-1 h-px bg-outline-variant/40" />
        </div>

        {/* Certification cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col items-center text-center p-8 border border-outline-variant/40 bg-surface hover:border-sacred-gold/40 hover:shadow-gold-sm transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full border-2 border-sacred-gold/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-sacred-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <p className={`font-display text-headline-md font-semibold ${cert.color} mb-1`}>{cert.acronym}</p>
              <p className="font-body text-label-md tracking-widest uppercase text-on-surface mb-2">{cert.title}</p>
              <p className="font-body text-body-md text-on-surface-variant leading-snug">{cert.desc}</p>
            </div>
          ))}
        </div>

        {/* Lab reports CTA */}
        <div className="text-center mt-12">
          <Link href="/lab-reports" id="view-lab-reports-btn" className="btn-link">
            View Full Lab Reports
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
