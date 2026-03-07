import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const DATA_DIR = path.join(process.cwd(), "data");

export type Chapter = {
  slug: string;
  title: string;
  order: number;
  content: string;
  contentHtml: string;
  source: "benedict" | "augustine" | "francis";
};

export type ChapterMeta = {
  slug: string;
  title: string;
  order: number;
  source: "benedict" | "augustine" | "francis";
};

function parseChaptersFromMarkdown(
  content: string,
  source: Chapter["source"]
): { title: string; body: string }[] {
  const chapters: { title: string; body: string }[] = [];
  const parts = content.split(/(?=^#\s)/m);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^#\s+(.+?)(?:\n|$)/s);
    const title = match ? match[1].trim() : "Untitled";
    const body = match ? trimmed.slice(match[0].length).trim() : trimmed;
    chapters.push({ title, body });
  }

  return chapters;
}

function slugify(title: string, index: number): string {
  if (title.toLowerCase() === "prologue") return "prologue";
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base ? `${index}-${base}` : `chapter-${index}`;
}

export async function getBenedictChapters(): Promise<ChapterMeta[]> {
  const filePath = path.join(DATA_DIR, "rules-benedict.md");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const parsed = parseChaptersFromMarkdown(content, "benedict");
  return parsed.map((p, i) => ({
    slug: slugify(p.title, i),
    title: p.title,
    order: i,
    source: "benedict" as const,
  }));
}

export async function getChapterBySlug(
  slug: string,
  source: "benedict" | "augustine" | "francis" = "benedict"
): Promise<Chapter | null> {
  const fileName =
    source === "benedict"
      ? "rules-benedict.md"
      : source === "augustine"
        ? "rules-augustine.md"
        : "rules-francis.md";
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const parsed = parseChaptersFromMarkdown(content, source);
  const index = parsed.findIndex(
    (_, i) => slugify(parsed[i].title, i) === slug
  );
  if (index === -1) return null;
  const { title, body } = parsed[index];
  const html = await remark().use(remarkHtml).process(body);
  return {
    slug,
    title,
    order: index,
    content: body,
    contentHtml: String(html),
    source,
  };
}

export async function getAllChapters(): Promise<ChapterMeta[]> {
  const benedict = await getBenedictChapters();
  return benedict;
}

export async function getRandomChapterSlug(): Promise<string> {
  const chapters = await getAllChapters();
  if (chapters.length === 0) return "prologue";
  const i = Math.floor(Math.random() * chapters.length);
  return chapters[i].slug;
}

export async function getRandomChapterExcerpt(): Promise<{
  slug: string;
  title: string;
  excerpt: string;
} | null> {
  const chapters = await getAllChapters();
  if (chapters.length === 0) return null;
  const i = Math.floor(Math.random() * chapters.length);
  const meta = chapters[i];
  const full = await getChapterBySlug(meta.slug, meta.source);
  if (!full) return { slug: meta.slug, title: meta.title, excerpt: "" };
  const excerpt =
    full.content.replace(/\s+/g, " ").slice(0, 220).trim() + (full.content.length > 220 ? "…" : "");
  return { slug: full.slug, title: full.title, excerpt };
}
