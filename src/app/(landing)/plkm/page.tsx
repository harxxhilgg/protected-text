"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function TestPage() {
  const showSucessToast = () => {
    toast.add({
      id: "document-save",

      type: "success",
      description: "success toast.",

      timeout: 2500,

      priority: "low",

      // add a undo button
      actionProps: {
        children: "undo",
        onClick: () => {
          console.log("undo");
        },
      },

      onClose: () => {
        console.log("closed");
      },

      onRemove: () => {
        console.log("removed");
      },

      data: {
        documentId: "123",
      }
    })

    // show -> close -> removed
  };

  return (
    <div className="flex flex-col w-full max-w-90 sm:max-w-3xl mx-auto pt-10 sm:pt-30 gap-10 sm:gap-14">
      <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">Test Page</h2>

      <div>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="default"
                size="default"
                onClick={showSucessToast}
              >
                Yo Toast
              </Button>
            }>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            Yo Toast
          </TooltipContent>
        </Tooltip>
      </div>

      <p className="shimmer text-muted-foreground">Generating response&hellip;</p>

    </div>
  );
}