"use client";

import { useState } from "react";

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

  return (
    <div className="overflow-hidden rounded-lg border border-stone-700/50 bg-stone-900/40">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-[#f5e8d3] transition hover:bg-stone-800/50"
      >
        <span>{title}</span>
        <span
          className={`text-[#d4af37] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      {open && (
        <div className="border-t border-stone-700/50 px-4 py-4">
          {children}
        </div>
      )}
    </div>
  );
}
