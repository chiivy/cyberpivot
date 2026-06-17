import {
  CABINET_SUMMARY_MAX_LENGTH,
} from "@/lib/cabinet/validate-summary";
import { cn } from "@/lib/utils";

interface CabinetSummaryFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  rows?: number;
  placeholder?: string;
}

export function CabinetSummaryField({
  id,
  label = "Summary",
  value,
  onChange,
  error,
  rows = 3,
  placeholder = "What did you produce or learn?",
}: CabinetSummaryFieldProps): React.ReactElement {
  const overLimit = value.trim().length > CABINET_SUMMARY_MAX_LENGTH;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-zinc-300">
          {label}
        </label>
        <span
          className={cn(
            "text-xs tabular-nums",
            overLimit ? "text-red-300" : "text-zinc-500",
          )}
          aria-live="polite"
        >
          {value.trim().length}/{CABINET_SUMMARY_MAX_LENGTH}
        </span>
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={overLimit || Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 w-full rounded-md border bg-white/[0.02] px-3 py-2 text-sm text-zinc-100",
          "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1",
          overLimit || error
            ? "border-red-500/50 focus-visible:ring-red-500"
            : "border-white/15 focus-visible:ring-cyan-500",
        )}
      />
      {overLimit ? (
        <p role="alert" id={`${id}-error`} className="mt-2 text-sm text-red-300">
          Summary must be {CABINET_SUMMARY_MAX_LENGTH} characters or fewer
        </p>
      ) : error ? (
        <p role="alert" id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
