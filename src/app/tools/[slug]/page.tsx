import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: tool } = await supabase
    .from('ai_tools_data')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!tool) return notFound();

  const { summary, table, sabaq_tip, sources } = tool.comparison_data;

  return (
    <article className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{tool.keyword}</h1>
      <p className="text-lg text-gray-700 mb-8">{summary}</p>

      <table className="w-full border-collapse border mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Feature</th>
            <th className="border p-2">Detail</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row: any, i: number) => (
            <tr key={i}>
              <td className="border p-2 font-medium">{row.Feature}</td>
              <td className="border p-2">{row.Detail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-blue-50 p-4 border-l-4 border-blue-500 mb-8">
        <h3 className="font-bold">💡 Sabaq Expert Tip</h3>
        <p>{sabaq_tip}</p>
      </div>
    </article>
  );
}