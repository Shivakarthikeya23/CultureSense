-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cultural_personas table
CREATE TABLE IF NOT EXISTS public.cultural_personas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    preferences JSONB NOT NULL DEFAULT '{}',
    analysis_results JSONB NOT NULL DEFAULT '{}',
    is_public BOOLEAN DEFAULT FALSE,
    share_token TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cultural_analyses table
CREATE TABLE IF NOT EXISTS public.cultural_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    analysis_type TEXT NOT NULL CHECK (analysis_type IN ('cross_domain', 'brand_alignment', 'market_intelligence', 'cultural_strategist')),
    domains TEXT[] NOT NULL DEFAULT '{}',
    preferences JSONB NOT NULL DEFAULT '{}',
    results JSONB NOT NULL DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table for tracking usage
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    session_data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cultural_personas_user_id ON public.cultural_personas(user_id);
CREATE INDEX IF NOT EXISTS idx_cultural_personas_created_at ON public.cultural_personas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cultural_analyses_user_id ON public.cultural_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_cultural_analyses_type ON public.cultural_analyses(analysis_type);
CREATE INDEX IF NOT EXISTS idx_cultural_analyses_created_at ON public.cultural_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for cultural_personas table
CREATE POLICY "Users can view own personas" ON public.cultural_personas
    FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert own personas" ON public.cultural_personas
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own personas" ON public.cultural_personas
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own personas" ON public.cultural_personas
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for cultural_analyses table
CREATE POLICY "Users can view own analyses" ON public.cultural_analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON public.cultural_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" ON public.cultural_analyses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON public.cultural_analyses
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for user_sessions table
CREATE POLICY "Users can view own sessions" ON public.user_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cultural_personas_updated_at
    BEFORE UPDATE ON public.cultural_personas
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cultural_analyses_updated_at
    BEFORE UPDATE ON public.cultural_analyses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate share token
CREATE OR REPLACE FUNCTION public.generate_share_token()
RETURNS TEXT AS $$
BEGIN
    RETURN encode(gen_random_bytes(16), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Create function to create public persona with share token
CREATE OR REPLACE FUNCTION public.create_public_persona(
    persona_id UUID,
    is_public BOOLEAN DEFAULT TRUE
)
RETURNS TEXT AS $$
DECLARE
    share_token TEXT;
BEGIN
    IF is_public THEN
        share_token := public.generate_share_token();
        UPDATE public.cultural_personas 
        SET is_public = TRUE, share_token = share_token
        WHERE id = persona_id AND user_id = auth.uid();
        RETURN share_token;
    ELSE
        UPDATE public.cultural_personas 
        SET is_public = FALSE, share_token = NULL
        WHERE id = persona_id AND user_id = auth.uid();
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated; 