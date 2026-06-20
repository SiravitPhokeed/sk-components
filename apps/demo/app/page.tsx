import { Button } from "@suankularb-components/react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          SK Components — Button
        </h1>

        {/* Variants */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
            Variants
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
            Sizes
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </section>

        {/* States */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
            States
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading>
              Loading…
            </Button>
          </div>
        </section>

        {/* Dark Theme */}
        <section className="theme-dark flex flex-col items-center gap-4 rounded-md bg-surface p-8">
          <h2 className="text-lg font-medium text-on-surface">Dark Theme</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
