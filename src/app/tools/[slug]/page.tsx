import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: tool, error } = await supabase
    .from('ai_tools_data')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !tool) return notFound();

  const content = tool.comparison_data || {};
  const tableData = content.table || [];
  const sources = content.sources || [];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation Header */}
      <nav className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-blue-600 font-bold text-xl hover:opacity-80 transition">
            SABAQ <span className="text-gray-900">AI</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">← Back to Index</Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pt-12">
        {/* Title Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {tool.keyword}
          </h1>
          <div className="flex gap-2 mb-8">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Expert Analysis</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Updated March 2026</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-6 italic">
            {content.summary}
          </p>
        </header>

        {/* The Comparison Table (Visible & Styled) */}
        {tableData.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Deep Dive Comparison</h2>
            <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-lg bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-5 font-bold uppercase text-sm tracking-widest">Core Feature</th>
                    <th className="p-5 font-bold uppercase text-sm tracking-widest">Technical Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tableData.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-5 font-bold text-gray-900 align-top w-1/3 bg-gray-50/30">
                        {row.Feature}
                      </td>
                      <td className="p-5 text-gray-700 leading-relaxed">
                        {row.Detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Expert Tip Box */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl mb-16">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="text-2xl font-bold mb-3">Sabaq Insider Insight (2026)</h3>
              <p className="text-blue-50 leading-relaxed text-lg">
                {content.sabaq_tip}
              </p>
            </div>
          </div>
        </section>

        {/* Sources Section (Critical for Google Trust) */}
        {sources.length > 0 && (
          <section className="border-t pt-10">
            <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest">Verified Sources & References</h4>
            <ul className="grid gap-3">
              {sources.map((url: string, i: number) => (
                <li key={i} className="truncate">
                  <a href={url} target="_blank" className="text-blue-500 hover:underline text-sm flex items-center gap-2">
                    <span className="text-gray-400">[{i + 1}]</span> {url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}