"use client";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function RouteError({
  error,
  reset,
}: RouteErrorProps): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}
