import Link from "next/link";
import { getBenedictChapters } from "@/lib/markdown";

export default async function RulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapters = await getBenedictChapters();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-20 h-full w-56 border-r border-stone-700/50 bg-stone-950/95 p-4 backdrop-blur sm:w-64">
        <Link
          href="/"
          className="mb-4 block font-display text-lg font-medium text-[#d4af37] hover:underline"
        >
          ← Guidelines
        </Link>
        <nav className="space-y-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a89888]">
            Rule of Saint Benedict
          </p>
          {chapters.map((ch) => (
            <Link
              key={ch.slug}
              href={`/rules/${ch.slug}`}
              className="block rounded py-1.5 pl-2 text-sm text-[#f5e8d3] hover:bg-stone-800/50 hover:text-[#d4af37]"
            >
              {ch.title}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="min-h-screen flex-1 pl-56 pr-6 py-10 sm:pl-64">
        {children}
      </main>
    </div>
  );
}
