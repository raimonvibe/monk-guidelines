"use client";

import { useState, useId } from "react";

type RuleCardProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function RuleCard({
  title,
  defaultOpen = true,
  children,
}: RuleCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="overflow-hidden rounded-lg border border-stone-700/50 bg-stone-900/40">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full min-w-0 items-center justify-between gap-3 px-3 py-2.5 text-left font-medium text-[#f5e8d3] transition hover:bg-stone-800/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 sm:px-4 sm:py-3"
        aria-expanded={open}
        aria-controls={contentId}
        aria-label={`${title}, ${open ? "collapse" : "expand"} section`}
      >
        <span className="min-w-0 break-words">{title}</span>
        <span
          className={`shrink-0 text-[#d4af37] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={contentId + "-label"}
        className="border-t border-stone-700/50 px-3 py-3 sm:px-4 sm:py-4"
        hidden={!open}
      >
        <span id={contentId + "-label"} className="sr-only">{title} content</span>
        {children}
      </div>
    </div>
  );
}
