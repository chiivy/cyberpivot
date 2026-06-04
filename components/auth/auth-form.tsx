"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthCallbackUrl } from "@/lib/auth/redirect";
import { migrateOnboardingToSupabase } from "@/lib/onboarding/migrate";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

type AuthStatus = "idle" | "loading" | "error";

export function AuthForm({ mode }: AuthFormProps): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "auth_callback") {
      setErrorMessage("Sign-in failed. Try again or use a different method.");
      setStatus("error");
    }
  }, [searchParams]);

  const signInWithOAuth = async (provider: "google" | "github"): Promise<void> => {
    setStatus("loading");
    setErrorMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getAuthCallbackUrl() },
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  const handleEmailSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: getAuthCallbackUrl() },
      });
      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }
      setStatus("idle");
      setErrorMessage(
        "Check your email to verify your account before signing in.",
      );
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    const migrateResult = await migrateOnboardingToSupabase();
    if (!migrateResult.success && migrateResult.error) {
      setStatus("error");
      setErrorMessage(migrateResult.error);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const title = mode === "login" ? "Log in" : "Create account";
  const submitLabel = mode === "login" ? "Log in" : "Create account";
  const alternateHref = mode === "login" ? "/signup" : "/login";
  const alternateLabel =
    mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in";

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 text-zinc-100">
      <h1 className="font-mono text-xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Save your path, cabinet, and module progress.
      </p>

      {errorMessage ? (
        <p
          role="alert"
          className={cn(
            "mt-4 rounded-md border px-3 py-2 text-sm",
            status === "error"
              ? "border-destructive/50 bg-destructive/10 text-red-300"
              : "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
          )}
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/15 bg-transparent"
          disabled={status === "loading"}
          onClick={() => signInWithOAuth("google")}
        >
          Sign in with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/15 bg-transparent"
          disabled={status === "loading"}
          onClick={() => signInWithOAuth("github")}
        >
          Sign in with GitHub
        </Button>
      </div>

      <form className="mt-6 flex flex-col gap-3" onSubmit={handleEmailSubmit}>
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
          placeholder="Password"
          autoComplete={
            mode === "login" ? "current-password" : "new-password"
          }
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
          {status === "loading" ? "Working…" : submitLabel}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link href={alternateHref} className="text-zinc-400 hover:text-cyan-300">
          {alternateLabel}
        </Link>
      </p>
    </div>
  );
}
