import Link from "next/link";
import { getBenedictChapters } from "@/lib/markdown";

export default async function RulesPage() {
  const chapters = await getBenedictChapters();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-medium text-[#f5e8d3]">
        The Rule of Saint Benedict
      </h1>
      <p className="mt-2 text-[#a89888]">
        Chapters and prologue. Select one to read.
      </p>
      <ul className="mt-8 space-y-2">
        {chapters.map((ch) => (
          <li key={ch.slug}>
            <Link
              href={`/rules/${ch.slug}`}
              className="block rounded-lg border border-stone-700/50 bg-stone-900/50 px-4 py-3 text-[#f5e8d3] transition hover:border-[#d4af37]/40 hover:bg-stone-800/50"
            >
              <span className="text-[#a89888]">{ch.order + 1}.</span> {ch.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
