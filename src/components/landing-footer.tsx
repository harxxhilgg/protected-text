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
        <p className="tracking-wide">2026 Protected Notepad. All rights reserved.</p>
      </div>

      <div className="flex items-center font-medium">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/0"
          asChild
        >
          <Link href="">Privacy & Security</Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/0"
          asChild
        >
          <Link href="">GitHub</Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/0"
          asChild
        >
          <Link href="">Status</Link>
        </Button>
      </div>
    </main>
  );
};