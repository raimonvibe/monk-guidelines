"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

type Chapter = { slug: string; title: string; order: number };

export default function RulesNav({ chapters }: { chapters: Chapter[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  const prologue = chapters.find((c) => c.slug === "prologue");
  const restChapters = chapters.filter((c) => c.slug !== "prologue");

  return (
    <>
      {/* Mobile: calm bar below site header — Chapters + menu */}
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

      {/* Backdrop when drawer open on mobile */}
      <button
        type="button"
        className={`fixed inset-0 z-20 bg-stone-950/70 backdrop-blur-sm transition-opacity duration-200 md:hidden ${open ? "visible opacity-100 z-20" : "invisible opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-label="Close chapter list"
        tabIndex={open ? 0 : -1}
      />

      {/* Sidebar: drawer on mobile, fixed on desktop — calm spacing and sections */}
      <aside
        id="rules-nav"
        role="navigation"
        aria-label="Chapters of the Rule of Saint Benedict"
        className={`fixed left-0 top-0 z-30 h-full w-72 border-r border-stone-700/30 bg-stone-950/95 p-6 pt-6 backdrop-blur transition-transform duration-200 ease-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
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
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)] md:max-h-none" aria-label="Chapter list">
          {prologue && (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a89888]/80">
                Opening
              </p>
              <ul className="space-y-0.5" role="list">
                <li>
                  <Link
                    href={`/rules/${prologue.slug}`}
                    className={`block rounded-md py-2 pl-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded ${
                      pathname === `/rules/${prologue.slug}`
                        ? "bg-stone-800/40 text-[#d4af37]"
                        : "text-[#f5e8d3]/90 hover:bg-stone-800/30 hover:text-[#d4af37]"
                    }`}
                    aria-current={pathname === `/rules/${prologue.slug}` ? "page" : undefined}
                  >
                    {prologue.title}
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {restChapters.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a89888]/80">
                Chapters
              </p>
              <ul className="space-y-0.5" role="list">
                {restChapters.map((ch) => {
                  const href = `/rules/${ch.slug}`;
                  const isCurrent = pathname === href;
                  return (
                    <li key={ch.slug}>
                      <Link
                        href={href}
                        className={`block rounded-md py-2 pl-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded ${
                          isCurrent
                            ? "bg-stone-800/40 text-[#d4af37]"
                            : "text-[#f5e8d3]/90 hover:bg-stone-800/30 hover:text-[#d4af37]"
                        }`}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        {ch.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
