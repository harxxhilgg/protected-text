"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "@/lib/data";

export default function FAQPage() {
  const [isExtended, setIsExtended] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full max-w-90 sm:max-w-4xl mx-auto pt-10 sm:pt-30 gap-8">
      <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">FAQ:</h2>

      <div className="mx-6 sm:mx-0">
        <ol className="space-y-4 sm:space-y-8 list-decimal">
          {/* FAQ from 1st to 4th item */}
          {faqs.slice(0, 4).map((faq) => (
            <motion.li layout key={faq.question} className="pl-2">
              <h3 className="font-semibold flex text-sm sm:text-[16px]">
                <span className="text-primary shrink-0">Q:</span>
                <span className="ml-1 italic">{faq.question}</span>
              </h3>

              <p className="mt-1 flex text-muted-foreground text-sm sm:text-[16px]">
                <span className="font-medium text-primary shrink-0">A:</span>
                <span className="ml-1">{faq.answer}</span>
              </p>
            </motion.li>
          ))}

          {/* FAQ from 5th item */}
          <AnimatePresence initial={false}>
            {isExtended && faqs.slice(4).map((faq) => (
              <motion.li
                key={faq.question}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.25,
                  ease: "anticipate"
                }}
                className="pl-2"
              >
                <h3 className="font-semibold flex text-sm sm:text-[16px]">
                  <span className="text-primary shrink-0">Q:</span>
                  <span className="ml-1 italic">{faq.question}</span>
                </h3>

                <p className="mt-1 flex text-muted-foreground text-sm sm:text-[16px]">
                  <span className="font-medium text-primary shrink-0">A:</span>
                  <span className="ml-1">{faq.answer}</span>
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>

        {/* Show / Hide btn */}
        <motion.div layout>
          <Button
            variant="link"
            size="default"
            className="-ml-6 sm:ml-0 mt-8 mb-20 underline text-muted-foreground hover:text-primary duration-200 font-semibold text-sm sm:text-[16px]"
            onClick={() => setIsExtended((prev) => !prev)}
          >
            {isExtended ? "Hide FAQ" : "Show FAQ"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}