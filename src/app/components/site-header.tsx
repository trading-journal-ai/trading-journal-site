"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL ?? "https://demo.trading-journal.ai/demo";

// The site-wide global nav. Shared by the landing page and the docs section so
// they read as one app. The landing page gets scroll-section links; docs swaps
// them for a single Home link since the anchors only make sense mid-scroll.
// The container widens on docs to line up with the three-column layout.
export function SiteHeader() {
  const pathname = usePathname();
  const inDocs = pathname.startsWith("/docs");

  return (
    <header className="tj-header sticky top-0 z-50 border-b border-[var(--hairline)] backdrop-blur-xl">
      <div
        className={`mx-auto flex h-16 w-full items-center justify-between px-6 md:px-8 ${
          inDocs ? "max-w-[1400px]" : "max-w-[1200px]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 text-[15.5px] font-bold tracking-tight">
          <span className="tj-brand-dot size-2.5 rounded-full bg-[var(--accent)]" />
          <span>Trading Journal AI</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-5 text-[13.5px] font-medium text-[var(--body)] md:gap-7">
          {inDocs ? (
            <Link href="/" className="hidden transition-colors hover:text-[var(--foreground)] sm:inline">
              Home
            </Link>
          ) : (
            <>
              <Link href="/#review" className="hidden transition-colors hover:text-[var(--foreground)] md:inline">
                The review habit
              </Link>
              <Link href="/#coach" className="hidden transition-colors hover:text-[var(--foreground)] md:inline">
                Coach
              </Link>
              <Link href="/#local" className="hidden transition-colors hover:text-[var(--foreground)] lg:inline">
                Local-first
              </Link>
            </>
          )}
          <Link
            href="/docs"
            aria-current={inDocs ? "page" : undefined}
            className={`hidden transition-colors sm:inline ${
              inDocs ? "font-semibold text-[var(--foreground)]" : "hover:text-[var(--foreground)]"
            }`}
          >
            Documentation
          </Link>
          <Link
            href={demoUrl}
            className="inline-flex h-9 items-center rounded-lg bg-[var(--foreground)] px-4 text-[13.5px] font-semibold text-[var(--background)] transition-opacity hover:opacity-90"
          >
            View the demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
