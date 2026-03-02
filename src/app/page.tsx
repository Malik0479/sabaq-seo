import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// This line is CRITICAL: It tells Vercel to check the DB live for every visitor
export const dynamic = 'force-dynamic'; 

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch all tools from your database
  const { data: tools } = await supabase
    .from('ai_tools_data')
    .select('keyword, slug')
    .order('created_at', { ascending: false });

  return (
    <main className="p-10 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Sabaq AI</h1>
      <p className="text-gray-600 mb-10 text-lg">Real-time AI Tool Comparisons & Tech Trends 2026.</p>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {tools && tools.length > 0 ? (
          tools.map((tool) => (
            <Link 
              key={tool.slug} 
              href={`/tools/${tool.slug}`}
              className="p-5 border rounded-xl hover:border-blue-500 hover:shadow-md transition-all block bg-white"
            >
              <h2 className="text-xl font-semibold text-gray-800">{tool.keyword}</h2>
              <span className="text-sm text-blue-500 font-medium">Read Comparison →</span>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 italic">The engine is currently researching new topics...</p>
        )}
      </div>
    </main>
  );
}