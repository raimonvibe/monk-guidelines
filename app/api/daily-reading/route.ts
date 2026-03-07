import { NextResponse } from "next/server";
import { getRandomChapterExcerpt } from "@/lib/markdown";

export async function GET() {
  const data = await getRandomChapterExcerpt();
  if (!data) {
    return NextResponse.json(
      { slug: "prologue", title: "Prologue", excerpt: "Listen with the ear of your heart." },
      { status: 200 }
    );
  }
  return NextResponse.json(data);
}
