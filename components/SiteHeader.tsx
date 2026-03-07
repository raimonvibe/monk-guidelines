"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Guidelines" },
  { href: "/rules", label: "The Rule" },
  { href: "/rules/prologue", label: "Prologue" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
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
        <ul className="flex items-center gap-6 sm:gap-8" role="list">
          {navLinks.slice(1).map(({ href, label }) => {
            const isActive =
              href === "/rules/prologue"
                ? pathname === "/rules/prologue"
                : pathname.startsWith("/rules") && pathname !== "/rules/prologue";
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded ${
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
      </nav>
    </header>
  );
}
