import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage(): React.ReactElement {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Start where you are
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Learn cybersecurity by building real skills
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        CyberPivot is a free, open source, path-aware learning platform. Scenarios
        first, tools hands-on, and every module ends with something for your
        cabinet.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/signup">Get started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </section>
  );
}
