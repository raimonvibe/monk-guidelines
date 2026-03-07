import { notFound } from "next/navigation";
import { getChapterBySlug, getBenedictChapters } from "@/lib/markdown";
import RuleCard from "@/components/RuleCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const chapters = await getBenedictChapters();
  return chapters.map((ch) => ({ slug: ch.slug }));
}

export default async function RulePage({ params }: Props) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);
  if (!chapter) notFound();

  return (
    <article className="max-w-2xl w-full min-w-0">
      <header className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl font-medium text-[#f5e8d3] sm:text-3xl break-words">
          {chapter.title}
        </h1>
        <p className="mt-1 text-xs text-[#a89888] sm:text-sm">
          Chapter {chapter.order + 1} · Rule of Saint Benedict
        </p>
      </header>
      <RuleCard title={chapter.title} defaultOpen>
        <div
          className="prose prose-invert prose-stone max-w-none prose-p:text-[#f5e8d3]/95 prose-headings:text-[#d4af37] prose-strong:text-[#f5e8d3] prose-sm sm:prose-base overflow-x-hidden"
          dangerouslySetInnerHTML={{ __html: chapter.contentHtml }}
        />
      </RuleCard>
    </article>
  );
}
