import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Ensures the research index updates instantly as the bot works
export const dynamic = 'force-dynamic'; 

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: tools } = await supabase
    .from('ai_tools_data')
    .select('keyword, slug, created_at')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 pb-20">
      {/* Editorial Header */}
      <header className="bg-white border-b border-slate-200 pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-6">
            Tech Intelligence 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6">
            SABAQ <span className="text-blue-600">INSIGHTS</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed">
            Deep-dive technical comparisons and strategic reports for the next generation of technology.
          </p>
        </div>
      </header>

      {/* Research Grid */}
      <section className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools && tools.length > 0 ? (
            tools.map((tool) => (
              <Link 
                key={tool.slug} 
                href={`/tools/${tool.slug}`}
                className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Report #{tool.slug.slice(0, 4)}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {tool.keyword}
                  </h2>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                    View Analysis →
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {new Date(tool.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-300 rounded-3xl">
              <p className="text-slate-400 font-medium italic">Our analysts are currently preparing the latest reports...</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="mt-32 text-center px-6">
        <div className="max-w-lg mx-auto border-t border-slate-200 pt-10">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-4">
            A Furqan Sharjeel Production
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold text-slate-400">
            <span className="hover:text-slate-900 cursor-pointer transition">PRIVACY</span>
            <span>•</span>
            <span className="hover:text-slate-900 cursor-pointer transition">METHODOLOGY</span>
            <span>•</span>
            <span className="hover:text-slate-900 cursor-pointer transition">CONTACT</span>
          </div>
        </div>
      </footer>
    </main>
  );
}