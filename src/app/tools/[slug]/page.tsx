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
    <main className="min-h-screen bg-white text-slate-900 pb-20">
      {/* Premium Navbar */}
      <nav className="border-b bg-slate-50/50 backdrop-blur-md sticky top-0 z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-2xl text-blue-600 tracking-tighter">
            SABAQ <span className="text-slate-900">INSIGHTS</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition">
            ← Back to Index
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Title & Metadata */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
              Verified 2026
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Tech Comparison Report
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-900">
            {tool.keyword}
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-8 italic bg-slate-50 py-6 rounded-r-xl">
            {content.summary}
          </p>
        </header>

        {/* Detailed Comparison Table */}
        {tableData.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-extrabold mb-8 text-slate-900">Key Feature Analysis</h2>
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50">
              <table className="w-full text-left bg-white">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-5 font-bold uppercase text-xs tracking-[0.2em]">Parameter</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-[0.2em]">Expert Breakdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-6 font-bold text-slate-900 bg-slate-50/50 w-1/3 align-top">
                        {row.Feature}
                      </td>
                      <td className="p-6 text-slate-700 leading-relaxed text-md">
                        {row.Detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Sabaq Expert Insight Box */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 text-white shadow-2xl mb-20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💡</span>
              <h3 className="text-2xl font-black uppercase tracking-wider">Sabaq Insider Tip</h3>
            </div>
            <p className="text-blue-50 text-xl leading-relaxed font-medium">
              {content.sabaq_tip}
            </p>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </section>

        {/* Citations & Sources (Essential for Google Trust) */}
        {sources.length > 0 && (
          <section className="border-t border-slate-100 pt-12">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-8 text-center">
              Research Bibliography & Sources
            </h4>
            <div className="grid gap-3">
              {sources.map((url: string, i: number) => (
                <a 
                  key={i} 
                  href={url} 
                  target="_blank" 
                  className="group flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all"
                >
                  <span className="font-mono text-slate-300 font-bold">[{String(i + 1).padStart(2, '0')}]</span>
                  <span className="text-blue-600 group-hover:text-blue-700 text-sm truncate font-medium">
                    {url}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}