"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface UnlockDocumentDialogProps {
  open: boolean;
  password: string;
  error: string;
  loading: boolean;
  onPasswordChange: (value: string) => void;
  onCancel: () => void;
  onUnlock: () => void;
}

export default function UnlockDocumentDialog({
  open,
  password,
  error,
  loading,
  onPasswordChange,
  onCancel,
  onUnlock,
}: UnlockDocumentDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-xs sm:max-w-md"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-lg">Password required</DialogTitle>

          <DialogDescription className="flex flex-col italic gap-1">
            <span>This site (this URL) is already occupied.</span>

            <span>
              If this is your site, enter the password, or you can try using{" "}
              <Link href="/" className="underline underline-offset-3 hover:text-primary duration-100">different site</Link>
              .
            </span>

            <span className="mt-4">
              Note: If you forgot your password then check{" "}
              <Link href="/faq" className="underline underline-offset-3 hover:text-primary duration-100">FAQs</Link>
              .
            </span>
          </DialogDescription>
        </DialogHeader>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <Input
            id="password"
            type="password"
            placeholder="Password used to encrypt this site..."
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onUnlock();
              }
            }}
          />

          {error && (
            <FieldError className="text-sm font-medium text-destructive mt-2">{error}</FieldError>
          )}
        </Field>

        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={onCancel}>
            Cancel
          </Button>

          <Button
            variant="default"
            disabled={loading}
            onClick={onUnlock}
            className="sm:w-20"
          >
            {loading ? <Spinner /> : "Unlock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
