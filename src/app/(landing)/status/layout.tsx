import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status - Protected Notepad",
  description: "Status page - Protected Notepad",
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}