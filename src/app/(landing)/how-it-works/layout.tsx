import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works - Protected Notepad",
  description: "How it works page - Protected Notepad",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}