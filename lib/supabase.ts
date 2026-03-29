import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add them to .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getSharedWorkspace(shareId: string) {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('share_id', shareId)
    .eq('is_public', true)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserWorkspaces(userId: string) {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getQuickSaves(userId: string) {
  const { data, error } = await supabase
    .from('quick_saves')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
