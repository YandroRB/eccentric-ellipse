// src/pages/api/test.ts
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabaseClient';

export const GET: APIRoute = async () => {
  const { data, error } = await supabase.from('mail').select('*').limit(1);

  if (error) {
    console.error('❌ Error Supabase:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
};
