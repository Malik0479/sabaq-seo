import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// This tells Next.js to check the DB for any slug it doesn't know yet
export async function generateStaticParams() {
  return [];
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. You MUST await params in this version of Next.js
  const { slug } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2. Fetch data from your specific table
  const { data: tool, error } = await supabase
    .from('ai_tools_data')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !tool) {
    console.error("404 Triggered. Slug requested:", slug, "Error:", error);
    return notFound();
  }

  const content = tool.comparison_data || {};
  
  return (
    <main className="p-10 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-blue-600 hover:underline mb-8 block">← Back to Index</Link>
      
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{tool.keyword}</h1>
      <p className="text-lg text-gray-700 mb-10 leading-relaxed">{content.summary}</p>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
        <h3 className="text-xl font-bold text-blue-800 mb-2">💡 Sabaq Expert Insight</h3>
        <p className="text-blue-900">{content.sabaq_tip}</p>
      </div>
    </main>
  );
}