interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({
  current,
  total,
}: ProgressIndicatorProps): React.ReactElement {
  return (
    <p
      className="text-center text-xs font-medium uppercase tracking-widest text-zinc-500"
      aria-live="polite"
    >
      {current} of {total}
    </p>
  );
}
