"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();

  const [slug, setSlug] = useState<string>("");

  function handleOpen() {
    const trimmed = slug.trim().toLowerCase().replace(/\s+/g, "-");

    if (!trimmed) return;

    router.push(`/${encodeURIComponent(trimmed)}`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-semibold tracking-tight">Protected Text</h1>

      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-nowrap items-center gap-2 mx-auto">
          <span className="whitespace-nowrap">
            <span className="text-primary/80">Go to</span>{" "}
            protected-notepad.vercel.app/
          </span>

          <Input
            className="w-60"
            placeholder="Enter your site url..."
            value={slug}
            onChange={(e) => {
              const value = e.target.value
                .toLowerCase() // only lower-case
                .replace(/\s+/g, "-") // replace spaces with dash (-)
                .replace(/[^a-z0-9-]/g, ""); // Don't enter weird special characters

              setSlug(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleOpen();
              }
            }}
          />

          <span className="whitespace-nowrap text-muted-foreground">
            (or write directly into the address bar)
          </span>
        </div>

        <Button
          variant="default"
          onClick={handleOpen}
          className="w-[20%] mx-auto rounded-xl"
        >
          Continue
        </Button>
      </div>
    </main>
  );
}
