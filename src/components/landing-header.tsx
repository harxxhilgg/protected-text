"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ptSans } from "@/lib/fonts";

export default function LandingHeader() {
  return (
    <main className={`${ptSans.className} flex flex-col sm:flex-row gap-2 items-center`}>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">
          Protected Notepad
        </h1>
      </div>

      <div className="flex flex-1 justify-center gap-2 sm:gap-6 transition-all text-muted-foreground">
        <Button
          variant="ghost"
          className="rounded-lg text-[14px] sm:text-[16px]"
          asChild
        >
          <Link href="/">Home</Link>
        </Button>

        <Button
          variant="ghost"
          className="rounded-lg text-[14px] sm:text-[16px]"
          asChild
        >
          <Link href="/how-it-works">How it works</Link>
        </Button>

        <Button
          variant="ghost"
          className="rounded-lg text-[14px] sm:text-[16px]"
          asChild
        >
          <Link href="/insights">Insights</Link>
        </Button>

        <Button
          variant="ghost"
          className="rounded-lg text-[14px] sm:text-[16px]"
          asChild
        >
          <Link href="/faq">FAQ</Link>
        </Button>
      </div>

      <div className="hidden sm:flex flex-1 justify-end">
        <Button
          variant="outline"
          size="lg"
          className="px-10 rounded-xl"
          onClick={() => {
            document.getElementById("site-slug-input")?.focus();
          }}
        >
          Continue
        </Button>
      </div>
    </main>
  );
}
