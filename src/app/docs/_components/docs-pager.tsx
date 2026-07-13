"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adjacentPages } from "../nav";

export function DocsPager() {
  const pathname = usePathname();
  const { prev, next } = adjacentPages(pathname);

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 grid gap-4 border-t border-[var(--hairline)] pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-lg border border-[var(--border)] px-4 py-3 transition-colors hover:bg-[var(--surface)]"
        >
          <span className="text-[12.5px] text-[var(--muted)]">← Previous</span>
          <span className="text-[14.5px] font-semibold text-[var(--foreground)]">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col gap-1 rounded-lg border border-[var(--border)] px-4 py-3 text-right transition-colors hover:bg-[var(--surface)] sm:col-start-2"
        >
          <span className="text-[12.5px] text-[var(--muted)]">Next →</span>
          <span className="text-[14.5px] font-semibold text-[var(--foreground)]">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
