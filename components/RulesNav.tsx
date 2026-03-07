"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

type Chapter = { slug: string; title: string; order: number };

const GROUP_SIZE = 15; // chapters per group (1–15, 16–30, …)

function getGroupKey(order: number): string {
  if (order === 0) return "prologue";
  const groupIndex = Math.ceil(order / GROUP_SIZE);
  const start = (groupIndex - 1) * GROUP_SIZE + 1;
  const end = Math.min(groupIndex * GROUP_SIZE, 73);
  return `ch-${start}-${end}`;
}

export default function RulesNav({ chapters }: { chapters: Chapter[] }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["prologue"]));
  const pathname = usePathname();

  const prologue = chapters.find((c) => c.slug === "prologue");
  const restChapters = chapters.filter((c) => c.slug !== "prologue");

  // Group chapters: Prologue + Ch 1–15, 16–30, 31–45, 46–60, 61–73
  const groups = useMemo(() => {
    const list: { key: string; label: string; chapters: Chapter[] }[] = [];
    if (prologue) list.push({ key: "prologue", label: "Prologue", chapters: [prologue] });
    for (let start = 1; start <= 73; start += GROUP_SIZE) {
      const end = Math.min(start + GROUP_SIZE - 1, 73);
      const chs = restChapters.filter((c) => c.order >= start && c.order <= end);
      if (chs.length) list.push({ key: `ch-${start}-${end}`, label: `Chapters ${start}–${end}`, chapters: chs });
    }
    return list;
  }, [prologue, restChapters]);

  // Expand group that contains current page
  useEffect(() => {
    const current = chapters.find((c) => pathname === `/rules/${c.slug}`);
    if (current) {
      const key = getGroupKey(current.order);
      setExpandedGroups((prev) => new Set(prev).add(key));
    }
  }, [pathname, chapters]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.matchMedia("(min-width: 768px)").addEventListener("change", handler);
    return () =>
      window.matchMedia("(min-width: 768px)").removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const searchLower = search.trim().toLowerCase();
  const filteredChapters = useMemo(() => {
    if (!searchLower) return null;
    return chapters.filter(
      (c) =>
        c.title.toLowerCase().includes(searchLower) ||
        c.slug.toLowerCase().includes(searchLower) ||
        String(c.order + 1).includes(searchLower)
    );
  }, [chapters, searchLower]);

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const linkClass = (isCurrent: boolean) =>
    `block rounded-md py-1.5 pl-2 pr-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded truncate ${
      isCurrent ? "bg-stone-800/40 text-[#d4af37] font-medium" : "text-[#f5e8d3]/90 hover:bg-stone-800/30 hover:text-[#d4af37]"
    }`;

  return (
    <>
      {/* Mobile bar */}
      <div className="flex items-center gap-3 border-b border-stone-700/30 bg-stone-900/50 px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded p-2 text-[#a89888] hover:bg-stone-800/50 hover:text-[#f5e8d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2"
          aria-label={open ? "Close chapter list" : "Open chapter list"}
          aria-expanded={open}
          aria-controls="rules-nav"
        >
          <span className="sr-only">{open ? "Close" : "Chapters menu"}</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <span className="font-display text-sm text-[#a89888]">Chapters</span>
      </div>

      {/* Backdrop */}
      <button
        type="button"
        className={`fixed inset-0 z-20 bg-stone-950/70 backdrop-blur-sm transition-opacity duration-200 md:hidden ${open ? "visible opacity-100 z-20" : "invisible opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-label="Close chapter list"
        tabIndex={open ? 0 : -1}
      />

      {/* Sidebar */}
      <aside
        id="rules-nav"
        role="navigation"
        aria-label="Chapters of the Rule of Saint Benedict"
        className={`fixed left-0 top-0 z-30 flex h-full w-80 flex-col border-r border-stone-700/30 bg-stone-950/95 backdrop-blur transition-transform duration-200 ease-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex shrink-0 flex-col gap-3 border-b border-stone-700/30 p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-[#a89888] text-sm hover:text-[#d4af37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded"
            >
              ← Guidelines
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-2 text-[#a89888] hover:bg-stone-800/50 hover:text-[#f5e8d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] md:hidden"
              aria-label="Close chapter list"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Search: calm, clear */}
          <div className="relative">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#a89888]" aria-hidden>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find chapter…"
              className="w-full rounded-md border border-stone-700/50 bg-stone-900/60 py-2 pl-8 pr-3 text-sm text-[#f5e8d3] placeholder-[#a89888]/70 focus:border-[#d4af37]/50 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/40"
              aria-label="Search chapters"
            />
          </div>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto p-3"
          aria-label="Chapter list"
        >
          {filteredChapters !== null ? (
            /* Search results: flat list */
            <div className="space-y-1">
              <p className="mb-2 text-xs text-[#a89888]">
                {filteredChapters.length} of 74
              </p>
              {filteredChapters.length === 0 ? (
                <p className="py-4 text-center text-sm text-[#a89888]">No chapter matches.</p>
              ) : (
                <ul className="space-y-0.5" role="list">
                  {filteredChapters.map((ch) => {
                    const href = `/rules/${ch.slug}`;
                    const isCurrent = pathname === href;
                    return (
                      <li key={ch.slug}>
                        <Link href={href} className={linkClass(isCurrent)} aria-current={isCurrent ? "page" : undefined}>
                          <span className="text-[#a89888]/90">{ch.order + 1}.</span> {ch.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            /* Grouped accordion: no scroll-all */
            <div className="space-y-2">
              {groups.map((group) => {
                const isExpanded = expandedGroups.has(group.key);
                return (
                  <div key={group.key} className="rounded-md border border-stone-700/30 bg-stone-900/30">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.key)}
                      className="flex w-full items-center justify-between gap-2 rounded-t-md px-3 py-2.5 text-left text-sm font-medium text-[#f5e8d3] hover:bg-stone-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2"
                      aria-expanded={isExpanded}
                      aria-controls={`group-${group.key}`}
                      id={`group-btn-${group.key}`}
                    >
                      <span>{group.label}</span>
                      <span
                        className={`shrink-0 text-[#a89888] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        aria-hidden
                      >
                        ▼
                      </span>
                    </button>
                    <div
                      id={`group-${group.key}`}
                      role="region"
                      aria-labelledby={`group-btn-${group.key}`}
                      className={isExpanded ? "block border-t border-stone-700/30" : "hidden"}
                    >
                      <ul className="max-h-64 overflow-y-auto py-1" role="list">
                        {group.chapters.map((ch) => {
                          const href = `/rules/${ch.slug}`;
                          const isCurrent = pathname === href;
                          return (
                            <li key={ch.slug}>
                              <Link
                                href={href}
                                className={linkClass(isCurrent)}
                                aria-current={isCurrent ? "page" : undefined}
                                title={ch.title}
                              >
                                {ch.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
