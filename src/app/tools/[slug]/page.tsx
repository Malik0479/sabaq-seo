import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Zap, Search, Globe, ArrowRight } from "lucide-react";
export const dynamic = 'force-dynamic';
export default async function Home() {
  // Fetch all tools from your Supabase DB to list them
  // This will stay empty until you run your Python miner script
  const { data: tools } = await supabase
    .from('ai_tools_data')
    .select('keyword, slug')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      {/* Hero Section */}
      <section className="bg-white border-b border-zinc-200 py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Zap size={16} fill="currentColor" />
            <span>AI-Powered Research Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-zinc-900 mb-6 tracking-tight">
            Sabaq AI <span className="text-blue-600">Index</span>
          </h1>
          <p className="text-xl text-zinc-600 leading-relaxed">
            Uncovering the truth behind trending tech. Automated, authentic, and real-time comparisons of the world's most searched topics.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 flex items-center">
            <Globe className="mr-3 text-blue-600" /> Latest Comparisons
          </h2>
          <span className="bg-zinc-200 text-zinc-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
            {tools?.length || 0} Pages Live
          </span>
        </div>

        {tools && tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link 
                key={tool.slug} 
                href={`/tools/${tool.slug}`}
                className="group p-8 bg-white border border-zinc-200 rounded-3xl hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-zinc-100 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Search size={20} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors mb-4">
                  {tool.keyword}
                </h3>
                <div className="flex items-center text-blue-600 text-sm font-bold">
                  View Full Analysis <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-zinc-200 shadow-inner">
            <div className="p-4 bg-zinc-50 rounded-full mb-4">
               <Search size={40} className="text-zinc-300" />
            </div>
            <p className="text-zinc-500 font-medium text-lg">Your index is currently empty.</p>
            <p className="text-zinc-400 text-sm mt-2 text-center max-w-xs">
              Run your <b>miner.py</b> script to start populating your directory with trending data.
            </p>
          </div>
        )}
      </section>

      {/* Footer Area */}
      <footer className="max-w-6xl mx-auto py-12 px-6 border-t border-zinc-200 text-center">
        <p className="text-zinc-400 text-sm font-medium">
          &copy; 2026 Sabaq AI Engine. Built for the modern web.
        </p>
      </footer>
    </main>
  );
}