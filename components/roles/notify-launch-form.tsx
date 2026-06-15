"use client";

import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

interface NotifyLaunchFormProps {
  roleSlug: string;
  roleName: string;
  variant?: "default" | "coming-soon";
}

export function NotifyLaunchForm({
  roleSlug,
  roleName,
  variant = "default",
}: NotifyLaunchFormProps): React.ReactElement {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isComingSoon = variant === "coming-soon";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email.");
      setLoading(false);
      return;
    }

    try {
      const key = `cyberpivot-notify-${roleSlug}`;
      localStorage.setItem(
        key,
        JSON.stringify({ email: result.data.email, at: new Date().toISOString() }),
      );
      setSubmitted(true);
    } catch {
      setError("Could not save your request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p
        className={cn(
          "rounded-md border px-4 py-3 text-sm",
          isComingSoon
            ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
            : "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
        )}
      >
        Thanks. We will email you when the {roleName} path is ready.
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
      <label htmlFor={`notify-${roleSlug}`} className="text-sm text-zinc-400">
        Notify me when this launches
      </label>
      <Input
        id={`notify-${roleSlug}`}
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-white/15 bg-white/[0.02]"
        required
      />
      {error ? (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        className={cn(
          isComingSoon
            ? "bg-amber-500/90 text-[#0a0a0f] hover:bg-amber-400"
            : "bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400",
        )}
        disabled={loading}
      >
        {loading ? "Saving…" : "Notify me"}
      </Button>
    </form>
  );
}
