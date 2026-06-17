"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

export function AccountDeletedBanner(): React.ReactElement | null {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("account-deleted") === "1") {
      setVisible(true);
    }
  }, [searchParams]);

  const dismiss = (): void => {
    setVisible(false);
    router.replace("/", { scroll: false });
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="status"
      className="border-b border-cyan-500/30 bg-cyan-500/10 px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
          <p className="text-sm leading-relaxed text-zinc-200">
            Your account and associated data have been permanently deleted.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
