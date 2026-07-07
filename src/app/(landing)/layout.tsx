import LandingFooter from "@/components/landing-footer";
import LandingHeader from "@/components/landing-header";
import SideRaysBg from "@/components/side-rays-bg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* This background is only be shown in the landing page and other (landing) route segments */}
      {/* Background-1 */}
      <div className="fixed inset-0 -z-10">
        <SideRaysBg origin="top-right" />
      </div>

      <div className="min-h-screen flex flex-col">
        <header className="px-8 pt-8">
          <LandingHeader />
        </header>

        <main className="flex-1 flex">
          {children}
        </main>

        <footer className="px-8 pb-6 pt-4">
          <LandingFooter />
        </footer>
      </div>
    </>
  );
}