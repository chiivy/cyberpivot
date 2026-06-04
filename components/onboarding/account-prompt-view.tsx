"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthCallbackUrl } from "@/lib/auth/redirect";
import { readOnboardingState } from "@/lib/onboarding/storage";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type AuthStatus = "idle" | "loading" | "error";

export function AccountPromptView(): React.ReactElement {
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [hasOnboarding, setHasOnboarding] = useState(false);

  useEffect(() => {
    const stored = readOnboardingState();
    if (!stored?.answers) {
      router.replace("/onboarding");
      return;
    }
    setHasOnboarding(true);
  }, [router]);

  const signInWithOAuth = async (provider: "google" | "github"): Promise<void> => {
    setStatus("loading");
    setErrorMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getAuthCallbackUrl(),
      },
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
  };

  const signUpWithEmail = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAuthCallbackUrl(),
      },
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("idle");
    setErrorMessage(
      "Check your email to verify your account. After you confirm, sign in and your progress will sync.",
    );
  };

  const skipForNow = (): void => {
    router.push("/dashboard");
  };

  if (!hasOnboarding) {
    return (
      <OnboardingShell narrow>
        <p className="text-center text-sm text-zinc-500">Loading…</p>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell narrow>
      <header className="mb-8 text-center">
        <h1 className="text-xl font-medium text-foreground">
          Want to save your progress?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Create an account to keep your path and cabinet on any device. You can
          skip and keep going as a guest for now.
        </p>
      </header>

      {errorMessage ? (
        <p
          role="alert"
          className={cn(
            "mb-4 rounded-md border px-3 py-2 text-sm",
            status === "error"
              ? "border-destructive/50 bg-destructive/10 text-red-300"
              : "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
          )}
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/15 bg-white/[0.02] text-foreground hover:bg-white/5"
          disabled={status === "loading"}
          onClick={() => signInWithOAuth("google")}
        >
          {status === "loading" ? "Redirecting…" : "Sign in with Google"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/15 bg-white/[0.02] text-foreground hover:bg-white/5"
          disabled={status === "loading"}
          onClick={() => signInWithOAuth("github")}
        >
          Sign in with GitHub
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full text-zinc-300"
          disabled={status === "loading"}
          onClick={() => setShowEmailForm((v) => !v)}
        >
          Continue with email
        </Button>
      </div>

      {showEmailForm ? (
        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={signUpWithEmail}
          noValidate
        >
          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-white/15 bg-white/[0.02]"
          />
          <Input
            type="password"
            placeholder="Password (min 8 characters)"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-white/15 bg-white/[0.02]"
          />
          <Button
            type="submit"
            className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating account…" : "Create account"}
          </Button>
          <p className="text-xs text-zinc-500">
            We send a verification link. You need to confirm before you can sign
            in.
          </p>
        </form>
      ) : null}

      <p className="mt-8 text-center">
        <button
          type="button"
          onClick={skipForNow}
          className="text-sm text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
        >
          Skip for now
        </button>
      </p>

      <p className="mt-6 text-center text-xs text-zinc-600">
        Already have an account?{" "}
        <Link href="/login" className="text-zinc-400 hover:text-cyan-300">
          Sign in
        </Link>
      </p>
    </OnboardingShell>
  );
}
