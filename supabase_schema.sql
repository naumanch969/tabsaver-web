-- TabSaver Cloud Schema

-- 1. Profiles (extending auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Workspaces (Synced Sessions)
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  data JSONB NOT NULL, -- TabInfo[] array
  is_public BOOLEAN DEFAULT false,
  share_id TEXT UNIQUE, -- Short ID for public links (e.g. 'abc-123')
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  color TEXT
);

-- Enable RLS for workspaces
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own workspaces" ON public.workspaces 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view public workspaces" ON public.workspaces 
  FOR SELECT USING (is_public = true);

-- 3. Quick Saves (Temporary, 7-day lifespan)
CREATE TABLE IF NOT EXISTS public.quick_saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tabs JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for quick_saves
ALTER TABLE public.quick_saves ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own quick saves" ON public.quick_saves 
  FOR ALL USING (auth.uid() = user_id);

-- 4. TTL Cleanup logic (Can be triggered via PG_Cron or Edge Function)
-- This function can be called by a scheduled job.
CREATE OR REPLACE FUNCTION delete_expired_quick_saves() 
RETURNS void AS $$
BEGIN
  DELETE FROM public.quick_saves WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;

-- 5. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_workspaces_modtime 
BEFORE UPDATE ON public.workspaces 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
