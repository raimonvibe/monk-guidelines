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

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-stone-700/50 bg-stone-950/98 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded p-2 text-[#f5e8d3] hover:bg-stone-800/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="rules-nav"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <Link href="/" className="font-display text-[#d4af37] hover:underline">
          Guidelines
        </Link>
        <div className="w-10" aria-hidden />
      </div>

      {/* Backdrop when drawer open on mobile */}
      <button
        type="button"
        className={`fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity duration-200 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-label="Close navigation menu"
        tabIndex={open ? 0 : -1}
      />

      {/* Sidebar: drawer on mobile, fixed sidebar on md+ */}
      <aside
        id="rules-nav"
        role="navigation"
        aria-label="Chapters of the Rule of Saint Benedict"
        className={`fixed left-0 top-0 z-20 h-full w-64 border-r border-stone-700/50 bg-stone-950/98 p-4 pt-16 backdrop-blur transition-transform duration-200 ease-out md:pt-4 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Link
          href="/"
          className="mb-4 block font-display text-lg font-medium text-[#d4af37] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded"
        >
          ← Back to Guidelines
        </Link>
        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-6rem)] md:max-h-none" aria-label="Chapter list">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a89888]" id="rules-nav-heading">
            Rule of Saint Benedict
          </p>
          {chapters.map((ch) => {
            const href = `/rules/${ch.slug}`;
            const isCurrent = pathname === href;
            return (
              <Link
                key={ch.slug}
                href={href}
                className={`block rounded py-1.5 pl-2 text-sm hover:bg-stone-800/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded ${isCurrent ? "bg-stone-800/50 text-[#d4af37] font-medium" : "text-[#f5e8d3] hover:text-[#d4af37]"}`}
                aria-current={isCurrent ? "page" : undefined}
              >
                {ch.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
