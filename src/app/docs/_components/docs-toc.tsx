"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

export function DocsToc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    // Read the rendered MDX headings after paint, so the measurement (and the
    // resulting setState) happens in a rAF callback rather than synchronously.
    const frame = requestAnimationFrame(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(".docs-content h2, .docs-content h3"),
      ).filter((node) => node.id);

      setHeadings(
        nodes.map((node) => ({
          id: node.id,
          text: node.textContent?.trim() ?? "",
          level: node.tagName === "H3" ? 3 : 2,
        })),
      );
      setActiveId(nodes[0]?.id ?? "");

      if (nodes.length === 0) return;

      const activeObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
      );
      nodes.forEach((node) => activeObserver.observe(node));
      observer = activeObserver;
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <div className="text-[13.5px]">
      <p className="mb-3 font-semibold text-[var(--foreground)]">On this page</p>
      <ul className="flex flex-col border-l border-[var(--hairline)]">
        {headings.map((heading) => {
          const active = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`-ml-px block border-l-2 py-1 leading-snug transition-colors ${
                  heading.level === 3 ? "pl-6" : "pl-3"
                } ${
                  active
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
