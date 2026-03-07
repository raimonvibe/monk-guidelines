import Link from "next/link";
import { getBenedictChapters } from "@/lib/markdown";

export default async function RulesPage() {
  const chapters = await getBenedictChapters();

  return (
    <div className="max-w-2xl w-full">
      <h1 className="font-display text-2xl font-medium text-[#f5e8d3] sm:text-3xl">
        The Rule of Saint Benedict
      </h1>
      <p className="mt-2 text-sm text-[#a89888] sm:text-base">
        Chapters and prologue. Select one to read.
      </p>
      <ul className="mt-6 space-y-2 sm:mt-8">
        {chapters.map((ch) => (
          <li key={ch.slug}>
            <Link
              href={`/rules/${ch.slug}`}
              className="block rounded-lg border border-stone-700/50 bg-stone-900/50 px-3 py-2.5 text-sm text-[#f5e8d3] transition hover:border-[#d4af37]/40 hover:bg-stone-800/50 sm:px-4 sm:py-3 sm:text-base"
            >
              <span className="text-[#a89888]">{ch.order + 1}.</span> {ch.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
