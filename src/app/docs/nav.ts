export type DocsPage = { title: string; href: string };
export type DocsGroup = { title: string; items: DocsPage[] };

// Source of truth for the docs sidebar order, active state, and prev/next links.
export const docsNav: DocsGroup[] = [
  {
    title: "Introduction",
    items: [
      { title: "Project Overview", href: "/docs" },
      { title: "Key Features", href: "/docs/key-features" },
      { title: "Roadmap", href: "/docs/roadmap" },
      { title: "License & Open Source", href: "/docs/license" },
    ],
  },
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Quick Start", href: "/docs/getting-started/quick-start" },
      { title: "Updating", href: "/docs/getting-started/updating" },
    ],
  },
  {
    title: "User Guide",
    items: [
      { title: "Importing Your Trades", href: "/docs/guide/importing-trades" },
      { title: "Daily Recaps & Tags", href: "/docs/guide/recaps-and-tags" },
      { title: "The AI Coach", href: "/docs/guide/ai-coach" },
      { title: "FAQ", href: "/docs/guide/faq" },
    ],
  },
];

export const docsPagesFlat: DocsPage[] = docsNav.flatMap((group) => group.items);

export function adjacentPages(pathname: string): { prev: DocsPage | null; next: DocsPage | null } {
  const index = docsPagesFlat.findIndex((page) => page.href === pathname);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? docsPagesFlat[index - 1] : null,
    next: index < docsPagesFlat.length - 1 ? docsPagesFlat[index + 1] : null,
  };
}
