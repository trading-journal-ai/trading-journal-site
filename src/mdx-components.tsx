import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Link from "next/link";

// Styling for standard MDX elements lives in the `.docs-content` CSS in
// globals.css; here we only wire in internal links and custom doc components.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href = "", children, ...props }) => {
      const isInternal = href.startsWith("/") || href.startsWith("#");
      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      );
    },
    Note,
  };
}

function Note({ children, title = "Note" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="docs-note">
      <p className="docs-note-title">{title}</p>
      <div className="docs-note-body">{children}</div>
    </aside>
  );
}
