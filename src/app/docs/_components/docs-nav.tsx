"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsNav } from "../nav";

export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-8 text-[14.5px]">
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="mb-2.5 font-semibold text-[var(--foreground)]">{group.title}</p>
          <ul className="flex flex-col">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                    className={`block py-[7px] transition-colors ${
                      active
                        ? "font-semibold text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
