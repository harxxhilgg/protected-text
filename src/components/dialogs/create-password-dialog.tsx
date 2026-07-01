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
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

interface CreatePasswordDialogProps {
  open: boolean;
  password: string;
  confirmPassword: string;
  error: string;
  loading: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function CreatePasswordDialog({
  open,
  password,
  confirmPassword,
  error,
  loading,
  onPasswordChange,
  onConfirmPasswordChange,
  onCancel,
  onSave,
}: CreatePasswordDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-sm"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-lg">Create password</DialogTitle>

            <DialogDescription className="flex flex-col italic gap-2">
              <span>
                Make sure to remember the password. We don&apos;t store
                passwords, just the encrypted data (If the password is
                forgotten, the data can&apos;t be accessed).
              </span>

              <span>Longer passwords are more secure.</span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={(e) => onPasswordChange(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            disabled={loading}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
          />

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={onCancel}>
            Cancel
          </Button>

          <Button
            variant="default"
            disabled={loading}
            onClick={onSave}
            className="w-18"
          >
            {loading ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
