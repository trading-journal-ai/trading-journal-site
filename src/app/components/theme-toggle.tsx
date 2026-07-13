"use client";

import { useSyncExternalStore } from "react";

const THEME_EVENT = "tj-theme-change";

function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function readTheme(): "dark" | "daylight" {
  return document.documentElement.getAttribute("data-theme") === "daylight" ? "daylight" : "dark";
}

export function ThemeToggle() {
  // Server + first client render resolve to "dark" (the default, no data-theme),
  // matching the no-flash script's baseline, then sync to the live DOM attribute.
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark");

  const apply = (next: "dark" | "daylight") => {
    if (next === "daylight") {
      document.documentElement.setAttribute("data-theme", "daylight");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("tj-theme", next);
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const options: { value: "dark" | "daylight"; label: string; Icon: () => React.ReactElement }[] = [
    { value: "dark", label: "Dark", Icon: MoonIcon },
    { value: "daylight", label: "Daylight", Icon: SunIcon },
  ];

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center rounded-full border border-[var(--border)] p-0.5"
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => apply(value)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
              active
                ? "bg-[var(--surface-2)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Icon />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function SunIcon() {
  return (
    <svg className="size-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="size-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
