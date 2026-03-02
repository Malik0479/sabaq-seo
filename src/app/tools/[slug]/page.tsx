import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// This helper function tells Next.js that even if it doesn't know a slug, it should check the DB
export async function generateStaticParams() {
  return [];
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await the params (Required in Next.js 15+)
  const { slug } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2. Fetch data with explicit error logging
  const { data: tool, error } = await supabase
    .from('ai_tools_data')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !tool) {
    console.error("404 Triggered. Slug:", slug, "Error:", error);
    return notFound();
  }

  const content = tool.comparison_data || {};
  
  return (
    <main className="p-10 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-500 mb-4 block">← Back to Home</Link>
      <h1 className="text-4xl font-bold mb-6">{tool.keyword}</h1>
      <p className="text-gray-700 text-lg mb-8">{content.summary}</p>
      
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="font-bold text-blue-800">Expert Tip</h3>
        <p>{content.sabaq_tip}</p>
      </div>
    </main>
  );
}