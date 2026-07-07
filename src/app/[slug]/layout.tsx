import React from "react";

export default function SlugLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <main className="w-full max-w-4xl mx-auto py-10">
      {children}
    </main>
  );
};