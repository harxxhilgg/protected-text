"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";

interface DeleteDocumentDialog {
  open: boolean;
  slug: string;
  loading: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteDocumentDialog({
  open,
  loading,
  onCancel,
  onDelete,
}: DeleteDocumentDialog) {
  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-xs sm:max-w-sm"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-lg">Delete this site?</DialogTitle>

            <DialogDescription className="flex flex-col gap-2">
              <span>
                Are you sure you want to permanently delete this site?
              </span>

              <span>This action can&apos;t be undone.</span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={onCancel}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={onDelete}
            className="sm:w-26"
          >
            {loading ? <Spinner /> : "Delete site!"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
