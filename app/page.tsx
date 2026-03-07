import Link from "next/link";
import DailyReading from "@/components/DailyReading";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero background: dim corridor / monk atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-950 to-stone-950" />
        {/* Optional: add public/images/hero-monk.jpg for monk/corridor atmosphere */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/images/hero-monk.jpg')",
          }}
          aria-hidden
        />
      </div>

      <main id="main-content" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-16" tabIndex={-1}>
        {/* Hero quote */}
        <blockquote className="font-display max-w-3xl text-2xl font-medium leading-relaxed tracking-wide text-[#f5e8d3] sm:text-4xl md:text-5xl">
          &ldquo;Listen... with the ear of your heart.&rdquo;
        </blockquote>
        <p className="mt-4 font-serif text-lg text-[#a89888]">
          — Rule of Saint Benedict, Prologue
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
          <Link
            href="/rules"
            className="rounded-md border border-[#d4af37]/50 bg-[#2d2620]/80 px-4 py-2.5 text-sm font-medium text-[#f5e8d3] transition hover:border-[#d4af37] hover:bg-[#3d352d]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 sm:px-6 sm:py-3 sm:text-base"
          >
            Read the Rules
          </Link>
          <Link
            href="/rules/prologue"
            className="rounded-md bg-[#d4af37]/20 px-4 py-2.5 text-sm font-medium text-[#d4af37] transition hover:bg-[#d4af37]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37] focus-visible:outline-offset-2 sm:px-6 sm:py-3 sm:text-base"
          >
            Prologue
          </Link>
        </div>

        {/* Daily reading snippet */}
        <section className="mt-16 w-full max-w-2xl sm:mt-20" aria-labelledby="daily-reading-heading">
          <h2 id="daily-reading-heading" className="mb-3 font-display text-lg font-medium text-[#d4af37] sm:mb-4 sm:text-xl">
            Today&apos;s reading
          </h2>
          <DailyReading />
        </section>
      </main>
    </div>
  );
}
