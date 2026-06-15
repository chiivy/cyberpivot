export default function IntroLoading(): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:py-14">
      <div className="h-4 w-24 rounded bg-white/10" />
      <div className="mt-4 h-10 w-2/3 max-w-md rounded bg-white/10" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
      </div>
    </div>
  );
}
