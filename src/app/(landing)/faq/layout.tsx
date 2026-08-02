import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Protected Notepad",
  description: "FAQ page - Protected Notepad",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}