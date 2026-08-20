"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ptSans } from "@/lib/fonts";
import { delay } from "@/lib/utils";
import { CaretRightIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleOpen = async () => {
    try {
      setIsLoading(true);

      // Network delay
      await delay(500);

      if (!slug) {
        setError("Please enter site/slug name.");
        return;
      }

      const trimmed = slug.trim().toLowerCase().replace(/\s+/g, "-");

      if (!trimmed) return;

      router.push(`/${encodeURIComponent(trimmed)}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-1 items-center justify-center px-0 sm:px-8">
      <div className="w-full sm:max-w-4xl flex flex-col sm:items-center gap-6 sm:gap-10">
        <div className="space-y-3 sm:space-y-6 text-center">
          <h2 className="text-xl sm:text-3xl font-bold">
            Encrypt your notes in the browser.
          </h2>

          <p className="text-sm mx-auto max-w-2xl text-muted-foreground px-6">
            True client-side encryption for your notes. No logs, no tracking
            cookies, and absolutely no backdoor access. Pure digital peace of
            mind.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 px-8">
          <span className={`${ptSans.className} text-primary sm:text-xl tracking-wide`}>
            protected-notepad.vercel.app/
          </span>

          <div className="flex items-center gap-2">
            <Input
              id="site-slug-input"
              className={`${ptSans.className} sm:h-10 w-70 sm:w-80 sm:text-xl md:text-[18px] tracking-wide`}
              placeholder="Your site name..."
              value={slug}
              onChange={(e) => {
                const value = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "");

                setSlug(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOpen();
                }
              }}
            />

            {/* Right arrow btn - for mobile */}
            <Button
              size="icon"
              className="rounded-full flex sm:hidden"
              onClick={handleOpen}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <CaretRightIcon weight="regular" className="size-4" />
              )}
            </Button>

            {/* Right arrow btn - for desktop/laptop */}
            <Button
              size="icon-lg"
              className="rounded-full hidden sm:flex"
              onClick={handleOpen}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <CaretRightIcon weight="regular" className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-destructive -mt-4 px-8 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}