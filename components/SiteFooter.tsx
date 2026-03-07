import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      className="border-t border-stone-700/30 bg-stone-950/50 py-8"
      role="contentinfo"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#a89888]">
          <Link
            href="/"
            className="hover:text-[#d4af37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded"
          >
            Guidelines
          </Link>
          <Link
            href="/rules"
            className="hover:text-[#d4af37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded"
          >
            The Rule
          </Link>
          <Link
            href="/rules/prologue"
            className="hover:text-[#d4af37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 focus-visible:rounded"
          >
            Prologue
          </Link>
        </nav>
        <p className="mt-4 text-center text-xs text-[#a89888]/70">
          The Rule of Saint Benedict — for those who seek to listen with the ear of the heart.
        </p>
      </div>
    </footer>
  );
}
