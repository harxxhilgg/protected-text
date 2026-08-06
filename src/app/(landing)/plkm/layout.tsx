import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLKM - Protected Notepad",
  description: "PLKM - Protected Notepad",
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}