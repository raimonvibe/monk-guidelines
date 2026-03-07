import { getBenedictChapters } from "@/lib/markdown";
import RulesNav from "@/components/RulesNav";

export default async function RulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapters = await getBenedictChapters();

  return (
    <div className="min-h-screen">
      <RulesNav chapters={chapters} />
      <main id="main-content" className="min-h-screen flex-1 px-4 pb-12 pt-6 md:pl-72 md:pr-8 md:pt-10 md:pb-16" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
