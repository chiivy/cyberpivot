export default function FoundationsLoading(): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-4 py-10 sm:py-14">
      <div className="h-4 w-32 rounded bg-white/10" />
      <div className="mt-6 h-10 w-2/3 rounded bg-white/10" />
      <div className="mt-8 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-white/5" />
        ))}
      </div>
    </div>
  );
}
