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
      <main className="min-h-screen flex-1 pt-14 px-4 pb-10 md:pl-64 md:pr-6 md:pt-10 md:px-6">
        {children}
      </main>
    </div>
  );
}
