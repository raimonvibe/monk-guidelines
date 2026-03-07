"use client";

import ChapterListPanel, { type Chapter } from "./ChapterListPanel";

export default function RulesNav({ chapters }: { chapters: Chapter[] }) {
  return (
    <>
      {/* Desktop only: fixed sidebar. On mobile the global header hamburger opens the drawer. */}
      <aside
        id="rules-nav"
        role="navigation"
        aria-label="Chapters of the Rule of Saint Benedict"
        className="fixed left-0 top-0 z-20 hidden h-full w-80 flex-col border-r border-stone-700/30 bg-stone-950/95 backdrop-blur md:flex"
      >
        <ChapterListPanel chapters={chapters} showCloseButton={false} />
      </aside>
    </>
  );
}
