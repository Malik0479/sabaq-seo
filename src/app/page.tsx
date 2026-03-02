import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic'; // Ensures new tools show up instantly

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: tools } = await supabase.from('ai_tools_data').select('keyword, slug');

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Sabaq AI | Expert Comparison Index</h1>
      <div className="grid gap-4">
        {tools?.map((tool) => (
          <Link 
            key={tool.slug} 
            href={`/tools/${tool.slug}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition shadow-sm block"
          >
            <h2 className="text-xl font-semibold">{tool.keyword} →</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}