import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Ensures the page stays up-to-date with your Python bot's latest research
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
    <main className="min-h-screen bg-[#FCFCFC] text-slate-900 pb-20 selection:bg-blue-100 overflow-x-hidden">
      {/* Editorial Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-5">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-2xl text-slate-900 tracking-tighter">
            SABAQ <span className="text-blue-600 uppercase">Insights</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hidden md:block text-[10px] font-black text-slate-400 hover:text-slate-900 transition uppercase tracking-[0.2em]">Research Index</Link>
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
              Report Release: March 2026
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-10 leading-[1.05] text-slate-900 tracking-tight">
            {tool.keyword}
          </h1>
          
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium tracking-tight">
              {content.summary}
            </p>
          </div>
        </header>

        {/* Technical Breakdown Section */}
        {tableData.length > 0 && (
          <section className="mb-20">
            <div className="flex items-baseline justify-between mb-10 border-b-2 border-slate-900 pb-5">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Technical Breakdown</h2>
              <span className="hidden sm:block text-[10px] font-black text-slate-400 tracking-[0.3em]">DATASET_VER_2.4</span>
            </div>
            
            <div className="overflow-hidden border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/20">
              <table className="w-full text-left bg-white border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500">
                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.3em]">Specifications</th>
                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.3em]">Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row: any, i: number) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-6 md:p-8 font-black text-slate-900 w-1/3 align-top text-sm md:text-base group-hover:text-blue-600 transition-colors">
                        {row.Feature}
                      </td>
                      <td className="p-6 md:p-8 text-slate-600 leading-relaxed text-sm md:text-lg font-medium">
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
        <section className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white shadow-3xl mb-24 relative overflow-hidden group">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-8">Strategic Outlook</h3>
            <p className="text-white text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-12">
              "{content.sabaq_tip}"
            </p>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black text-sm shadow-lg border border-white/20">FS</div>
              <div>
                <p className="text-sm font-bold tracking-tight">Furqan Sharjeel</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Lead Research Strategist</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        </section>

        {/* --- FIXED REFERENCE LINKS SECTION --- */}
        {sources.length > 0 && (
          <section className="pt-16 border-t border-slate-200">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-12 text-center">
              Primary Research Bibliography
            </h4>
            <div className="grid gap-4 max-w-full">
              {sources.map((url: string, i: number) => (
                <div key={i} className="flex gap-5 items-start p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group overflow-hidden">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 text-xs md:text-sm font-bold hover:underline break-all leading-loose pr-4"
                  >
                    {url}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}