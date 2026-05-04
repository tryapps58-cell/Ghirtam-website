import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — GHRITAM",
  description:
    "Get in touch with the Ghritam team. Email, WhatsApp, or send us a message. We respond within 24 hours.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
