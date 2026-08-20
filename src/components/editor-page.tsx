"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import TextEditor from "./text-editor";
import { decrypt, encrypt } from "@/lib/crypto";
import { ArrowsClockwiseIcon, BackspaceIcon, LockIcon, TrashIcon } from "@phosphor-icons/react";
import { deleteDocument, findDocument, saveDocument } from "@/actions/document";
import { Document } from "@/generated/prisma/client";
import { toast } from "./ui/toast";
import CreateDocumentDialog from "./dialogs/create-document-dialog";
import UnlockDocumentDialog from "./dialogs/unlock-document-dialog";
import CreatePasswordDialog from "./dialogs/create-password-dialog";
import { Spinner } from "./ui/spinner";
import { delay, MAX_DOCUMENT_LENGTH } from "@/lib/utils";
import DeleteDocumentDialog from "./dialogs/delete-document-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ChangePasswordDialog from "./dialogs/change-password-dialog";
import { useHotkeys } from "react-hotkeys-hook";
import { ptSans } from "@/lib/fonts";

interface EditorPageProps {
  slug: string;
}

export default function EditorPage({ slug }: EditorPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const passwordFromUrl = searchParams.get("p");

  const [text, setText] = useState<string>("");
  const [savedText, setSavedText] = useState<string>("");
  const [locked, setLocked] = useState<boolean>(true);

  const [document, setDocument] = useState<Document | null>(null);

  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [isCheckingDocument, setIsCheckingDocument] = useState<boolean>(true);

  const [unlockDialogOpen, setUnlockDialogOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [existingPasswordError, setExistingPasswordError] =
    useState<string>("");

  const [createPasswordDialogOpen, setCreatePasswordDialogOpen] =
    useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");

  const [documentPassword, setDocumentPassword] = useState<string>("");

  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [isReloading, setIsReloading] = useState<boolean>(false);

  const [deleteDocumentDialogOpen, setDeleteDocumentDialogOpen] =
    useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState<boolean>(false);
  const [changedPassword, setChangedPassword] = useState<string>("");
  const [confirmChangedPassword, setConfirmChangedPassword] = useState<string>("");
  const [changedPasswordError, setChangedPasswordError] = useState<string>("");
  const [isPasswordChanging, setIsPasswordChanging] = useState<boolean>(false);

  const hasUnsavedChanges = text !== savedText;

  // check if entered slug is new or already existing
  useEffect(() => {
    async function checkDocument() {
      const doc = await findDocument(slug);

      setDocument(doc);

      if (doc) {
        // existing document
        setLocked(true);

        // try password from URL if it exists
        if (passwordFromUrl) {
          try {
            const decrypted = await decrypt(doc.content, passwordFromUrl);

            setDocumentPassword(passwordFromUrl);

            setText(decrypted);
            setSavedText(decrypted);

            setLocked(false);

            // remove ?p= from the URL after successful unlock
            router.replace(pathname);
          } catch {
            router.replace(pathname);
            // invalid password in URL
            setUnlockDialogOpen(true);
          };
        } else {
          // no password in URL
          setUnlockDialogOpen(true);
        };
      } else {
        // new document
        setCreateDialogOpen(true);
      };

      setIsCheckingDocument(false);
    }

    checkDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // handleBefore ~ check for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // document cannot exceed toast 
  const isDocumentTooLong = () => {
    if (text.length > MAX_DOCUMENT_LENGTH) {
      toast.add({
        type: "error",
        description: `Document cannot exceed ${MAX_DOCUMENT_LENGTH.toLocaleString()} characters.`,
      });

      return true;
    }

    return false;
  };

  // Unlock existing site
  const handleUnlock = async () => {
    try {
      setIsUnlocking(true);

      // Network delay
      await delay(500);

      const decrypted = await decrypt(document!.content, password);

      setDocumentPassword(password);

      setText(decrypted);
      setSavedText(decrypted);

      setUnlockDialogOpen(false);
      setLocked(false);
    } catch {
      setExistingPasswordError("Incorrect password.");
    } finally {
      setIsUnlocking(false);
    }
  };

  // Save site for the first time
  const handleSave = async () => {
    if (isDocumentTooLong()) return;

    if (!newPassword) {
      setNewPasswordError("Password is required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setNewPasswordError("Passwords do not match.");
      return;
    }

    try {
      setIsSaving(true);

      // Network delay
      await delay(500);

      setDocumentPassword(newPassword);

      const encrypted = await encrypt(text, newPassword);

      const savedDocument = await saveDocument(slug, encrypted);

      setDocument(savedDocument);

      setSavedText(text);

      setCreatePasswordDialogOpen(false);

      setNewPassword("");
      setConfirmPassword("");
      setNewPasswordError("");

      toast.add({
        type: "success",
        description: "Document saved successfully.",
      });
    } catch {
      toast.add({
        type: "error",
        description: "Failed to save document.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel creating new site
  const handleCancelCreatePassword = () => {
    setCreatePasswordDialogOpen(false);

    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError("");
  };

  // Update site / Save new data
  const handleUpdate = async () => {
    if (isDocumentTooLong()) return;

    setIsSaving(true);

    const savePromise = (async () => {
      await delay(1000);

      const encrypted = await encrypt(text, documentPassword);

      const updated = await saveDocument(slug, encrypted);

      setDocument(updated);
      setSavedText(text);

      return updated;
    })();

    toast.promise(savePromise, {
      loading: "Saving...",
      success: "Saved.",
      error: "Failed to save.",
    });

    try {
      await savePromise;
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    };
  };

  // Delete site
  const handleDelete = async () => {
    setIsDeleting(true);

    const deletePromise = (async () => {
      // Network delay
      await delay(500);

      await deleteDocument(slug);

      router.replace("/");
    })();

    toast.promise(deletePromise, {
      loading: "Deleting site...",
      success: "This site has been deleted permanently.",
      error: "Failed to delete site.",
    });

    try {
      await deletePromise;
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Reload site data
  const handleReload = async () => {
    setIsReloading(true);

    const reloadPromise = (async () => {
      // Keep this network delay
      await delay(500);

      const decrypted = await decrypt(document!.content, password);

      setDocumentPassword(password);

      setText(decrypted);
      setSavedText(decrypted);
    })();

    toast.promise(reloadPromise, {
      loading: "Reloading...",
      success: "Site updated.",
      error: "Error updating site.",
    });

    try {
      await reloadPromise;
    } catch (error) {
      console.error(error);
    } finally {
      setIsReloading(false);
    }
  };

  // Cancel changing password
  const handleCancelChangePassword = () => {
    setChangePasswordDialogOpen(false);

    setChangedPassword("");
    setConfirmChangedPassword("");
    setChangedPasswordError("");
  };

  // Change password
  const handleChangePassword = async () => {
    if (isDocumentTooLong()) return;

    if (!changedPassword) {
      setChangedPasswordError("Password is required.");
      return;
    }

    if (changedPassword !== confirmChangedPassword) {
      setChangedPasswordError("Passwords do not match.");
      return;
    }

    try {
      setIsPasswordChanging(true);

      // Network delay
      await delay(500);

      setDocumentPassword(changedPassword);

      const encrypted = await encrypt(text, changedPassword);

      const savedDocument = await saveDocument(slug, encrypted);

      setDocument(savedDocument);

      setChangePasswordDialogOpen(false);

      setChangedPassword("");
      setConfirmChangedPassword("");
      setChangedPasswordError("");

      toast.add({
        type: "success",
        description: "Password changed successfully.",
      });
    } catch {
      toast.add({
        type: "error",
        description: "Failed to change password.",
      });
    } finally {
      setChangePasswordDialogOpen(false);
    };
  };

  // Lock document
  const handleLock = async () => {
    setText("");
    setPassword("");
    setDocumentPassword("");

    setLocked(true);
    setUnlockDialogOpen(true);
  };

  const save = () => {
    if (locked || isSaving || isReloading || !hasUnsavedChanges) return;

    // Don't allow saving while dialogs are open
    if (createPasswordDialogOpen || unlockDialogOpen || changePasswordDialogOpen || deleteDocumentDialogOpen) {
      return;
    }

    if (documentPassword) {
      handleUpdate();
    } else {
      setCreatePasswordDialogOpen(true);
    }
  };

  // cmd+s or ctrl+s to save
  useHotkeys(
    "meta+s, ctrl+s",
    (event) => {
      event.preventDefault();
      save();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
    [
      locked,
      isSaving,
      isReloading,
      createPasswordDialogOpen,
      unlockDialogOpen,
      changePasswordDialogOpen,
      deleteDocumentDialogOpen,
      documentPassword,
      text,
    ]
  );

  const lock = () => {
    if (locked || isSaving || isReloading || hasUnsavedChanges) return;

    if (createPasswordDialogOpen || unlockDialogOpen || changePasswordDialogOpen || deleteDocumentDialogOpen) {
      return;
    }

    if (documentPassword) {
      handleLock();
    } else {
      setCreatePasswordDialogOpen(true);
    }
  };

  // cmd+shift+l or ctrl+shift+l to lock
  useHotkeys(
    "meta+shift+l, ctrl+shift+l",
    (event) => {
      event.preventDefault();
      lock();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
    [
      locked,
      isSaving,
      isReloading,
      createPasswordDialogOpen,
      unlockDialogOpen,
      changePasswordDialogOpen,
      deleteDocumentDialogOpen,
      documentPassword,
      text,
    ]
  );

  const hotReload = () => {
    if (locked || isSaving || isReloading || hasUnsavedChanges) return;

    if (createPasswordDialogOpen || unlockDialogOpen || changePasswordDialogOpen || deleteDocumentDialogOpen) {
      return;
    }

    if (documentPassword) {
      handleReload();
    } else {
      setCreatePasswordDialogOpen(true);
    }
  };

  // cmd+shift+r or ctrl+shift+r to reload 
  useHotkeys(
    "meta+shift+r ,ctrl+shift+r",
    (event) => {
      event.preventDefault();
      hotReload();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
    [
      locked,
      isSaving,
      isReloading,
      createPasswordDialogOpen,
      unlockDialogOpen,
      changePasswordDialogOpen,
      deleteDocumentDialogOpen,
      documentPassword,
      text,
    ]
  );

  // site loading
  if (isCheckingDocument) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner className="size-5" />
      </main>
    );
  }

  return (
    <>
      {/* Create document dialog */}
      <CreateDocumentDialog
        open={createDialogOpen}
        slug={slug}
        onCancel={() => history.back()}
        onContinue={() => {
          setCreateDialogOpen(false);
          setLocked(false);
        }}
      />

      {/* Already existing dialog password dialog */}
      <UnlockDocumentDialog
        open={unlockDialogOpen}
        password={password}
        error={existingPasswordError}
        loading={isUnlocking}
        onPasswordChange={(value) => {
          setPassword(value);
          setExistingPasswordError("");
        }}
        onCancel={() => history.back()}
        onUnlock={handleUnlock}
      />

      {/* New document saving password dialog */}
      <CreatePasswordDialog
        open={createPasswordDialogOpen}
        password={newPassword}
        confirmPassword={confirmPassword}
        error={newPasswordError}
        loading={isSaving}
        onPasswordChange={(value) => {
          setNewPassword(value);
          setNewPasswordError("");
        }}
        onConfirmPasswordChange={(value) => {
          setConfirmPassword(value);
          setNewPasswordError("");
        }}
        onCancel={handleCancelCreatePassword}
        onSave={handleSave}
      />

      {/* Change password dialog */}
      <ChangePasswordDialog
        open={changePasswordDialogOpen}
        password={changedPassword}
        confirmPassword={confirmChangedPassword}
        error={changedPasswordError}
        loading={isPasswordChanging}
        onPasswordChange={(value) => {
          setChangedPassword(value);
          setChangedPasswordError("");
        }}
        onConfirmPasswordChange={(value) => {
          setConfirmChangedPassword(value);
          setChangedPasswordError("");
        }}
        onCancel={handleCancelChangePassword}
        onSave={handleChangePassword}
      />

      {/* Delete document dialog */}
      <DeleteDocumentDialog
        open={deleteDocumentDialogOpen}
        slug={slug}
        loading={isDeleting}
        onCancel={() => setDeleteDocumentDialogOpen(false)}
        onDelete={handleDelete}
      />

      {isReloading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-xs">
          <Spinner className="size-5" />
        </div>
      )}

      <main
        className={`
          flex flex-col gap-3 transition-opacity duration-200 sm:h-[90vh]
          ${isReloading ? "pointer-events-none opacity-50" : "opacity-100"}
        `}
      >
        <div className="mx-1 flex items-center justify-between px-4 sm:px-0">
          <h2 className={`${ptSans.className} text-[18px] sm:text-[20px] font-semibold`}>{slug}</h2>

          {/* Top-Right Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2 justify-end">
              {/* Reload */}
              {documentPassword && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={isReloading}
                        onClick={handleReload}
                        className="rounded-lg"
                      />
                    }
                  >
                    {isReloading ? (
                      <Spinner className="size-5" />
                    ) : (
                      <ArrowsClockwiseIcon className="size-5" />
                    )}
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    Reload
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Lock */}
              {documentPassword && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLock}
                        className="rounded-lg"
                      >
                        <LockIcon className="size-5" />
                      </Button>
                    }
                  >
                  </TooltipTrigger>

                  <TooltipContent side="bottom">Lock</TooltipContent>
                </Tooltip>
              )}

              {/* Reset */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="ghost" size="icon" onClick={() => setText("")}>
                      <BackspaceIcon className="size-5" />
                    </Button>
                  }
                >
                </TooltipTrigger>

                <TooltipContent side="bottom">Reset</TooltipContent>
              </Tooltip>

              {/* Save */}
              <Button
                variant="default"
                className="w-20 rounded-xl"
                disabled={isSaving}
                onClick={save}
              >
                {isSaving ? (
                  <Spinner />
                ) : (
                  <>
                    <p>Save</p>
                  </>
                )}
              </Button>
            </div>

            <div className="flex gap-1">
              {/* Change Password*/}
              {documentPassword && (
                <Button
                  variant="secondary"
                  className="w-40 rounded-xl"
                  onClick={async () => {
                    setChangePasswordDialogOpen(true);
                  }}
                >
                  Change Password
                </Button>
              )}

              {/* Delete */}
              {documentPassword && (
                <Button
                  variant="destructive"
                  onClick={() => setDeleteDocumentDialogOpen(true)}
                  className="sm:w-22 rounded-xl"
                >
                  <TrashIcon weight="duotone" className="block sm:hidden" />
                  <p className="hidden sm:block">Delete</p>
                </Button>
              )}
            </div>
          </div>
        </div>

        <TextEditor value={text} onChange={setText} isEditable={!locked} />

        <div className="mt-1 mx-2 text-right text-sm text-muted-foreground tracking-wide">
          {text.length.toLocaleString()} / {MAX_DOCUMENT_LENGTH.toLocaleString()}
        </div>
      </main>
    </>
  );
}
