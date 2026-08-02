"use client";

import { CopyrightIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ptSans } from "@/lib/fonts";

export default function LandingFooter() {
  return (
    <main className={`${ptSans.className} flex flex-col-reverse sm:flex-row gap-4 items-center justify-between text-muted-foreground`}>
      <div className="flex items-center gap-1 text-xs sm:text-sm font-medium">
        <CopyrightIcon />
        <p className="tracking-wide">2026 Protected Notepad. MIT Licensed.</p>
      </div>

      <div className="flex items-center font-medium">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/0"
          asChild
        >
          <Link href="/security">Security</Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/0"
          onClick={() => window.open("https://github.com/harxxhilgg", "_blank")}
        >
          GitHub
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/0"
          asChild
        >
          <Link href="/status">Status</Link>
        </Button>
      </div>
    </main>
  );
};