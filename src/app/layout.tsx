import type { Metadata } from "next";
import "./globals.css";
import { geist } from "@/lib/fonts";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Protected Text",
  description: "Protected-Text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider attribute="class" enableSystem>
          <TooltipProvider>
            <main className="w-full max-w-4xl mx-auto py-10">
              {children}
            </main>

            <Toaster
              position="top-right"
              toastOptions={{
                closeButton: true,
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
