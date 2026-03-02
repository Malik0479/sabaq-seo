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
    <main className="min-h-screen bg-[#FCFCFC] text-slate-900 pb-20 selection:bg-blue-100">
      {/* Editorial Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-5">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-2xl text-slate-900 tracking-tighter">
            SABAQ <span className="text-blue-600 uppercase">Insights</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition uppercase tracking-[0.2em]">Research Index</Link>
            <Link href="/" className="text-sm font-bold text-blue-600 px-4 py-2 bg-blue-50 rounded-full hover:bg-blue-100 transition">← Back</Link>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Editorial Header */}
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-slate-900 text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.25em]">
              Industry Intelligence
            </span>
            <span className="text-slate-200">/</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              March 2026 Release
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-10 leading-[1.05] text-slate-900 tracking-tight">
            {tool.keyword}
          </h1>
          
          <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-2xl text-slate-700 leading-relaxed font-medium tracking-tight">
              {content.summary}
            </p>
          </div>
        </header>

        {/* Technical Breakdown Section */}
        {tableData.length > 0 && (
          <section className="mb-20">
            <div className="flex items-baseline justify-between mb-10 border-b-2 border-slate-900 pb-5">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Detailed Specifications</h2>
              <span className="text-[10px] font-black text-slate-400 tracking-[0.3em]">DATASET_REF_026</span>
            </div>
            
            <div className="overflow-hidden border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/30">
              <table className="w-full text-left bg-white">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-6 font-black uppercase text-[11px] tracking-[0.3em] text-slate-500">Categorization</th>
                    <th className="p-6 font-black uppercase text-[11px] tracking-[0.3em] text-slate-500">Primary Observations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row: any, i: number) => (
                    <tr key={i} className="group transition-colors">
                      <td className="p-8 font-black text-slate-900 w-1/3 align-top group-hover:text-blue-600 transition-colors">
                        {row.Feature}
                      </td>
                      <td className="p-8 text-slate-600 leading-relaxed text-lg font-medium">
                        {row.Detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Strategic Recommendation Box */}
        <section className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-3xl mb-24 relative overflow-hidden group">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-blue-400 mb-8">Strategic Outlook</h3>
            <p className="text-white text-3xl font-bold leading-tight tracking-tight mb-12">
              "{content.sabaq_tip}"
            </p>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-bold shadow-lg">FS</div>
              <div>
                <p className="text-sm font-bold">Furqan Sharjeel</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lead Research Strategist</p>
              </div>
            </div>
          </div>
          {/* Subtle Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
        </section>

        {/* Reference Links */}
        {sources.length > 0 && (
          <section className="pt-16 border-t border-slate-200">
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] mb-12 text-center">
              Primary Research Bibliography
            </h4>
            <div className="grid gap-4">
              {sources.map((url: string, i: number) => (
                <a 
                  key={i} 
                  href={url} 
                  target="_blank" 
                  className="flex items-center gap-8 p-6 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 hover:shadow-xl group"
                >
                  <span className="text-xs font-black text-slate-200 group-hover:text-blue-200 transition-colors">[{String(i + 1).padStart(2, '0')}]</span>
                  <span className="text-blue-600 text-sm truncate font-bold border-b-2 border-transparent group-hover:border-blue-100">
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