"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

type DeleteStep = "initial" | "final-confirmation";

export function AccountSettingsForm(): React.ReactElement {
  const router = useRouter();
  const { signOut } = useAuth();
  const [step, setStep] = useState<DeleteStep>("initial");
  const [confirmation, setConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleProceedToFinalConfirmation = (): void => {
    if (confirmation !== "delete") {
      setErrorMessage('Type "delete" to continue.');
      return;
    }

    setErrorMessage(null);
    setStep("final-confirmation");
  };

  const handleCancelFinalConfirmation = (): void => {
    setStep("initial");
    setErrorMessage(null);
  };

  const handleDeleteAccount = async (): Promise<void> => {
    setDeleting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation: "delete" }),
      });

      const payload: { error?: string } = await response.json();

      if (!response.ok) {
        setErrorMessage(payload.error ?? "Could not delete account");
        setDeleting(false);
        return;
      }

      await signOut();
      router.push("/?account-deleted=1");
      router.refresh();
    } catch {
      setErrorMessage("Could not delete account. Try again.");
      setDeleting(false);
    }
  };

  if (step === "final-confirmation") {
    return (
      <section className="rounded-lg border border-destructive/50 bg-destructive/[0.06] p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Permanently delete your account?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground">
          This will permanently delete your account, including your sign-in, your
          Foundation module progress, and every cabinet artifact you have unlocked.
          This cannot be undone.
        </p>

        {errorMessage ? (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="destructive"
            disabled={deleting}
            onClick={() => void handleDeleteAccount()}
          >
            {deleting ? "Deleting account…" : "Yes, permanently delete my account"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={deleting}
            onClick={handleCancelFinalConfirmation}
          >
            Cancel
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-destructive/30 bg-destructive/[0.04] p-6">
      <h2 className="text-lg font-semibold text-foreground">Delete account</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Permanently delete your account, cabinet artifacts, module progress, and
        onboarding data. This cannot be undone.
      </p>

      <div className="mt-5">
        <label htmlFor="delete-confirmation" className="text-sm font-medium text-foreground">
          Type <span className="font-mono">delete</span> to confirm
        </label>
        <Input
          id="delete-confirmation"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="off"
          className="mt-2 max-w-sm"
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="button"
        variant="destructive"
        className="mt-5"
        onClick={handleProceedToFinalConfirmation}
      >
        Delete my account
      </Button>
    </section>
  );
}
