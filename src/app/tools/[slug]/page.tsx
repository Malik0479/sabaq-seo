import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: tool, error } = await supabase
    .from('ai_tools_data')
    .select('*')
    .eq('slug', params.slug)
    .single();

  // 1. Check if the tool exists at all
  if (!tool || error) return notFound();

  // 2. Safety Check: If the AI returned slightly different keys
  const data = tool.comparison_data || {};
  const summary = data.summary || data.overview || "No summary available.";
  const table = data.table || [];
  const tip = data.sabaq_tip || data.tip || "No expert tip available yet.";

  return (
    <article className="p-10 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-500 mb-8 block">← Back to Index</Link>
      
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{tool.keyword}</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Overview</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{summary}</p>
      </section>

      {table.length > 0 && (
        <section className="mb-10 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Feature Comparison</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="border p-3 font-bold">Feature</th>
                <th className="border p-3 font-bold">Details</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border p-3 font-semibold text-gray-800 bg-gray-50/50">
                    {row.Feature || row.feature || Object.values(row)[0]}
                  </td>
                  <td className="border p-3 text-gray-600">
                    {row.Detail || row.detail || Object.values(row)[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <h3 className="text-xl font-bold text-yellow-800 mb-2">💡 Sabaq Expert Insight (2026)</h3>
        <p className="text-yellow-900">{tip}</p>
      </div>
    </article>
  );
}