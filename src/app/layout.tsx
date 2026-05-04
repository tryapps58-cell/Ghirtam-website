import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "GHRITAM — Pure A2 Bilona Ghee | Essence of Purity",
    template: "%s | GHRITAM",
  },
  description:
    "GHRITAM — Premium A2 Bilona Ghee made from grass-fed Desi cow milk using the ancient hand-churning method. NABL certified, FSSAI approved. Free shipping above ₹999.",
  keywords: ["A2 ghee", "bilona ghee", "organic ghee", "desi cow ghee", "buffalo ghee", "buy ghee online", "NABL certified ghee"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "GHRITAM",
    title: "GHRITAM — Pure A2 Bilona Ghee | Essence of Purity",
    description: "Premium A2 Bilona Ghee made from grass-fed Desi cows using the ancient hand-churning method.",
    images: [{ url: "/images/banners/hero image web.jpg", width: 1200, height: 630, alt: "GHRITAM — Essence of Pure Tradition" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GHRITAM — Pure A2 Bilona Ghee",
    description: "Premium A2 Bilona Ghee. NABL certified. Hand-churned. Free shipping ₹999+.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${nunito.variable} ${playfair.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body antialiased" suppressHydrationWarning>
        {/* Announcement Bar — fixed at very top */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <AnnouncementBar />
        </div>
        {/* Header — fixed below announcement bar (top-10 = 40px) */}
        <Header />
        {/* Page content — push down below fixed header (40px bar + 80px header = 120px) */}
        <main className="flex-1 mt-[120px]">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
