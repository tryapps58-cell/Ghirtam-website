import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Common Questions About Ghritam Ghee",
  description:
    "Everything you need to know about Ghritam's A2 Bilona Ghee — product quality, NABL certification, delivery, returns, and health benefits.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
