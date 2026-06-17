import { ExternalLink } from "lucide-react";

import { isSafeExternalHref } from "@/lib/cabinet/validate-link-url";
import { cn } from "@/lib/utils";

interface ExternalWriteupLinkProps {
  href: string;
  className?: string;
}

export function ExternalWriteupLink({
  href,
  className,
}: ExternalWriteupLinkProps): React.ReactElement | null {
  if (!isSafeExternalHref(href)) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300",
        className,
      )}
    >
      View writeup
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
    </a>
  );
}
