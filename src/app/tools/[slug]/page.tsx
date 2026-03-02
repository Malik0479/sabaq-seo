import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: tool, error } = await supabase
    .from('ai_tools_data')
    .select('*')
    .eq('slug', slug)
    .single();

  // If Supabase can't find the row, show the 404
  if (!tool || error) {
    console.error("Database Fetch Error:", error);
    return notFound();
  }

  // MATCHING YOUR DATABASE KEYS (Summary, Table, Sabaq_tip)
  const content = tool.comparison_data || {};
  const summary = content.summary || "No summary found.";
  const tableData = content.table || [];
  const sabaqTip = content.sabaq_tip || "No tip available.";

  return (
    <main className="p-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 hover:underline mb-6 block">← Back to Index</Link>
      
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{tool.keyword}</h1>
      <p className="text-lg text-gray-700 mb-10 leading-relaxed">{summary}</p>

      {tableData.length > 0 && (
        <div className="mb-10 overflow-hidden border rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 font-bold text-gray-600">Feature</th>
                <th className="p-4 font-bold text-gray-600">Details</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row: any, i: number) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  {/* Note the Capital 'F' and 'D' to match your check_db.py output */}
                  <td className="p-4 font-semibold text-gray-800">{row.Feature}</td>
                  <td className="p-4 text-gray-600">{row.Detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
        <h3 className="text-xl font-bold text-blue-800 mb-2">💡 Sabaq Expert Insight</h3>
        <p className="text-blue-900">{sabaqTip}</p>
      </div>
    </main>
  );
}