export default function IntroSectionLoading(): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-4 py-10 sm:py-14">
      <div className="flex gap-1 pb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-1.5 w-4 rounded-full bg-white/10" />
        ))}
      </div>
      <div className="h-4 w-20 rounded bg-white/10" />
      <div className="mt-4 h-10 w-3/4 rounded bg-white/10" />
      <div className="mt-10 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-white/5" />
        ))}
      </div>
    </div>
  );
}
