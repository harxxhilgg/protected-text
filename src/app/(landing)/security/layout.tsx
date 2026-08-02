import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security - Protected Notepad",
  description: "Security - Protected Notepad",
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}