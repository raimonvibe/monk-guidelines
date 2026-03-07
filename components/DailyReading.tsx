"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "daily-reading";
const MIDNIGHT_MS = 24 * 60 * 60 * 1000;

function getMidnightTonight(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime();
}

export default function DailyReading() {
  const [snippet, setSnippet] = useState<{
    slug: string;
    title: string;
    excerpt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    let data: { slug: string; title: string; excerpt: string; expires: number } | null = null;
    if (cached) {
      try {
        data = JSON.parse(cached);
      } catch {
        data = null;
      }
    }

    const now = Date.now();
    if (data && data.expires > now) {
      setSnippet({ slug: data.slug, title: data.title, excerpt: data.excerpt });
      setLoading(false);
      return;
    }

    fetch("/api/daily-reading")
      .then((res) => res.json())
      .then((payload: { slug: string; title: string; excerpt: string }) => {
        const expires = getMidnightTonight();
        if (typeof window !== "undefined") {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ ...payload, expires })
          );
        }
        setSnippet(payload);
      })
      .catch(() => setSnippet(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-stone-700/50 bg-stone-900/40 px-3 py-4 text-center text-sm text-[#a89888] sm:px-4 sm:py-6 sm:text-base">
        Loading today&apos;s reading...
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="rounded-lg border border-stone-700/50 bg-stone-900/40 px-3 py-4 text-center text-sm text-[#a89888] sm:px-4 sm:py-6 sm:text-base">
        No reading available. Add content in <code className="text-[#d4af37]">/data/rules-benedict.md</code>.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-stone-700/50 bg-stone-900/40 px-3 py-4 sm:px-4 sm:py-6">
      <p className="mb-2 font-serif text-sm text-[#f5e8d3]/95 leading-relaxed sm:text-base">
        &ldquo;{snippet.excerpt}&rdquo;
      </p>
      <p className="text-sm text-[#d4af37]">
        — <Link href={`/rules/${snippet.slug}`} className="hover:underline">{snippet.title}</Link>
      </p>
    </div>
  );
}
