import KbdUi from "@/components/kbd-ui";
import React from "react";

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full py-10">
      {/* Left spacer */}
      <div className="flex-6 hidden sm:flex" />

      {/* Center editor */}
      <div className="w-full max-w-4xl">
        {children}
      </div>

      {/* Right shortcuts */}
      <aside className="ml-10 w-fit pt-12 hidden sm:block">
        <KbdUi />
      </aside>

      {/* Right spacer */}
      <div className="flex-1 hidden sm:flex" />
    </main>
  );
}