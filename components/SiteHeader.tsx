"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ChapterListPanel, { type Chapter } from "./ChapterListPanel";

const navLinks = [
  { href: "/", label: "Guidelines" },
  { href: "/rules", label: "The Rule" },
  { href: "/rules/prologue", label: "Prologue" },
];

type Props = { chapters?: Chapter[] };

export default function SiteHeader({ chapters = [] }: Props) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const hasChapters = chapters.length > 0;

  return (
    <>
      <header
        className="border-b border-stone-700/30 bg-stone-950/80 backdrop-blur-sm"
        role="banner"
      >
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className={`font-display text-lg tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded sm:text-xl ${
              pathname === "/"
                ? "text-[#d4af37]"
                : "text-[#f5e8d3] hover:text-[#d4af37]"
            }`}
          >
            Guidelines
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-6">
            <ul className="flex items-center gap-3 sm:gap-8" role="list">
              {navLinks.slice(1).map(({ href, label }) => {
                const isActive =
                  href === "/rules/prologue"
                    ? pathname === "/rules/prologue"
                    : pathname.startsWith("/rules") && pathname !== "/rules/prologue";
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`text-xs tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded sm:text-sm ${
                        isActive
                          ? "text-[#d4af37]"
                          : "text-[#a89888] hover:text-[#f5e8d3]"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Hamburger: visible on all pages when we have chapters */}
            {hasChapters && (
              <button
                type="button"
                onClick={() => setDrawerOpen((o) => !o)}
                className="rounded p-2 text-[#a89888] hover:bg-stone-800/50 hover:text-[#f5e8d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2"
                aria-label={drawerOpen ? "Close chapter list" : "Open chapter list"}
                aria-expanded={drawerOpen}
                aria-controls="global-chapters-drawer"
              >
                <span className="sr-only">{drawerOpen ? "Close" : "Chapters"}</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  {drawerOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Global chapters drawer (home + any page) */}
      {hasChapters && (
        <>
          <button
            type="button"
            className={`fixed inset-0 z-20 bg-stone-950/70 backdrop-blur-sm transition-opacity duration-200 ${drawerOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close chapter list"
            tabIndex={drawerOpen ? 0 : -1}
          />
          <aside
            id="global-chapters-drawer"
            role="navigation"
            aria-label="Chapters of the Rule of Saint Benedict"
            className={`fixed left-0 top-0 z-30 flex h-full w-full flex-col border-r border-stone-700/30 bg-stone-950/95 backdrop-blur transition-transform duration-200 ease-out sm:w-80 ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <ChapterListPanel
              chapters={chapters}
              onClose={() => setDrawerOpen(false)}
              showCloseButton
            />
          </aside>
        </>
      )}
    </>
  );
}
