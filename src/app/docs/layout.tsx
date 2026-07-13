import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../components/site-header";
import { ThemeToggle } from "../components/theme-toggle";
import { DocsNav } from "./_components/docs-nav";
import { DocsPager } from "./_components/docs-pager";
import { DocsToc } from "./_components/docs-toc";

const githubUrl = "https://github.com/trading-journal-ai/trading-journal";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s · Trading Journal AI docs",
  },
  description: "Guides for installing, importing trades, and getting the most out of Trading Journal AI.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_220px]">
          <aside className="hidden lg:block lg:border-r lg:border-[var(--hairline)]">
            <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-6">
              <DocsNav />
            </div>
          </aside>

          <main className="min-w-0 py-10 lg:pl-10 xl:pl-12">
            <details className="group mb-8 rounded-lg border border-[var(--border)] px-4 py-3 lg:hidden">
              <summary className="cursor-pointer list-none text-[14px] font-semibold text-[var(--foreground)] marker:content-none">
                Documentation menu
              </summary>
              <div className="mt-4 border-t border-[var(--hairline)] pt-4">
                <DocsNav />
              </div>
            </details>

            <article className="docs-content mx-auto max-w-[760px] xl:mx-0">{children}</article>
            <div className="mx-auto max-w-[760px] xl:mx-0">
              <DocsPager />
            </div>
          </main>

          <aside className="hidden xl:block">
            <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-10 pl-8">
              <DocsToc />
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-[var(--hairline)]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[var(--accent)]" />
            <span className="text-[13.5px] font-semibold text-[var(--body)]">Trading Journal AI</span>
            <span className="ml-1.5 text-[13px] text-[var(--faint)]">Docs</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-[13px] text-[var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
              Home
            </Link>
            <a
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              GitHub
            </a>
            <span>MIT License</span>
            <span>© 2026</span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
