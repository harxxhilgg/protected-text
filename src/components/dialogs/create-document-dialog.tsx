"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateDocumentDialogProps {
  open: boolean;
  slug: string;
  onContinue: () => void;
  onCancel: () => void;
}

export default function CreateDocumentDialog({
  open,
  slug,
  onContinue,
  onCancel,
}: CreateDocumentDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-xs sm:max-w-sm"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="gap-3">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-lg">Create new site?</DialogTitle>

            <DialogDescription>
              Great! This site doesn&apos;t exist, it can be yours! Would you
              like to create:{" "}
            </DialogDescription>
          </div>

          <p className="text-lg text-center font-semibold">{slug}</p>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="default" onClick={onContinue}>
            Create site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
