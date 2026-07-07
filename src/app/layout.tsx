import type { Metadata } from "next";
import "./globals.css";
import { geist } from "@/lib/fonts";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DotFieldBg from "@/components/dot-field-bg";

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
            {/* Background */}
            <div className="fixed inset-0 -z-20">
              <DotFieldBg sparkle={false} dotSpacing={35} />
            </div>

            <main className="w-full">
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
